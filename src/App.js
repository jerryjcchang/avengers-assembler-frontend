import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd'
import Deployment from './containers/Deployment'
import Undeployed from './containers/Undeployed'
import Modal from './components/Modal'
import {Route} from 'react-router-dom'
import Player from './components/AudioPlayer'

const URL = 'http://avengers-assembler-backend.herokuapp.com/api/v1'
// 'https://avengers-assembler-backend.herokuapp.com/api/v1'

class App extends Component {

  state={
    gamePhase: "start",
    zones: ["new-york", "london", "wakanda", "sokovia", "seoul"],
    undeployed: [],
    enemies: [],
    zone1: [],
    zone2: [],
    zone3: [],
    zone4: [],
    zone5: [],
    eZone1: [],
    eZone2: [],
    eZone3: [],
    eZone4: [],
    eZone5: [],
    result1: "",
    result2: "",
    result3: "",
    result4: "",
    result5: "",
    gamesWon: 0,
    gamesLost: 0,
    deployed: false,
    round: 1,
    showModal: true,
    previousGame: "",
    selectedUnit: {},
    playAudio: true,
    keyIndex: 0,
  }

  componentDidMount(){
    this.getUnits()
    this.initKonami()
  }

  initKonami = () => {
    document.body.addEventListener("keydown", this.handleKonami)
  }

  handleKonami = (e) => {
    console.log(e.key)
    const { keyIndex } = this.state
    const keys = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ]

    const key = e.key

    if(keys[keyIndex] === key){
      let newKeyIndex = keyIndex+1
    this.setState(
      {keyIndex: newKeyIndex},
      () => {console.log(this.state.keyIndex)})
    }

