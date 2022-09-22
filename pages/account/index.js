import { useState } from "react"
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from "axios"
import styles from"../../styles/Account.module.css"
import Loader from "../../components/loader"

export default function Account(props){

    const router = useRouter()

    const [form,setForm] = useState("login")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [usernameSign,setUsernameSign] = useState("")
    const [emailSign,setEmailSign] = useState("")
    const [passwordSign,setPasswordSign] = useState("")
    const [confirm,setConfirm] = useState("")
    const [msg,setMsg] = useState("")
    const [success,setSuccess] = useState("")
    const [showMsg,setShowMsg] = useState(false)
    const [loading,setLoading] = useState(false)

    const clear = () => {
        setShowMsg(false)
        setMsg("")
        setSuccess(false)
    }

    const changeForm =(type) => {
        if(showMsg){
            clear()
        }
        if(type != form){
            if(form == 'login'){
                setUsername("")
                setPassword("")
            }else{
                setUsernameSign("")
                setEmailSign("")
                setPasswordSign("")
                setConfirm("")
            }
            setForm(type)
        }
    }

    const saveInStorage = async(tokens,msg) => {
        try {
            let day = new Date();
            day = day.getDay();
            tokens.day = day
            await AsyncLocalStorage.setItem('tokens', JSON.stringify(tokens))
            setSuccess(true)
            setMsg(msg)
            setTimeout(() => {
                router.push('/home')
            },1000)
        }catch (err){
            setSuccess(false)
            setMsg("something wrong happened !, please try again")
        }
    }

    const login = () => {
        if(showMsg){
            clear()
        }
        if(username != "" && password != ""){
            setLoading(true)
            axios({
                baseURL:'https://alrayhan-rate.herokuapp.com',
                url: '/check-maltrans-user',
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
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    if(res.data.status == "success"){
                        saveInStorage(res.data.tokens,res.data.msg)
                    }else{
                        setMsg(res.data.msg)
                    }
                },3000)
            }).catch(() => {
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    setMsg("server shutdown or connection lost!, please try again")
                },3000)
            })
        }
    }

    const signUp = () => {
        if(showMsg){
            clear()
        }
        if(usernameSign != "" && emailSign != "" && passwordSign != "" && confirm != ""){
            setLoading(true)
            axios({
                baseURL:'https://alrayhan-rate.herokuapp.com',
                url: '/register-maltrans-user',
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    username:usernameSign,
                    email:emailSign,
                    password:passwordSign,
                    confirmPass:confirm
                })
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    if(res.data.status == "success"){
                        setSuccess(true)
                        setTimeout(() => {
                            clear()
                            changeForm('login')
                        },1000)
                    }
                    setMsg(res.data.msg)
                },3000)
            }).catch(() => {
                setTimeout(() => {
                    setLoading(false)
                    setShowMsg(true)
                    setMsg("server shutdown or connection lost!, please try again")
                },3000)
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
                                    {loading?
                                        <Loader/>
                                        :
                                        <button type="submit" className={styles.btnLogin} onClick={login}>Login</button>
                                    }
                                    {showMsg?
                                        <div className={styles.msg}>
                                            {success?
                                                <h6 className={styles.successTextH6}>{msg}</h6>
                                                :
                                                <h6 className={styles.errTextH6}>{msg}</h6>
                                            }
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
                                    {loading?
                                        <Loader/>
                                        :
                                        <button type="submit" className={styles.btnSignup} onClick={signUp}>Continue</button>
                                    }
                                    {showMsg?
                                        <div className={styles.msg}>
                                            {success?
                                                <h6 className={styles.successTextH6}>{msg}</h6>
                                                :
                                                <h6 className={styles.errTextH6}>{msg}</h6>
                                            }
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