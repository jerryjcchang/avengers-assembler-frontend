import React from 'react'
import { Segment } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd'
import Zone from '../components/Zone'


class Deployment extends React.Component {

    state={
        newyork:[],
        london:[],
        wakanda:[],
        sokovia:[],
        seoul:[]
    }

    render(){
        return(
            <Segment className="map">
                {this.props.zones.map((zone,index) => 
                    (<Zone 
                        name={zone} 
                        key={index+1} 
                        index={index}
                        units={this.props.units[index]}
                    />
                ))}
            </Segment>
        )
    }

    }

export default Deployment