import React from 'react'
import Unit from './Unit'

class Team extends React.Component{

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
                    ptsDiv="unit-deployed-points"
                    />
                    ))}
            </div>
        )
    }

}

export default Team