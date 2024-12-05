// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";
// Importa os componentes Card, CardContent e CardFooter de um caminho relativo
import { Card, CardContent, CardFooter } from "../ui/card";
// Importa o componente Label de um caminho relativo
import { Label } from "../ui/label";

// Define o componente AddressCard que recebe várias propriedades
function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    // Componente Card com estilização condicional para borda
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        {/* Exibe as informações de endereço */}
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        {/* Botão para editar o endereço */}
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        {/* Botão para deletar o endereço */}
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

// Exporta o componente AddressCard como padrão
export default AddressCard;
