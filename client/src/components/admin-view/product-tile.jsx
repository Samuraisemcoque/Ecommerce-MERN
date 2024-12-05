// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa os componentes Card, CardContent e CardFooter de um caminho relativo
import { Card, CardContent, CardFooter } from "../ui/card";

// Define o componente AdminProductTile que recebe várias propriedades
function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    // Componente Card com classes de estilo para largura e margem automáticas
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          {/* Renderiza a imagem do produto */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          {/* Título do produto */}
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
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
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {/* Botão para editar o produto */}
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          {/* Botão para deletar o produto */}
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

// Exporta o componente AdminProductTile como padrão
export default AdminProductTile;
