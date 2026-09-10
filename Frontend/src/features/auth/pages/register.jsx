const Register = () => {
    return (
        <main>
            <h1>Register</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required />

                <button type="submit">Register</button>
            </form>
        </main>
    )
}

export default Register