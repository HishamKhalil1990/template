import axios from 'axios'

export default function handler(req, res) {
    const data = req.body
    const baseURL = 'http://localhost:3033'
    const urls = {
        loginURL: "login-user",
    }
    try{
        // axios({
        //     baseURL,
        //     url:urls.loginURL,
        //     method:"post",
        //     timeout:10000,
        //     headers:{'Content-Type': 'application/json'},
        //     data:JSON.stringify(data)
        // }).then(result => {
        //     res.send(result.data)
        // }).catch(err => {
        //     res.send("internal error")
        // })
        res.send(res.send({
            status:"success",
            msg:"success",
            tokens:{
                token:'sssssss',
            }
        }))
    }catch(err){
        res.send("connection error")
    }
}
