import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            const data = play('shot')
            this.setState({
              playerChoice: 'shot',
              iaChoice: data.iaChoice,
              winner: data.winner,
            })
          }}
        >
          Shot
        </button>

        <button
          onClick={() => {
            const data = play('parry')
            this.setState({
              playerChoice: 'parry',
              iaChoice: data.iaChoice,
              winner: data.winner,
            })
          }}
        >
          Parry
        </button>

        <button
          onClick={() => {
            const data = play('reload')
            this.setState({
              playerChoice: 'reload',
              iaChoice: data.iaChoice,
              winner: data.winner,
            })
          }}
        >
          Reload
        </button>

        <div>Choice player: {this.state.playerChoice}</div>

        <div>Choice IA: {this.state.iaChoice}</div>

        <div>Winner: {this.state.winner}</div>
      </div>
    )
  }
}

const iaChoice = () => {
  const choices = [
    {
      name: 'shot',
      probability: 1 / 3,
    },
    {
      name: 'parry',
      probability: 1 / 3,
    },
    {
      name: 'reload',
      probability: 1 / 3,
    },
  ]
  const random = Math.random()
  const ranges = defineRanges(choices)

  const rangeIndex = ranges.findIndex((range) => {
    return random > range.start && random < range.end
  })
  return choices[rangeIndex].name
}

const defineRanges = (choices) => {
  let start = 0
  let end = 0
  return choices.map((element) => {
    start = end
    end = start + element.probability
    return { start, end }
  })
}

const play = (choicePlayer1) => {
  const choicePlayer2 = iaChoice()
  return {
    iaChoice: choicePlayer2,
    winner: showWinner(choicePlayer1, choicePlayer2),
  }
}

const showWinner = (choicePlayer1, choicePlayer2) => {
  if (choicePlayer1 === 'shot') {
    if (choicePlayer2 === 'shot' || choicePlayer2 === 'parry') {
      return 'match null'
    }
    //choicePlayer2 === 'reload'
    return 'YOU WIN'
  }

  if (choicePlayer1 === 'parry') {
    return 'match null'
  }

  //choicePlayer1 === 'reload'
  if (choicePlayer2 === 'reload' || choicePlayer2 === 'parry') {
    return 'match null'
  }
  //choicePlayer2 === 'shot'
  return 'YOU LOOSE :('
}

export default App
