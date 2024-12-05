import ProductFilter from "@/components/shopping-view/filter"; // Importa o componente ProductFilter de um caminho relativo
import ProductDetailsDialog from "@/components/shopping-view/product-details"; // Importa o componente ProductDetailsDialog de um caminho relativo
import ShoppingProductTile from "@/components/shopping-view/product-tile"; // Importa o componente ShoppingProductTile de um caminho relativo
import { Button } from "@/components/ui/button"; // Importa o componente Button de um caminho relativo
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importa os componentes de menu suspenso de um caminho relativo
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo
import { sortOptions } from "@/config"; // Importa as opções de ordenação da configuração
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // Importa as ações addToCart e fetchCartItems do slice de carrinho de compras
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice"; // Importa as ações fetchAllFilteredProducts e fetchProductDetails do slice de produtos
import { ArrowUpDownIcon } from "lucide-react"; // Importa o ícone ArrowUpDown da biblioteca "lucide-react"
import { useEffect, useState } from "react"; // Importa os hooks useEffect e useState da biblioteca "react"
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useSearchParams } from "react-router-dom"; // Importa o hook useSearchParams da biblioteca "react-router-dom"

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
} // Função para criar parâmetros de busca a partir dos filtros

function ShoppingListing() {
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  ); // Obtém a lista de produtos e detalhes do produto do estado shopProducts do Redux
  const { cartItems } = useSelector((state) => state.shopCart); // Obtém os itens do carrinho do estado shopCart do Redux
  const { user } = useSelector((state) => state.auth); // Obtém o usuário do estado auth do Redux
  const [filters, setFilters] = useState({}); // Define o estado para os filtros
  const [sort, setSort] = useState(null); // Define o estado para a ordenação
  const [searchParams, setSearchParams] = useSearchParams(); // Obtém os parâmetros de busca e a função para defini-los
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Define o estado para abrir o diálogo de detalhes
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  const categorySearchParam = searchParams.get("category"); // Obtém o parâmetro de busca de categoria

  // Função para lidar com a ordenação
  function handleSort(value) {
    setSort(value);
  }

  // Função para lidar com os filtros
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // Função para obter os detalhes do produto
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

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
            title: `Only ${getQuantity} quantity can be added for this item`,
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
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]); // Define a ordenação padrão e obtém os filtros da sessão quando o parâmetro de categoria muda

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]); // Atualiza os parâmetros de busca quando os filtros mudam

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]); // Busca todos os produtos filtrados quando os filtros ou a ordenação mudam

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]); // Abre o diálogo de detalhes do produto quando os detalhes do produto são obtidos

  console.log(productList, "productListproductListproductList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
