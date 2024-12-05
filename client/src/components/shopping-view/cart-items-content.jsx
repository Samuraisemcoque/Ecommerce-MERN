// Importa os ícones Minus, Plus e Trash da biblioteca "lucide-react"
import { Minus, Plus, Trash } from "lucide-react";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useDispatch, useSelector } from "react-redux";
// Importa as ações deleteCartItem e updateCartQuantity do slice de carrinho de compras
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// Importa o hook useToast de um caminho relativo
import { useToast } from "../ui/use-toast";

// Define o componente UserCartItemsContent que recebe cartItem como propriedade
function UserCartItemsContent({ cartItem }) {
  // Obtém o usuário do estado de autenticação do Redux
  const { user } = useSelector((state) => state.auth);
  // Obtém os itens do carrinho do estado shopCart do Redux
  const { cartItems } = useSelector((state) => state.shopCart);
  // Obtém a lista de produtos do estado shopProducts do Redux
  const { productList } = useSelector((state) => state.shopProducts);
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();
  // Obtém a função toast do hook useToast
  const { toast } = useToast();

  // Função para atualizar a quantidade de itens no carrinho
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  // Função para deletar um item do carrinho
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    // Estrutura do item do carrinho com imagem, título, controle de quantidade e preço
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

// Exporta o componente UserCartItemsContent como padrão
export default UserCartItemsContent;
