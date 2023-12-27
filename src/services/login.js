import axios from 'axios'
import {baseUrl} from '../util/Url'

const login = async ({role, account, password}) => {
  const url = baseUrl+role+'s/?&account='+account+'&password='+password
  const response = await axios.get(url)
  return response.data
}

export default { login }