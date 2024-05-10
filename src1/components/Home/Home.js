import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import Feeds from "./Feeds";
import NewPost from "./NewPost";
import Navbar from "./Navbar";
import Leftbar from "./Leftbar";
import ProfileSection from "./ProfileSection";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';


const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const userName = user.displayName;

  const [data, setData] = useState([]);

  return (
    <div className="full-screen-home">

      <div className="nav">
        {user.uid && <Navbar user={user}/>}
      </div>

      <div className="main-screen-home">

        {user.uid && <Leftbar />}

        <div className="post">

          {user.uid && <NewPost />}

        </div>

        {user.uid && <ProfileSection />}


      </div>
    </div>
  );
};

export default Home;