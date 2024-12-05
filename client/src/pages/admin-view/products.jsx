import ProductImageUpload from "@/components/admin-view/image-upload"; // Importa o componente ProductImageUpload de um caminho relativo
import AdminProductTile from "@/components/admin-view/product-tile"; // Importa o componente AdminProductTile de um caminho relativo
import CommonForm from "@/components/common/form"; // Importa o componente CommonForm de um caminho relativo
import { Button } from "@/components/ui/button"; // Importa o componente Button de um caminho relativo
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Importa os componentes Sheet, SheetContent, SheetHeader e SheetTitle de um caminho relativo
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo
import { addProductFormElements } from "@/config"; // Importa os elementos do formulário de adição de produtos da configuração
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice"; // Importa as ações addNewProduct, deleteProduct, editProduct e fetchAllProducts do slice de produtos do administrador
import { Fragment, useEffect, useState } from "react"; // Importa os hooks Fragment, useEffect e useState da biblioteca "react"
import { useDispatch, useSelector } from "react-redux"; // Importa os hooks useDispatch e useSelector da biblioteca "react-redux"

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
}; // Define os dados iniciais do formulário

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false); // Define o estado para controlar a abertura do diálogo de criação de produtos
  const [formData, setFormData] = useState(initialFormData); // Define o estado para os dados do formulário
  const [imageFile, setImageFile] = useState(null); // Define o estado para o arquivo de imagem
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Define o estado para a URL da imagem carregada
  const [imageLoadingState, setImageLoadingState] = useState(false); // Define o estado para o estado de carregamento da imagem
  const [currentEditedId, setCurrentEditedId] = useState(null); // Define o estado para o ID do produto que está sendo editado

  const { productList } = useSelector((state) => state.adminProducts); // Obtém a lista de produtos do estado adminProducts do Redux
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  // Função para lidar com o envio do formulário
  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  // Função para lidar com a exclusão de um produto
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  // Função para validar o formulário
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  // useEffect para buscar todos os produtos ao carregar o componente
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
