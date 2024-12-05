// Importa o componente Outlet do "react-router-dom"
import { Outlet } from "react-router-dom";
// Importa o componente ShoppingHeader de um caminho relativo
import ShoppingHeader from "./header";

// Define o componente ShoppingLayout
function ShoppingLayout() {
  return (
    // Div principal com classes flex, flex-col, bg-white e overflow-hidden
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Cabeçalho comum */}
      <ShoppingHeader />
      {/* Área principal que renderiza o Outlet */}
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

// Exporta o componente ShoppingLayout como padrão
export default ShoppingLayout;
