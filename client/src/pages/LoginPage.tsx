import { Link, useNavigate } from "react-router-dom"
import { Quote } from "../components/Quote"
import { InputBox } from "../components/InputBox"
import { signinInputs } from "@tejakumar07/scriptorio"
import type { SigninInputs } from "@tejakumar07/scriptorio"
import { useState } from "react"
import { Button } from "../components/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"

export const Login = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<SigninInputs>({
        email: "",
        password: ""
    })

    async function SendRequest() {
        const result = signinInputs.safeParse(inputs);
        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/user/login`, inputs)
            const jwt = response.data.token;

            if (!jwt) {
                toast.error(response.data.message || "Incorrect Password");
                return;
            }

            localStorage.setItem("token", jwt);
            toast.success("Login Successfully");
            navigate("/blogs")
        }
        catch(e: any) {
            toast.error(e.response?.data?.message || "Incorrect Password");
        }
    }

    return (
        <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            {/* Login Section */}
            <section className="flex items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold">
                            Welcome Back!
                        </h1>

                        <div className="mt-2 flex justify-center gap-2 text-lg font-semibold text-gray-400">
                            <span>
                                Don't have an Account?
                            </span>

                            <Link
                                className="underline hover:text-black"
                                to="/signup"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mt-8 space-y-5">

                        <InputBox
                            labelData="Email"
                            placeHolder="teja@gmail.com"
                            type="email"
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    email: e.target.value
                                })
                            }}
                        />

                        <InputBox
                            labelData="Password"
                            placeHolder=""
                            type="password"
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    password: e.target.value
                                })
                            }}
                        />

                        <div className="w-full">
                            <Button label="Login" onClick={SendRequest} />
                        </div>

                    </div>

                </div>

            </section>

            {/* Quote Section */}
            <section className="hidden md:flex items-center justify-center">
                <Quote />
            </section>

        </main>
    )
}
