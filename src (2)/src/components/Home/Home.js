import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import NewPost from "./NewPost";
import Navbar from "./Navbar";
import Leftbar from "./Leftbar";
import ProfileSection from "./ProfileSection";
import HowToUse from "../HowToUse/HowToUse";

const Home = () => {
  const { user } = useUserAuth();

  const [currentPage, setCurrentPage] = useState("post");

  return (
    <div className="full-screen-home">
      <div className="nav">{user.uid && <Navbar user={user}/>}</div>

      <div className="main-screen-home">
        {user.uid && <Leftbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}

        <div className="post">
          {user.uid && currentPage === "post" && <NewPost />}
          {user.uid && currentPage === "howToUse" && <HowToUse />}
        </div>

        {user.uid && <ProfileSection />}
      </div>
    </div>
  );
};

export default Home;
