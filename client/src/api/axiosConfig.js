import axios from 'axios'

// console.log(process.env.MIX_APP_URL);

let instance = axios.create({
  baseURL: `http://hammer.localhost:4000/api/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
  },
})





instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == 401) {
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
