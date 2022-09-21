import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import axios from 'axios'
import styles from "../../styles/Home.module.scss"
import Spinner from '../../components/spinner'
import MaltransData from '../../components/maltransData'
import BillData from '../../components/billData'

let prevBillNo = ""

export default function Home(props){

    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
 
    useEffect(() => {
        const checkLogin = async() => {
            try {
            let tokens = await AsyncLocalStorage.getItem('tokens')
            if(tokens){
                tokens = JSON.parse(tokens)
                let day = new Date();
                day = day.getDay();
                if(tokens.day != day){
                    await AsyncLocalStorage.removeItem('tokens')
                    router.push('/account')
                }else{
                    setUsername(tokens.username)
                    setToken(tokens.token)
                    setEmail(tokens.email)
                    setLoading(false)
                }
            }else{
                router.push('/account')
            }
            }catch(err){
                router.push('/account')
            }
        }
        checkLogin()
    },[])

    const logout = async() => {
        try {
            await AsyncLocalStorage.removeItem('tokens')
            router.push('/account')
        }catch(err){
            alert("Somthing wrong happened !")
        }
    }

    const HomeLayout = () => {
        
        const [billNo, setBillNo] = useState("")
        const [billData, setBillData] = useState({})
        const [msg,setMsg] = useState("")
        const [showMsg,setShowMsg] = useState(false)
        const [innerLoading,setInnerLoading] = useState(false)

        const clear = () => {
            prevBillNo = ""
            setBillData({})
        }

        const getData = async() => {
            if(showMsg){
                setMsg("")
                setShowMsg(false)
            }
            if(billNo != "" && billNo != prevBillNo){
                prevBillNo = billNo
                setInnerLoading(true)
                axios({
                    baseURL:'http://194.165.152.206:3030',
                    url: '/bill-of-lading',
                    method: 'post',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    data: JSON.stringify({
                        billNo:billNo,
                    })
                }).then((res) => {
                    setTimeout(() => {
                        setInnerLoading(false)
                        if(res.data.status == "success"){
                            setBillData(res.data.data)
                        }else{
                            clear()
                            setShowMsg(true)
                            setMsg(res.data.msg)
                            if(res.data.status == "unauthorized"){
                                setTimeout(() => {
                                    logout()
                                },1500)
                            }
                        }
                    },1000)
                }).catch(() => {
                    setTimeout(() => {
                        clear()
                        setInnerLoading(false)
                        setShowMsg(true)
                        setMsg("server shutdown or connection lost!, please try again")
                    },1000)
                })
            }else if(billNo == ""){
                clear()
                setShowMsg(true)
                setMsg("please insert bill of lading no.")
            }
        }

        return(
            <div className={styles.dashboard}>

                <aside className={styles.searchWrap}>
                    <div className={styles.search}>
                        <label htmlFor="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/></svg>
                            <input type="text" id="search" value={billNo} onChange={e => setBillNo(e.target.value)}/>
                        </label>
                    </div> 
                    <div className={styles.userActions}>
                        <button onClick={getData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"/><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"/></svg>
                        </button>
                        {/* <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"/><path d="M11 2h2v10h-2z"/></svg>
                        </button> */}
                    </div>
                    <div className={styles.userActions}>
                    <   div>
                            {showMsg?
                                <div className={styles.msgText}>
                                    {msg}
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </aside>
                
                <header className={styles.menuWrap}>
                    <figure className={styles.user}>
                        <div className={styles.userAvatar}>
                            <div className={styles.text}>{username.charAt(0).toUpperCase()}</div>
                        </div>
                        <figcaption>
                            {username}
                        </figcaption>
                    </figure>
                    <nav>
                        <section className={styles.dicover}>
                            <h3>Dashboard</h3>
                            
                            <ul>
                                <li>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                                        Home
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/></svg>
                                        Settings
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="#" onClick={logout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"/><path d="M11 2h2v10h-2z"/></svg>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </nav>
                </header>

                <main className={styles.contentWrap}>
                    <header className={styles.contentHead}>
                        <h1>Abuodeh - Maltrans</h1>
                            
                        <div className={styles.action}>
                            <button>
                                Save Data
                            </button>
                        </div>
                    </header>	
                    <div className={styles.content}>
                        {innerLoading?
                            <div style={{
                                marginTop:"100px"
                            }}>
                                <Spinner/>
                            </div>
                        :
                            <>
                                {Object.keys(billData).length > 0?
                                    <div>
                                        <BillData data={billData}/>
                                        <MaltransData/>
                                    </div>
                                :
                                    <></>
                                }
                            </>
                        }
                    </div>
                </main>
            </div>
        )
    } 

    return(
        <>
            {
            loading?
            <div style={{
                height:"100vh",
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Spinner/>
            </div>
            :
                <HomeLayout/>
            }
        </>
    )
}