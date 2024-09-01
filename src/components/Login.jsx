import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validations';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGIN_PAGE_BG } from '../utils/constants';




const Login = () => {
    
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value ) //name.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value
            )
              .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                  displayName: name.current.value,
                })
                  .then(() => {
                    const { uid, email, displayName } = auth.currentUser;
                    dispatch(
                      addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,

                      })
                    );
                  }
                  )
                  .catch((error) => {
                    setErrorMessage(error.message);
                  });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
          } else {
            // Sign In Logic
            signInWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value
            )
              
              
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });

                     
            }
        };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
      };

  return (
    <div>
  
        <Header/>
        <div className='absolute'>
            <img className="flex-1" src={LOGIN_PAGE_BG} alt='defalultbackground'/>
        </div>
        
        <div>
        

        <form onSubmit={(e)=>e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75'>
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref = {name}
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
            <input type='text' ref = {email} placeholder='Email Address' className="p-4 my-4 w-full bg-gray-700 opacity-80"/>
            <input type='password' ref = {password} placeholder='Password' className="p-4 my-4 w-full bg-gray-700 opacity-80"/>
            <p className='text-red-600'>{errorMessage}</p>
            <button onClick={handleButtonClick} className="p-2 my-6 bg-red-600 w-full rounded-lg">{isSignInForm ?"Sign In":"Sign Up"} </button>
            <p className='py-4 hover:cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Bro-llowood? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>

        </div>


    </div>
  )
}

export default Login
