import React from 'react'
import {Link, NavLink } from 'react-router-dom';
import './css/Header.css'

interface Props {
  currency: string,
  setCurrency: React.Dispatch<React.SetStateAction<string>>,
  setSymbol: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({currency, setCurrency, setSymbol}: Props) => {
  return (
   <div>
<nav className="bg-slate-900 px-4 sm:px-4 dark:bg-gray-900">
  <div className="flex justify-between items-center mx-auto">
  <Link to="/" className="flex items-center">
      <span className="self-center flex items-center text-3xl text-slate-100  whitespace-nowrap dark:text-white">
       <img src={ require("../assets/brand-logo.svg").default } alt="" className='navbar-brand w-12'/>
        <span className='hidden sm:inline-block text-white ml-1 brand-name'>
          CryptIn
        </span>
       </span>
  </Link>

  <div className="justify-between flex items-center">
    <ul className="flex">
    <li>
        <NavLink to="/" className="flex items-baseline pt-4 pb-3 mr-5 md:mr-10 text-white text-lg font-semibold hover:text-slate-300 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          <img src={ require("../assets/house-solid.svg").default } alt="" className='navbar-brand w-6'/>
          <span className='pl-2 nav-link'>Home</span>
        </NavLink>
      </li>
      <li>
      <NavLink to="/trending" className="flex items-baseline pt-4 pb-3 ml-3 text-white text-lg font-semibold hover:text-slate-300 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          <span className='trend-img'><img src={ require("../assets/chart-simple-solid.svg").default } alt="" className='navbar-brand w-5'/></span>
          <span className='pl-2 nav-link'>Trending</span>
        </NavLink>
      </li>
    </ul>
  </div>
  <div className="flex items-center">
     <select className="dropdown-section bg-transparent text-white text-sm font-semibold rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     value={currency}
     onChange={(e) => {
      setCurrency(e.target.value)
      if(e.target.value === "USD"){
        setSymbol("$")
      }else if(e.target.value === "EUR"){
        setSymbol("€")
      } else if(e.target.value === "NGN"){
        setSymbol("₦")
      } 
    }}
     >
       <option value="USD" className='bg-slate-700'> USD </option>
       <option value="EUR" className='bg-slate-700'> EUR </option>
       <option value="NGN" className='bg-slate-700'> NGN </option>
     </select>
  </div>
  </div>
</nav>

    </div>
  )
}

export default Header
