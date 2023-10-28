import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    const social = {
        github:'https://github.com/egg-chicken',
        linkedinHandle:'https://www.linkedin.com/in/edithgomezgarcia/',
    };

    const handleClick = e => {
		e.preventDefault();
		alert("Feature Coming Soon!")
	};

    return (
        <footer>
            <div className='footer-credits'>
                <div className='connect-info'>
                    <p className='text'>Connect With Us</p>
                    <div className='f-icons'>
                        <p>Edith Gomez Garcia</p>
                        <a target="_blank" href={social.linkedinHandle}><i className="fab fa-linkedin fa-2x"></i></a>
                        <a target="_blank" href={social.github}><i className="fab fa-github fa-2x"></i></a>
                    </div>
                    <div className='f-icons'>
                        <p>Matthew Xu</p>
                        <a target="_blank" href='https://www.linkedin.com/in/matthew-xu-3360a5176/'><i className="fab fa-linkedin fa-2x"></i></a>
                        <a target="_blank" href='https://github.com/matt7xu'><i className="fab fa-github fa-2x"></i></a>
                    </div>
                    <div className='f-icons'>
                        <p>Cheryn Shin</p>
                        <a target="_blank" href='https://www.linkedin.com/in/cherynshin/'><i className="fab fa-linkedin fa-2x"></i></a>
                        <a target="_blank" href='https://github.com/shincheryn'><i className="fab fa-github fa-2x"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
