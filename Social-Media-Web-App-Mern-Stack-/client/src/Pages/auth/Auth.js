import React, { useState,useEffect } from 'react';
import './Auth.css';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';
import toast from 'react-hot-toast';

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const { error,errorData } = useSelector((state) => state.authReducer);
    const [data, setData] = useState({ name: "", email: "", password: "", confirmpass: "" });

    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handlSubmit = (e) => {
        e.preventDefault();

        if (isSignUp && (data.email === "" || data.name === "" || data.password === "")) {
            toast.error("All fields are required");
          return;
        } else if (isSignUp && (data.name.length > 20 || data.name.length < 3)) {
            toast.error("Name should be atlest 3 and atmost 20 characters long");
          return;
        } else if (!data.email.includes("@") || !data.email.includes(".")) {
            toast.error("Invalid email");
          return;
        } else if (data.email.length > 50) {
            toast.error("Email should be atmost 50 characters long");
          return;
        } else if (data.password.length < 8 || data.password.length > 20) {
            toast.error("Invalid Password");
          return;
        } else if (isSignUp && (data.password !== data.confirmpass)) {
            toast.error("Passwords do not match");
          return;
        }
            if (isSignUp) {
                data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
            } else {
                dispatch(logIn(data))
            }
    }
    useEffect(()=>{
        if(error){
            console.log(errorData)
            toast.error(errorData.response.data);
        }
    },[error])
    const restForm = () => {
        setConfirmPass(true);

        setData({
            name:'',
            email: "",
            password: "",
            confirmpass: ""
        })
    }



    return (

        //    Left Side
        <div className='Auth'>
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h2>Welcome !</h2>
                    <h5>Explore the ideas throughout <br /> the world.</h5>
                </div>
            </div>


            {/* Right Side */}

            <div className="a-right">
                <form className='infoForm authForm' onSubmit={handlSubmit}>

                    <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

                    {isSignUp &&
                        <div className='infoFields'>
                            <input type="text" placeholder='Name'
                                className='infoInput' name='name'
                                onChange={handleChange}
                                value={data.name}
                            />
                            {/* <input type="text" placeholder='Last Name'
                                className='infoInput' name='lastname'
                                onChange={handleChange}
                                value={data.lastname}
                            /> */}
                        </div>
                    }

                    <div className='infoFields'>
                        <input type="text" placeholder='Email'
                            className='infoInput' name='email'
                            onChange={handleChange}
                            value={data.email}
                        />
                    </div>

                    <div className='infoFields'>
                        <input type="password" placeholder='Password'
                            className='infoInput' name='password'
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignUp &&
                            <input type="password" placeholder='Confirm Password'
                                className='infoInput' name='confirmpass'
                                onChange={handleChange}
                                value={data.confirmpass}
                            />
                        }
                    </div>


                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
                        * Confirm Password is not same
                    </span>


                    <div>
                        <span style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => { setIsSignUp((prev) => !prev); restForm() }}
                        >
                            {isSignUp ? "Already have an account? Login here" : "Don't have an account? SignUp here"}
                        </span>
                    </div>

                    <button className='button infoButton' type='submit' disabled={loading}>
                        {loading ? "loading..." : isSignUp ? "Sign Up" : "Login"}
                    </button>

                </form>
            </div>
        </div>
    )
}



export default Auth
