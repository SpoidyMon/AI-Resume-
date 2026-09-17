import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { getMe, login, register } from "../Services/api.auth";


export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin=async({ email, password }) => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            setUser(response.user)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister=async({ username, email, password }) => {
        setLoading(true);
        try {
            const response = await register({ username, email, password });
            setUser(response.user)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }
    const handleLogout=async() => {
        setLoading(true);
        try {
            await getMe();
            setUser(null)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    return { user, setUser, loading, setLoading, handleLogin, handleLogout, handleRegister }
}