import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {


    const initialValues = {email:"",pass:""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const navigate = useNavigate();
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
          navigate('/details');
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
      <div className="full-screen">
  <div className="containerrr">
    <div className="left-container">
      <div className="logo">
        <p>N</p>
        <p>preneu</p>
        <p>r</p>
      </div>
      <div className="signin-container">
        <form id='form' onSubmit={handleSubmit}>
        <div className="signin-header">
          <h1>Join with Us</h1>
          <p>Connect with peoples and Entrepreneurs</p>
        </div>
        <div className="entry-container">
          <div className="email-entry">
            <h3>Email</h3>
            <input type="email" 
                name="email" 
                placeholder="mail@gmail.com"
                value={ formValues.email }
                onChange = {handleChange}  />
          </div>
          <div className="password-entry">
            <h3>Password</h3>
            <div className="close-it">
              <input
                className="password"
                type="password"
                name="pass"
                id="id_password"
                placeholder="Min. 6 characters"
                value={ formValues.pass }
                onChange = {handleChange} 
              />
              <i className="far fa-eye" id="togglePassword" />
            </div>
          </div>
        </div>
        <div className="forgot">
          <a href="#">
            <h3>Forgot Password?</h3>
          </a>
        </div>
        <div className="message">
          <p> {nerr} </p>
        </div>
        <div className="buttons">
          <button className="signin-btn btn">
            <h3>Create Account</h3>
          </button>
        </div></form>
        <div className="join-now">
          <p>Already Existing User? </p>
          <a href="#"><Link to="/">
            <p> Sign in</p></Link>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Signup;
