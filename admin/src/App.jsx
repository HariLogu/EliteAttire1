import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import {Routes,Route} from "react-router-dom"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import {useState,useEffect} from "react"
import Login from "./components/Login"
import {ToastContainer} from "react-toastify"
import "react-toastify"

export const backendURL=import.meta.env.VITE_BACKEND_URL;
export const currency= "$"


const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"")

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="min-h-screen bg-gray-50" >
      <ToastContainer/>
      {token === ""
      ?<Login setToken={setToken}/>
      :<>
        <Navbar setToken={setToken}/> 
        <hr />
        <div className="w-full flex">
          <Sidebar/>
          <div>
            <Routes>
              <Route path="/add" element={<Add token={token}/>}/>
              <Route path="/products" element={<List token={token}/>}/>
              <Route path="/orders" element={<Orders token={token}/>}/>
            </Routes>
          </div>
        </div>
      </>
      }
    </div>
  )
}
export default App 

// ok