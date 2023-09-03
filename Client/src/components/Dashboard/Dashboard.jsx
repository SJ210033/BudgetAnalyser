import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ResponsiveSidebar from "./ResponsiveSidebar";

function Dashboard() {
	const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 850);
	const location = useLocation();
	const userID = location?.state?.userID || null;
	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 850) {
				setSidebarVisible(true);
			} else {
				setSidebarVisible(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="d-flex">
			{sidebarVisible && (
				<div className="sidebar">
					<ResponsiveSidebar userID={userID} />
				</div>
			)}
			<div style={{ width: "100%", height: "100vh" }}>
				<div style={{ height: "4rem" }}>
					<Navbar toggleSidebar={toggleSidebar} />
				</div>
				<Outlet />
			</div>
		</div>
	);
}

export default Dashboard;
