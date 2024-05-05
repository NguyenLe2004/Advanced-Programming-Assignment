import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles"; 
import { Container } from "react-bootstrap";

// import "./style.css"

const Footer = () => {
	return (
		<Box>
			<h1
				style={{
					color: "white",
					minHeight: "70px",
					textAlign: "center",
					marginTop: "10px", 
					fontFamily: "Brush Script MT, Brush Script Std, cursive"

				}}
			>
				Bach Khoa Heath Care
			</h1>
			<h4
				style={{
					color: "white",
					minHeight: "30px",
					textAlign: "center",
					marginTop: "10px", 
					fontFamily: "Brush Script MT, Brush Script Std, cursive"
				}}
			>- WE TAKE ONE STEP AT A TIME -
			</h4>
			<h1
				style={{
					color: "white",
					minHeight: "30px",
					textAlign: "center",
					marginTop: "10px", 
				}}
			>
			</h1>
			<FooterContainer style = {{
					fontFamily: "Brush Script MT, Brush Script Std, cursive"
			}}>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">
							Aim
						</FooterLink>
						<FooterLink href="#">
							Vision
						</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">
							Patients
						</FooterLink>
						<FooterLink href="#">
							MedicalStaffs
						</FooterLink>
						<FooterLink href="#">
							Medicine
						</FooterLink>
						<FooterLink href="#">
							Equipment
						</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">
							@hcmut.edu.vn
						</FooterLink>
						<FooterLink href="#">
							+84 918 xxx xxx
						</FooterLink>
						<FooterLink href="#">
							Vietnam
						</FooterLink>
					</Column>
					 <Column>
						<Heading>Social Media</Heading>
						<FooterLink href="#">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Facebook
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Instagram
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-twitter">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Twitter
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-youtube">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Youtube
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};
export default Footer;
