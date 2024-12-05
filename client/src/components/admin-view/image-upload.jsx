// Importa os ícones FileIcon, UploadCloudIcon e XIcon da biblioteca "lucide-react"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// Importa o componente Input de um caminho relativo
import { Input } from "../ui/input";
// Importa o componente Label de um caminho relativo
import { Label } from "../ui/label";
// Importa os hooks useEffect e useRef da biblioteca "react"
import { useEffect, useRef } from "react";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa a biblioteca axios para fazer requisições HTTP
import axios from "axios";
// Importa o componente Skeleton de um caminho relativo
import { Skeleton } from "../ui/skeleton";

// Define o componente ProductImageUpload, que recebe várias propriedades
function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  // Cria uma referência para o elemento input
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  // Função para lidar com a alteração do arquivo de imagem selecionado
  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  // Função para prevenir o comportamento padrão durante o arrastar
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Função para lidar com o soltar do arquivo
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  // Função para remover a imagem selecionada
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // Função para fazer upload da imagem para o Cloudinary
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  // useEffect para fazer upload da imagem ao selecionar um arquivo
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    // Div principal com estilização condicional baseada em isCustomStyling
    <div className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        {/* Input oculto para upload de arquivo */}
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {/* Condicional para mostrar diferentes estados do componente */}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Exporta o componente ProductImageUpload como padrão
export default ProductImageUpload;
