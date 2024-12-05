import { createRoot } from "react-dom/client"; // Importa a função createRoot da biblioteca "react-dom/client" para criar a raiz da aplicação React
import App from "./App.jsx"; // Importa o componente principal App
import "./index.css"; // Importa o arquivo CSS global
import { BrowserRouter } from "react-router-dom"; // Importa o componente BrowserRouter da biblioteca "react-router-dom" para roteamento
import { Provider } from "react-redux"; // Importa o componente Provider da biblioteca "react-redux" para fornecer a store do Redux
import store from "./store/store.js"; // Importa a store do Redux
import { Toaster } from "./components/ui/toaster.jsx"; // Importa o componente Toaster para notificações

// Cria a raiz da aplicação React e renderiza a aplicação dentro do elemento com o ID "root"
createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* Envolve a aplicação com BrowserRouter para habilitar o roteamento */}
    <Provider store={store}> {/* Envolve a aplicação com Provider para fornecer a store do Redux */}
      <App /> {/* Renderiza o componente principal App */}
      <Toaster /> {/* Renderiza o componente Toaster para notificações */}
    </Provider>
  </BrowserRouter>
);
