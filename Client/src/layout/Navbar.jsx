import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [hide, setHide] = useState(false);
    const { user } = useSelector((state) => state.root.auth)

    return (
        <nav className="fixed px-4 top-0 left-0 right-0 border-b-black shadow-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" style={{ zIndex: "100" }}>
            <div className="flex justify-between relative flex-wrap md:flex-nowrap md:whitespace-nowrap items-center p-4">
                <div href="#" className="flex items-center gap-2">
                    <Link to="/dashbopardhome" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Task Management <span className='text-[red] text-lg'>App</span></Link>
                </div>

                <div className='hidden sm:block textParent'>
                    <div className='textChild text-white text-xl tracking-widest'>Welcome <span className='text-[red]'>{`${user.username}`}</span></div>
                </div>

                {/* ----Middle Text---- */}
                <div className={`${hide ? "visible absolute md:relative  md:top-auto top-16 transition-all duration-700 ease-in-out " : "-top-[400px]  md:right-auto"} md:w-[70px] block w-full right-[2px] `}>
                    <div className={` ${hide ? "visible" : "hidden"} justify-end bg-white md:bg-transparent w-full items-center  shadow-lg rounded-lg md:border-none md:shadow-none md:flex md:w-auto md:order-1 `} id="navbar-user">
                        <ul className={`flex flex-col md:flex-row font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 gap-2 md:gap-0 transition-all duration-300 ease-in-out`}>
                            <li className="relative group">
                                <Link to="/home" className="block py-2 pl-3 pr-4 text-white rounded hover:text-red-500 md:border-0 md:p-0 cursor-pointer"
                                    onClick={() => setHide(false)}>
                                    Log out
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;
