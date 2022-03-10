import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import discord_img from "./images/discord.png";
import twitter_img from "./images/twitter.png";
import square_img from "./images/vector-logo.png";
import xona from "./images/xona.png";
import funeral from "./images/funeral.png";
import ability from "./images/ability.png";
import mace from "./images/maceGoool.png";
import tomb from "./images/tombTomb.png";
import menu_img    from "./images/menu.png";
import gallery from "./images/gallery.png";
import ConnectWallet from "./components/ConnectWallet";
import { initializeEthers, mint } from "./functions/ethersFunctions";
import { Context } from "./Store";


const menuToggle = () => {
    const navlinks = document.querySelector('.nav-links')
    navlinks?.classList.toggle('mobile-menu')
}
function App() {

  const [active, setActive] = React.useState("Public");
  const [state, dispatch]:any = useContext(Context);
  
  useEffect(() => {
    initializeEthers(dispatch);
  },[]);

  return (
    <Router>
    <div className="App">
           <nav className="navbar">
                <h1 className="logo"><a>The Death of Me</a></h1>
                <ul className="nav-links">
                    <li><Link to="/"><ConnectWallet/></Link></li>
                </ul>
                <img src={menu_img} alt="" className="menu-btn" onClick={menuToggle}/>
            </nav>
            <header>
            <div>
            <section className="drops">
            <h1>Collect a POAP</h1>
            <div className="title">
            </div>
            <div className="row">
                <div className="col">
                <div className="mint-text">
                    <h3>Show your support for the podcast and help us learn more about our community.</h3>
                    <h3>Each POAP is 2 FTM</h3>
                    {
                        state.isMinting ?
                        <button disabled={state.isMinting}>...pending</button> :
                        <button onClick={() => mint(dispatch)}>Mint</button>
                    }
                </div>
                </div>
                <div className="col">
                <img className="vector-logo"src={square_img} alt=""/>
                </div>
            </div>
            </section>

            </div>
            </header>

            <section className="info">
            <div className="title">
                <h1>What is a POAP?</h1>
                <h4>POAP stands for <i>Proof Of Attendance Protocol</i>. This is a technology developped to allow people to keep tracks of events they have prviously attended. We view this as an important element within the future of Web3.</h4><h3>Collect them all!</h3>
            </div>
            </section>
            <section className="team">
            <h1>The Team</h1>
            <div className="row">
                <div className="col">
                <img className="team-member" src={tomb} alt=""/>
                <h3>Tombheads</h3>
                </div>
                <div className="col">
                <img className="team-member" src={funeral} alt=""/>
                <h3>Funeral</h3>
                </div>
            </div>
            <div className="rotating-hosts">
            <h1>Rotating Hosts</h1>
            <div className="row">
                <div className="col">
                <img className="team-member" src={xona} alt=""/>
                <h3>Xona</h3>
                </div>
                <div className="col">
                <img className="team-member" src={mace} alt=""/>
                <h3>Mace Papa</h3>
                </div>
                <div className="col">
                <img className="team-member" src={ability} alt=""/>
                <h3>Ability</h3>
                </div>
            </div>
            </div>
            </section>
            <section className="info">
            <div className="title">
                <h1>The Vision</h1>
                <h4>Join us as we highlight creators in the space and showcase work from the community. We will host multiple segments including Midnight Snacks where Xona and Funeral will create pieces based on suggestios from the audience.</h4>
            </div>
            </section>
            <section>
            <div className="podcasts">
                <Switch>
                    <Route exact path="/">
                    <div className="card">
                    <h2><i>Latest Episode</i></h2>
                    <h1>Episode 1</h1>
                    <div className="bottom-card">
                    <p><i>Featuring: Pink Flamingo Social Club</i></p>
                    <button>Coming Soon</button>
                    </div>
                    </div>
                    </Route>
                </Switch>
            </div>
            </section>

            <section className="footer">
                <div className="social-links">
                    <a href="https://twitter.com/tombheads"><img src={twitter_img} alt=""/></a>
                    <a href="https://discord.com/eBHpwv9yGW"><img src={discord_img} alt=""/></a>
                    <a href="https://fantomgallery.com"><img src={gallery} alt=""/></a>
                  </div>
            </section>
        </div>
        </Router>
    );
}

export default App;
