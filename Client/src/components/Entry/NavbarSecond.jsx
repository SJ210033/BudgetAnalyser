import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../images/BudgetAnalyser_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function NavbarSecond() {
	const { userID } = useParams();

	return (
		<div
			style={{ boxShadow: "5px 5px #e8e8e8", maxWidth: "100%" }}
			className="navbarpadding d-flex justify-content-between align-items-center px-5"
		>
			<Link to={"/"}>
				<img className="logo" src={logo} alt="" />
			</Link>
			<h2 className="BA me-5" style={{ color: "#007bff" }}>
				BUDGET ANALYSER
			</h2>
			<Link to={"/registration"} className="fs-2 text-dark">
				<FontAwesomeIcon className="profile" icon={faUser} />
			</Link>
		</div>
	);
}

export default NavbarSecond;
