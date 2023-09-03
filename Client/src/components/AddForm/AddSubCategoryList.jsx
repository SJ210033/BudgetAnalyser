import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom';

function AddSubCaregoryList() {
  const {projectID} = useParams();
  const [categoryData,setCategoryData] = useState([]);
  const [subCategoryData,setSubCategoryData] = useState([]);
  const [categoryID , setCategoryID] = useState(0);
  const [subCategoryID , setSubCategoryID] = useState(0);
  const [listSubCategoryName,setListSubCategoryName] = useState('');
  const [listSubCategoryDescription, SetlistSubCategoryDescription] = useState('');
  const [listSubCategoryPhoto,setListSubCategoryPhoto] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:5500/getcategorymaindata/'+projectID)
    .then(res=>setCategoryData(res.data))
    .catch(err=>console.log(err)) 
  },[])

  useEffect(()=>{
    
      axios.get('http://localhost:5500/getsubcategorydatacat/'+categoryID)
      .then(res=>setSubCategoryData(res.data))
      .catch(err=>console.log(err))
    
  },[categoryID])
 
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(categoryID>0 && subCategoryID>0){
      axios.post('http://localhost:5500/pushlistsubcategorydata',{listSubCategoryName,listSubCategoryDescription,projectID,categoryID,subCategoryID})
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
      if(categoryID==0){
        alert("please select category");
      }
      else{
        alert("please select sub category");
      }
    }
  }

  return (
    <div className='d-flex justify-content-center'>
        <div style={{height:'500px',width:'500px'}} className='mt-5 pt-3'>
            <center>
                <h4>ADD SUB CATEGORY LIST</h4>
            </center>
            <form onSubmit={handleSubmit} className='mt-5'>
                <div className='d-flex'>
                  <div>
                      <label htmlFor="">Category</label>
                      <select className='ms-3' onChange={(e)=>setCategoryID(e.target.value)} name="" id="" required>
                      <option value={0}>select</option>
                      {categoryData.map(m=><option value={m.categoryID}>{m.categoryName}</option>)}
                      </select>
                  </div>
                  <div className='ms-5'>
                      <label htmlFor="">Sub Category</label>
                      <select className='ms-3' onChange={(e)=>setSubCategoryID(e.target.value)} name="" id="" required>
                      <option value={0}>select</option>
                      {subCategoryData.map(n=><option value={n.subCategoryID}>{n.subCategoryName}</option>)}
                      </select>
                  </div>
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Sub Category List Name</label>
                    <input required onChange={(e)=>setListSubCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Sub Category List Description</label>
                    <textarea required onChange={(e)=>SetlistSubCategoryDescription(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>CREATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default AddSubCaregoryList