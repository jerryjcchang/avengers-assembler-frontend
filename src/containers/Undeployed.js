import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import Unit from '../components/Unit'

class Undeployed extends React.Component {

render(){
    return(
        <Droppable droppableId="undeployed" direction="horizontal">
       {(provided) => (
        <div className="undeployed"
        id="undeployed"
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
            <p className="undeployed-header">UNDEPLOYED UNITS</p>
            <div className="ud-container">
            {this.props.units.map((unit, index) => 
                <Unit 
                key={unit.id} 
                index={index} 
                zone="undeployed"
                unit={unit}
                div="unit-undeployed"
                ptsDiv="unit-points"
                onClick={() => {this.props.selectUnit(unit)}}
                />
                // console.log(unit)
                )}
            </div>
            {provided.placeholder}
        </div>
        )}
        </Droppable>
    )
}

}

export default Undeployed