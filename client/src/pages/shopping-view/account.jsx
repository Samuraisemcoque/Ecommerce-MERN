import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Importa os componentes Tabs, TabsContent, TabsList e TabsTrigger de um caminho relativo
import accImg from "../../assets/account.jpg"; // Importa uma imagem de um caminho relativo
import Address from "@/components/shopping-view/address"; // Importa o componente Address de um caminho relativo
import ShoppingOrders from "@/components/shopping-view/orders"; // Importa o componente ShoppingOrders de um caminho relativo

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
