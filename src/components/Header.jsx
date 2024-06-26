import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_LOGO } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);
    const handleSignOut = () =>{
            signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            }).catch((error) => {
            navigate("/error");
            });
    }
    useEffect(
      ()=>{const unsubscribe = onAuthStateChanged(auth,(user)=>
          {
              if(user)
              {
                  const{uid, email, displayName} = user;
                  dispatch(addUser({uid:uid, email:email, displayName:displayName})); 
                  navigate("/browse")    
              }
              else{
                  dispatch(removeUser());
                  navigate("/");
              }
          }
      
      )
    
          return ()=>unsubscribe();
    
    },
  []);






  return (
    <div className='absolute top-0 w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between text-white'> 
        <img className="w-56 mx-auto md:mx-0" src={LOGO} alt="logo" />
        {user && (<div className="flex justify-between items-center"> 
            <img className='h-12 w-12 p-2' src={USER_LOGO} alt='usericon'/>
            <button onClick={handleSignOut}>(SignOut)</button>
        </div>)}
    
    
    
    </div>
  )
}

export default Header