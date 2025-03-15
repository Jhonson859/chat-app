
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  )
}

export default App