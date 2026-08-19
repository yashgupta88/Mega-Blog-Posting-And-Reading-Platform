import { useState ,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice' 
import { Provider } from 'react-redux'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

import './App.css'
// Note: You must create custom environment variables beginning with REACT_APP_. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.
// But we had made an vite app , so we had to see  vite app docs for it , to use env variables 
// in vite app , we put VITE before variable name and use it by  , import.meta.env   -->> console.log(import.meta.env.VITE_APPWRITE_URL)

function App() {
  const [loading , setLoading ] = useState(true )
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{ 
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen bg-gray-400 flex flex-wrap justify-center items-center'>
      <div className='w-full block'>
        <Header></Header>
        <main>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
        
      </div>
    </div>
  ) : (null)
}

export default App
