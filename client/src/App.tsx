import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { Signup } from "./pages/SignupPage";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Post } from "./pages/Post";
import { Landing } from "./pages/Landing";
import { Toaster } from "react-hot-toast";

export function App() {
	return (
		<div>
			<Toaster position="top-right" />
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Landing />} />
					<Route path={"/login"} element={< Login />}/>
					<Route path={"/signup"} element={<Signup />} />
					<Route path={"/blogs"} element={<Blogs />} />
					<Route path={"/blog/:id"} element={<Blog />} />
					<Route path={"/post"} element={<Post />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;