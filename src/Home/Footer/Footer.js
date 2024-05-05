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
						<FooterLink href="/patient">
							Patients
						</FooterLink>
						<FooterLink href="/medicalStaff/:position">
							MedicalStaffs
						</FooterLink>
						<FooterLink href="/medicine">
							Medicine
						</FooterLink>
						<FooterLink href="/equipment">
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
						<FooterLink href="https://www.facebook.com/watch/?v=2482391628734623">
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
						<FooterLink href="https://www.instagram.com/p/C4X5ZiLS8wU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==">
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
						<FooterLink href="https://twitter.com/rickastley?lang=en">
							<i className="fab fa-twitter">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									X
								</span>
							</i>
						</FooterLink>
						<FooterLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
							
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
