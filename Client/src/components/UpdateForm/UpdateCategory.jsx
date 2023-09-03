import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UpdateCategory(props) {
    const [categoryName,setCategoryName] = useState('');
    const [categoryDescription,setCategoryDescription] = useState('');
    const {catId} = props;

    useEffect(()=>{
        axios.get('http://localhost:5500/getcategorydata/'+catId)
        .then(res=>{
            setCategoryName(res.data[0].categoryName);
            setCategoryDescription(res.data[0].categoryDescription);
        })
        .catch(err=>console.log(err))
      },[catId])   

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5500/updatecategorydata/'+catId,{categoryName,categoryDescription})
        .then(res=>{
            if(res.status===200){
                alert('Updated Successfull')
                window.location.reload();
            }
            else{
                alert('There is an Error. Please TRY AGAIN !')
            }
        })
        .catch(err=>alert(err))
    }

  return (
    <div className='d-flex justify-content-center px-5 py-3'>
        <div style={{height:'400px',width:'500px'}} className='mt-5 pt-3'>
            <center> 
                <h4>UPDATE CATEGORY</h4>
            </center>
            <form className='mt-4'>
                <div className='d-flex flex-column'>
                    <label>Category Name</label>
                    <input value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Category Description</label>
                    <textarea value={categoryDescription} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button onClick={handleUpdate} className='btn btn-primary mt-5'>UPDATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default UpdateCategory