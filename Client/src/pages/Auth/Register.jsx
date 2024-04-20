import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiMail } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { SyncLoader } from "react-spinners";
import { RegisterUser } from '../../services/api.services';


const Register = () => {
  const [hide, setHide] = useState(true)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInput = (event) => {
    const { value, id } = event.target
    setInitialData(preVal => ({ ...preVal, [id]: value }))
  }

  const validation = () => {
    if (!initialData.name) return { isError: false, message: "Name is missing" }
    else if (!initialData.email) return { isError: false, message: "Email is missing" }
    else if (!/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(initialData.email)) return { isError: false, message: "Please enter the correct email " }
    else if (!initialData.password) return { isError: false, message: "Password is missing" }
    else {
      return { isError: true }
    }
  }

  //to Register the form
  const handleRegister = async (e) => {
    e.preventDefault()
    if (validation().isError) {
      setLoading(true)
      try {
        let res = await RegisterUser(initialData)
        // console.log(res)
        if (res) {
          setLoading(false)
          navigate("/login")
          toast.success(res.data.message)
        }
      } catch (err) {
        setLoading(false)
        toast.success(err.response.data.message)
      }
    } else {
      setLoading(false)
      toast.warning(validation().message)
    }
  }


  return (
    <section className="registerForm ">
      <div className='bg-black/90 '>
        <div className=" border border-t-2 border-x-0 mt-[2px]  border-b-0 border-white bg-black/90 h-screen flex items-center justify-center px-5 py-5">
          <div
            className="max-w-[1000px] bg-gray-100 py-4 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          >
            <div className="md:flex w-full">
              <div className='hidden md:block object-left sm:w-[400px] lg:w-[500px] sm:h-[380px]'>
                <img src="/img/signin.jpg" alt='register' />
              </div>

              <div className="w-full md:w-1/2 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                  <p>Enter your information to register</p>
                </div>
                {/* //Name */}
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-3.5">
                      <label htmlFor="name" className="text-xs font-semibold px-1">Full Name</label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <HiOutlineUser />
                        </div>
                        <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="Enter your name"
                          id='name'
                          value={initialData.name}
                          onInput={handleInput} />
                      </div>
                    </div>
                  </div>
                  {/* //Email  */}
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <FiMail />
                        </div>
                        <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="Enter your email"
                          id='email'
                          value={initialData.email}
                          onInput={handleInput} />
                      </div>
                    </div>
                  </div>
                  {/* //Password  */}
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <RiLockPasswordFill />
                        </div>
                        <input type={`${hide ? "password" : "text"}`} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-s-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="************"
                          id='password'
                          value={initialData.password}
                          onChange={handleInput}
                        />
                        <div onClick={() => setHide(!hide)} className='w-10 h-11 flex justify-center items-center bg-gray-400 rounded-e-lg cursor-pointer'>
                          {hide ?
                            <AiFillEyeInvisible className='text-black ' size={20} />
                            :
                            <AiFillEye className='text-black ' size={20} />
                          }
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                        onClick={handleRegister}>
                        {loading ? <SyncLoader size={8} color="#fff" /> : " REGISTER NOW"}
                      </button>
                    </div>
                  </div>
                  <div className="text-black text-center">Already have an account? <br />
                    <NavLink to="/login" className='text-blue-500 cursor-pointer hover:text-blue-700' >Login now</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register