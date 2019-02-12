import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Zone from '../components/Zone'


class Deployment extends React.Component {

    state = {
        result1:"",
        result2:"",
        result3:"",
        result4:"",
        result5:"",
    }

    handleClickDeploy = () => {
        this.props.generateEnemy()
        // let wins = {
        //   result1: this.totalPoints(this.props.units[0]) > this.totalPoints(this.props.enemies[0]) ? true : false,
        //   result2: this.totalPoints(this.props.units[1]) > this.totalPoints(this.props.enemies[1]) ? true : false,
        //   result3: this.totalPoints(this.props.units[2]) > this.totalPoints(this.props.enemies[2]) ? true : false,
        //   result4: this.totalPoints(this.props.units[3]) > this.totalPoints(this.props.enemies[3]) ? true : false,
        //   result5: this.totalPoints(this.props.units[4]) > this.totalPoints(this.props.enemies[4]) ? true : false,
        // }
        // this.setState(wins)
      }


    totalPoints = (team) => {
        debugger
        return (
        team.length > 0 ?
        team.map(unit => unit.points).reduce((a,b) => a+b)
        :
        0)
    }

    render(){
        return(

            <div className="map">
                 <button className="ready-button" onClick={this.handleClickDeploy}>DEPLOY</button>
                {this.props.zones.map((zone,index) => 
                    (<Zone 
                        name={zone} 
                        key={index+1} 
                        index={index}
                        units={this.props.units[index]}
                        enemies={this.props.enemies[index]}
                        result={this.props.results[index]}
                        deployed={this.props.deployed}
                        gamePhase={this.props.gamePhase}
                    />
                ))}
            </div>
        )
    }

    }

export default Deployment 