import React from 'react'

const Home = (props) => {
  return(
    <div className="home">
      <img className="logo" src="https://fontmeme.com/temporary/cbf1ed2f47f7d3fc7737891621640f3f.png"/>
      <div className="silhouette">
        <img className="bg-img" src="https://i.imgur.com/w9HSItk.jpg"/>
      </div>
      <button className="big ready-button" onClick={() => {props.history.push('/game')}}>START</button>

    </div>
  )
}

export default Home
