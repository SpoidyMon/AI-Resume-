import { useState } from "react"
import "../pages/auth.form.scss"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useauth.js"

const Login = () => {
  const {loading,handleLogin}=useAuth();
  const navigate=useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit =async (e) => {
    e.preventDefault();
    await handleLogin({ email, password })
    navigate('/')
  }

  if(loading){
    return (
      <main><h1>Loading ....</h1></main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="email" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" required />
          </div>

          <button className="button primary-button" >Login</button>
        </form>
        <p>Didn't have an account ? <Link to={"/register"}>Register here !!</Link> </p>
      </div>
    </main>
  )
}

export default Login