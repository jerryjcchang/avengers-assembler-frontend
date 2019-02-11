import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment } from 'semantic-ui-react';
import { DragDropContext } from 'react-beautiful-dnd'
import Deployment from './containers/Deployment'
import Undeployed from './containers/Undeployed'

class App extends Component {

  state={
    zones: ["new-york", "london", "wakanda", "sokovia", "seoul"],
    undeployed: [],
    zone1: [],
    zone2: [],
    zone3: [],
    zone4: [],
    zone5: [],
  }

  componentDidMount(){
    this.getUnits()
  }

  getUnits(){
    fetch(`http://localhost:3000/api/v1/units`)
    .then(r => r.json())
    .then(units => this.setState({
      undeployed: units
    }))
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
    let t = this
    // debugger
    
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>  
      <Segment className="App">
        <Deployment zones={this.state.zones} units={[this.state.zone1, this.state.zone2, this.state.zone3, this.state.zone4, this.state.zone5]}/>
        <Undeployed units={this.state.undeployed}/>        
      </Segment>
      </DragDropContext>
    );
  }
}

export default App;
