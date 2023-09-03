import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalculator,
	faHouseChimney,
	faPenToSquare,
	faEye,
	faCoins,
	faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function ResponsiveSidebar({ userID }) {
	const { projectID } = useParams();
	const [userName, setUserName] = useState("unknown");

	const [openSection, setOpenSection] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:5500/getusername/${projectID}`)
			.then((res) => setUserName(res.data))
			.catch((err) => alert(err));
	}, [projectID]);

	const handleSectionClick = (section) => {
		setOpenSection(openSection === section ? null : section);
	};
	const sidebarRef = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setOpenSection(null);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="sidebar-main px-2" ref={sidebarRef}>
			<div
				onClick={() => {
					navigate("/entry", { state: { userID: userID } });
				}}
				className="link"
			>
				<FontAwesomeIcon
					className="px-2 py-2 mt-1"
					style={{
						color: "white",
						fontSize: "2rem",
						border: ".1px solid white",
						borderRadius: "50%",
					}}
					icon={faCalculator}
				/>
			</div>

			<div style={{ cursor: "pointer" }} className="mt-4 ms-1">
				<div
					onClick={() => handleSectionClick("home")}
					className="d-flex justify-content-between"
				>
					<div className="gap-3">
						<FontAwesomeIcon className="fs-4" icon={faHouseChimney} />
						<h6>Home</h6>
					</div>
				</div>
				{openSection === "home" ? (
					<ul className="sidebar-sub">
						<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
						<Link className="link" to={`/dashboard/${projectID}`}>
							Dashboard
						</Link>
					</ul>
				) : (
					""
				)}
			</div>

			<div style={{ cursor: "pointer" }} className="mt-3 ms-1">
				<div
					onClick={() => handleSectionClick("addForms")}
					className="d-flex justify-content-between"
				>
					<div className="gap-3">
						<FontAwesomeIcon className="fs-4" icon={faPenToSquare} />
						<h6>Master</h6>
					</div>
				</div>
				{openSection === "addForms" ? (
					<ul className="sidebar-sub">
						<div className="d-flex me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link className="link" to={`/dashboard/${projectID}/addcategory`}>
								Category
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link
								className="link"
								to={`/dashboard/${projectID}/addsubcategory`}
							>
								SubCategory
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link
								className="link"
								to={`/dashboard/${projectID}/addsubcategorylist`}
							>
								SubCategoryList
							</Link>
						</div>
					</ul>
				) : (
					""
				)}
			</div>

			<div style={{ cursor: "pointer" }} className="mt-3 ms-1">
				<div
					onClick={() => handleSectionClick("viewForms")}
					className="d-flex justify-content-between"
				>
					<div className="gap-3">
						<FontAwesomeIcon className="fs-4" icon={faEye} />
						<h6>View</h6>
					</div>
				</div>
				{openSection === "viewForms" ? (
					<ul className="sidebar-sub">
						<div className="d-flex me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link
								className="link"
								to={`/dashboard/${projectID}/viewcategory`}
							>
								Category
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link
								className="link"
								to={`/dashboard/${projectID}/viewsubcategory`}
							>
								Sub Category
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link
								className="link"
								to={`/dashboard/${projectID}/viewsubcategorylist`}
							>
								Sub Category List
							</Link>
						</div>
					</ul>
				) : (
					""
				)}
			</div>

			<div style={{ cursor: "pointer" }} className="mt-3 ms-1">
				<div
					onClick={() => handleSectionClick("budget")}
					className="d-flex justify-content-between"
				>
					<div className="gap-3">
						<FontAwesomeIcon className="fs-4" icon={faCoins} />
						<h6>Budget</h6>
					</div>
				</div>
				{openSection === "budget" ? (
					<ul className="sidebar-sub">
						<div className="d-flex me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link className="link" to={`/dashboard/${projectID}/addbudget`}>
								Add Budget
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link className="link" to={`/dashboard/${projectID}/viewbudget`}>
								View Budget
							</Link>
						</div>
					</ul>
				) : (
					""
				)}
			</div>

			<div style={{ cursor: "pointer" }} className="mt-3 ms-1">
				<div
					onClick={() => handleSectionClick("expense")}
					className="d-flex justify-content-between"
				>
					<div className="gap-3">
						<FontAwesomeIcon className="fs-4" icon={faMoneyBillTransfer} />
						<h6>Expense</h6>
					</div>
				</div>
				{openSection === "expense" ? (
					<ul className="sidebar-sub">
						<div className="d-flex me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link className="link" to={`/dashboard/${projectID}/addexpense`}>
								Add Expense
							</Link>
						</div>
						<div className="d-flex mt-3 me-2">
							<FontAwesomeIcon className="mt-1 me-2" icon={faCircle} />
							<Link className="link" to={`/dashboard/${projectID}/viewexpense`}>
								View Expense
							</Link>
						</div>
					</ul>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default ResponsiveSidebar;
