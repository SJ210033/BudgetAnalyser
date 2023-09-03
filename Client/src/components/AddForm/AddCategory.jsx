import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function AddCategory() {
  const {projectID} = useParams();
  const [categoryName,setCategoryName] = useState('');
  const [categoryDescription,setCategoryDescription] = useState('');
 
  const handleSubmit = (e) =>{  
    e.preventDefault();
    axios.post('http://localhost:5500/pushcategorydata',{categoryName,categoryDescription,projectID})
    .then(res=>{
        if(res.status===200){
            alert('successfully created!')
            window.location.reload();
        }
        else{
            alert('There is some issues in Upload')
        }
    })
  }

  return (
    <div className='d-flex justify-content-center'>
        <div style={{height:'500px',width:'500px'}} className='mt-5 pt-3'>
            <center> 
                <h4>ADD CATEGORY</h4>
            </center>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='d-flex flex-column'>
                    <label>Category Name</label>
                    <input required onChange={(e)=>setCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Category Description</label>
                    <textarea required onChange={(e)=>setCategoryDescription(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>CREATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default AddCategory