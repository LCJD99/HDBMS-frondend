import axios from 'axios'
import { baseUrl } from '../util/Url'

var url = baseUrl + "patients/" 
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = async (id) => {
    const newurl = url + id
    console.log(newurl)
    const request = await axios.get(newurl)
    return request.data
}

const create = async newObject => {
    const config = {
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update,  getOne }