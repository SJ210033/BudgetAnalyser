import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AddSubCategory() { 
  const {projectID} = useParams();
  const [categoryData,setCategoryData] = useState([]);
  const [categoryID,setCategoryID] = useState(0);
  const [subCategoryName,setSubCategoryName] = useState('');
  const [subCategoryDescription,setSubCategoryDescription] = useState('');
  

  useEffect(()=>{
    axios.get('http://localhost:5500/getcategorymaindata/'+projectID)
    .then(res=>setCategoryData(res.data))
    .catch(err=>console.log(err))
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    if(categoryID>0){
      axios.post('http://localhost:5500/pushsubcategorydata',{subCategoryName,subCategoryDescription,projectID,categoryID})
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
    else{
      alert('please select category');
    }
  }
  console.log(categoryID);
  return (
    <div className='d-flex justify-content-center'>
        <div style={{height:'500px',width:'500px'}} className='mt-5 pt-3'>
            <center>
                <h4>ADD SUB CATEGORY</h4>
            </center>
            <form onSubmit={handleSubmit} className='mt-5'>
                <div>
                      <label htmlFor="">Select Category</label>
                      <select className='ms-3' onChange={(e)=>setCategoryID(e.target.value)} name="" id="" required>
                        <option value={0}>select</option>
                      {categoryData.map(m=><option value={m.categoryID}>{m.categoryName}</option>)}
                      </select>
                  </div>
                <div className='d-flex flex-column mt-4'>
                    <label>SubCategory Name</label>
                    <input required onChange={(e)=>setSubCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>SubCategory Description</label>
                    <textarea required onChange={(e)=>setSubCategoryDescription(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>CREATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default AddSubCategory