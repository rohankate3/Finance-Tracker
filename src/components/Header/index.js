import React from 'react'
import './styles.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth"
function Header() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
// below fn keeps you login even we if close application it will navigate to dashboard
// till the user doesnt press logout// this is done using react-firebase-hook name useAuthState(auth);
    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, loading])


    function logoutFnc() {
        try {
            const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("Logged out Successfully!")
            navigate('/')
        }).catch((error) => {
            // An error happened.
            toast.error(error.message);
        });
        } catch (error) {
            toast.error(error.message);
        }
        

    }
    return (
        <div className='navbar'>
            <p className='logo'>Financly.</p>
            {user &&
                <p className='logo link' onClick={logoutFnc}>Logout</p>
            }

        </div >
    )
}

export default Header