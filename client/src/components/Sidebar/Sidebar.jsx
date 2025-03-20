import React from 'react'
import { NavLink } from "react-router"
import { FaRegUser } from "react-icons/fa6";
import { CgMenuGridR } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdChat } from "react-icons/md";


function Sidebar() {
    return (
        <div className='sidebarconatiner'>
            
            <ul className='sideulcont'>
                <li>
                    <NavLink className="nav" to="/log"><FaRegUser className='reacticons' /></NavLink>
                    

                </li>
                <li>
                <NavLink className="nav" to="/"><CgMenuGridR className='reacticons' /></NavLink>
                    

                </li>


                <li>
                <NavLink className="nav" to="/create"><IoAddCircleSharp className='reacticons' /></NavLink>
                    

                </li>

                <li>
                <NavLink className="nav"><MdChat className='reacticons' /></NavLink>
                    

                </li>
            </ul>
        </div>
    )
}

export default Sidebar
