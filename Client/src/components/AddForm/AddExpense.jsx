import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function AddExpense() {
  const {projectID} = useParams();

  const [categoryData,setCategoryData] = useState([]);
  const [subCategoryData,setSubCategoryData] = useState([]);
  const [listSubCategoryData,setListSubCategoryData] = useState([]);
  const [budgetAmount,setBudgetAmount] = useState('choose product');

  const [categoryID , setCategoryID] = useState(0);
  const [subCategoryID , setSubCategoryID] = useState(0);
  const [listSubCategoryID , setListSubCategoryID] = useState(0);

  const approvedStatus = 'not yet';
  const [expenseAmount,setExpenseAmount] = useState(-1);
  const [expenseDetails,setExpenseDetails] = useState('');

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

  useEffect(()=>{
    
      axios.get('http://localhost:5500/getlistsubcategorydatasubcat/'+subCategoryID)
      .then(res=>setListSubCategoryData(res.data))
      .catch(err=>console.log(err))
    
  },[subCategoryID,categoryID])

  useEffect(()=>{
    axios.get('http://localhost:5500/getbudgetdetailsdatasubcat/'+listSubCategoryID)
    .then(res=>setBudgetAmount(res.data[0].budgetAmount))
    .catch(err=>console.log(err))
  },[listSubCategoryID])
 
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(budgetAmount!='choose product'){
      axios.post('http://localhost:5500/pushexpensedata',{expenseAmount,expenseDetails,approvedStatus,projectID,categoryID,subCategoryID,listSubCategoryID})
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
      alert('First Fix Budget!')
    }
  }

  console.log(budgetAmount);

  return (
    <div className='d-flex justify-content-center'>
        <div style={{height:'500px',width:'650px'}} className='mt-5 pt-3'>
            <center>
                <h4>ADD EXPENSE DETAILS</h4>
            </center>
            <form onSubmit={handleSubmit} className='mt-5'>
                <div style={{width:'100%'}} className='d-flex'>
                  <div style={{width:'50%'}}>
                      <label className='me-5 pe-2' htmlFor="">Category</label>
                      <select className='ms-3' onChange={(e)=>setCategoryID(e.target.value)} name="" id="" required>
                      <option value={0}>select</option>
                      {categoryData.map(m=><option key={m.categoryID} value={m.categoryID}>{m.categoryName}</option>)}
                      </select>
                  </div>
                  <div style={{width:'50%'}}>
                      <label htmlFor="">Sub Category</label>
                      <select className='ms-3' onChange={(e)=>setSubCategoryID(e.target.value)} name="" id="" required>
                      <option value={0}>select</option>
                      {subCategoryData.map(n=><option key={n.subCategoryID} value={n.subCategoryID}>{n.subCategoryName}</option>)}
                      </select>
                  </div>
                </div>
                <div style={{width:'100%'}} className='mt-4 d-flex'>
                    <div style={{width:'50%'}}>
                      <label htmlFor="">SubCategory List</label>
                      <select className='ms-3' onChange={(e)=>setListSubCategoryID(e.target.value)} name="" id="" required>
                      <option value={0}>select</option>
                      {listSubCategoryData.map(n=><option key={n.listSubCategoryID} value={n.listSubCategoryID}>{n.listSubCategoryName}</option>)}
                      </select>
                    </div>
                    <div className='d-flex' style={{width:'50%'}}>
                      <p>BUDGET</p>
                      <h6 style={{border:'.1px solid gray'}} className='ms-5 p-2'><b>₹ {budgetAmount}</b></h6>
                    </div>
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Expense Amount</label>
                    <input onChange={(e)=>setExpenseAmount(parseFloat(e.target.value))} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" placeholder='let say ₹ 300' />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Expense Details</label>
                    <textarea onChange={(e)=>setExpenseDetails(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button className='btn btn-primary mt-5'>ADD NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default AddExpense