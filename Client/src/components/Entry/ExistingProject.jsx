import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavbarSecond from "./NavbarSecond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ExistingProject() {
	const [projectData, setProjectData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const location = useLocation();
	const userID = location?.state?.userID || null;
	console.log(userID);
	useEffect(() => {
		axios
			.get(`http://localhost:5500/getexisitingproject/${userID}`)
			.then((res) => setProjectData(res.data))
			.catch((err) => alert(err));
	}, [userID]);

	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const currentRows = projectData.slice(indexOfFirstRow, indexOfLastRow);
	const navigate = useNavigate();
	return (
		<div>
			<NavbarSecond />
			<div className="d-flex flex-column justify-content-center align-items-center">
				<center className="my-4">
					<h3>Existing Projects</h3>
				</center>
				{projectData.length > 0 ? (
					<div className="d-flex justify-content-center">
						<table>
							<thead>
								<tr className="tablerow">
									<th>Sno</th>
									<th>ProjectName</th>
									<th>created date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{currentRows.map((m, index) => (
									<tr className="tablerow" key={index}>
										<td>{indexOfFirstRow + index + 1}</td>
										<td>{m.projectName}</td>
										<td>{m.projectCreatedDate.slice(0, 10)}</td>
										<td>
											<div
												className="eyebtn"
												onClick={() => {
													navigate(`/dashboard/${m.projectID}`, {
														state: { userID: userID },
													});
												}}
											>
												<button className="btn btn-primary px-3 py-1">
													view
												</button>
											</div>
											<Link className="eye" to={`/dashboard/${m.projectID}`}>
												<FontAwesomeIcon icon={faEye} />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{
							border: "1px solid black",
							width: "400px",
							height: "200px",
						}}
					>
						<h5>There are no existing projects!</h5>
						<Link to={`/addproject/${userID}`} className="link">
							<button className="mt-3 btn btn-primary">Create Project</button>
						</Link>
					</div>
				)}

				<div className="d-flex justify-content-center mt-4">
					<nav aria-label="Page navigation">
						<ul className="pagination">
							{Array.from(
								{ length: Math.ceil(projectData.length / rowsPerPage) },
								(_, index) => (
									<li
										key={index}
										className={`page-item ${
											currentPage === index + 1 ? "active" : ""
										}`}
									>
										<button
											className="page-link"
											onClick={() => setCurrentPage(index + 1)}
										>
											{index + 1}
										</button>
									</li>
								),
							)}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default ExistingProject;
