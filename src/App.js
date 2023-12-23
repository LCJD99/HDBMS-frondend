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
    console.log("backfunction");
    setUserInfo({
      "Id" : id,
      "role" : role,
      "isLogin": statue
    })
  }

  //自动获取服务器数据并存入状态中
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  //保存到浏览器中
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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

  //判断并跳转
  
  // if (isLogin === true){
  //   navigate('/patient')
  // }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/patient" element={<Patient id={UserInfo.Id} />} />
          <Route path="/doctor" element={<Doctor id={UserInfo.Id} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Login changeState={getLogInStatus}/>} />
        </Routes>
      </Router>

      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {/* {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      } */}

      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul> */}

      <Footer />
    </div>
  )
}

export default App
