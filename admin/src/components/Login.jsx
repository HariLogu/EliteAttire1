import {useState} from "react";
import axios from "axios"
import { backendURL } from "../App";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const Login = ({setToken}) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    async function onSubmitHandler(event){
        try {
            event.preventDefault();
            const response=await axios.post(backendURL + "/api/user/admin",{email,password})
            if(response.data.success){
                setToken(response.data.token)
                navigate("/add")
            }else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
  return (
    <div className="bg-gray-200 flex flex-col justify-center items-center min-h-[100vh]">
        <div className="bg-white border w-[80%] md:w-[30%] border-gray-400 rounded px-5 py-3 ">
            <h1 className="font-bold capitalize text-lg">admin panel</h1>
            <form action="" onSubmit={onSubmitHandler} className="flex flex-col gap-5 my-5">
                <div className="flex flex-col gap-2">
                    <p className="text-sm capitalize">email address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email" className="text-sm focus:outline-none border border-zinc-400 rounded p-2" required value={email} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="capitalize text-sm">password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="text-sm focus:outline-none border border-zinc-400 rounded p-2" placeholder="Enter your password" required minLength={8} />
                </div>
                <button className="bg-black text-white text-sm py-2 rounded cursor-pointer active:gray-700 capitalize hover:bg-gray-500">login</button>
            </form>
        </div>
    </div>
  )
}
export default Login

// ok