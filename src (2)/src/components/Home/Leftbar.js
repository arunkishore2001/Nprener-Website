import React from "react";
import "./Home.css";
import AddIcon from "./images/add.svg";
import InformationIcon from "./images/information.svg";
import MessageIcon from "./images/message.svg";
import SettingsIcon from "./images/settings.svg";
import HomeIcon from "./images/home.svg";
import { useUserAuth } from "../../context/UserAuthContext";

const MenuItem = ({ menuName, iconUrl, onClickEvent, menuItemValue, currentPage }) => {
  const isActive = menuItemValue === currentPage;
  const menuItemClassName = isActive ? "MenuListMenuItem activeMenu" : "MenuListMenuItem";

  return (
    <li onClick={onClickEvent} className={menuItemClassName}>
      <img alt="" src={iconUrl} />
      <p>{menuName}</p>
    </li>
  );
};

const Leftbar = ({ currentPage, setCurrentPage }) => {
  const { logOut } = useUserAuth();

  const menuOptions = [
    { menuName: "Home", iconUrl: HomeIcon, menuValue: "post" },
    { menuName: "Message", iconUrl: MessageIcon, menuValue: "message" },
    // { menuName: "New Post", iconUrl: AddIcon, menuValue: "newPost" },
    { menuName: "Settings", iconUrl: SettingsIcon, menuValue: "settings" },
    {
      menuName: "How to use?",
      iconUrl: InformationIcon,
      menuValue: "howToUse",
    },
    { menuName: "Logout", iconUrl: InformationIcon, onClickEvent: logOut },
  ];

  const handleMenuItemClick = (menuValue, onClickEvent) => {
    if (onClickEvent) {
      onClickEvent();
    } else {
      setCurrentPage(menuValue);
    }
  };

  return (
    <div className="leftbar">
      <h1>Menu</h1>
      <div className="menu-list">
        <ul>
          {menuOptions.map((option, index) => (
            <MenuItem
              key={index}
              menuName={option.menuName}
              iconUrl={option.iconUrl}
              onClickEvent={() =>
                handleMenuItemClick(option.menuValue, option.onClickEvent)
              }
              menuItemValue={option.menuValue}
              currentPage={currentPage}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
