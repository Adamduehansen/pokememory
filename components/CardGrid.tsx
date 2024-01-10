import { JSX } from "preact/jsx-runtime";
import { Card } from "@components/Card.tsx";
import * as types from "@lib/types.ts";

type Props = {
  cards: types.Card[];
  onCardSelected: (id: string) => void;
};

function createPokemonUrl(
  pokemonNumber: number,
  facing: types.SpriteFacing,
): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
    facing === "backside" ? "/back/" : "/"
  }${pokemonNumber}.png`;
}

export function CardGrid(
  { cards, onCardSelected }: Props,
): JSX.Element {
  function makeOnCardSelected(cardId: string) {
    return function () {
      onCardSelected(cardId);
    };
  }

  return (
    <div>
      {cards.map((card): JSX.Element => {
        return (
          <div>
            <Card
              flipped={card.isFlipped}
              pokemonImageUrl={createPokemonUrl(card.pokemonId, card.facing)}
              onClick={makeOnCardSelected(card.id)}
            />
          </div>
        );
      })}
    </div>
  );
}