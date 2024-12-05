// Importa as opções de filtro da configuração
import { filterOptions } from "@/config";
// Importa o componente Fragment da biblioteca "react"
import { Fragment } from "react";
// Importa o componente Label de um caminho relativo
import { Label } from "../ui/label";
// Importa o componente Checkbox de um caminho relativo
import { Checkbox } from "../ui/checkbox";
// Importa o componente Separator de um caminho relativo
import { Separator } from "../ui/separator";

// Define o componente ProductFilter que recebe filters e handleFilter como propriedades
function ProductFilter({ filters, handleFilter }) {
  return (
    // Div que contém o filtro com fundo, bordas arredondadas e sombra
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Mapeia e exibe as opções de filtro */}
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex font-medium items-center gap-2">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente ProductFilter como padrão
export default ProductFilter;
