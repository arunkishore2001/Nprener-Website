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
{/*
  const fetchData = async () => {
    const response = db.collection("user");
    const mydata = await response.get();
    mydata.docs.array.forEach(element => {
      setData([...data, element.data()])
    });
  }
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [])

  const handleLogout = async () => {
    let dataList = [];
    try {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const FullData = docSnap.data();
        dataList.push(FullData);
      } else {
        console.log("No such document!");
      }
      setData(dataList);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(data);

*/}
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