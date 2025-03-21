import { CardType } from "@/apps/PokeMemory/pokememory.utils";
import Card from "@/apps/PokeMemory/Card";
import { useGameContext } from "@/apps/PokeMemory/Context";

interface Props {
  cards: CardType[],
  firstChoice: CardType | null,
  secondChoice: CardType | null,
  interaction: boolean,
  handleChoice: (card: CardType) => void
}

const CardGrid = () => {
  const { cards, firstChoice, secondChoice, interaction, handleChoice }: Props = useGameContext();

  return (
    <div className="w-full p-2">
      <div className="flex flex-wrap -mx-1">
        {cards.map(card => {
          return (
            <div key={card.id} className="w-1/4 sm:w-1/6 lg:w-1/12 p-1">
              <Card
                card={card}
                flipped={card === firstChoice || card === secondChoice || card.matched}
                interaction={interaction}
                handleChoice={handleChoice} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default CardGrid