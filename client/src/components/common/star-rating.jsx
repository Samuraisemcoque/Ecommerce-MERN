// Importa o ícone StarIcon da biblioteca "lucide-react"
import { StarIcon } from "lucide-react";
// Importa o componente Button de um caminho relativo
import { Button } from "../ui/button";

// Define o componente StarRatingComponent que recebe rating e handleRatingChange como propriedades
function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  // Retorna uma lista de botões de estrela, variando de 1 a 5
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star} // Adiciona chave única para cada botão
      className={`p-2 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      {/* Ícone de estrela com preenchimento baseado no valor de rating */}
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

// Exporta o componente StarRatingComponent como padrão
export default StarRatingComponent;
