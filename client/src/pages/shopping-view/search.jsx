import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importa o componente ProductDetailsDialog de um caminho relativo
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importa o componente ShoppingProductTile de um caminho relativo
import { Input } from "@/components/ui/input"; // Importa o componente Input de um caminho relativo
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importa as ações addToCart e fetchCartItems do slice de carrinho de compras
import { fetchProductDetails } from "@/store/shop/products-slice"; // Importa a ação fetchProductDetails do slice de produtos
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice"; // Importa as ações getSearchResults e resetSearchResults do slice de busca
import { useEffect, useState } from "react"; // Importa os hooks useEffect e useState da biblioteca "react"
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useSearchParams } from "react-router-dom"; // Importa o hook useSearchParams da biblioteca "react-router-dom"

function SearchProducts() {
  const [keyword, setKeyword] = useState(""); // Define o estado para a palavra-chave de busca
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Define o estado para abrir o diálogo de detalhes
  const [searchParams, setSearchParams] = useSearchParams(); // Obtém os parâmetros de busca e a função para defini-los
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { searchResults } = useSelector((state) => state.shopSearch); // Obtém os resultados da busca do estado shopSearch do Redux
  const { productDetails } = useSelector((state) => state.shopProducts); // Obtém os detalhes do produto do estado shopProducts do Redux

  const { user } = useSelector((state) => state.auth); // Obtém o usuário do estado auth do Redux

  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado shopCart do Redux
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  // useEffect para buscar os resultados da pesquisa quando a palavra-chave muda
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  // Função para adicionar um produto ao carrinho
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Somente ${getQuantity} quantidade pode ser adicionada para este item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Produto adicionado ao carrinho",
        });
      }
    });
  }

  // Função para obter os detalhes do produto
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // useEffect para abrir o diálogo de detalhes do produto quando os detalhes do produto são obtidos
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(searchResults, "searchResults");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Buscar Produtos..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">Nenhum resultado encontrado!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
