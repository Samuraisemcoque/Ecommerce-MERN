import Address from "@/components/shopping-view/address"; // Importa o componente Address de um caminho relativo
import img from "../../assets/account.jpg"; // Importa uma imagem de um caminho relativo
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"; // Importa o componente UserCartItemsContent de um caminho relativo
import { Button } from "@/components/ui/button"; // Importa o componente Button de um caminho relativo
import { useState } from "react"; // Importa o hook useState da biblioteca "react"
import { createNewOrder } from "@/store/shop/order-slice"; // Importa a ação createNewOrder do slice de pedidos
import { Navigate } from "react-router-dom"; // Importa o componente Navigate da biblioteca "react-router-dom"
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado shopCart do Redux
  const { user } = useSelector((state) => state.auth); // Obtém o usuário do estado auth do Redux
  const { approvalURL } = useSelector((state) => state.shopOrder); // Obtém a URL de aprovação do estado shopOrder do Redux
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null); // Define o estado para o endereço selecionado
  const [isPaymentStart, setIsPaymemntStart] = useState(false); // Define o estado para o início do pagamento
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0; // Calcula o valor total do carrinho

  // Função para iniciar o pagamento pelo Paypal
  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
