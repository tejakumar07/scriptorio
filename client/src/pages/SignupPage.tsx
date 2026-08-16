import { Link, useNavigate } from "react-router-dom"
import { Quote } from "../components/Quote"
import { InputBox } from "../components/InputBox"
import { signupInputs } from "@tejakumar07/scriptorio"
import type { SignupInputs } from "@tejakumar07/scriptorio"
import { useState } from "react"
import { Button } from "../components/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"

export const Signup = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState<SignupInputs>({
        email: "",
        password: ""
    })

    async function sendRequest() {
        const result = signupInputs.safeParse(inputs);
        if (!result.success) {
            toast.error(result.error.errors[0].message);
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/user/signup`, inputs);
            const jwt = response.data.token;

            if (!jwt) {
                toast.error(response.data.message || "Failed to signup");
                return;
            }

            localStorage.setItem("token", jwt)
            toast.success("Signup Successfully");
            navigate("/blogs")
        }
        catch(e: any) {
            toast.error(e.response?.data?.message || "Failed to signup");
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
                            Create an Account
                        </h1>

                        <div className="mt-2 flex justify-center gap-2 text-lg font-semibold text-gray-400">
                            <span>
                                Already have an Account?
                            </span>

                            <Link
                                className="underline hover:text-black"
                                to="/login"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    
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
                            <Button label="Signup" onClick={sendRequest} />
                        </div>

                    </div>

                </div>

            </section>

            <section className="hidden md:flex items-center justify-center">
                <Quote />
            </section>

        </main>
    )
}