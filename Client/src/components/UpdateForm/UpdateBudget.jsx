import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UpdateBudget(props) {
    const {budID} = props;
    const [budgetAmount,setBudgetAmount] = useState();
    const [budgetDetails,setBudgetDetails] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5500/getbudgetdetailsdata/'+budID)
        .then(res=>{
            setBudgetAmount(res.data[0].budgetAmount);
            setBudgetDetails(res.data[0].budgetDetails);
        })
    },[budID])

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5500/updatebudgetdata/'+budID,{budgetAmount,budgetDetails})
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

    console.log('->'+budID);

  return (
    <div className='d-flex justify-content-center px-5 py-3'>
        <div style={{height:'400px',width:'500px'}} className='mt-5 pt-3'>
            <center> 
                <h4>UPDATE BUDGET</h4>
            </center>
            <form className='mt-4'>
                <div className='d-flex flex-column'>
                    <label>Budget Amount</label>
                    <input value={budgetAmount} onChange={(e)=>setBudgetAmount(parseFloat(e.target.value))} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Category Description</label>
                    <textarea value={budgetDetails} onChange={(e)=>setBudgetDetails(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button onClick={handleUpdate} className='btn btn-primary mt-5'>UPDATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default UpdateBudget