import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import CommentsPost from "./CommentsPost";
import FollowUpdate from "./FollowUpdate";
import VideoPlayer from "./VideoPlayer";
import CommentIcon from "./images/comment.svg";
import MenuIcon from "./images/menu.svg";
import ShareIcon from "./images/share.svg";
import LikesPost from "./LikesPost";
import { Icon } from '@iconify/react';

function Feeds({ id, name, email, content, time, photoURL, likes, uid, domain, imageURLs }) {
  const { user } = useUserAuth();
  const commentRef = doc(db, "posts", id);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentActive, setCommentActive] = useState(false);

  const [following, setFollowing] = useState();
 
  const [videoURL, setVideoURL] = useState(""); // State for video URL
  const [location, setLocation] = useState(""); // State for location

  const [shareLink, setShareLink] = useState(""); // State to store the shareable link

  function deletePost(){
    deleteDoc(doc(db, "posts", id));
  }

  const data = [
    { id: 0, label: 'Delete', ico: 'ep:delete ', onClick: deletePost },
  ];

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);

  const toggleDropdown = () => setOpen(!isOpen);

  // Function to generate the shareable link
  const generateShareLink = () => {
    const shareableLink = `${window.location.origin}/post/${id}`; // Modify the URL format as needed
    setShareLink(shareableLink);
  };

  useEffect(() => {
    const docRef = doc(db, "posts", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments || "");
      setVideoURL(snapshot.data().videoURL || ""); // Set video URL if available
      setLocation(snapshot.data().location || ""); // Set the location
    });

    userFollowing();
  }, [id, db]);

  useEffect(() => {
    if (imageURLs.length > 1) {
      setEnableMove(true);
    }
  }, [imageURLs]);

  function userFollowing() {
    const docRef = doc(db, "user", user.uid);
    onSnapshot(docRef, (snapshot) => {
      setFollowing(snapshot.data().following);
    });
  }

  const [enableMove, setEnableMove] = useState(false);

  const handleAddComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: user.uid,
          userName: user.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
          commentPic: user.photoURL,
        })
      }).then(() => {
        setComment("");
      });
    }
  }

  const openGoogleMaps = () => {
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
      window.open(mapsURL, "_blank");
    }
  };

  const iconData = [
    { id: 0, label: 'Information', ico: 'iwwa:info' },
    { id: 1, label: 'Idea', ico: 'icons8:idea' },
    { id: 2, label: 'Gauget', ico: 'carbon:machine-learning' },
  ];

  const mainIcon = iconData.find((item) => item.label === domain)?.ico

  return (
    <div className="view-post">
      <div className="profile-info-post">
        <div className="left-profile-info-post">
          <div className="view-post-avator">
            <img src={photoURL} alt="Profile" />
          </div>
          <div className="view-post-details">
            <div className="view-post-details-name">
              <h5>{name}</h5>
            </div>
            <div className="view-post-details-company">
              <h5>{email}</h5>
              <p>{time}</p>
            </div>
          </div>
        </div>

        <div className={`bt-2 domain`}>
          <Icon icon={mainIcon}></Icon>
          {domain && <p className="domain-text">{domain}</p>}
        </div>

        <div className="right-profile-info-post">
          {user.uid !== uid && (
            <FollowUpdate followingUid={uid} following={following} />
          )}
        </div>

          <div className="dropdown">
              <div className="dropdown-header bt-2" onClick={toggleDropdown}>
                  <img src={MenuIcon} alt="Profile" />
              </div>
              <div className={`dropdown-body ${isOpen && 'open'}`}>
              {user.uid === uid && 
                items.map((item) => (
                  <div className="dropdown-item bt-2" onClick={(e) => { toggleDropdown(); item.onClick() }} id={item.id} key={item.id}>
                    <Icon icon={item.ico}></Icon>
                    {item.label}
                  </div>
                ))
              }
              </div>
            </div>

      </div>

      <div className="post-content">
        <div className="post-content-center">
          <h5>{content}</h5>
        </div>
      </div>

     {/* Display the location with a link to open Google Maps */}
     {location && (
        <div className="location-info">
          <p className="location-text">
            Location:{" "}
            <a
              href="#"
              onClick={openGoogleMaps}
            >
              {location}
            </a>
          </p>
        </div>
      )}

      {/* Render images */}
      {imageURLs.length > 0 && (
        <div className="image-container">
          {imageURLs.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: '50%' }} // Set the image width to 50%
            />
          ))}
        </div>
      )}

      {/* Video Player */}
      {videoURL && (
        <div className="video-container">
          <VideoPlayer videoURL={videoURL} />
        </div>
      )}

      <div className="features-post">
        <div className="left-feature-post-btns left-bottom-newpost">
        <LikesPost id={id} likes={likes} />

          <button
            onClick={() => setCommentActive(true)}
            className="bt-2"
          >
            <img src={CommentIcon}/>
            Comment
          </button>
          <button onClick={generateShareLink} className="bt-2">
            <img src={ShareIcon}/> Share</button>
        </div>
        <div className="right-feature-post-btns">
          <button onClick={() => setCommentActive(true)} className="bt-3">
            <img src={CommentIcon}/>
            {`${comments?.length ? comments.length : "0"}`}
          </button>
        </div>
      </div>

       {/* Display the shareable link */}
       {shareLink && (
        <div className="share-link">
          <p>Share this post:</p>
          <input
            type="text"
            value={shareLink}
            readOnly
          />
        </div>
      )}

      {commentActive && (
        <div className="comment-section">
          <div className="right-comment">
            <div className="view-post-avator">
              <img src={user.photoURL} alt="Profile"/>
            </div>
            <input
              className="comment-input"
              placeholder="Comment here..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyUp={(e) => {
                handleAddComment(e);
              }}
            />
          </div>
          <div className="left-comment">
            <p
              onClick={() => {
                setCommentActive(false);
              }}
            >
              Close Comments
            </p>
          </div>
        </div>
      )}

      {commentActive && comments.length > 1 &&
        comments?.map(({ commentId, userName, comment, user, commentPic, createdAt }) => (
          <CommentsPost
            key={commentId}
            user={user}
            userName={userName}
            comment={comment}
            commentPic={commentPic}
            createdAt={createdAt}
          />
        ))}
    </div>
  );
}

export default Feeds;
