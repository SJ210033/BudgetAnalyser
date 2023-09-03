import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faHouseChimney, faPenToSquare, faEye, faCoins, faMoneyBillTransfer, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import profileImg from '../images/profile.png';
import axios from 'axios';

function Sidebar() {
  const { projectID } = useParams();
  const [userName, setUserName] = useState('unknown');

  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5500/getusername/${projectID}`)
      .then(res => setUserName(res.data))
      .catch(err => alert(err));
  }, [projectID]);

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className='sidebar-main ps-2'>

      <Link className='link d-flex justify-content-center align-items-center'>
        <FontAwesomeIcon className='px-2 py-2 mt-1' style={{ color: 'white', fontSize: '2rem', border: '.1px solid white', borderRadius: '50%' }} icon={faCalculator} /> <p className='fs-5 me-3 ms-3 mt-4' style={{ color: 'white' }}>Budget Analyser</p>
      </Link>

      <div className="my-3 profile d-flex gap-4 align-items-center">
        <div>
          <img style={{ height: '3.5rem', width: '3.5rem', background: 'white', borderRadius: '50%' }} src={profileImg} alt="" />
        </div>
        <div>
          <h5 style={{ color: 'gray' }}>Welcome, </h5>
          <h4>{userName}</h4>
        </div>
      </div>

      <div style={{ cursor: 'pointer' }} className='mt-3 ms-1'>
        <div onClick={() => handleSectionClick('home')} className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <FontAwesomeIcon className='fs-5' icon={faHouseChimney} />
            <h5>Home</h5>
          </div>
          <FontAwesomeIcon className='me-4 mt-1' icon={faChevronDown} />
        </div>
        {openSection === 'home' ? (
          <ul className='d-flex mt-3'>
            <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
            <Link className='link' to={`/dashboard/${projectID}`}>Dashboard</Link>
          </ul>
        ) : ''}
      </div>

      <div style={{ cursor: 'pointer' }} className='mt-3 ms-1'>
        <div onClick={() => handleSectionClick('addForms')} className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <FontAwesomeIcon className='fs-5' icon={faPenToSquare} />
            <h5>Master</h5>
          </div>
          <FontAwesomeIcon className='me-4 mt-1' icon={faChevronDown} />
        </div>
        {openSection === 'addForms' ? (
          <ul className='d-flex flex-column mt-2'>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/addcategory`}>Category</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/addsubcategory`}>SubCategory</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/addsubcategorylist`}>SubCategoryList</Link>
            </div>
          </ul>
        ) : ''}
      </div>

      <div style={{ cursor: 'pointer' }} className='mt-3 ms-1'>
        <div onClick={() => handleSectionClick('viewForms')} className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <FontAwesomeIcon className='fs-5' icon={faEye} />
            <h5>View</h5>
          </div>
          <FontAwesomeIcon className='me-4 mt-1' icon={faChevronDown} />
        </div>
        {openSection === 'viewForms' ? (
          <ul className='d-flex flex-column mt-2'>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/viewcategory`}>Category</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/viewsubcategory`}>Sub Category</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/viewsubcategorylist`}>Sub Category List</Link>
            </div>
          </ul>
        ) : ''}
      </div>

      <div style={{ cursor: 'pointer' }} className='mt-3 ms-1'>
        <div onClick={() => handleSectionClick('budget')} className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <FontAwesomeIcon className='fs-5' icon={faCoins} />
            <h5>Budget</h5>
          </div>
          <FontAwesomeIcon className='me-4 mt-1' icon={faChevronDown} />
        </div>
        {openSection === 'budget' ? (
          <ul className='d-flex flex-column mt-2'>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/addbudget`}>Add Budget</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/viewbudget`}>View Budget</Link>
            </div>
          </ul>
        ) : ''}
      </div>

      <div style={{ cursor: 'pointer' }} className='mt-3 ms-1'>
        <div onClick={() => handleSectionClick('expense')} className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <FontAwesomeIcon className='fs-5' icon={faMoneyBillTransfer} />
            <h5>Expense</h5>
          </div>
          <FontAwesomeIcon className='me-4 mt-1' icon={faChevronDown} />
        </div>
        {openSection === 'expense' ? (
          <ul className='d-flex flex-column mt-2'>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/addexpense`}>Add Expense</Link>
            </div>
            <div className='d-flex mt-3 me-2'>
              <FontAwesomeIcon className='mt-1 me-2' icon={faCircle} />
              <Link className='link' to={`/dashboard/${projectID}/viewexpense`}>View Expense</Link>
            </div>
          </ul>
        ) : ''}
      </div>
    </div>
  );
}

export default Sidebar;
