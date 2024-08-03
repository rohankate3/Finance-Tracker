import React from 'react'
import './styles.css'
import Input from '../Input'
import { useState } from 'react'
import Button from '../Button'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';


function SignupSigninComponent() {

    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [confirmPass, setconfirmPass] = useState('')
    let [loading, setloading] = useState(false)
    let [loginform, setloginform] = useState(false);    
    let navigate = useNavigate();

    function SignupwithEmail() {
        console.log("Name is ", name);
        console.log("Email is ", email);
        console.log("Password is ", password);
        console.log("confirmPass is ", confirmPass);

        // Authenticate the user or basically create a account using email and pass

        if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
            if (password === confirmPass) {
                setloading(true);
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log("User-->", user);
                        toast.success("User Created!")
                        setname("");
                        setemail("");
                        setpassword("");
                        setconfirmPass("");
                        setloading(false);
                        // ...
                        //  Create a Doc with user id 
                        createDoc(user);
                        navigate('/dashboard');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        setloading(false);
                        // ..
                    });
            }
            else {
                toast.error("Password and Confirm Password Dont Match")
                setloading(false);
            }

        }
        else {
            toast.error("All Fields are Mandatory! ");
            setloading(false);
        }

    }
    async function createDoc(user) {
        // Make sure that doc with id doesn't exist
        // Make the doc
        setloading(true);
        if (!user) return;

        const userRef = doc(db,'users',user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) 
            {
            try 
            {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                });
                toast.success("Account Created!");
                setloading(false);
            } catch (error) 
            {
                toast.error(error.message);
                setloading(false);
                
            }
        } else {
            toast.error("Document already exists");
            setloading(false);
        }
    }

    function loginupwithEmail() {
        if (email !== '' && password !== '') {
            console.log("Email->", email);
            console.log("Password->", password);
            setloading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User Logged in Successfully!")
                    console.log("User->", user);
                    setloading(false);
                    navigate('/dashboard');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setloading(false);
                });
        }
        else {
            toast.error("All Fields are Mandatory!");
            setloading(false);
        }

    }
    return (
        <>
            {loginform ?
                <div className='signup-wrapper'>
                    <h2 className='title'>
                        Login on <span style={{ color: 'var(--theme)' }}>Financly.</span>
                    </h2>
                    <form>

                        <Input label={"Email"}
                            state={email}
                            setState={setemail}
                            placeholder={"JohnDoe@example.com"} />

                        <Input label={"Password"}
                            type="password"
                            state={password}
                            setState={setpassword}
                            placeholder={"Example123"} />

                        <Button
                            disabled={loading}
                            text={loading ? 'Loading...' : 'Login Using Email and Password'}
                            onClick={loginupwithEmail} />
                        <p className='p-login'>or</p>
                        <Button text={loading ? 'Loading...' : 'Login Using Google'} blue={true} />
                        <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => setloginform(!loginform)}>
                            or Don't Have an Account Already? Click Here
                        </p>
                    </form>

                </div>
                : <div className='signup-wrapper'>
                    <h2 className='title'>
                        Signup on <span style={{ color: 'var(--theme)' }}>Financly.</span>
                    </h2>
                    <form>
                        <Input label={"Full Name"}
                            state={name}
                            setState={setname}
                            placeholder={"John Doe"} />

                        <Input label={"Email"}
                            state={email}
                            setState={setemail}
                            placeholder={"JohnDoe@example.com"} />

                        <Input label={"Password"}
                            type="password"
                            state={password}
                            setState={setpassword}
                            placeholder={"Example123"} />

                        <Input label={"Confirm Password"}
                            type="password"
                            state={confirmPass}
                            setState={setconfirmPass}
                            placeholder={"Example123"} />
                        <Button
                            disabled={loading}
                            text={loading ? 'Loading...' : 'Signup Using Email and Password'}
                            onClick={SignupwithEmail} />
                        <p className='p-login'>or</p>
                        <Button text={loading ? 'Loading...' : 'Signup Using Google'} blue={true} />
                        <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => setloginform(!loginform)}>
                            or Have an Account Already? Click Here
                        </p>
                    </form>

                </div>}

        </>
    )
}

export default SignupSigninComponent