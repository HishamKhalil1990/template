import axios from 'axios'

export default function handler(req, res) {
    const baseURL = 'http://localhost:3033'
    const urls = {
        getDataURL: "get-data",
    }
    try{
        axios({
            baseURL,
            url:urls.getDataURL,
            method:"get",
            timeout:10000,
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            res.send(result.data)
        }).catch(err => {
            res.send("internal error")
        })
    }catch(err){
        res.send("connection error")
    }
}
