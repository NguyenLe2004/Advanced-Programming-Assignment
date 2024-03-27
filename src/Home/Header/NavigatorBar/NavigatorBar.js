import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { signInContext } from '../../../SignInControl/SignInProvider';
import { displaySignInFormContext } from '../../../SignInControl/DisplaySignInProvider';

const NavigatorBar = () => {
  const {isSignIn,setIsSignIn} = useContext(signInContext);
  const {setIsDisplaySignInForm} = useContext(displaySignInFormContext);

  const displaySignInForm = () => {
    setIsDisplaySignInForm(true);
  }

  const handleSignOut = () => {
    setIsSignIn(false);
  }
    return (
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">BK Health Care</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            {!isSignIn? (
              <Button variant='primary' onClick={displaySignInForm}>Sign In</Button>
            ) : (
              <Button variant='primary' onClick={handleSignOut}>Sign Out</Button>
            )}
          </Container>
        </Navbar> 
      </div>
      );
}

export default NavigatorBar
