import React from "react";
import "./Home.css";
import AddIcon from "./images/add.svg";
import NotificationIcon from "./images/notification.svg";
import InformationIcon from "./images/information.svg";
import ProfileIcon from "./images/Ellipse1.png";
import logo from "./images/logo.png"
import { useState } from "react";
import Search from "./Search";

function Navbar ({user}) {

    return (
        <div className="main-nav">
            <div className="home-logo">
                <img src= {logo} />
            </div>

            <Search/>

            <div className="newpost">
                <button className="bt-1" type="submit">
                    <img src={AddIcon} />
                    New Post</button>
            </div>
            <div className="icons">
                <img src={NotificationIcon} alt="nortification" />
                <img src={InformationIcon} alt="info" />
                <div className="avator">
                    <img src={user.photoURL} alt="profile" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;