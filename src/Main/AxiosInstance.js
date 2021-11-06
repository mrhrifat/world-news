import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})
instance.defaults.headers.common['X-Api-Key'] = process.env.REACT_APP_API_KEY

export default instance

// console.log(process.env.REACT_APP_URL)
// console.log(process.env.REACT_APP_API_KEY)
// console.log(process.env.NODE_ENV)