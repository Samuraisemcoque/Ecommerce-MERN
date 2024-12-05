const Address = require("../../models/Address"); // Importa o modelo Address

// Função para adicionar um novo endereço
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body; // Obtém os dados do corpo da requisição

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!", // Dados inválidos fornecidos
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save(); // Salva o novo endereço no banco de dados

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress, // Retorna o novo endereço criado
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para buscar todos os endereços de um usuário específico
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!", // ID do usuário é necessário
      });
    }

    const addressList = await Address.find({ userId }); // Busca todos os endereços do usuário

    res.status(200).json({
      success: true,
      data: addressList, // Retorna a lista de endereços
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para editar um endereço específico
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!", // ID do usuário e do endereço são necessários
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true } // Retorna o documento atualizado
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found", // Endereço não encontrado
      });
    }

    res.status(200).json({
      success: true,
      data: address, // Retorna o endereço atualizado
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

// Função para deletar um endereço específico
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!", // ID do usuário e do endereço são necessários
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId }); // Deleta o endereço pelo ID do usuário e do endereço

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found", // Endereço não encontrado
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully", // Endereço deletado com sucesso
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error", // Erro ocorreu
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress }; // Exporta as funções para uso em outras partes da aplicação
