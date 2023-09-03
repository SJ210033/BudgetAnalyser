const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
//creating db

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'budgetanalyser'
})

//------------------------------------REGISTRATION DETAILS-----------------------------------------------//

//___GET
app.post('/validLogin', (req, res) => {
    const sql = "SELECT * FROM registration WHERE `userEmail` = ? AND `userPassword` = ?"
    db.query(sql, [req.body.loginEmail, req.body.loginPass], (err, result) => {
        if (err) return res.json("Error")
        if (result.length > 0) {
            return res.json({status:'success',data:result[0].userID})

        } else {
            return res.json('fail')
        }
    })
})

//___POST
app.post('/pushregistration',(req,res)=>{
    const sql = "insert into registration (`userName`,`userEmail`,`userPhnum`,`userPassword`) values (?)";
    const val = [
        req.body.name,
        req.body.email,
        req.body.phno,
        req.body.password
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })

})

//-----------------------------------------CREATE OPERATION----------------------------------------------//


//__DEPARTMENT TABLE

app.post('/pushdepartmentdata',(req,res)=>{
    const sql = "insert into departmentmaster (`departmentName`,`departmentDescription`,`departmentBusiness`) values (?)";
    const val = [
        req.body.dptName,
        req.body.BusinessDescription,
        req.body.businessType,
    ];
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})

//__PROJECT TABLE

app.post('/pushprojectdata',(req,res)=>{
    const sql = "insert into projectmaster (`projectName`,`projectDescription`,`userID`) values (?)";
    const val = [
        req.body.projectName,
        req.body.projectDescription,
        req.body.userID
    ]
    db.query(sql,[val],(err,result)=>{
        const projectID = result.insertId;
        if(err) res.json(err)
        return res.json({status:'success',data:projectID})
    })
})


//__CATEGORY TABLE

