import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const LoginPage =() => {

  const {register,handleSubmit, formState:{errors}} = useForm()
  const {signin, errors:signinErrors, isAuthenticated} = useAuth()
  const navigate = useNavigate()


  const onSubmit = handleSubmit((data) =>{
    signin(data)
  })

  useEffect(() =>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])

  return(
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        signinErrors.map((error,i) =>(
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error}
          </div>
        ))
      }

      <h1 className="text-3xl font-bold my-2">Ingresar</h1>

      <form onSubmit={onSubmit}>
            
            <input type="email" {...register('email',{required:true} )} placeholder="email" 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
            {
              errors.email && (<p className='text-red-500'>Email es requerido</p>
            )}
            <input type="password" {...register('password',{required:true, minLength: 6})} placeholder="password" 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
            {
              errors.password && (<p className='text-red-500'>Contraseña es requerida</p>
            )}
            <button
            className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
            >Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">No tienes una cuenta? <Link to='/register' className="text-sky-500">Registrarse</Link> </p>
      </div>
    </div>
  )
}

export default LoginPage;