    if(this.state.keyIndex === keys.length){
      this.unlockHero()
      this.setState({
        keyIndex: 0,
      })
    }
  }

  unlockHero = () => {
    fetch(URL+"/unlock")
    .then(r => r.json())
    .then(unit => this.addHero(unit))
  }

  addHero = (hero) => {
    if(!this.state.undeployed.includes(hero)){
      this.setState({
        undeployed: [...this.state.undeployed, hero]
      })
    }
  }

  getUnits = () => {
    fetch(URL+"/units")
    .then(r => r.json())
    .then(units =>
      this.setState({
        undeployed: units.heroes,
        enemies: units.enemies
      })
    )
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  onDragEnd = result => {
    // place unit into dropped zone
    // change state
    const {destination,source,draggableId} = result
    const start = source.droppableId
    const unit = this.state[start].find(unit => unit.id === draggableId)
    // let t = this
    // debugger
    if (!destination || this.state[destination.droppableId].length === 3) {
        return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return
    }



    if(start === destination.droppableId){
      let t = this
      let finish = destination.droppableId
      let newZone = Array.from(this.state[start])
      newZone.splice(source.index, 1)
      newZone.splice(destination.index, 0, unit)
      this.setState({
        [finish]: newZone
      })
      return
    }

    const finish = destination.droppableId
    const startZone = Array.from(this.state[start])
    startZone.splice(source.index, 1)
    const endZone = Array.from(this.state[finish])
    endZone.splice(destination.index, 0, unit)

    const newState = {
      [start]: startZone,
      [finish]: endZone
    }

    this.setState(newState)
  }

  // handleClickDeploy = () => {
  //   this.generateEnemy()
  //   // setTimeout(this.compareTotal(),2000)
  // }

  generateEnemy = () => {
    const combinations = [
      [2,2,3,2,3],
      [2,3,3,2,2],
      [3,3,2,2,2],
      [3,2,3,2,3],
      [3,2,2,3,2],
    ]
    const randomIndex = Math.ceil(Math.random() *4)
    let selectedCombo = combinations[randomIndex]

    let shuffled = this.shuffle([...this.state.enemies])

    this.setState({
      eZone1: shuffled.splice(0,[selectedCombo[0]]),
      eZone2: shuffled.splice(0,[selectedCombo[1]]),
      eZone3: shuffled.splice(0,[selectedCombo[2]]),
      eZone4: shuffled.splice(0,[selectedCombo[3]]),
      eZone5: shuffled.splice(0,[selectedCombo[4]]),
      },
        () => {this.setState(
          this.compareTotal(),
          () => {this.handleShowResult()}
          )
      }
    )


  }

  compareTotal = () => {
    let wins = {
      result1: this.totalPoints('zone1') > this.totalPoints('eZone1') ? true : false,
      result2: this.totalPoints('zone2') > this.totalPoints('eZone2') ? true : false,
      result3: this.totalPoints('zone3') > this.totalPoints('eZone3') ? true : false,
      result4: this.totalPoints('zone4') > this.totalPoints('eZone4') ? true : false,
      result5: this.totalPoints('zone5') > this.totalPoints('eZone5') ? true : false,
    }
    return wins
  }

  totalPoints = (team) => {
    // debugger
    return (
    this.state[team].length > 0 ?
    this.state[team].map(unit => unit.points).reduce((a,b) => a+b)
    :
    0)
}

  handleShowResult = () => {
    setTimeout(
      () => {this.setState({
        gamePhase: "result"
      },
      this.handleWinLoss)}, 3000)
  }

  shuffle = (arr) => {
    let currentIndex = arr.length
    let tempValue, randomIndex

    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex)
      --currentIndex

      tempValue = arr[currentIndex]
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = tempValue
    }

    return arr
  }

  handleWinLoss = () => {
    let results = [this.state.result1, this.state.result2, this.state.result3, this.state.result4, this.state.result5]
    let wins = results.filter(result => result === true)
    if(wins.length >= 3){
      setTimeout(this.handleWin,1000)
    }
    else {
      setTimeout(this.handleLoss,1000)
    }
  }

  handleWin = () => {
    let wins = this.state.gamesWon
    let round = this.state.round
    this.setState({
      gamesWon: wins+1,
      showModal: true,
      previousGame: "WON"
    })
  }

  handleLoss = () => {
    let losses = this.state.gamesLost
    let round = this.state.round
    this.setState({
      gamesLost: losses+1,
      showModal: true,
      previousGame: "LOST"
    })
  }

  handleNewRound = () => {
    let round = this.state.round
    this.setState({
      gamePhase: "start",
      eZone1: [],
      eZone2: [],
      eZone3: [],
      eZone4: [],
      eZone5: [],
      result1: "",
      result2: "",
      result3: "",
      result4: "",
      result5: "",
      deployed: false,
      round: round+1,
      showModal: false,
    })
    // this.getUnits()
  }

  handleNewGame = () => {
    this.setState({
      gamePhase: "start",
      undeployed: [],
      enemies: [],
      zone1: [],
      zone2: [],
      zone3: [],
      zone4: [],
      zone5: [],
      eZone1: [],
      eZone2: [],
      eZone3: [],
      eZone4: [],
      eZone5: [],
      result1: "",
      result2: "",
      result3: "",
      result4: "",
      result5: "",
      gamesWon: 0,
      gamesLost: 0,
      deployed: false,
      round: 1,
      showModal: false,
      previousGame: "",
      selectedUnit: {},
    })
    this.getUnits()
  }

  handleSelectUnit = (unit) => {
    // this.setState({
    //   showModal: true,
    //   selectedUnit: unit,
    // })
    console.log("attempting to select unit", unit.name)
  }

  handleToggleAudio = () => {
    this.setState({
      playAudio: !this.state.playAudio
    })
  }

  stopPlayAudio = () => {
    this.state.playAudio ? this.stopAudio() : this.playAudio()
  }

  stopAudio = () => {
    document.getElementById('audio-player').pause()
  }

  playAudio = () => {
    document.getElementById('audio-player').play()
  }

  render() {
    return (
      <div className="App">
        <Player paused={this.state.playAudio} />
        {this.state.showModal ?
        <Modal
          toggleModal={this.handleModal}
          result={this.state.previousGame}
          newRound={this.handleNewRound}
          newGame={this.handleNewGame}
          wins={this.state.gamesWon}
          losses={this.state.gamesLost}
        />
          :
        null}
        {this.state.showModal ?
        <div className="page-mask"></div> : null}
        <DragDropContext
          onDragEnd={this.onDragEnd}>
          <div>
            <Deployment
              audio={this.state.playAudio}
              toggleAudio={this.handleToggleAudio}
              zones={this.state.zones}
              units={[this.state.zone1, this.state.zone2, this.state.zone3, this.state.zone4, this.state.zone5]}
              generateEnemy={this.generateEnemy}
              enemies={[this.state.eZone1, this.state.eZone2, this.state.eZone3, this.state.eZone4, this.state.eZone5]}
              results={[this.state.result1, this.state.result2, this.state.result3, this.state.result4, this.state.result5]}
              onWin={this.handleWin}
              onLose={this.handleLoss}
              deployed={this.state.deployed}
              gamePhase={this.state.gamePhase}
              round={this.state.round}
              // compareTotal={this.compareTotal}
              />
            <Undeployed units={this.state.undeployed} selectUnit={this.handleSelectUnit}/>
          </div>
        </DragDropContext>
      </div>
    );
  }

}

export default App;
