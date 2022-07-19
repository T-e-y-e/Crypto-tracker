import './css/Spinner.css'

const Spinner = () => {
  return (
    <div>
       <div className='spinner-container'>
         <div role="status">
           <img src={ require("../assets/brand-logo.svg").default } alt="" className='spinner w-12'/>
           <span className="sr-only">Loading...</span>
         </div>
       </div>
    </div>
  )
}

export default Spinner