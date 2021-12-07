import { CardItemDTO } from "./CardsDTO";

interface Card {
  cardNumber: string;
  name: string;
  amount: number;
  isLastCard: boolean;
  cardRaw?: CardItemDTO
}

export default Card;
