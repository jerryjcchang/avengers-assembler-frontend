import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment, Button } from 'semantic-ui-react';
import { DragDropContext } from 'react-beautiful-dnd'
import Deployment from './containers/Deployment'
import Undeployed from './containers/Undeployed'
import Modal from './components/Modal'

class App extends Component {

  state={
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
    zone1result: "",
    zone2result: "",
    zone3result: "",
    zone4result: "",
    zone5result: "",
    gamesWon: "",
    gamesLost: "",
    deployed: false,
    round: "",
    showModal: true,
  }

  componentDidMount(){
    this.getUnits()
  }

  getUnits(){
    fetch(`http://localhost:3000/api/v1/units`)
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
    const finish = destination.droppableId
    const unit = this.state[start].find(unit => unit.id === draggableId)

    if (!destination) {
        return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return
    }



    if(start === finish){
      const newZone = Array.from(this.state[start])
      newZone.splice(source.index, 1)
      newZone.splice(destination.index, 0, unit)
      // debugger
      this.setState({
        [finish]: newZone
      })
      return
    }

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

  handleClickDeploy = () => {
    this.generateEnemy()
    setTimeout(this.compareTotal(),2000)
  }

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
    })

    this.setState(this.compareTotal())
  }

  compareTotal = () => {
    let wins = {
      zone1result: this.totalPoints('zone1') > this.totalPoints('eZone1') ? true : false,
      zone2result: this.totalPoints('zone2') > this.totalPoints('eZone2') ? true : false,
      zone3result: this.totalPoints('zone3') > this.totalPoints('eZone3') ? true : false,
      zone4result: this.totalPoints('zone4') > this.totalPoints('eZone4') ? true : false,
      zone5result: this.totalPoints('zone5') > this.totalPoints('eZone5') ? true : false,
    }
    return wins
  }

  totalPoints = (team) => {
    debugger
    return (
    this.state[team].length > 0 ?
    this.state[team].map(unit => unit.points).reduce((a,b) => a+b)
    :
    0)
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

  handleWin = () => {
    let wins = this.state.gamesWon
    this.setState({
      gamesWon: wins++
    })
  }

  handleLoss = () => {
    let losses = this.state.gamesLost
    this.setState({
      gamesLost: losses++
    })
  }

  newRound = () => {
    let round = this.state.round
    this.setState({
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
      deployed: false,
      round: round++,
    })
  }

  render() {
    return (
      <div className="App">
      <DragDropContext
        onDragEnd={this.onDragEnd}>  
      <div>
        <button className="ready-button" onClick={this.handleClickDeploy}>DEPLOY</button>
        <Deployment 
          zones={this.state.zones} 
          units={[this.state.zone1, this.state.zone2, this.state.zone3, this.state.zone4, this.state.zone5]} 
          enemies={[this.state.eZone1, this.state.eZone2, this.state.eZone3, this.state.eZone4, this.state.eZone5]}
          onWin={this.handleWin}
          onLose={this.handleLoss}
          deployed={this.state.deployed}
          compareTotal={this.compareTotal}
          />
        <Undeployed units={this.state.undeployed}/>        
      </div>
      </DragDropContext>
      {this.state.showModal ? <div className="page-mask"></div> : null}
      {this.state.showModal ? <Modal toggleModal={this.handleModal}/> : null}
      </div>
    );
  }

}

export default App;
