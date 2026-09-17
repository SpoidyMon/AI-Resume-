import { useState } from "react";
import { useAuth } from "../hooks/useauth";
import "../pages/auth.form.scss"
import { Link, Navigate } from "react-router"



const Register = () => {
    const { loading, handleRegister } = useAuth();
    const navigate = Navigate();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/");

    }

    if (loading) {
        return (
            <main><h1>Loading...</h1></main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input on onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter username" id="name" name="name" type="text" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input on onChange={(e) => { setUsername(e.target.value) }}
                            placeholder="Enter email" id="email" name="email" type="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input on onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="Enter password" id="password" name="password" type="password" required />
                    </div>

                    <button className="button primary-button" >Register</button>
                </form>
                <p>Already Registered ? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register