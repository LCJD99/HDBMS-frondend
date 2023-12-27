import axios from 'axios'
import { baseUrl } from '../util/Url'


const getAll = async () => {
    const url = baseUrl+"admins/1"
    const request = await axios.get(url)
    return request.data
}

const createPatient = async newObject => {
    const url = baseUrl + 'patients'
    const response = await axios.post(url, newObject )
    return response.data
}

const updatePatient = async(id, newObject) => {
    const url = baseUrl + 'patients'
    console.log("update:" , url);
    const response = await axios.put(`${url}/${id}`, newObject)
    return response.data
}

const deletePatient = async(id) => {
    const url = baseUrl + 'patients'
    const response = await axios.delete(`${url}/${id}` )
    return response.data
}

const createDoctor = async newObject => {
    const url = baseUrl + 'doctors'
    const response = await axios.post(url, newObject )
    return response.data
}

const updateDoctor = async(id, newObject) => {
    const url = baseUrl + 'doctors'
    const response = await axios.put(`${url}/${id}`, newObject)
    return response.data
}

const deleteDoctor = async(id) => {
    const url = baseUrl + 'doctors'
    const response = await axios.delete(`${url}/${id}` )
    return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default{ getAll, createPatient, updatePatient, deletePatient, createDoctor, updateDoctor, deleteDoctor}