import { Fragment, useState, useEffect } from "react"; // Importa os hooks Fragment, useState e useEffect da biblioteca "react"
import { Button } from "@/components/ui/button"; // Importa o componente Button de um caminho relativo
import { Label } from "@/components/ui/label"; // Importa o componente Label de um caminho relativo
import { Input } from "@/components/ui/input"; // Importa o componente Input de um caminho relativo
import { getSalesReportByDate } from "@/services/reportService"; // Importa a função getSalesReportByDate do serviço de relatório
import { AiOutlineBarChart } from "react-icons/ai"; // Importa o ícone AiOutlineBarChart da biblioteca "react-icons/ai"

function SalesReport() {
  const [salesReport, setSalesReport] = useState(null); // Define o estado para o relatório de vendas
  const [loading, setLoading] = useState(false); // Define o estado para o estado de carregamento
  const [error, setError] = useState(null); // Define o estado para o erro
  const [startDate, setStartDate] = useState(""); // Define o estado para a data de início
  const [endDate, setEndDate] = useState(""); // Define o estado para a data de fim

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  }; // Função para verificar se a data é válida

  const formatDateToAmerican = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  }; // Função para formatar a data para o formato americano

  const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "0.00";
    }
    return new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(value);
  }; // Função para formatar números

  const fetchReport = async () => {
    setLoading(true);
    setError(null); // Resetar erro antes de buscar o relatório

    // Verificar se as datas não estão vazias
    if (!startDate || !endDate) {
      setError("Por favor, selecione ambas as datas de início e fim.");
      setLoading(false);
      return;
    }

    // Formatar as datas para o formato americano
    const formattedStartDate = formatDateToAmerican(startDate);
    const formattedEndDate = formatDateToAmerican(endDate);

    // Verificar se as datas formatadas são válidas
    if (!isValidDate(formattedStartDate) || !isValidDate(formattedEndDate)) {
      setError("Formato de data inválido. Use o formato YYYY-MM-DD.");
      setLoading(false);
      return;
    }

    try {
      const response = await getSalesReportByDate(formattedStartDate, formattedEndDate);
      console.log("Sales Report Data:", response.data); // Adicionar log

      const processedData = {
        totalSales: response.data.totalSales || 0,
        averageSales: response.data.averageSales || 0,
        totalOrders: response.data.totalOrders || 0,
        totalQuantity: response.data.totalQuantity || 0,
      };

      console.log("Processed Sales Report Data:", processedData); // Log dos dados processados

      setSalesReport(processedData);
    } catch (err) {
      console.error("Erro ao buscar relatório de vendas:", err);
      setError(err.message || "Erro ao obter o relatório de vendas");
    } finally {
      setLoading(false);
    }
  }; // Função para buscar o relatório de vendas

  useEffect(() => {
    console.log("SalesReport state updated:", salesReport); // Log do estado do salesReport
  }, [salesReport]); // useEffect para logar o estado do salesReport

  return (
    <Fragment>
      <div className="py-6">
        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="start-date">Data Início</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end-date">Data Fim</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={fetchReport}>Buscar Relatório</Button>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : salesReport ? (
          <div className="flex flex-col gap-4 mt-4">
            <p>Total de Vendas: R$ {formatNumber(salesReport.totalSales)}</p>
            <p>Média de Vendas: {salesReport.averageSales !== null ? `R$ ${formatNumber(salesReport.averageSales)}` : "N/A"}</p>
            <p>Total de Pedidos: {salesReport.totalOrders !== null ? formatNumber(salesReport.totalOrders) : "N/A"}</p>
            <p>Quantidade Total de Vendas: {salesReport.totalQuantity !== null ? formatNumber(salesReport.totalQuantity) : "N/A"}</p>
          </div>
        ) : (
          <p>Nenhum dado disponível</p>
        )}
      </div>
    </Fragment>
  );
}

export default SalesReport;
