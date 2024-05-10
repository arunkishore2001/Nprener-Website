import { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import './Details.css';
import { db } from '../../firebase';
import { updateProfile } from "firebase/auth";

function Details() {


  const initialValues = { name: "", dob: "", choice: "", about: "" ,following:'',followers:''};
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [nerr, setNerr] = useState("");
  const user = useUserAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const HandleAddDetails = async (e) => {
    e.preventDefault();
    const name = formValues.name;
    const dob = formValues.dob;
    const entrepreneur = formValues.choice;
    const about = formValues.about;
    try {
      await setDoc(doc(db, "user", user.user.uid), {
        name,
        dob,
        entrepreneur,
        about,
        following:[],
        followers:[],
      });
      console.log("Successfully Updated");
      console.log(user.user);
      updateProfile(user.user,{ displayName: name });
      console.log(user.user.displayName);
      navigate("/UploadPic");
    }
    catch (e) {
      console.log(e);
    }
  };


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
          <form onSubmit={HandleAddDetails} id="frm">
            <div className="name">
              <label>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name Here"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dob">
              <label>Date of Birth</label>
              <input type="date" id="dob" name="dob" value={formValues.dob} onChange={handleChange} required/>
            </div>
            <div className="confirm">
              <label>Are You an Entrepreneurs ?</label>
              <select name="choice" id="yes/no" onChange={handleChange} value={formValues.choice} required>
                <option value=""> Select The options</option>
                <option value="yes" id="yes">
                  Yes
                </option>
                <option value="no" id="no">
                  No
                </option>
              </select>
            </div>
            <div className="para">
              <label>Few Words About You</label>
              <textarea id="para" required name="about" placeholder="Write About You" defaultValue={""} value={formValues.about} onChange={handleChange} />
            </div>
            <div className="submit">
              <a href="index.html">
                <button type="submit">Continue</button>
              </a>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}

export default Details;
