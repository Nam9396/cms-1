import React, { useEffect, useState } from 'react'
import { SpinnerPage } from '../components/Spinner'
import { toast } from 'react-toastify'
import AuthComponent from '../lib/test'
import { getUser, signIn } from '../lib/msFunction'

const OneDriveScreen = () => {
  const [ user, setUser ] = useState(sessionStorage.getItem(""));


  const displayUser = async() => {
    const res = await getUser();
    setUser(res.displayName)
  } 
  
  return (
    <div>
      <button
        className='p-4 bg-indigo-600 text-white w-fit rounded-md my-2'
        onClick={() => signIn()}
      >Sign in </button>

      <button
        className='p-4 bg-indigo-600 text-white w-fit rounded-md my-2'
        onClick={() => displayUser()}
      >Display user</button>

      <div className='mt-10 text-2xl'>{user}</div>
    </div>
  )
}

export default OneDriveScreen;