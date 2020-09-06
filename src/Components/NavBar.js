import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarToggler, NavbarBrand, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, Redirect, Link } from 'react-router-dom';

class NavBarC extends Component{
    
    constructor(props) {
		super(props);
        this.state = {
            isNavOpen: false,
            isDropdownOpen: false
        };
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}
    
    toggleNav(){
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    toggleDropdown(){
        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    render(){
    return (
        <Navbar color='dark' expand="md" dark>
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto logo-setting" href="/"><img height="30" width="41" alt='Blog Outlet' src={process.env.PUBLIC_URL + '/assets/images/logo.png'} />  BLOG OUTLET</NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                        </NavItem>
                            {
                            !this.props.authUser.authenticated && ( 
                            <NavItem>
                                <NavLink className="nav-link" to='/login'><span className="fa fa-user fa-lg"></span> Login</NavLink>
                            </NavItem>
                            )
                        }
                        {
                            this.props.authUser.authenticated && (
                            
                            <React.Fragment>
                                <Redirect to='/home'/>
                                    <NavItem>
                                        <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                    </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/blog'><span className="fa fa-edit fa-lg"></span> Blog</NavLink>
                                </NavItem>
                                <NavItem className="ml-1">
                                    <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                                        <DropdownToggle tag="span" caret>
                                        <img src= {this.props.authUser.user.credentials.imageUrl} className="user-icon" alt='Userimg'  />
                                    </DropdownToggle>
                                        <DropdownMenu className="link-setup">
                                        <Link to="/user"><DropdownItem>{this.props.authUser.user.credentials.handle}</DropdownItem></Link>
                                        <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                                </React.Fragment>
                            )
                        }
                        </Nav>
                    </Collapse>
            </div>
          </Navbar>
      );
    }
}

export default NavBarC;
