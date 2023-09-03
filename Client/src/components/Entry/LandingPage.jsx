import React from 'react'
import NavbarEntry from './NavbarEntry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


function LandingPage() {
  return (
    <div>
      <NavbarEntry/>
      <div style={{marginTop:'15vh'}} className='d-flex flex-column justify-content-center align-items-center'>
        <center>
          <p className='mb-4 fs-3'>NAVIGATE YOUR BUDGET WITH </p>
        </center>
        <center>
          <h1>PRECISION AND PURPOSE</h1>
        </center>

        <Link to={'/registration'} className='mt-4' style={{color:'white',fontWeight:'bolder', textDecoration:'none',padding:'.9rem 1.3rem',background:'#007bff',borderRadius:'5px'}}>GET STARTED <FontAwesomeIcon icon={faArrowTrendUp}></FontAwesomeIcon></Link>
        <center>
          <p className='mt-5'>We help you to calculate and maintain the budget</p>
        </center>

        <p style={{marginTop:'30vh'}}>All copyrights are reserved @2023</p>
      </div>
    </div>
  )
}

export default LandingPage