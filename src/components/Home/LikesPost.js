import React, { useEffect, useState } from "react";
import "./Home.css";
import LikeIcon from "./images/like.svg";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { arrayRemove, arrayUnion, doc,onSnapshot,updateDoc} from "firebase/firestore";


function LikesPost ({id,likes}) {

  const {user} = useUserAuth();
  const postsRef = doc(db,"posts",id);


  const handleLikes = () =>{
    if (likes?.includes(user.uid)) {
      updateDoc(postsRef, {
        likes: arrayRemove(user.uid),
      }).then(() => {
        console.log("unliked");
      }).catch((e) => {
        console.log(e);
      });
    }
    else {
      updateDoc(postsRef, {
        likes: arrayUnion(user.uid),
      }).then(() => {
        console.log("liked");
      }).catch((e) => {
        console.log(e);
      });
    }
    console.log(likes);
  }


  return (
          <button onClick={handleLikes} className={`bt-2 ${likes?.includes(user.uid) ? "active-like" : ""}`}>
            <img src={LikeIcon} />
            {likes.length}</button>
  );
};

export default LikesPost;