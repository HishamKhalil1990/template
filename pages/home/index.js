import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
export default function Home(props){

    const router = useRouter()

    const [loading, setLoading] = useState(true)

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

    const HomeLayout = () => {
        return(
            <div>
                home page
            </div>
        )
    } 

    return(
        <>
            {
            loading?
                <div>loading</div>
            :
                <HomeLayout/>
            }
        </>
    )
}