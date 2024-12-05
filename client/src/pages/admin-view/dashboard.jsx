// Importa React e os hooks useEffect e useState da biblioteca "react"
import React, { useEffect, useState } from "react";
// Importa o componente Link da biblioteca "react-router-dom"
import { Link } from "react-router-dom";
// Importa o componente ProductImageUpload de um caminho relativo
import ProductImageUpload from "@/components/admin-view/image-upload";
// Importa o componente Button de um caminho relativo
import { Button } from "@/components/ui/button";
// Importa as ações addFeatureImage e getFeatureImages do slice comum
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
// Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useDispatch, useSelector } from "react-redux";
// Importa o ícone AiOutlineBarChart da biblioteca "react-icons/ai"
import { AiOutlineBarChart } from "react-icons/ai"; // Importar ícone

// Define o componente AdminDashboard
function AdminDashboard() {
  // Define os estados locais para imageFile, uploadedImageUrl, imageLoadingState e openSalesReportDialog
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [openSalesReportDialog, setOpenSalesReportDialog] = useState(false); // State para abrir o relatório diretamente
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();
  // Obtém a lista de imagens em destaque do estado comum do Redux
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // useEffect para buscar as imagens em destaque ao carregar o componente
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(uploadedImageUrl, "uploadedImageUrl");
  console.log(featureImageList, "featureImageList");

  // Função para fazer o upload de uma imagem em destaque
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {/* Renderiza a lista de imagens em destaque */}
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <AiOutlineBarChart size={20} />
        <Link to="#" className="text-blue-500 hover:underline" onClick={() => setOpenSalesReportDialog(true)}>
          Ver Relatório de Vendas
        </Link>
      </div>
      {/* Renderiza o relatório de vendas se o estado openSalesReportDialog for verdadeiro */}
      {openSalesReportDialog && <SalesReport open={openSalesReportDialog} setOpen={setOpenSalesReportDialog} />}
    </div>
  );
}

// Exporta o componente AdminDashboard como padrão
export default AdminDashboard;
