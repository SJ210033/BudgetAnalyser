import React from 'react'
import logo from '../images/BudgetAnalyser_Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function NavbarEntry() {
  return (
    <div style={{boxShadow:'5px 5px #e8e8e8',maxWidth:'100%'}} className='navbarpadding d-flex justify-content-between align-items-center px-5'>
        <Link to={'/'}><img className='logo' src={logo} alt="" /></Link>
        <h2 className='BA' style={{color:'#007bff'}}>BUDGET ANALYSER</h2>
        <Link to={'/registration'} style={{color:'white',fontWeight:'bolder', textDecoration:'none',padding:'.5rem .8rem',background:'#007bff',borderRadius:'5px'}}>LOGIN <FontAwesomeIcon icon={faArrowTrendUp}></FontAwesomeIcon></Link>
    </div>
  )
}

export default NavbarEntry