// Importa o componente Button e outros componentes necessários
import { Button } from "@/components/ui/button";
// Importa imagens usadas no banner rotativo
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
// Importa ícones do Lucide-react para serem usados nas categorias e marcas
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
// Importa componentes de cartão (Card e CardContent) para exibição estilizada
import { Card, CardContent } from "@/components/ui/card";
// Importa hooks do React para gerenciamento de estado e efeitos colaterais
import { useEffect, useState } from "react";
// Importa hooks e ações do Redux para gerenciar o estado global
import { useDispatch, useSelector } from "react-redux";
// Importa funções específicas para buscar produtos e detalhes
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
// Importa o componente que renderiza produtos individuais
import ShoppingProductTile from "@/components/shopping-view/product-tile";
// Importa o hook para navegação (react-router-dom)
import { useNavigate } from "react-router-dom";
// Importa funções para gerenciar o carrinho de compras
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// Importa a funcionalidade de exibir notificações
import { useToast } from "@/components/ui/use-toast";
// Importa o modal que exibe detalhes de produtos
import ProductDetailsDialog from "@/components/shopping-view/product-details";
// Importa a ação para buscar imagens de destaque (banners)
import { getFeatureImages } from "@/store/common-slice";

// Define categorias com ícones associados
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon }, // Categoria para homens
  { id: "women", label: "Women", icon: CloudLightning }, // Categoria para mulheres
  { id: "kids", label: "Kids", icon: BabyIcon }, // Categoria infantil
  { id: "accessories", label: "Accessories", icon: WatchIcon }, // Categoria de acessórios
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon }, // Categoria de calçados
];

// Define marcas com ícones associados
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt }, // Marca Nike
  { id: "adidas", label: "Adidas", icon: WashingMachine }, // Marca Adidas
  { id: "puma", label: "Puma", icon: ShoppingBasket }, // Marca Puma
  { id: "levi", label: "Levi's", icon: Airplay }, // Marca Levi's
  { id: "zara", label: "Zara", icon: Images }, // Marca Zara
  { id: "h&m", label: "H&M", icon: Heater }, // Marca H&M
];

function ShoppingHome() {
  // Estado para controlar o slide atual do banner
  const [currentSlide, setCurrentSlide] = useState(0);
  // Seleciona produtos e detalhes do estado global
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  // Seleciona a lista de imagens em destaque do estado global
  const { featureImageList } = useSelector((state) => state.commonFeature);
  // Estado para controlar se o modal de detalhes está aberto
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // Seleciona o usuário autenticado do estado global
  const { user } = useSelector((state) => state.auth);
  // Hook para despachar ações no Redux
  const dispatch = useDispatch();
  // Hook para navegar entre rotas
  const navigate = useNavigate();
  // Hook para exibir notificações
  const { toast } = useToast();

  // Função para navegar para a página de listagem com filtros
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters"); // Remove filtros existentes
    const currentFilter = {
      [section]: [getCurrentItem.id], // Define o novo filtro baseado na seção (categoria ou marca)
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Armazena o filtro no sessionStorage
    navigate(`/shop/listing`); // Navega para a página de listagem
  }

  // Função para buscar os detalhes de um produto
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId)); // Dispara ação para buscar detalhes
  }

  // Função para adicionar um produto ao carrinho
  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id, // ID do usuário
        productId: getCurrentProductId, // ID do produto
        quantity: 1, // Quantidade padrão (1)
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id)); // Atualiza o carrinho
        toast({
          title: "Product is added to cart", // Exibe notificação de sucesso
        });
      }
    });
  }

  // Efeito para abrir o modal de detalhes quando productDetails mudar
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Efeito para alternar automaticamente entre slides do banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000); // Muda a cada 15 segundos

    return () => clearInterval(timer); // Limpa o timer ao desmontar
  }, [featureImageList]);

  // Efeito para buscar produtos filtrados ao carregar o componente
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {}, // Sem filtros
        sortParams: "price-lowtohigh", // Ordenação por preço
      })
    );
  }, [dispatch]);

  // Efeito para buscar imagens em destaque ao carregar o componente
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Seção do banner rotativo */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image} // URL da imagem
                key={index} // Chave única
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        {/* Botão para navegar ao slide anterior */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {/* Botão para navegar ao próximo slide */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Seção de categorias */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resto do código continua com marcas, produtos e modal... */}
    </div>
  );
}

export default ShoppingHome;
