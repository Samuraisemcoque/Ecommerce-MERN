import CommonForm from "@/components/common/form"; // Importa o componente CommonForm de um caminho relativo
import { useToast } from "@/components/ui/use-toast"; // Importa o hook useToast de um caminho relativo
import { registerFormControls } from "@/config"; // Importa os controles do formulário de registro da configuração
import { registerUser } from "@/store/auth-slice"; // Importa a ação registerUser do slice de autenticação
import { useState } from "react"; // Importa o hook useState da biblioteca "react"
import { useDispatch } from "react-redux"; // Importa o hook useDispatch da biblioteca "react-redux"
import { Link, useNavigate } from "react-router-dom"; // Importa os componentes Link e useNavigate da biblioteca "react-router-dom"

const initialState = {
  userName: "",
  email: "",
  password: "",
}; // Define o estado inicial do formulário

function AuthRegister() {
  const [formData, setFormData] = useState(initialState); // Define o estado para os dados do formulário
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux
  const navigate = useNavigate(); // Obtém a função navigate do React Router
  const { toast } = useToast(); // Obtém a função toast do hook useToast

  // Função para lidar com o envio do formulário
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
