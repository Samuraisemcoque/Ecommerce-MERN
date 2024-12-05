import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

// Define o componente UserCartWrapper que recebe cartItems e setOpenCartSheet como propriedades
function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  // Obtém a função navigate do hook useNavigate
  const navigate = useNavigate();

  // Calcula o valor total do carrinho
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    // Componente SheetContent com largura máxima em telas pequenas
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {/* Mapeia e exibe os itens do carrinho */}
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <UserCartItemsContent key={index} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      {/* Botão para finalizar a compra */}
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

// Exporta o componente UserCartWrapper como padrão
export default UserCartWrapper;
