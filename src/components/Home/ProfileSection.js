import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import ProfileIcon from "./images/Ellipse1.png";
import { useUserAuth } from "../../context/UserAuthContext";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';


function ProfileSection() {

    const { user } = useUserAuth();
    const navigate = useNavigate();

    const [myData, setmyData] = useState([]);

    const [following,setFollowing]= useState([]);;
    const [followers,setFollowers] = useState([]);

    useEffect(() => {

        let list = [];

        const q = doc(db, "user", user.uid);
        onSnapshot(q, (doc) => {
            list.push(doc.data());
            setmyData(list[0]);
        });

        userFollowing();
    }, []);

    function userFollowing() {
        const docRef = doc(db, "user", user.uid);
        onSnapshot(docRef, (snapshot) => {
          setFollowing(snapshot.data().following);
          setFollowers(snapshot.data().followers);
        });
    
      }


    const navToUpdateProfile = () => {
        navigate("/UploadPic");
    }

    return (
        <div className="profile-section">
            <div className="main-profile">
                <div onClick={navToUpdateProfile} className="avator-main">
                    <img src={user.photoURL} />
                </div>
                <div className="about-profile">
                    <h2>{myData.name}</h2>
                    <h3>{user.email}</h3>
                    <p>{myData.about}</p>
                </div>
            </div>
            <div className="center-line">
            </div>
            <div className="follow-section">
                <div className="following">
                    <div className="following-count">
                        <h5>Following</h5>
                        <p>{following.length}</p>
                    </div>
                </div>
                <div className="followers">
                    <div className="followers-count">
                        <h5>Followers</h5>
                        <p>{followers.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;