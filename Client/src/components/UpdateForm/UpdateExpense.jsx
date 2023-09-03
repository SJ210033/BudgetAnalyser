import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UpdateExpense(props) {
    const {expID} = props;
    const [expenseAmount,setExpenseAmount] = useState();
    const [expenseDetails,setExpenseDetails] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5500/getexpensedata/'+expID)
        .then(res=>{
            setExpenseAmount(res.data[0].expenseAmount);
            setExpenseDetails(res.data[0].expenseDetails);
        })
    },[expID])

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5500/updateexpensedata/'+expID,{expenseAmount,expenseDetails})
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

        console.log("-->" + expID);
    }

  return (
    <div className='d-flex justify-content-center px-5 py-3'>
        <div style={{height:'400px',width:'500px'}} className='mt-5 pt-3'>
            <center> 
                <h4>UPDATE EXPENSE</h4>
            </center>
            <form className='mt-4'>
                <div className='d-flex flex-column'>
                    <label>Expense Amount</label>
                    <input value={expenseAmount} onChange={(e)=>setExpenseAmount(parseFloat(e.target.value))} className='mt-2' style={{height:'2rem'}} type="text" name="" id="" />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <label>Category Description</label>
                    <textarea value={expenseDetails} onChange={(e)=>setExpenseDetails(e.target.value)} rows='4' className='mt-2' type="text" name="" id="" />
                </div>
                <center>
                    <button onClick={handleUpdate} className='btn btn-primary mt-5'>UPDATE NOW</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default UpdateExpense