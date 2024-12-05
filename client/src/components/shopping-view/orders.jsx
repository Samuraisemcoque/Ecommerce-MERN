// Importa os hooks useEffect e useState da biblioteca "react"
import { useEffect, useState } from "react";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa os componentes Card, CardContent, CardHeader e CardTitle de um caminho relativo
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// Importa o componente Dialog de um caminho relativo
import { Dialog } from "../ui/dialog";
// Importa os componentes Table, TableBody, TableCell, TableHead, TableHeader e TableRow de um caminho relativo
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// Importa o componente ShoppingOrderDetailsView de um caminho relativo
import ShoppingOrderDetailsView from "./order-details";
// Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useDispatch, useSelector } from "react-redux";
// Importa as ações getAllOrdersByUserId, getOrderDetails e resetOrderDetails do slice de pedidos
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
// Importa o componente Badge de um caminho relativo
import { Badge } from "../ui/badge";

// Define o componente ShoppingOrders
function ShoppingOrders() {
  // Define o estado openDetailsDialog com valor inicial false
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();
  // Obtém o usuário do estado de autenticação do Redux
  const { user } = useSelector((state) => state.auth);
  // Obtém a lista de pedidos e os detalhes do pedido do estado shopOrder do Redux
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  // Função para buscar os detalhes de um pedido
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  // useEffect para buscar todos os pedidos pelo ID do usuário ao carregar o componente
  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  // useEffect para abrir o diálogo de detalhes quando os detalhes do pedido estão disponíveis
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    // Componente Card que encapsula todo o conteúdo
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Exporta o componente ShoppingOrders como padrão
export default ShoppingOrders;
