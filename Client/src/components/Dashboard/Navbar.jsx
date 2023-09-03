import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar({toggleSidebar}) {
  const { projectID } = useParams();
  const [projectName, setProjectName] = useState('unknown');
  const [userName, setUserName] = useState('unknown');
  const [profileToggle,setProfileToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(()=>{
    axios.get('http://localhost:5500/getusername/'+projectID)
    .then(res=>setUserName(res.data))
    .catch(err=>console.log(err))
  },[])

  useEffect(() => {
    axios
      .get('http://localhost:5500/getprojectname/' + projectID)
      .then((res) => setProjectName(res.data))
      .catch((err) => alert(err));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projectID]);

  return (
    <div
      style={{
        background: '5px 5px #e8e8e0',
        maxWidth: '100%',
      }}
      className='navbarpadding d-flex justify-content-between align-items-center py-2'
    >
      {windowWidth <= 850 ? (
        <FontAwesomeIcon 
          onClick={toggleSidebar}
          style={{ cursor: 'pointer' }}
          className='fs-3 ps-3'
          icon={faBars}
        />
      ) : (
        ''
      )}
      <center>
        <h3 className='BA ms-3'>
          {projectName} 
        </h3>
      </center>
      <p
        className='pe-5 fs-5 text-dark'
      >
        {userName}
        <FontAwesomeIcon className='fs-2 ms-3' onClick={()=>setProfileToggle(!profileToggle)} style={{cursor:'pointer'}} icon={faUser} />
      </p>
      {(profileToggle)?
      <div className='p-4' style={{position:'absolute',right:0,top:65,background: '5px 5px #e8e8e0'}}>
        <p>Hey, {userName}</p>
        <Link to={'/registration'}>Log out</Link>
      </div>
      :''}
    </div>
  );
}

export default Navbar;
