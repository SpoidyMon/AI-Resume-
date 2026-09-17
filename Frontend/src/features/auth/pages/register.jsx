import "../pages/auth.form.scss"
import { Link, Navigate } from "react-router"



const Register = () => {

    // const navigate=Navigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate("/");

    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                    </div>

                    <button className="button primary-button" >Register</button>
                </form>
                <p>Already Registered ? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register