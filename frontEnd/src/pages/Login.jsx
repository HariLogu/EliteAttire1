import { useContext, useEffect, useState } from "react"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext";
import axios from "axios"
import { toast } from "react-toastify";
import {Link} from "react-router-dom"

const Login = () => {
  const [currentState,setCurrentState]=useState("login");
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext);
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

  async function onSubmitHandler(event){
    event.preventDefault();
    try {
      if(currentState === "sign up"){
        const response=await axios.post(backendUrl+"/api/user/register",{name,email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendUrl+"/api/user/login",{name,email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])
  return (
    <form action="" onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600">
      <div className="inline-flex items-center gap-2 text-2xl mb-2 mt-10 uppercase">
        <Title text2={currentState} className=" capitalize"/>
        <hr  className="border-none"/>
      </div>

        {currentState !== "login"? <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800 capitalize rounded focus:outline-none" placeholder="name" required />:""}
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800  rounded focus:outline-none" placeholder="email" required />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800 capitalize rounded focus:outline-none" placeholder="password" required />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          {currentState === "login"?<Link to={"/forgot"} className="cursor-pointer capitalize hover:text-blue-700">forgot password?</Link>:""}
          {
            currentState === "login"
            ? <p onClick={()=>setCurrentState("sign up")} className="cursor-pointer capitalize hover:text-blue-700">create account</p>
            : <p onClick={()=>setCurrentState("login")} className="cursor-pointer capitalize hover:text-blue-700">login here</p>  
          }
        </div>
        <button className="bg-amber-300 w-full text-black py-2 text-sm rounded capitalize cursor-pointer hover:bg-amber-200 transition-all ease-in-out font-medium active:bg-amber-300">{currentState === "login" ? "login":"sign up"}</button>


    </form>
  )
}
export default Login

// ok