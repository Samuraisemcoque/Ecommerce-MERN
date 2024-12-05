const cloudinary = require("cloudinary").v2; // Importa o módulo Cloudinary
const multer = require("multer"); // Importa o módulo Multer para upload de arquivos

// Configura o Cloudinary com as credenciais da sua conta
cloudinary.config({
  cloud_name: "dmjajrpyx", // Nome da nuvem no Cloudinary
  api_key: "987344236888553", // Chave da API do Cloudinary
  api_secret: "fz7eGOoSV0a8wyMFN9kZpkdxfuo", // Segredo da API do Cloudinary
});

// Configura o Multer para armazenar arquivos na memória
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  // Função utilitária para fazer o upload de imagem no Cloudinary
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", // Determina o tipo de recurso automaticamente
  });

  return result; // Retorna o resultado do upload
}

// Configura o Multer com o armazenamento configurado
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil }; // Exporta o upload e a função utilitária de upload de imagem

// Variável de ambiente da API
// CLOUDINARY_URL=cloudinary://987344236888553:fz7eGOoSV0a8wyMFN9kZpkdxfuo@dmjajrpyx
