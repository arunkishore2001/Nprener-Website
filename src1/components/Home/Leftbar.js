import React from "react";
import "./Home.css";
import AddIcon from "./images/add.svg";
import InformationIcon from "./images/information.svg";
import MessageIcon from "./images/message.svg";
import SettingsIcon from "./images/settings.svg";
import HomeIcon from "./images/home.svg";
import { useUserAuth } from "../../context/UserAuthContext";

const MenuItem = ({ menuName, iconUrl, onClickEvent }) => {
  return (
    <li onClick={onClickEvent} className="MenuListMenuItem">
      <img alt="" src={iconUrl} />
      <p>{menuName}</p>
    </li>
  );
};

const Leftbar = () => {
  const { logOut } = useUserAuth();

  return (
    <div className="leftbar">
      <h1>Menu</h1>
      <div className="menu-list">
        <ul>
          <MenuItem menuName="Home" iconUrl={HomeIcon} onClickEvent={() => {}} />
          <MenuItem menuName="Message" iconUrl={MessageIcon} onClickEvent={() => {}} />
          <MenuItem menuName="New Post" iconUrl={AddIcon} onClickEvent={() => {}} />
          <MenuItem menuName="Settings" iconUrl={SettingsIcon} onClickEvent={() => {}} />
          <MenuItem menuName="How to use?" iconUrl={InformationIcon} onClickEvent={() => {}} />
          <MenuItem menuName="Logout" iconUrl={InformationIcon} onClickEvent={logOut} />
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
