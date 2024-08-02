import React from 'react'
import './styles.css'
import Input from '../Input'
import { useState } from 'react'
import Button from '../Button'
function SignupSigninComponent() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPass, setconfirmPass] = useState('')
    return (
        <div className='signup-wrapper'>
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
                    state={password}
                    setState={setpassword}
                    placeholder={"Example123"} />

                <Input label={"Confirm Password"}
                    state={confirmPass}
                    setState={setconfirmPass}
                    placeholder={"Example123"} />
                <Button text={'Signup Using Email and Password'} />
                <p style={{textAlign:'center', margin:0}}>or</p>
                <Button text={'Signup Using Google'} blue={true} />

            </form>

        </div>
    )
}

export default SignupSigninComponent