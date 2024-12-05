// Importa ícones da biblioteca "lucide-react"
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  BarChart3, // Importa ícone para relatório de vendas
} from "lucide-react";
// Importa o componente Fragment da biblioteca "react"
import { Fragment } from "react";
// Importa o hook useNavigate da biblioteca "react-router-dom"
import { useNavigate } from "react-router-dom";
// Importa os componentes Sheet, SheetContent, SheetHeader e SheetTitle de um caminho relativo
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Define os itens do menu da barra lateral do administrador
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "sales-report",
    label: "Relatório de Vendas",
    path: "/admin/sales-report",
    icon: <BarChart3 />, // Ícone para relatório de vendas
  },
];

// Define o componente MenuItems que recebe setOpen como propriedade
function MenuItems({ setOpen }) {
  // Obtém a função navigate do hook useNavigate
  const navigate = useNavigate();

  return (
    // Navegação do menu com estilo flex
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// Define o componente AdminSideBar que recebe open e setOpen como propriedades
function AdminSideBar({ open, setOpen }) {
  // Obtém a função navigate do hook useNavigate
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

// Exporta o componente AdminSideBar como padrão
export default AdminSideBar;
