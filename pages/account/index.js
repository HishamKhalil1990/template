import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import styles from"../../styles/Account.module.css"
import axios from "axios"

export default function Account(props){

    const router = useRouter()

    const [form,setForm] = useState("login")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [usernameSign,setUsernameSign] = useState("")
    const [emailSign,setEmailSign] = useState("")
    const [passwordSign,setPasswordSign] = useState("")
    const [confirm,setConfirm] = useState("")
    const [showErrMsg,setShowErrMsg] = useState(false)

    const changeForm =(type) => {
        if(type != form){
            if(form == 'login'){
                setUsername("")
                setPassword("")
            }else{
                setUsernameSign("")
                setPasswordSign("")
                setConfirm("")
            }
            setForm(type)
        }
    }

    const login = () => {
        if(username != "" && password != ""){
            axios({
                url: '/api/login',
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    username:username,
                    password:password
                })
            }).then((res) => {
                console.log(res.data)
                router.push('/home')
            })
        }
    }

    const signUp = () => {
        if(usernameSign != "" && emailSign != "" && passwordSign != "" && confirm != ""){
            axios({
                url: '/api/register',
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    username:usernameSign,
                    email:emailSign,
                    password:passwordSign,
                    confirm:confirm
                })
            }).then((res) => {
                console.log(res.data)
                changeForm('login')
            })
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.formsSection}>
                <div className={styles.forms}>
                    { form == "login"?
                        <>
                            <div className={`${styles.formWrapper} ${styles.isActive}`}>
                                <button type="button" className={[styles.switcher,styles.switcherLogin].join(" ")} onClick={() => changeForm('login')}>
                                    Login
                                    <span className={styles.underline}></span>
                                </button>
                                <form className={[styles.form,styles.formLogin].join(" ")} action="/#">
                                    <fieldset>
                                    <legend>Please, enter your email and password for login.</legend>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="loginEmail">Username</label>
                                        <input id="loginEmail" type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="loginPassword">Password</label>
                                        <input id="loginPassword" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <a href="/account/forgetPassword">forget password?</a>
                                    </fieldset>
                                    <button type="submit" className={styles.btnLogin} onClick={login}>Login</button>
                                    {showErrMsg?
                                        <div className={styles.msg}>
                                            <h6 className={styles.textH6}>wrong username or password</h6>
                                        </div>
                                        :
                                        <></>
                                    }
                                </form>
                            </div>
                            <div className={styles.formWrapper}>
                                <button type="button" className={[styles.switcher,styles.switcherSignup].join(" ")} onClick={() => changeForm('sign')}>
                                    Sign Up
                                    <span className={styles.underline}></span>
                                </button>
                                <form className={[styles.form,styles.formSignup].join(" ")} action="/#">
                                    <fieldset>
                                    <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupEmail">Username</label>
                                        <input id="signupEmail" type="text" required value={usernameSign} onChange={e => setUsernameSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupEmail">Email</label>
                                        <input id="signupEmail" type="email" required value={emailSign} onChange={e => setEmailSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupPassword">Password</label>
                                        <input id="signupPassword" type="password" required value={passwordSign} onChange={e => setPasswordSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupPassword-confirm">Confirm Code</label>
                                        <input id="signupPassword-confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
                                    </div>
                                    </fieldset>
                                    <button type="submit" className={styles.btnSignup} onClick={signUp}>Continue</button>
                                </form>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.formWrapper}>
                                <button type="button" className={[styles.switcher,styles.switcherLogin].join(" ")} onClick={() => changeForm('login')}>
                                    Login
                                    <span className={styles.underline}></span>
                                </button>
                                <form className={[styles.form,styles.formLogin].join(" ")} action="/#">
                                    <fieldset>
                                    <legend>Please, enter your email and password for login.</legend>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="loginEmail">Username</label>
                                        <input id="loginEmail" type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="loginPassword">Password</label>
                                        <input id="loginPassword" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    </fieldset>
                                    <button type="submit" className={styles.btnLogin} onClick={login}>Login</button>
                                </form>
                            </div>
                            <div className={`${styles.formWrapper} ${styles.isActive}`}>
                                <button type="button" className={[styles.switcher,styles.switcherSignup].join(" ")} onClick={() => changeForm('sign')}>
                                    Sign Up
                                    <span className={styles.underline}></span>
                                </button>
                                <form className={[styles.form,styles.formSignup].join(" ")} action="/#">
                                    <fieldset>
                                    <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupEmail">Username</label>
                                        <input id="signupEmail" type="text" required value={usernameSign} onChange={e => setUsernameSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupEmail">Email</label>
                                        <input id="signupEmail" type="email" required value={emailSign} onChange={e => setEmailSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupPassword">Password</label>
                                        <input id="signupPassword" type="password" required value={passwordSign} onChange={e => setPasswordSign(e.target.value)} />
                                    </div>
                                    <div className={styles.inputBlock}>
                                        <label htmlFor="signupPassword-confirm">Confirm Code</label>
                                        <input id="signupPassword-confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
                                    </div>
                                    </fieldset>
                                    <button type="submit" className={styles.btnSignup} onClick={signUp}>Continue</button>
                                    {showErrMsg?
                                        <div className={styles.msg}>
                                            <h6 className={styles.textH6}>wrong username or password</h6>
                                        </div>
                                        :
                                        <></>
                                    }
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}