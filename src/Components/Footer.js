import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className="footer footer-setup">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Contact Info</h5>
                        <address>  
                            <i className="fa fa-map-marker fa-lg"></i>
                            : PSG Tech Hostels, PSG College Of Technology,<br />
		                    Coimbatore, Tamil Nadu, India<br /><br/>
                            <i className="fa fa-phone fa-lg"></i>: +91 6379085220<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:apoorvaduraisamy@gmail.com">
                                blogoutlet@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-instagram" href="http://instagram.com"><i className="fa fa-instagram"> </i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"> </i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"> </i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"> </i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"> </i></a>
                        </div>
                    </div>
                </div>
                <hr className="line"/>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>&copy; Copyright 2020 Blog Outlet</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;          