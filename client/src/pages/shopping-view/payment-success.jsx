import { Button } from "@/components/ui/button"; // Importa o componente Button de um caminho relativo
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Importa os componentes Card, CardHeader e CardTitle de um caminho relativo
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate da biblioteca "react-router-dom"

function PaymentSuccessPage() {
  const navigate = useNavigate(); // Obtém a função navigate do React Router

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
