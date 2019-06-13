import React from 'react'

class Player extends React.Component {
  render(){
    return (
      <div>
        <audio ref="audio_tag"
        src="https://medea-music.com/wp-content/uploads/2018/05/The-Avengers-Theme-Song.mp3"
        autoPlay
        />
      </div>
    )
  }
}

export default Player
