import React from "react";
import "./Home.css";
import AddIcon from "./images/add.svg";
import InformationIcon from "./images/information.svg";
import MessageIcon from "./images/message.svg";
import SettingsIcon from "./images/settings.svg";
import HomeIcon from "./images/home.svg";
import { Link } from "react-router-dom";

const Leftbar = () => {

    return (
        <div className="leftbar">
            <h1>Menu</h1>
            <div className="menu-list">
                <ul>
                    <li>
                        <img src={HomeIcon} />
                        <a>Home</a>
                    </li>
                    <li>
                      <img src={AddIcon} alt="Video Conference" />
                        <Link to="/">Message</Link>
                 </li>
                    
                 <li>
                      <img src={AddIcon} alt="Video Conference" />
                        <Link to="/video-conference">Video Conference</Link>
                 </li>
                    <li>
                        <img src={AddIcon} />
                        <a>New Post</a>
                    </li>
                    <li>
                        <img src={SettingsIcon} />
                        <a>Settings</a>
                    </li>
                    <li>
                        <img src={InformationIcon} />
                        <a>How to use?</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Leftbar;