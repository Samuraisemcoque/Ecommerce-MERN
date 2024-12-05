// Importa os componentes Card, CardContent e CardFooter de um caminho relativo
import { Card, CardContent, CardFooter } from "../ui/card";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa os mapas de opções de marcas e categorias da configuração
import { brandOptionsMap, categoryOptionsMap } from "@/config";
// Importa o componente Badge de um caminho relativo
import { Badge } from "../ui/badge";

// Define o componente ShoppingProductTile que recebe product, handleGetProductDetails e handleAddtoCart como propriedades
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    // Componente Card com largura máxima de 100% e centrado horizontalmente
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          {/* Renderiza a imagem do produto */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {/* Renderiza um badge condicionalmente baseado no estoque e preço de venda do produto */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          {/* Título do produto */}
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            {/* Categoria do produto */}
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            {/* Marca do produto */}
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            {/* Preço do produto, com linha cortada se houver preço de venda */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {/* Preço de venda, se disponível */}
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {/* Botão para adicionar ao carrinho ou mostrar que está fora de estoque */}
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// Exporta o componente ShoppingProductTile como padrão
export default ShoppingProductTile;
