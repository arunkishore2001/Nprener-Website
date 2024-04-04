import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Alert} from "react-bootstrap"
import { useUserAuth } from '../context/UserAuthContext';
import './Login.css';
import img1 from './loginImgs/image1.png'
import img2 from './loginImgs/image2.png'

function Login() {


    const initialValues = {email:"",pass:""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [nerr,setNerr] = useState("");

    const { signUp } = useUserAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const email = formValues.email;
        const passs = formValues.pass;
        try{
          await signUp(email,passs);
        }
        catch (err) {
          setNerr(err.message);
        }
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    },[formErrors]);

    const validate =(values) => {
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!values.email){
            errors.email = "Email is required!";
        }
        else if (!regex.test(values.email)){
            errors.email = "Email is Invalid!";
        }
        if (!values.pass){
            errors.pass = "Password is required!";
        }
        else if (values.pass.length < 6){
            errors.pass = "Password should be greater than 6";
        }
        return errors;
    };

  return (
    <div className="Login">
      <div className="whole-site"> 
        </div>
        <div className="left-box">
          {nerr && <Alert variant='danger'> {nerr} </Alert>}
          <div className="heading">
            <p>N</p>
            <p>preneu</p>
            <p>r</p>
          </div>
          <div className="signin-box">
            <div className="signin">
              <h2>Sign in</h2>
              <p>Connect with peoples and Entrepreneurs</p>
            </div> 
            <form id="frm" onSubmit={handleSubmit}>

              <div className="email">
                <p>Email</p>
                <input type="email" name="email" id="email" 
                    placeholder="mail@gmail.com" 
                    value={ formValues.email }
                    onChange = {handleChange} />
                    <p className='warn1'>{formErrors.email}</p>

                <div className="pass">
                  <p>Password</p>
                  <input type="password" name="pass" 
                    id="pass" placeholder="Min. 6 characters" 
                    value={ formValues.password }
                    onChange = {handleChange} />
                    <p className='warn2'>{formErrors.pass}</p>

                  <i className="fa-solid fa-eye" id="eye" />
                </div> 
                <div className="signin-btn">
                  <button type="submit" name="submit" id="submit"> Sign in</button>
                  <div className="empty">
                    <div className="forgpass">
                      <a href="#">Forget Password ?</a>
                    </div>  
                    <span className="or">
                      <h5>Or</h5>
                    </span>
                    <div className="signin-google">
                      <button>Sign in with Google</button>
                      <img src={img2} />
                    </div>
                  </div>
                  <div className="joinnow">
                    <p>New to Npreneur?</p>
                    <a href="register.html">Join now</a>
                  </div>
                </div>
              </div></form>
          </div>

          <div className="right-box">
            <img src={img1} alt="Entrepreneurs" />
          </div>
          <div className="bottom-box">
          </div>
        </div>
    </div>
  );
}

export default Login;
