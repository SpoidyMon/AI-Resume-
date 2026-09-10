const Login = () => {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default Login