import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment, Button } from 'semantic-ui-react';
import { DragDropContext } from 'react-beautiful-dnd'
import Deployment from './containers/Deployment'
import Undeployed from './containers/Undeployed'

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
  }

  componentDidMount(){
    this.getUnits()
  }

  getUnits(){
    fetch(`http://localhost:3000/api/v1/units`)
    .then(r => r.json())
    .then(units => 
      this.setState({
        undeployed: units,
        enemies: units
      })
    )
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

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>  
      <Segment className="App">
        <button className="ready-button" onClick={this.handleClickDeploy}>DEPLOY</button>
        <Deployment 
          zones={this.state.zones} 
          units={[this.state.zone1, this.state.zone2, this.state.zone3, this.state.zone4, this.state.zone5]} 
          enemies={[this.state.eZone1, this.state.eZone2, this.state.eZone3, this.state.eZone4, this.state.eZone5]}/>
        <Undeployed units={this.state.undeployed}/>        
      </Segment>
      </DragDropContext>
    );
  }
}

export default App;
