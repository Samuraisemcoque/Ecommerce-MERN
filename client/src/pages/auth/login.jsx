import CommonForm from "@/components/common/form"; // Importa o componente CommonForm de um caminho relativo
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo
import { loginFormControls } from "@/config"; // Importa os controles do formulário de login da configuração
import { loginUser } from "@/store/auth-slice"; // Importa a ação loginUser do slice de autenticação
import { useState } from "react"; // Importa o hook useState da biblioteca "react"
import { useDispatch } from "react-redux"; // Importa o hook useDispatch da biblioteca "react-redux"
import { Link } from "react-router-dom"; // Importa o componente Link da biblioteca "react-router-dom"

const initialState = {
  email: "",
  password: "",
}; // Define o estado inicial do formulário

function AuthLogin() {
  const [formData, setFormData] = useState(initialState); // Define o estado para os dados do formulário
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  // Função para lidar com o envio do formulário
  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
