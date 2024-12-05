import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP

const API_URL = import.meta.env.VITE_API_URL; // Obtém a URL da API das variáveis de ambiente

export const getSalesReportByDate = async (startDate, endDate) => {
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // Obtém o token de autenticação dos cookies
    const response = await axios.get(`${API_URL}/admin/reports/sales`, {
      params: { startDate, endDate }, // Define os parâmetros da requisição
      withCredentials: true, // Inclui cookies na requisição
      headers: {
        Authorization: `Bearer ${token}`, // Define o cabeçalho de autorização com o token
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao obter relatório de vendas por data", error); // Exibe um erro no console se a requisição falhar
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};
