import { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './UploadPic.css';
import EditIcon from "./images/upload.svg"
import DeleteIcon from "./images/remove.svg"
import { updateProfile } from "firebase/auth";
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function UploadPic() {
  
  const [photo,setPhoto] = useState();
  const commonImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" ;
  const [file, setFile] = useState(commonImg);
  const [loading,setLoading] = useState(false);
  const user = useUserAuth();
  const navigate = useNavigate();

  const handleChange = async(e) => {
    if(e.target.files[0]){
        setPhoto(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  };


  const handleClick = async () =>{
    console.log(user.user.uid);
    const fileRef = ref(storage,user.user.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileRef,photo);
    setLoading(false);

    const photoURL = await getDownloadURL(fileRef);
    console.log(photoURL);
    updateProfile(user.user,{photoURL : photoURL});

    alert("file uploaded");
    navigate("/home");
  }

  const handleDelete = async () => {
    const fileRef = ref(storage,"default.png");
    const photoURL = await getDownloadURL(fileRef);
    alert ("the profile deleted permanently");
    updateProfile(user.user, {photoURL : photoURL});
    navigate("/home");
  }

  return (
    <div className='Details'>
      <div className="whole"></div>
      <div className="heading">
        <p>N</p>
        <p>preneu</p>
        <p>r</p>
      </div>
      <div className="center-box">
        <div className="middle-box">
          <h3>Join with Us</h3>
          <p>Connect with peoples and Entrepreneurs</p>
          <div className='UploadAvator'>
            <img alt='avator' className='avat' src={file}></img>
            </div>

          <div className="btn-container">

            <label className='bt-2' for="inputTag">
            <img src={EditIcon} />
            Edit
                <input id="inputTag" onChange={handleChange} type="file" multiple></input>
            </label>

            <button onClick={handleDelete} className="bt-2">
                <img src={DeleteIcon} />
                    Delete</button>
            </div>

            <div className="submit" onClick={handleClick}>
                <button >Continue</button>
            </div>

        </div>
      </div>

    </div>
  );
}

export default UploadPic;
