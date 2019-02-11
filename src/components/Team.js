import React from 'react'
import Unit from './Unit'

class Team extends React.Component{

    state = {
        units: [1,2,3]
    }

    render(){
        return(
            <div className="team">
                {this.props.units.map((unit, index) => (
                <Unit 
                    team={this.props.team} 
                    key={index+1} 
                    index={index} 
                    zone={this.props.zone}
                    unit={unit}
                    div="unit-deployed"
                    />
                    ))}
            </div>
        )
    }

}

export default Team