import React from 'react'

const Home = (props) => {
  return(
    <div className="home">
      <img className="logo" src="https://fontmeme.com/permalink/191016/4108d4ce9cb41baa8d09c11814e46551.png"/>
      <div className="silhouette">
        <img className="bg-img" src="https://i.imgur.com/w9HSItk.jpg"/>
      </div>
      <button className="big ready-button" onClick={() => {props.history.push('/game')}}>START</button>

    </div>
  )
}

export default Home
