import React from 'react'
import '../stylesheets/modal.css'

class Modal extends React.Component{

    state={
        body: "intro"
    }

    modalText = () => {
        let text
        switch(this.state.body) {
            case "intro":
                text = <p className="text">
                        Four years have passed since the Decimation that wiped out half of all living creatures. 
                        <br/><br/>The remainder of Earth's and the Galaxy's mightiest heroes have come together with a slim hope of reversing Thanos' actions and bring everyone back to life. 
                        <br/><br/>Discovering their plan to undo his great achievement, Thanos has used the Infinity Gauntlet to resurrect the Avengers greatest foes to stop them.
                       </p>
                break;
            case "instructions":
                text = <p className="text instructions">
                        <b>INSTRUCTIONS</b><br/><br/>
                        Assemble the Avengers by <b>DRAG AND DROPPING</b> each unit into one of the Five Areas.<br/><br/>
                        Only <b>3 UNITS</b> may be deployed to each zone.<br/><br/>
                        Every unit will contribute <b>2-5 POINTS</b> to a battle. More powerful units contribute more points while weaker units contribute less.<br/><br/>
                        To win a round, you must <b>WIN 3 BATTLES</b>. To win a battle, you must have a higher point total than Thanos's units.<br/><br/>
                        Win <b>3 OF 5 ROUNDS</b> to defeat Thanos's Army and restore all life to the universe!
                       </p>
                break;
            default:
                text = ""
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
                body: ""
            })
        }
    }

    render(){
        return(
            <div className="modal">
                <div className="modal-header"></div>
                {this.modalText()}
                <button className="button" onClick={this.handleNextButton}>NEXT</button>
            </div>
        )
    }
}

export default Modal