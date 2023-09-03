import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UpdateSubCategory(props) {
    const [categoryData,setCategoryData] = useState([]);
    const [subCategoryName,setSubCategoryName] = useState('');
    const [subCategoryDescription,setSubCategoryDescription] = useState('');
    const [categoryID,setCategoryID] = useState(0);
    const {subCatId} = props;
    const {projectID} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:5500/getcategorymaindata/'+projectID)
        .then(res=>setCategoryData(res.data))
        .catch(err=>console.log(err))
      },[])

    useEffect(()=>{
        axios.get('http://localhost:5500/getsubcategorydata/'+subCatId)
        .then(res=>{
            setSubCategoryName(res.data[0].subCategoryName);
            setSubCategoryDescription(res.data[0].subCategoryDescription);
            setCategoryID(res.data[0].categoryID);
        })
        .catch(err=>console.log(err))
      },[subCatId])  

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5500/updatesubcategorydata/'+subCatId,{subCategoryName,subCategoryDescription,categoryID})
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
    <div className='d-flex justify-content-center px-5 py-5 mb-4'>
        <div style={{height:'400px',width:'500px'}} className='mt-2 pt-3'>
            <center>
                <h4>UPDATE SUB CATEGORY</h4>
            </center>
            <form onSubmit={handleUpdate} className='mt-5'>
                <div>
                      <label htmlFor="">Select Category</label>
                      <select className='ms-3' onChange={(e)=>setCategoryID(e.target.value)} name="" id="" required>
                        <option value={0}>select</option>
                      {categoryData.map(m=><option value={m.categoryID}>{m.categoryName}</option>)}
                      </select>
                  </div>
                <div className='d-flex flex-column mt-4'>
                    <label>SubCategory Name</label>
                    <input value={subCategoryName} required onChange={(e)=>setSubCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>SubCategory Description</label>
                    <textarea value={subCategoryDescription} required onChange={(e)=>setSubCategoryDescription(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>UPDATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default UpdateSubCategory