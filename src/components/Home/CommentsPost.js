import { uuidv4 } from '@firebase/util';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import DotIcon from "./images/dot.svg";
import "./Home.css";
import moment from 'moment';

export default function CommentsPost({commentId,userName,comment,user,commentPic,createdAt}) {
    
  return ( 

    <div className="comments">
        <div className="comment-content">
          <div className="view-post-avator">
            <img src={commentPic} />
          </div>
          <div className="post-content comments-right-content">
          <div className="bold-text view-post-details-company">
              <h5>{userName}</h5>
              <img src={DotIcon} />
              <p>{moment(createdAt?.toDate()).fromNow()}</p>
            </div>
            <div className="comment-content-section">
              <p>{comment}</p>
          </div>
          </div>
        </div>

      </div>
  )
}
