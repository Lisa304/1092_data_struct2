import React, {  useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { Link } from 'react-router-dom';

/*class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}*/

const  NavbarPage = ({children}) =>{
    const [isOpen,setIsOpen] = useState(false);
    const toggleCollapse = () =>{
        setIsOpen(!isOpen);
        console.log(isOpen);
    }
    return (
        <div>
        <MDBNavbar color="indigo" dark expand="md">
            <MDBNavbarBrand>
            <strong className="white-text">題目</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <MDBNavbarNav left>
                <MDBNavItem >
                <Link to="../knapsack" onClick={toggleCollapse} className="nav-link">Knapsack problem</Link>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to="../binary" onClick={toggleCollapse}>Optimal binary searching tree</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to="../prim" onClick={toggleCollapse}>Prim’s algorithm</MDBNavLink>
                </MDBNavItem>    
                <MDBNavItem>
                <MDBNavLink to="../nurse" onClick={toggleCollapse}>Alarm Clock</MDBNavLink>
                </MDBNavItem>  
                <MDBNavItem>
                <MDBNavLink to="../doomday" onClick={toggleCollapse}>Doom's Day Algorithm</MDBNavLink>
                </MDBNavItem>        
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
        {children}
        </div>
    );    
}

export default NavbarPage;