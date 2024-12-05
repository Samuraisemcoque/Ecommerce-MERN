// Importa os ícones AlignJustify e LogOut da biblioteca "lucide-react"
import { AlignJustify, LogOut } from "lucide-react";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa o hook useDispatch da biblioteca "react-redux"
import { useDispatch } from "react-redux";
// Importa a ação logoutUser do slice de autenticação
import { logoutUser } from "@/store/auth-slice";

// Define o componente AdminHeader, que recebe a propriedade setOpen
function AdminHeader({ setOpen }) {
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();

  // Função para lidar com o logout do usuário
  function handleLogout() {
    // Despacha a ação logoutUser
    dispatch(logoutUser());
  }

  return (
    // Define o cabeçalho com estilos flex, padding e borda
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Botão para abrir o menu, visível apenas em telas pequenas (sm) e oculto em telas grandes (lg) */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span> {/* Texto acessível apenas para leitores de tela */}
      </Button>
      {/* Div que alinha o botão de logout à direita */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut /> {/* Ícone de logout */}
          Logout
        </Button>
      </div>
    </header>
  );
}

// Exporta o componente AdminHeader como padrão
export default AdminHeader;
