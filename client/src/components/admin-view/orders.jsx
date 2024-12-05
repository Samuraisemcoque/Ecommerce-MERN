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
// Importa o componente AdminOrderDetailsView de um caminho relativo
import AdminOrderDetailsView from "./order-details"; // Corrigido: "de" para "from"
// Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useDispatch, useSelector } from "react-redux";
// Importa as ações do slice de pedidos do admin
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
// Importa o componente Badge de um caminho relativo
import { Badge } from "../ui/badge";

// Define o componente AdminOrdersView
function AdminOrdersView() {
  // Define o estado openDetailsDialog com valor inicial false
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // Obtém a lista de pedidos e os detalhes do pedido do estado adminOrder do Redux
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();

  // Função para buscar os detalhes de um pedido
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  // useEffect para buscar todos os pedidos ao carregar o componente
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  // useEffect para abrir o diálogo de detalhes quando os detalhes do pedido estão disponíveis
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    // Componente Card que encapsula todo o conteúdo
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                        <AdminOrderDetailsView orderDetails={orderDetails} />
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

// Exporta o componente AdminOrdersView como padrão
export default AdminOrdersView;
