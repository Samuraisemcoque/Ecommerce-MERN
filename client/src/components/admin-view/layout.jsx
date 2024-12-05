// Importa o componente Outlet do "react-router-dom"
import { Outlet } from "react-router-dom";
// Importa o componente AdminSideBar de um caminho relativo
import AdminSideBar from "./sidebar";
// Importa o componente AdminHeader de um caminho relativo
import AdminHeader from "./header";
// Importa o hook useState da biblioteca "react"
import { useState } from "react";

// Define o componente AdminLayout
function AdminLayout() {
  // Cria o estado openSidebar com valor inicial false e a função setOpenSidebar para atualizá-lo
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Barra lateral do administrador */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* Cabeçalho do administrador */}
        <AdminHeader setOpen={setOpenSidebar} />
        {/* Área principal do layout para renderizar os componentes da rota */}
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Exporta o componente AdminLayout como padrão
export default AdminLayout;
