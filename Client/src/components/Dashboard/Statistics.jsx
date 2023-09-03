import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Statistics() {
  const {projectID} = useParams();
  const [budgetAmount,setBudgetAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:5500/getbudgetsum/'+projectID)
    .then(res=>setBudgetAmount(res.data[0].budgetAmount))
    .catch(err=>console.log(err))
  },[])

  useEffect(()=>{
    axios.get('http://localhost:5500/getexpensesum/'+projectID)
    .then(res=>setExpenseAmount(res.data[0].expenseAmount))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-5 pt-5'>
        <div className='d-flex gap-5'>
          <div className='d-flex justify-content-center align-items-center' style={{border:'.1px solid gray',width:'300px',height:'150px'}}>
            <div>
              <center>
                <p>BUDGET AMOUNT</p>
              </center>
              {(budgetAmount>0)?<center><h4><b>{budgetAmount}</b></h4></center>:<h5 style={{color:'orange'}}>please add budget</h5>}
            </div>
          </div>
          
          <div className='d-flex justify-content-center align-items-center' style={{border:'.1px solid gray',width:'300px',height:'150px'}}>
            <div>
              <center>
                <p>EXPENSE AMOUNT</p>
              </center>
              {(expenseAmount>0)?<center><h4><b>{expenseAmount}</b></h4></center>:<h5 style={{color:'orange'}}>please add expense</h5>}
            </div>
          </div>
        </div>

        <div>
          <div className='mt-5 d-flex justify-content-center align-items-center' style={{border:'.1px solid gray',width:'300px',height:'150px'}}>
            <div>
              {
                (budgetAmount>=expenseAmount )?
                <div>
                  <p>REMAINING AMOUNT</p>
                  <center style={{color:'green'}}><h4><b>{budgetAmount-expenseAmount}</b></h4></center>
                </div>:<div>
                  <p>EXTRA AMOUNT</p>
                  <center style={{color:'red'}}><h4><b>{budgetAmount-expenseAmount}</b></h4></center>
                </div>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Statistics