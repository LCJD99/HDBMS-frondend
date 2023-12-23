
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
    useParams,
    useNavigate,
  } from "react-router-dom"

//logout时记得将状态重置
const Doctor = ({id}) => {
    return(
        <div>
            <Link to="/">logout</Link>
            <h1> doctor {id}</h1>
        </div>
    )
}

export default Doctor