import React, { useState } from 'react'
import { assets } from '../assets/assets'

const RecruiterLogin = () => {
    
   const [state, setState] = useState('login')
   const [name,setName] = useState('')
   const [password,setPasword] = useState('')
   const [email,setEmail] = useState('')
   const [image,setImage] = useState(false)
   const [isTextDataSimbited,setIsTextDataSumbited] = useState(false)






   
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg=black/30 flex justify-center items-center'>
        <form action="">
            <h1>Recruiter {state}</h1>
            <p> Welcome Back Pls sign in to countibue</p>
            <>
            <div>
                <img src={assets.person_icon} />
                <input onChange={e => setName(e.target.value)} value={name} type="text"  placeholder='Company name' required/>

            </div>
            <div>
                <img src={assets.email_icon} />
                <input onChange={e => setEmail(e.target.value)} value={email} type="email"  placeholder='email id' required/>

            </div> 
            <div>
                <img src={assets.lock_icon} />
                <input onChange={e => setName(e.target.value)} value={password} type="password"  placeholder='Password' required/>

            </div>

            </>
            <button>
                {state == 'login' ? 'login' : 'create account'}
            </button>

        </form>

    </div>
  )
}

export default RecruiterLogin
