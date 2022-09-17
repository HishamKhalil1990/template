import axios from 'axios'

export default function handler(req, res) {
    const data = req.body
    const baseURL = 'http://localhost:3033'
    const urls = {
        saveDataURL: "save-data",
    }
    try{
        axios({
            baseURL,
            url:urls.saveDataURL,
            method:"post",
            timeout:10000,
            headers:{'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }).then(result => {
            res.send(result.data)
        }).catch(err => {
            res.send("internal error")
        })
    }catch(err){
        res.send("connection error")
    }
}
