import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UpdateSubCategoryList(props) {
    const [categoryData,setCategoryData] = useState([]);
    const [subCategoryData,setSubCategoryData] = useState([]);
    const [listSubCategoryName,setListSubCategoryName] = useState('');
    const [listSubCategoryDescription,setListSubCategoryDescription] = useState('');
    const [categoryID,setCategoryID] = useState();

    const [catID,setCatID] = useState(-1);

    const [subCategoryID,setSubCategoryID] = useState();

    const {subCatListId} = props;
    const {projectID} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:5500/getcategorymaindata/'+projectID)
        .then(res=>setCategoryData(res.data))
        .catch(err=>console.log(err))
      },[])

    useEffect(()=>{
        axios.get('http://localhost:5500/getsubcategorydatacat/'+catID)
        .then(res=>setSubCategoryData(res.data))
        .catch(err=>console.log(err))
    },[categoryID])

    useEffect(()=>{
        axios.get('http://localhost:5500/getlistsubcategorydata/'+subCatListId)
        .then(res=>{
            setListSubCategoryName(res.data[0].listSubCategoryName);
            setListSubCategoryDescription(res.data[0].listSubCategoryDescription);
            setCategoryID(res.data[0].categoryID);
            setSubCategoryID(res.data[0].subCategoryID);
        })
        .catch(err=>console.log(err))
      },[subCatListId])  

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5500/updatelistsubcategorydata/'+subCatListId,{listSubCategoryName,listSubCategoryDescription,categoryID,subCategoryID})
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
    <div className='d-flex justify-content-center px-5 pt-2 pb-5 mb-4'>
        <div style={{height:'400px',width:'500px'}} className='mt-5 pt-3'>
            <center>
                <h4>UPDATE SUB CATEGORY LIST</h4>
            </center>
            <form onSubmit={handleUpdate} className='mt-5'>
                <div className='d-flex'>
                  <div>
                      <label htmlFor="">Category</label>
                      <select className='ms-3' onChange={(e)=>{setCategoryID(e.target.value);setCatID(e.target.value)}} name="" id="" required>
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
                    <input value={listSubCategoryName} onChange={(e)=>setListSubCategoryName(e.target.value)} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Sub Category List Description</label>
                    <textarea value={listSubCategoryDescription} onChange={(e)=>setListSubCategoryDescription(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>UPDATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default UpdateSubCategoryList