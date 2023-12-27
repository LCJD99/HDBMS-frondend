import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useParams,
  useNavigate,
} from "react-router-dom"

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import Patient from './pages/Patient'
import Admin from './pages/Admin'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import Sign from "./components/SignIn"

const App = () => {

  const [UserInfo, setUserInfo] = useState({
    "Id" : -1,
    "role": "",
    "isLogin" : false
  })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  //子状态
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])

  //回调函数获取判断登录情况
  const getLogInStatus = (statue, id, role) =>{
    console.log("backfunction", id);
    setUserInfo({
      "Id" : id,
      "role" : role,
      "isLogin": statue
    })
  }

  //自动获取服务器数据并存入状态中
  useEffect(() => {
    console.log(UserInfo);
  }, [])


  //控制子组件的钩子
  const noteFormRef = useRef()

  //向服务器添加一个笔记
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        noteFormRef.current.toggleVisibility()
      })
  }

  //展示判断逻辑
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  //从服务器修改的逻辑
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/patient" element={<Patient Id={UserInfo.Id}  />} />
          <Route path="/doctor" element={<Doctor Id={UserInfo.Id} /> } />
          <Route path="/admin" element={<Admin Id={UserInfo.Id} />} />
          <Route path="/" element={<Login changeState={getLogInStatus}/>} />
        </Routes>
      </Router>

      <h1>{UserInfo.Id}</h1>

    </div>
  )
}

export default App
