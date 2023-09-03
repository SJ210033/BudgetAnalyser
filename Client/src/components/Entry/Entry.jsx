import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import NavbarSecond from "./NavbarSecond";
import axios from "axios";

function Entry() {
	const navigate = useNavigate();
	const location = useLocation();
	const userID = location?.state?.userID || null;
	const [userName, setUserName] = useState("unknown");

	useEffect(() => {
		if (userID == null) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:5500/getusernameregister/" + userID)
			.then((res) => setUserName(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<NavbarSecond />
			<center>
				<p style={{ marginTop: "10vh", fontSize: "2rem" }}>
					Welcome, <b>{userName}</b>
				</p>
			</center>
			<div
				style={{ marginTop: "15vh" }}
				className="entrylevel gap-4 d-flex justify-content-center"
			>
				<div>
					<p
						onClick={() => navigate("/existing", { state: { userID: userID } })}
						className="entrybox"
					>
						EXISTING PROJECT
					</p>
				</div>
				<div>
					<p
						onClick={() =>
							navigate("/addproject", { state: { userID: userID } })
						}
						className="entrybox"
					>
						CREATE PROJECT
					</p>
				</div>
			</div>
			<p className="copy">All copyrights are reserved @2023</p>
		</div>
	);
}

export default Entry;