app.post('/pushcategorydata',(req,res)=>{
    const sql = "insert into categorymaster (`categoryName`,`categoryDescription`,`projectID`) values (?)";
    const val = [
        req.body.categoryName,
        req.body.categoryDescription,
        req.body.projectID
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__SUB-CATEGORY TABLE

app.post('/pushsubcategorydata',(req,res)=>{
    const sql = "insert into subcategorymaster (subCategoryName,subCategoryDescription ,projectID,categoryID) values (?)";
    const val = [
        req.body.subCategoryName,
        req.body.subCategoryDescription,
        req.body.projectID,
        req.body.categoryID
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__LIST-SUB-CATEGORY TABLE 
 
app.post('/pushlistsubcategorydata',(req,res)=>{
    const sql = "insert into listsubcategorymaster  (`listSubCategoryName`,`listSubCategoryDescription`,`projectID`,`categoryID`,`subCategoryID`) values (?)";
    const val = [
        req.body.listSubCategoryName,
        req.body.listSubCategoryDescription,
        req.body.projectID,
        req.body.categoryID,
        req.body.subCategoryID
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__BUDGET TABLE

app.post('/pushbudgetdata',(req,res)=>{
    const sql = "INSERT INTO budgetdetails (budgetAmount, budgetDetails, approvedStatus, projectID, categoryID, subCategoryID, listSubCategoryID) VALUES (?)";
    const val = [
        req.body.budgetAmount,
        req.body.budgetDetails,
        req.body.approvedStatus,
        req.body.projectID,
        req.body.categoryID,
        req.body.subCategoryID,
        req.body.listSubCategoryID
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})

//___EXPENSE TABLE

app.post('/pushexpensedata',(req,res)=>{
    const sql = "INSERT INTO expensedetails (expenseAmount, expenseDetails, approvedStatus, projectID, categoryID, subCategoryID, listSubCategoryID) VALUES (?)";
    const val = [
        req.body.expenseAmount,
        req.body.expenseDetails,
        req.body.approvedStatus,
        req.body.projectID,
        req.body.categoryID,
        req.body.subCategoryID,
        req.body.listSubCategoryID
    ]
    db.query(sql,[val],(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//------------------------------------------------READ OPERATION---------------------------------------------------//


//__DEPARTMENT TABLE

app.get('/getdepartmentdata',(req,res)=>{
    const sql = "select * from departmentmaster";
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})


//__PROJECT TABLE

app.get('/getprojectdata',(req,res)=>{
    const sql = "select * from projectmaster";
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__CATEGORY TABLE

app.get('/getcategorymaindata/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select * from categorymaster where projectID=${projectID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__SUB-CATEGORY TABLE

app.get('/getsubcategorymaindata/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select * from subcategorymaster where projectID=${projectID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__LIST-SUB-CATEGORY TABLE

app.get('/getlistsubcategorymaindata/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select * from listsubcategorymaster where projectID=${projectID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE

app.get('/getbudgetdetailsmaindata/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select * from budgetdetails where projectID=${projectID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE -> Sum 

app.get('/getbudgetsum/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select SUM(budgetAmount) as budgetAmount from budgetdetails where projectID=${projectID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__EXPENSE TABLE 

app.get('/getexpensemaindata/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select * from expensedetails where projectID=${projectID}`
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

//__EXPENSE TABLE -> sum

app.get('/getexpensesum/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select SUM(expenseAmount) as expenseAmount from expensedetails where projectID=${projectID}`
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

//----------------------------------------READ DESIRED OPERATION---------------------------------------//


//__DEPARTMENT TABLE

app.get('/getdepartmentdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from departmentmaster where departmentID=${id}`;
    db.query(sql,(err,result)=>{    
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})


//__PROJECT TABLE

app.get('/getprojectdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from projectmaster where projectID=${id} `;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
}) 

//__CATEGORY TABLE

app.get('/getcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from categorymaster where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__SUB-CATEGORY TABLE

app.get('/getsubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from subcategorymaster where SubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})
 
//__SUB-CATEGORY TABLE ---> category based 

app.get('/getsubcategorydatacat/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from subcategorymaster where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__LIST-SUB-CATEGORY TABLE

app.get('/getlistsubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from listsubcategorymaster where listSubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__LIST-SUB-CATEGORY TABLE ---> sub cat based

app.get('/getlistsubcategorydatasubcat/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from listsubcategorymaster where subCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE

app.get('/getbudgetdetailsdata/:id',(req,res)=>{
    const id = req.params.id;   
    const sql = `select * from budgetdetails where budgetID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE --- ProjectID

app.get('/getbudgetdetailsprodata/:id',(req,res)=>{
    const id = req.params.id;   
    const sql = `select * from budgetdetails where projectID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE

app.get('/getbudgetdetailsdatasubcat/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select budgetAmount from budgetdetails where listSubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE -> SUM -> based on catgeroryID

app.get('/getbudgetsum/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select SUM(budgetAmount) as amount from budgetdetails where categoryID=${id}`
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

//__BUDGET TABLE -> SUM -> based on projectID

app.get('/getbudgetprosum/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select SUM(budgetAmount) as amount from budgetdetails where projectID=${id}`
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

//__EXPENSE TABLE 

app.get('/getexpensedata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `select * from expensedetails where expenseID=${id}`
    db.query(sql,(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})


//----------------------------------------UPDATE OPERATION---------------------------------------//



//__DEPARTMENT TABLE

app.put('/updatedepartmentdata/:id',(req,res)=>{
    const departmentId = req.params.id;
    const { departmentName, departmentDescription, departmentBusiness, departmentActive } = req.body;
    const sql = "update departmentmaster set departmentName = ?, departmentDescription = ?, departmentBusiness = ?, departmentActive = ? WHERE departmentId = ? ";
    const values = [departmentName, departmentDescription, departmentBusiness, departmentActive, departmentId];
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})

//__PROJECT TABLE

app.put('/updateprojectdata/:id',(req,res)=>{
    const projectId = req.params.id;
    const {projectName,projectDescription,projectRemarks,projectStatus,departmentID} = req.body;
    const sql = "update projectmaster set projectName = ? ,projectDescription = ? ,projectRemarks =?, projectStatus=?, departmentID=? where projectID=? ";
    const values = [projectName,projectDescription,projectRemarks,projectStatus,departmentID,projectId]
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__CATEGORY TABLE

app.put('/updatecategorydata/:id',(req,res)=>{
    const categoryId = req.params.id;
    const {categoryName,categoryDescription} = req.body;
    const sql = `UPDATE categorymaster SET categoryName=?, categoryDescription=? where categoryId = ${categoryId}`;
    const values = [categoryName,categoryDescription]
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__SUB-CATEGORY TABLE

app.put('/updatesubcategorydata/:id',(req,res)=>{
    const subCategoryID = req.params.id;
    const {subCategoryName,subCategoryDescription,categoryID} = req.body;
    const sql = `update subcategorymaster SET subCategoryName= ? ,subCategoryDescription= ? ,categoryID = ? where subCategoryID = ${subCategoryID}`;

    const values = [subCategoryName,subCategoryDescription,categoryID];
    
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__LIST-SUB-CATEGORY TABLE

app.put('/updatelistsubcategorydata/:id',(req,res)=>{
    const listSubCategoryID = req.params.id;
    const {listSubCategoryName,listSubCategoryDescription,categoryID,subCategoryID} = req.body;

    const sql = `update listsubcategorymaster set listSubCategoryName = ?,listSubCategoryDescription  = ?,categoryID = ?, subCategoryID = ? where listSubCategoryID=${listSubCategoryID}`;

    const values = [listSubCategoryName,listSubCategoryDescription,categoryID,subCategoryID]
    
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})


//__BUDGET TABLE

app.put('/updatebudgetdata/:id',(req,res)=>{
    const budgetID = req.params.id;
    const {budgetAmount,budgetDetails} = req.body;

    const sql = `update budgetdetails set budgetAmount = ?,budgetDetails = ? where budgetID=${budgetID}`;

    const values = [budgetAmount,budgetDetails]
    
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})

//___EXPENSE TABLE 

app.put('/updateexpensedata/:id',(req,res)=>{
    const expID = req.params.id;
    const {expenseAmount,expenseDetails} = req.body;

    const sql = `update expensedetails set expenseAmount = ?,expenseDetails = ? where expenseID=${expID}`;

    const values = [expenseAmount,expenseDetails]
    
    db.query(sql,values,(err,result)=>{
        if(err) res.json(err)
        return res.json(result)
    })
})



//----------------------------------------DELETE OPERATION---------------------------------------//



//__DEPARTMENT TABLE

app.delete('/deletedepartmentdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from departmentmaster where departmentID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})


//__PROJECT TABLE

app.delete('/deleteprojectdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from projectmaster where projectID=${id} `;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__CATEGORY TABLE

app.delete('/deletecategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from categorymaster where categoryID=${id}`; 
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__SUB-CATEGORY TABLE -> CATEGORY

app.delete('/deletesubcategorycatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from subcategorymaster where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })  
})

//__LIST-SUB-CATEGORY TABLE -> CATEGORY

app.delete('/deletelistsubcategorycatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from listsubcategorymaster where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE -> CATEGORY

app.delete('/deletebudgetcatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from budgetdetails where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__EXPENSE TABLE -> CATEGORY

app.delete('/deleteexpensecatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from expensedetails where categoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})


//__SUB-CATEGORY TABLE -> SUB - CATEGORY

app.delete('/deletesubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from subcategorymaster where subCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result) 
    })  
})

//__LIST-SUB-CATEGORY TABLE -> SUB - CATEGORY

app.delete('/deletelistsubcategorysubcatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from listsubcategorymaster where subCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE -> SUB - CATEGORY

app.delete('/deletebudgetsubcatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from budgetdetails where subCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})
//__EXPENSE TABLE -> SUB - CATEGORY

app.delete('/deleteexpensesubcatdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from expensedetails where subCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__LIST-SUB-CATEGORY TABLE -> LIST SUB - CATEGORY

app.delete('/deletelistsubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from listsubcategorymaster where listSubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})
//__BUDGET TABLE -> LIST SUB - CATEGORY

app.delete('/deletebudgetlistsubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from budgetdetails where listSubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})
//__LIST-SUB-CATEGORY TABLE -> LIST SUB - CATEGORY

app.delete('/deleteexpenselistsubcategorydata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from expensedetails where listSubCategoryID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//__BUDGET TABLE

app.delete('/deletebudgetdetailsdata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from budgetdetails where budgetID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})

//EXPENSE TABLE

app.delete('/deleteexpensedata/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete from expensedetails where expenseID=${id}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })
})


//____________EXISTING PROJECT SELECT________________

app.get('/getexisitingproject/:id',(req,res)=>{
    const userID = req.params.id;
    const sql = `select * from projectmaster where userID=${userID}`;
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result)
    })

}) 

// //____________GET USERID FROM PROJECT TABLE_______________

// app.get('/getuserid/:id',(req,res)=>{
//     const projectID = req.params.id;
//     const sql = `select userID from projectmaster where projectID=${projectID}`;
//     db.query(sql,(err,result)=>{
//         if(err) return res.json({ error: err });
//         return res.json(result[0].userID)
//     })

// }) 

//____________GET USERNAME FROM REGISTER TABLE BASED ON PROJECT ID_______________

app.get('/getusername/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select r.userName from projectmaster p join registration r ON p.userID = r.userID where p.projectID = ${projectID}`; 
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result[0].userName)
    })

}) 

//___________GET PROJECTNAME

app.get('/getprojectname/:id',(req,res)=>{
    const projectID = req.params.id;
    const sql = `select projectName from projectmaster where projectID = ${projectID}`; 
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result[0].projectName)
    })

}) 

app.get('/getusernameregister/:id',(req,res)=>{
    const userID = req.params.id;
    const sql = `select userName from registration where userID = ${userID}`; 
    db.query(sql,(err,result)=>{
        if(err) return res.json({ error: err });
        return res.json(result[0].userName)
    })

}) 
 




app.listen(5500,()=>console.log("listing...."));