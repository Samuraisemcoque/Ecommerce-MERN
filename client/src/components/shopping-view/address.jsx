// Importa os hooks useEffect e useState da biblioteca "react"
import { useEffect, useState } from "react";
// Importa o componente CommonForm de um caminho relativo
import CommonForm from "../common/form";
// Importa os componentes Card, CardContent, CardHeader e CardTitle de um caminho relativo
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// Importa os controles do formulário de endereço da configuração
import { addressFormControls } from "@/config";
// Importa os hooks useDispatch e useSelector da biblioteca "react-redux"
import { useDispatch, useSelector } from "react-redux";
// Importa as ações do slice de endereços da loja
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
// Importa o componente AddressCard de um caminho relativo
import AddressCard from "./address-card";
// Importa o hook useToast de um caminho relativo
import { useToast } from "../ui/use-toast";

// Define os dados iniciais do formulário de endereço
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

// Define o componente Address que recebe setCurrentSelectedAddress e selectedId como propriedades
function Address({ setCurrentSelectedAddress, selectedId }) {
  // Define o estado formData com os dados iniciais do formulário
  const [formData, setFormData] = useState(initialAddressFormData);
  // Define o estado currentEditedId com valor inicial null
  const [currentEditedId, setCurrentEditedId] = useState(null);
  // Obtém a função dispatch do Redux
  const dispatch = useDispatch();
  // Obtém o usuário do estado de autenticação do Redux
  const { user } = useSelector((state) => state.auth);
  // Obtém a lista de endereços do estado shopAddress do Redux
  const { addressList } = useSelector((state) => state.shopAddress);
  // Obtém a função toast do hook useToast
  const { toast } = useToast();

  // Função para gerenciar o envio do formulário de endereço
  function handleManageAddress(event) {
    event.preventDefault();

    // Limita o usuário a adicionar no máximo 3 endereços
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    // Atualiza ou adiciona um endereço, dependendo se currentEditedId é nulo
    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  // Função para deletar um endereço
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  // Função para editar um endereço
  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  // Função para verificar se o formulário é válido
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  // useEffect para buscar todos os endereços ao carregar o componente
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

// Exporta o componente Address como padrão
export default Address;
