import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import TextInput from "../components/utils/TextInput";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API_BASE_URL from "../api";
import Spinner from "../components/utils/Spinner";
import { Lock } from "lucide-react"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [isLogin, setIsLogin] = useState(true)
	const [loading, setLoading] = useState(false)
	const { user, setUser } = useContext(AuthContext)
	const navigate = useNavigate();

	useEffect(() => {
		if (user)
			navigate("/projects")
	}, [user, navigate])

	const handleLogin = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const params = new URLSearchParams();
			params.append("username", email);
			params.append("password", password);

			const data = await axios.post(
				`${API_BASE_URL}/auth/login`,
				params,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);
			setError(null)
			const token = data.data.access_token
			localStorage.setItem("accessToken", token)
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			const userData = jwtDecode(token)
			const user = userData.user
			setUser(user)
			navigate("/projects")
		} catch (e) {
			const response = e.response.data
			setError(response.message)
			setUser(null)
		}
		finally {
			setLoading(false)
		}
	}

	const handleSignUp = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`${API_BASE_URL}/users`, {
				email,
				password
			})
			setError(false)
			setIsLogin(true)
			setError(null)
		} catch (e) {
			const response = e.response.data
			setError(response.message)
		}
	}

	return (
		<>
			<Navbar>
				<BlueButton>
					<a href="/">Home</a>
				</BlueButton>
			</Navbar>

			<Container>
				<div className="h-screen flex flex-col items-center justify-center text-center gap-5 sm:px-36">
					<Lock className="w-18 h-18 text-blue-500 bg-blue-900/30 rounded-4xl p-4" />
					<h1 className="text-4xl">{isLogin ? "Welcome Back" : "Welcome to TrackFlow"}</h1>
					<p className="text-neutral-500 text-lg">{isLogin ? "Sign in to your TrackFlow Account" : "Sign up for a TrackFlow Account"}</p>

					{/* Login box */}
					<form className="border-neutral-500/30 bg-neutral-900/40 border p-8 flex flex-col gap-2 rounded-lg sm:min-w-lg" onSubmit={isLogin ? handleLogin : handleSignUp}>
						<h2 className="text-2xl">{isLogin ? "Login" : "Sign Up"}</h2>
						{error ? <span className="text-red-400 bg-red-900/30 self-center py-2 px-4 rounded-4xl">{error}</span> : ""}
						<TextInput isLoading={loading} label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
						<TextInput isLoading={loading} label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

						<BlueButton disabled={loading} onClick={isLogin ? handleLogin : handleSignUp}>{loading ? <Spinner size="h-5 w-5" color="border-white" /> : "Submit"}</BlueButton>
						<span>{isLogin ? "Don't have an account?" : "Have an account?"}<span className="text-blue-400 self-center py-1 px-2 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Login"}</span></span>
					</form>
				</div>
			</Container>

		</>
	)
}
