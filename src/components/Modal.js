import React from 'react'
import '../stylesheets/modal.css'

class Modal extends React.Component{

    state={
        previousGame: this.props.result,
        body: "intro",
        wins: this.props.wins,
        losses: this.props.losses,
    }

    modalText = () => {
        let text
        if(this.state.previousGame === ""){
            switch(this.state.body) {
                case "intro":
                    text = <p className="text">
                            Four years have passed since the Decimation that wiped out half of all living creatures.
                            <br/><br/>The remainder of Earth's and the Galaxy's mightiest heroes have come together with a slim hope to reverse Thanos' actions and restore the universe.
                            <br/><br/>Discovering their plan to undo his triumph, Thanos has used the Infinity Gauntlet to resurrect the Avengers greatest foes to stop them.
                        </p>
                    break;
                case "instructions":
                    text = <p className="text instructions">
                            <b>INSTRUCTIONS</b><br/><br/>
                            Assemble the Avengers by <span className="green"><b>DRAG AND DROPPING</b></span> each unit into one of the Five Areas.<br/><br/>
                            Only <span className="green"><b>3 UNITS</b></span> may be deployed to each zone.<br/><br/>
                            Every unit will contribute <span className="green"><b>2-5 POINTS</b></span> to a battle. More powerful units contribute more points while weaker units contribute less.<br/><br/>
                            To win a round, you must <span className="green"><b>WIN 3 BATTLES</b></span>. To win a battle, you must have a higher point total than Thanos's units.<br/><br/>
                            Win <span className="green"><b>3 OF 5 ROUNDS</b></span> to defeat Thanos's Army and restore all life to the universe!
                        </p>
                    break;
                default:
                    text = null

            }
        }
        else {
            this.state.wins < 3 && this.state.losses < 3 ?
            text = <p className="modal-result">
                        You have <span class="red"><b>{this.state.previousGame}</b></span> this round of battles.<br/><br/>
                        Redeploy your units and prepare for the next wave of attack.<br/><br/>
                        Click the <span className="blue"><b>DEPLOY</b></span> button when ready.

                   </p>
            :
                text = <p className="modal-result">
                        {(this.state.wins === 3 ?
                            "You have successfully defeated Thanos and his army, and have restored all life to the galaxy!"
                            :
                            "You have been defeated by Thanos. Fortunately, you were able to obtain the Time Stone and are able to try again!"
                            )}
                       </p>

        }
        return text;
    }

    handleNextButton = () => {
        if(this.state.body === "intro"){
            this.setState({
                body: "instructions"
            })
        }
        else if(this.state.body === "instructions"){
            this.props.toggleModal()
            this.setState({
                body: "result"
            })
        }
    }

    handleNextRoundButton = () => {
        let button
        return (this.state.wins < 3 && this.state.losses < 3 ?
        button = <button className="button" onClick={this.props.newRound}>NEXT</button>
        :
        button = <button className="button" id="play-again" onClick={this.props.newGame}>PLAY AGAIN</button>)
    }

    render(){
        return(
            <div className="modal">
                <div className="modal-header"></div>
                <div className="modal-body">
                {this.modalText()}
                {this.state.previousGame === "" ?
                <button className="button" onClick={this.handleNextButton}>NEXT</button>
                :
                this.handleNextRoundButton()}
                </div>
            </div>
        )
    }
}

export default Modal
