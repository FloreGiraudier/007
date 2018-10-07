import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.playerMag = 1
    this.iaMag = 1
  }
  play(choicePlayer) {
    let choiceIa = iaChoice()

    if (choicePlayer === 'shot') {
      if (this.playerMag === 0) choicePlayer = 'shot-blanck'
      else this.playerMag--
    }
    if (choiceIa === 'shot') {
      if (this.iaMag === 0) choiceIa = 'shot-blanck'
      else this.iaMag--
    }

    if (choicePlayer === 'reload') this.playerMag++
    if (choiceIa === 'reload') this.iaMag++

    this.setState({
      choicePlayer,
      choiceIa,
      winner: defineWinner(
        {
          choice: choicePlayer,
          mag: this.playerMag,
        },
        {
          choice: choiceIa,
          mag: this.iaMag,
        }
      ),
    })
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.play('shot')
          }}
        >
          Shot
        </button>

        <button
          onClick={() => {
            this.play('parry')
          }}
        >
          Parry
        </button>

        <button
          onClick={() => {
            this.play('reload')
          }}
        >
          Reload
        </button>

        <div>Choice player: {this.state.choicePlayer}</div>

        <div>Choice IA: {this.state.choiceIa}</div>

        <div>Winner: {this.state.winner}</div>
      </div>
    )
  }
}

const iaChoice = () => {
  // please enter probabilities
  // some of choices probabilities must be 1
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

const defineWinner = (player, ia) => {
  if (player.choice === 'shot') {
    if (ia.choice === 'shot' || ia.choice === 'parry') {
      return 'match null'
    }
    //ia.choice === 'reload'|| ia.choice === "shot-blanck"
    return 'YOU WIN'
  }

  if (player.choice === 'shot-blanck') {
    if (ia.choice === 'shot') {
      return 'YOU LOOSE :('
    }
    //ia.choice === 'reload'|| ia.choice === 'parry' || ia.choice === "shot-blanck"
    return 'match null'
  }

  if (player.choice === 'parry') {
    return 'match null'
  }

  //player.choice === 'reload'
  if (
    ia.choice === 'reload' ||
    ia.choice === 'parry' ||
    ia.choice === 'shot-blanck'
  ) {
    return 'match null'
  }
  //ia.choice === 'shot'
  return 'YOU LOOSE :('
}

export default App
