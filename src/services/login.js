import axios from 'axios'
//import { log } from 'console'
const baseUrl = 'http://localhost:3001/api/'

const login = async ({role, account, password}) => {
  const url = baseUrl+role+'s/?&account='+account+'&password='+password
  //log("url", url);
  const response = await axios.get(url)
  return response.data
}

export default { login }