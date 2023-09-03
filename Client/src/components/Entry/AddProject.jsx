import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavbarSecond from "./NavbarSecond";

function AddProject() {
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState();
	const location = useLocation();
	const userID = location?.state?.userID || null;

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5500/pushprojectdata", {
				projectName,
				projectDescription,
				userID,
			})
			.then((res) => {
				if (res.status === 200) {
					const { status, data } = res.data;
					alert("created");
					navigate(`/dashboard/${data}`, { state: { userID: userID } });
				} else {
					alert("Error Occured! Retry it!");
				}
			});
	};

	return (
		<div>
			<NavbarSecond />
			<div className="d-flex justify-content-center">
				<div className="addprojectform mt-5 pt-3">
					<center>
						<h4>CREATE PROJECT</h4>
					</center>
					<form onSubmit={handleSubmit} className="mt-4">
						<div className="d-flex flex-column">
							<label>Project Name</label>
							<input
								required
								onChange={(e) => setProjectName(e.target.value)}
								className="mt-2"
								style={{ height: "2rem" }}
								type="text"
								name=""
								id=""
							/>
						</div>
						<div className="d-flex flex-column mt-4">
							<label>Project Description</label>
							<textarea
								required
								onChange={(e) => setProjectDescription(e.target.value)}
								rows="4"
								className="mt-2"
								type="text"
								name=""
								id=""
							/>
						</div>
						<center>
							<div
								onClick={() =>
									navigate("/entry", { state: { userID: userID } })
								}
							>
								<button className="me-3 btn btn-primary mt-5">BACK</button>
							</div>
							<button className="btn btn-primary mt-5">CREATE NOW</button>
						</center>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddProject;
