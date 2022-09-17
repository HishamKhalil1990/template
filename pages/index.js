import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import AsyncLocalStorage from '@createnextapp/async-local-storage'
import Account from './account'

export default function Home() {

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
          if(tokens.day == day){
            router.push('/home')
          }else{
            await AsyncLocalStorage.removeItem('tokens')
            setLoading(false)
          }
        }else{
          setLoading(false)
        }
      }catch(err){
        setLoading(false)
      }
    }
    checkLogin()
  },[])

  return (
    <>
      {
      loading?
        <div>loading</div>
      :
        <Account/>
      }
    </>
  )
}
