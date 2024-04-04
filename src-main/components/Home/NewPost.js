import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import './Home.css';
import PictureIcon from './images/picture.svg';
import UploadIcon from './images/upload.svg';
import VideoIcon from './images/video.svg';
import { ReactComponent as LoadIcon } from './images/loading.svg';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import Feeds from './Feeds';
import moment from 'moment/moment';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Iconify from '@iconify/iconify';
import { Icon } from '@iconify/react';




const NewPost = () => {
  const initialValues = {
    id: '',
    name: '',
    email: '',
    content: '',
    imgUrl: '',
    time: '',
    likes: '',
    location: '', // Add a location field
  };

  const [PostValues, setPostValues] = useState(initialValues);
  const user = useUserAuth();
  const [posts, setPosts] = useState([]);
  const [domain, setDomain] = useState('');
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);

  // State for handling image uploads
  const [images, setImages] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [i, setI] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  const [location, setLocation] = useState(""); // State for location input
  const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions

    // Function to handle location input changes
    const handleLocationChange = (value) => {
      setLocation(value);
    };

   

  
 

  // State for handling video uploads
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostValues({ ...PostValues, [name]: value });
  };

  const handleAddImage = (e) => {
    if (e.target.files[0]) {
      const newList = photo.concat({ id: i, pic: e.target.files[0] });
      setPhoto(newList);
      const pic = images.concat(URL.createObjectURL(e.target.files[0]));
      setImages(pic);
      setI(i + 1);
      setIsUploadEnabled(true); // Enable the button when an image is selected
    }
  };
  
  const handleAddVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      const videoURL = URL.createObjectURL(e.target.files[0]);
      setVideoURL(videoURL);
      setIsUploadEnabled(true); // Enable the button when a video is selected
    }
  };
  

  const uploadImages = async (docId) => {
    setImageUploading(true);
    const postsRef = doc(db, 'posts', docId);

    const imageURLs = [];

    for (const { id, pic } of photo) {
      const storageRef = ref(
        storage,
        `post-images/${docId}-USERID:${user.user.uid}-COUNT:${id}.png`
      );
      await uploadBytes(storageRef, pic).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        const imageURL = await getDownloadURL(storageRef);
        if (imageURL) {
          imageURLs.push(imageURL);
        }
      });
    }

    // Update the imageURL array
    await updateDoc(postsRef, {
      imageURL: arrayUnion(...imageURLs),
    });

    setImageUploading(false);
  };

  const uploadVideo = async (docId) => {
    if (video) {
      const storageRef = ref(
        storage,
        `post-videos/${docId}-USERID:${user.user.uid}.mp4`
      );

      await uploadBytes(storageRef, video).then(async (snapshot) => {
        console.log('Uploaded a video!');
        const videoURL = await getDownloadURL(storageRef);

        if (videoURL) {
          const postsRef = doc(db, 'posts', docId);
          await updateDoc(postsRef, {
            videoURL: videoURL,
          });
        }
      });
    }
  };

  useEffect(() => {
    const articleRef = collection(db, 'posts');
    const q = query(articleRef, orderBy('time', 'desc'));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(articles);
    });
  }, []);

  const data = [
    { id: 0, label: 'Information', ico: 'iwwa:info' },
    { id: 1, label: 'Idea', ico: 'icons8:idea' },
    { id: 2, label: 'Gauget', ico: 'carbon:machine-learning' },
  ];

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(0);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  useEffect(() => {
    setDomain(items.find((item) => item.id === selectedItem)?.label || '');
  }, [selectedItem]);

  const HandleAddPost = async () => {
    setShowLoader(true);
    const name = user.user.displayName;
    const email = user.user.email;
    const content = PostValues.content;
    const time = serverTimestamp();
    const uid = user.user.uid;
    const photoURL = user.user.photoURL;
    const location = PostValues.location;
  
    try {
      const postRef = await addDoc(collection(db, 'posts'), {
        name,
        email,
        content,
        time,
        uid,
        photoURL,
        domain: domain,
        likes: [],
        imageURL: [],
        videoURL: '',
        location: location,
      });
  
      const docId = postRef.id; // This is the unique ID generated for the post document
      console.log('Unique ID for the post:', docId); // Log the unique ID
  
      await uploadImages(docId);
  
      if (video) {
        await uploadVideo(docId);
      }
  
      setPostValues({ content: '', location: '' });
      setI(0);
      setImages([]);
      setPhoto([]);
      setVideo(null);
      setVideoURL();
  
      setShowLoader(false);
    } catch (e) {
      console.error(e);
      setImageUploading(false);
      setShowLoader(false);
    }
  };
  
  // Function to generate Google Maps URL from location
  const getLocationURL = (location) => {
    // Example Google Maps URL format
    // You may need to adjust the URL based on the desired location format
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

  return (
    <>
      <div className="new-post">
        <div className="top-newpost">
          <div className="avator">
            <img src={user.user.photoURL} alt="profile" />
          </div>
          <textarea
            className="newpost-textarea"
            placeholder="Share your growth and ideas here"
            data-gramm="false"
            data-placeholder="Share your growth and ideas here..."
            aria-placeholder="Share your growth and ideas here..."
            role="textarea"
            aria-multiline="true"
            name="content"
            value={PostValues.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="location-input">
        <input
  type="text"
  name="location"
  placeholder="Enter location"
  value={PostValues.location}
  onChange={handleChange}
/>

        </div>

        <div className="show-images">
          {images.map((image) => (
          <img className="small-image" src={image} key={image} alt="uploaded" />
          ))}
        </div>


        <div className="bottom-newpost">
          <div className="left-bottom-newpost">
            <label className="bt-2" htmlFor="inputTag">
              <Icon className="iconify" icon="ph:image-light"></Icon>
              Image
              <input id="inputTag" onChange={handleAddImage} type="file" accept="image/*" />
            </label>

            <label className="bt-2" htmlFor="inputVideo">
              <Icon className="iconify" icon="ph:video-camera"></Icon>
              Video
              <input id="inputVideo" onChange={handleAddVideo} type="file" accept="video/*" />
            </label>
          </div>

          <div className="left-bottom-newpost">
            <div className="dropdown">
              <div className="dropdown-header bt-2" onClick={toggleDropdown}>
                <Icon icon={items.find((item) => item.id === selectedItem)?.ico}></Icon>
                {items.find((item) => item.id === selectedItem)?.label}
                <span className={`iconify icon ${isOpen && 'open'}`} data-icon="material-symbols:keyboard-arrow-down"></span>
              </div>
              <div className={`dropdown-body ${isOpen && 'open'}`}>
                {items.map((item) => (
                  <div className="dropdown-item bt-2" onClick={(e) => { toggleDropdown(); handleItemClick(item.id) }} id={item.id} key={item.id}>
                    <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="location-link">
          {PostValues.location && (
            <a href={getLocationURL(PostValues.location)} target="_blank" rel="noopener noreferrer">
              View Location on Google Maps
            </a>
          )}
        </div>

            <button
          onClick={HandleAddPost}
          className={`bt-2 bt-red ${(!isUploadEnabled || imageUploading || videoUploading) && 'disabled'}`}
          disabled={!isUploadEnabled || imageUploading || videoUploading}
        >
          {!imageUploading && !videoUploading ? <img src={UploadIcon} /> : <LoadIcon className="spinner" />}
          Post
        </button>

          </div>
        </div>
      </div>

      {videoURL && (
        <div className="video-preview">
          <video controls src={videoURL} alt="video" />
        </div>
      )}

        {posts.map(({ id, name, email, content, time, photoURL, likes, uid, domain, videoURL, imageURL }) => (
        <Feeds
          key={id}
          id={id}
          uid={uid}
          name={name}
          email={email}
          content={content}
          time={moment(time?.toDate()).fromNow()}
          photoURL={photoURL}
          likes={likes}
          domain={domain}
          imageURLs={imageURL}
          videoURL={videoURL}
        />
      ))}
    </>
  );
};

export default NewPost;
