import { useEffect, useState } from "react";
import Die from "./componenets/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if(allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const holdDice = (id) => {
    setDice((prevDice) => prevDice.map(die => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      }
      return die
    }));
  };

  const rollDice = () => {
    if(!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          if (die.isHeld) {
            return die;
          }
          return generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }  
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleClick={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll" }
      </button>
    </main>
  );
};

export default App;
