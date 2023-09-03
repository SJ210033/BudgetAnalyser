import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	MDBContainer,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import NavbarEntry from "./NavbarEntry";

function App() {
	const [justifyActive, setJustifyActive] = useState("tab1");
	const handleJustifyClick = (value) => {
		if (value === justifyActive) {
			return;
		}
		setJustifyActive(value);
	};

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phno, setPhno] = useState(0);
	const [dptName, setDptName] = useState("");
	const [businessType, setBusinessType] = useState("");
	const [BusinessDescription, setBusinessDescription] = useState("");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPass, SetLoginPass] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:5500/getdepartmentdata").then((res) => {
			setDptName(res.data[0].departmentName);
		});
	}, []);

	useEffect(() => {
		axios.get("http://localhost:5500/getdepartmentdata").then((res) => {
			setDptName(res.data[0].departmentName);
		});
	}, []);

	const handleSignUp = () => {
		axios.post("http://localhost:5500/pushdepartmentdata", {
			dptName,
			BusinessDescription,
			businessType,
		});
		axios.post("http://localhost:5500/pushregistration", {
			name,
			email,
			password,
			phno,
		});
		window.location.reload();
	};

	const handleLoginIn = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5500/validLogin", { loginEmail, loginPass })
			.then((res) => {
				if (res.status === 200) {
					const { status, data } = res.data;
					if (status === "success") {
						navigate("/entry", { state: { userID: data } });
					} else {
						alert("Login failed. Please check your credentials.");
					}
				} else {
					alert("Unexpected server response. Please try again later.");
				}
			})
			.catch((err) => {
				console.error("Error during login:", err);
				alert("An error occurred during login. Please try again later.");
			});
	};

	const styles = {
		container: {
			width: "35rem",

			"@media (max-width: 600px)": {
				width: "25rem",
			},
		},
	};

	console.log(loginEmail);
	console.log(loginPass);

	return (
		<div style={{ width: "100%" }}>
			<NavbarEntry />
			<div className="d-flex justify-content-center">
				<div
					style={styles.container}
					className="d-flex flex-column align-items-center"
				>
					<MDBContainer className="mt-5 d-flex flex-column">
						<MDBTabs
							pills
							justify
							className="mb-3 d-flex flex-row justify-content-between"
						>
							<MDBTabsItem>
								<MDBTabsLink
									onClick={() => handleJustifyClick("tab1")}
									active={justifyActive === "tab1"}
								>
									Login
								</MDBTabsLink>
							</MDBTabsItem>
							<MDBTabsItem>
								<MDBTabsLink
									onClick={() => handleJustifyClick("tab2")}
									active={justifyActive === "tab2"}
								>
									Register
								</MDBTabsLink>
							</MDBTabsItem>
						</MDBTabs>
						<MDBTabsContent>
							<MDBTabsPane show={justifyActive === "tab1"}>
								{/* <div className="text-center mb-3">
                  <p>Sign in with:</p>
                  <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>
                  </div>
                  <p className="text-center mt-3">or:</p>
                </div> */}
								<MDBInput
									required
									onChange={(e) => setLoginEmail(e.target.value)}
									wrapperClass="mb-4 mt-5"
									style={{ border: ".1px solid grey" }}
									label="Email address"
									id="form1"
									type="email"
								/>
								<MDBInput
									required
									onChange={(e) => SetLoginPass(e.target.value)}
									wrapperClass="mb-4 mt-5"
									style={{ border: ".1px solid grey" }}
									label="Password"
									name="password"
									id="form2"
									type="password"
								/>
								<div className="d-flex justify-content-between mx-4 mb-4">
									<MDBCheckbox
										required
										name="flexCheck"
										style={{ border: "1px solid grey" }}
										value=""
										id="flexCheckDefault"
										label="Remember me"
									/>
									<a href="!#">Forgot password?</a>
								</div>
								<center>
									<button
										onClick={handleLoginIn}
										className="mt-3 px-4 py-2 btn btn-primary"
									>
										Login
									</button>
								</center>
								<p className="mt-3 text-center">
									Not a member?{" "}
									<a
										style={{ cursor: "pointer", color: "blue" }}
										onClick={() => handleJustifyClick("tab2")}
									>
										Register
									</a>
								</p>
							</MDBTabsPane>
							<MDBTabsPane show={justifyActive === "tab2"}>
								{/* <div className="text-center mb-3">
                  <p>Sign up with:</p>
                  <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                      <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>
                  </div>
                  <p className="text-center mt-3">or:</p>
                </div> */}
								<div className="d-flex w-100 mt-5">
									<MDBInput
										onChange={(e) => setName(e.target.value)}
										wrapperClass="mb-3 me-1 w-100"
										style={{ border: ".1px solid grey" }}
										label="Name"
										id="form1"
										type="text"
									/>
									<MDBInput
										onChange={(e) => setPhno(e.target.value)}
										wrapperClass="mb-3 w-100"
										style={{ border: ".1px solid grey" }}
										label="Phone number"
										id="form1"
										name="tel"
										type="tel"
									/>
								</div>
								<div className="d-flex w-100">
									<MDBInput
										onChange={(e) => setEmail(e.target.value)}
										wrapperClass="mb-3 me-1 w-100"
										style={{ border: ".1px solid grey" }}
										name="email"
										label="Email"
										id="form1"
										type="email"
									/>
									<MDBInput
										onChange={(e) => setPassword(e.target.value)}
										wrapperClass="mb-3 w-100"
										style={{ border: ".1px solid grey" }}
										name="password"
										label="Password"
										id="form1"
										type="tel"
									/>
								</div>
								<div className="d-flex w-100">
									<MDBInput
										onChange={(e) => setDptName(e.target.value)}
										wrapperClass="mb-3 me-1 w-100"
										style={{ border: ".1px solid grey" }}
										name="departmentname"
										label="DepartmentName"
										id="form1"
										type="text"
									/>
									<MDBInput
										onChange={(e) => setBusinessType(e.target.value)}
										wrapperClass="mb-3 w-100"
										style={{ border: ".1px solid grey" }}
										name="type"
										label="BusinessType"
										id="form1"
										type="text"
									/>
								</div>
								<MDBInput
									onChange={(e) => setBusinessDescription(e.target.value)}
									wrapperClass="mb-3"
									style={{ border: ".1px solid grey", height: "5rem" }}
									name="BusinessDescription"
									label="BusinessDescription"
									id="form1"
									type="text"
								/>
								<div className="d-flex justify-content-center mb-4">
									<MDBCheckbox
										name="flexCheck"
										style={{ border: ".1px solid grey" }}
										id="flexCheckDefault"
										label="I have read and agree to the terms"
									/>
								</div>
								<center>
									<button onClick={handleSignUp} className="btn btn-primary">
										Sign Up
									</button>
								</center>
							</MDBTabsPane>
						</MDBTabsContent>
					</MDBContainer>
				</div>
			</div>
		</div>
	);
}

export default App;
