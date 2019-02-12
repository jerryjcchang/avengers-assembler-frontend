import React from 'react'
import { Segment } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd'
import Zone from '../components/Zone'


class Deployment extends React.Component {



    render(){
        return(
            <div className="map">
                {this.props.zones.map((zone,index) => 
                    (<Zone 
                        name={zone} 
                        key={index+1} 
                        index={index}
                        units={this.props.units[index]}
                        enemies={this.props.enemies[index]}
                        deployed={this.props.deployed}
                    />
                ))}
            </div>
        )
    }

    }

export default Deployment 