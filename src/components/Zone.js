import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import '../stylesheets/zone.css'
import Team from '../components/Team'

class Zone extends React.Component {

   

    parseName(name){
        let t = this
        // debugger
        let split = name.split("-")
        let capitalized = split.map(word => word[0].toUpperCase()+word.slice(1))
        return capitalized.join(" ")
    }

    totalPoints = () => {
        return (
        this.props.units.length > 0 ?
        this.props.units.map(unit => unit.points).reduce((a,b) => a+b)
        :
        0)
    }

    render(){
        // debugger
        return(
            <Droppable droppableId={`zone${this.props.index+1}`} direction="horizontal">
            {(provided,snapshot) => (
            <div className="zone" 
            id={this.props.name}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
            >
                <div className="zone-header">{`${this.parseName(this.props.name)}     (${this.totalPoints()} points)`}</div>
                <p className="team-header">Avengers</p>
                <Team team="hero"  zone={this.props.index+1} units={this.props.units}/>
                {/* <p className="team-header">Thanos Army</p>
                <Team team="thanos"/> */}
                {provided.placeholder}
            </div>
            )}
            </Droppable>
        )
        debugger
    }

}

export default Zone