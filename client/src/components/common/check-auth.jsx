// Importa os componentes Navigate e useLocation da biblioteca "react-router-dom"
import { Navigate, useLocation } from "react-router-dom";

// Define o componente CheckAuth que recebe isAuthenticated, user e children como propriedades
function CheckAuth({ isAuthenticated, user, children }) {
  // Obtém a localização atual usando o hook useLocation
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Se o caminho atual for "/", redireciona com base no estado de autenticação e no papel do usuário
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Se o usuário não estiver autenticado e a rota não incluir "/login" ou "/register", redireciona para "/auth/login"
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Se o usuário estiver autenticado e a rota incluir "/login" ou "/register", redireciona com base no papel do usuário
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Se o usuário estiver autenticado, não for admin e a rota incluir "admin", redireciona para "/unauth-page"
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Se o usuário estiver autenticado, for admin e a rota incluir "shop", redireciona para "/admin/dashboard"
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Renderiza os filhos do componente se nenhuma das condições acima for atendida
  return <>{children}</>;
}

// Exporta o componente CheckAuth como padrão
export default CheckAuth;
