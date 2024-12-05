import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Importa os componentes Card, CardHeader e CardTitle de um caminho relativo
import { capturePayment } from "@/store/shop/order-slice"; // Importa a ação capturePayment do slice de pedidos
import { useEffect } from "react"; // Importa o hook useEffect da biblioteca "react"
import { useDispatch } from "react-redux"; // Importa o hook useDispatch da biblioteca "react-redux"
import { useLocation } from "react-router-dom"; // Importa o hook useLocation da biblioteca "react-router-dom"

function PaypalReturnPage() {
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const location = useLocation(); // Obtém o objeto location do React Router
  const params = new URLSearchParams(location.search); // Cria uma instância de URLSearchParams com os parâmetros da URL
  const paymentId = params.get("paymentId"); // Obtém o parâmetro paymentId da URL
  const payerId = params.get("PayerID"); // Obtém o parâmetro PayerID da URL

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId")); // Obtém o ID do pedido do sessionStorage

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId"); // Remove o ID do pedido do sessionStorage
          window.location.href = "/shop/payment-success"; // Redireciona para a página de sucesso do pagamento
        }
      });
    }
  }, [paymentId, payerId, dispatch]); // useEffect que executa a captura do pagamento quando paymentId ou payerId mudam

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
