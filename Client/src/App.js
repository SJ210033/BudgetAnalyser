import React from "react";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Registration from "./components/Entry/Registration";
import Entry from "./components/Entry/Entry";
import AddProject from "./components/Entry/AddProject";
import Dashboard from "./components/Dashboard/Dashboard";
import AddCategory from "./components/AddForm/AddCategory";
import AddSubCaregoryList from "./components/AddForm/AddSubCategoryList";
import Statistics from "./components/Dashboard/Statistics";
import AddSubCategory from "./components/AddForm/AddSubCategory";
import ViewCategory from "./components/ViewForm/ViewCategory";
import ViewSubCategory from "./components/ViewForm/ViewSubCategory";
import ViewSubCategoryList from "./components/ViewForm/ViewCategoryList";
import AddBudget from "./components/AddForm/AddBudget";
import ViewBudget from "./components/ViewForm/ViewBudget";
import AddExpense from "./components/AddForm/AddExpense";
import ViewExpense from "./components/ViewForm/ViewExpense";
import ExistingProject from "./components/Entry/ExistingProject";
import LandingPage from "./components/Entry/LandingPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />}></Route>
				<Route path="/registration" element={<Registration />}></Route>
				<Route path="/entry" element={<Entry />}></Route>
				<Route path="/addproject" element={<AddProject />}></Route>
				<Route path="/existing" element={<ExistingProject />}></Route>
				<Route path="/dashboard/:projectID" element={<Dashboard />}>
					<Route path="" element={<Statistics />}></Route>
					<Route path="addcategory" element={<AddCategory />}></Route>
					<Route path="addsubcategory" element={<AddSubCategory />}></Route>
					<Route
						path="addsubcategorylist"
						element={<AddSubCaregoryList />}
					></Route>
					<Route path="viewcategory" element={<ViewCategory />}></Route>
					<Route path="viewsubcategory" element={<ViewSubCategory />}></Route>
					<Route
						path="viewsubcategorylist"
						element={<ViewSubCategoryList />}
					></Route>
					<Route path="addbudget" element={<AddBudget />}></Route>
					<Route path="viewbudget" element={<ViewBudget />}></Route>
					<Route path="addexpense" element={<AddExpense />}></Route>
					<Route path="viewexpense" element={<ViewExpense />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
