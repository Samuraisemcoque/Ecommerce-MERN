// Importa o componente Outlet do "react-router-dom"
import { Outlet } from "react-router-dom";

// Define o componente AuthLayout
function AuthLayout() {
  return (
    // Div principal com classe flex, altura mínima da tela e largura total
    <div className="flex min-h-screen w-full">
      {/* Div oculta em telas pequenas e visível em telas grandes, com fundo preto e conteúdo centralizado */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          {/* Título de boas-vindas */}
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>
      {/* Div flexível que ocupa o restante da largura, com conteúdo centralizado e padding */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

// Exporta o componente AuthLayout como padrão
export default AuthLayout;
