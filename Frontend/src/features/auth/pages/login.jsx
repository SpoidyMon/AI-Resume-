import "../pages/auth.form.scss"
import {Link} from "react-router"

const Login = () => {
  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="input-group">
            
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <button className="button primary-button" >Login</button>
        </form>
        <p>Didn't have an account ? <Link to={"/register"}>Register here !!</Link> </p>
      </div>
    </main>
  )
}

export default Login