import axios from 'axios'

export default function handler(req, res) {
    const data = req.body
    const baseURL = 'http://localhost:3033'
    const urls = {
        registerURL: "register-user",
    }
    try{
        // axios({
        //     baseURL,
        //     url:urls.registerURL,
        //     method:"post",
        //     timeout:10000,
        //     headers:{'Content-Type': 'application/json'},
        //     data:JSON.stringify(data)
        // }).then(result => {
        //     res.send(result.data)
        // }).catch(err => {
        //     res.send("internal error")
        // })
        res.send({
            status:"success",
            msg:"registered"
        })
    }catch(err){
        res.send("connection error")
    }
}
