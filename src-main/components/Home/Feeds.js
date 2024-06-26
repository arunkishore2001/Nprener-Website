import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import CommentsPost from "./CommentsPost";
import FollowUpdate from "./FollowUpdate";
import VideoPlayer from "./VideoPlayer";
import SimpleImageSlider from "./SimpleImageSlider"; // Import your image slider component
import DotIcon from "./images/dot.svg";
import CommentIcon from "./images/comment.svg";
import ProfileIcon from "./images/Ellipse1.png";
import LikeIcon from "./images/like.svg";
import MenuIcon from "./images/menu.svg";
import ShareIcon from "./images/share.svg";
import LikesPost from "./LikesPost";
import ReadMoreReact from "./ReadMoreReact";
import { Icon } from '@iconify/react';
import { addDoc, collection } from 'firebase/firestore';

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

  // Function to generate the shareable link
  const generateShareLink = () => {
    const shareableLink = `${window.location.origin}/post/${id}`; // Modify the URL format as needed
    setShareLink(shareableLink);
  };


  useEffect(() => {
    const docRef = doc(db, "posts", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
      setVideoURL(snapshot.data().videoURL || ""); // Set video URL if available
      setLocation(snapshot.data().location || ""); // Set the location
    });

    userFollowing();
  }, []);

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

  const handleCreatePost = () => {
    const postId = uuidv4(); // Generate a unique post ID
    const newPostData = {
      // Include the unique post ID along with other post data
      postId: postId,
      name: name,
      email: email,
      content: content,
      time: time,
      photoURL: photoURL,
      likes: likes,
      uid: uid,
      domain: domain,
      imageURLs: imageURLs,
      // ...
    };
  
    // Log the unique post ID to the console
    console.log("New Post ID:", postId);
  
    // Add the new post to the database
    addDoc(collection(db, "posts"), newPostData)
      .then(() => {
        // Post added successfully
      })
      .catch((error) => {
        // Handle errors
      });
  }
  

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
          {domain && <p className="domain-text">{domain}</p>}
        </div>

        <div className="right-profile-info-post">
          {user.uid !== uid && (
            <FollowUpdate followingUid={uid} following={following} />
          )}
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
          <button
            onClick={() => setCommentActive(true)}
            className="bt-2"
          >
            Comment
          </button>
          <button onClick={generateShareLink} className="bt-2">Share</button>
        </div>
        <div className="right-feature-post-btns">
          <button onClick={() => setCommentActive(true)} className="bt-3">
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
              <img src={user.photoURL} alt="Profile" />
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

      {commentActive &&
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
