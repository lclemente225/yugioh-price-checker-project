import React from 'react';
import { Link } from 'react-router-dom';

export const HomepageFooter = () => {
  return (
    <>
      <div className=''>
                <h3>
                    Lawrence Clemente
                </h3>
                <p>
                    San Jose, California
                </p>
                <p>
                    lawrenceclemente3@gmail.com
                </p>
                <Link to="https://www.linkedin.com/in/lawrence-clemente/" className='linkedin-logo footer-links'>
                    <i className="fa-brands fa-linkedin"/>
                    <span>
                        Linkedin
                    </span>
                </Link>
                <Link to="https://github.com/lclemente225" className='github-logo footer-links'>
                    <i className="fa-brands fa-square-github"/>
                    <span>
                        Github
                    </span>
                </Link>
                <Link to="https://lclemente225.github.io/" className='github-logo footer-links'>
                    <span>
                        My Portfolio
                    </span>
                </Link>
            </div>
            <p className='created-by-react-footer'>
                This project was created with <i className="fa-brands fa-react" /> React + 
                <img src="/vite.svg" alt="vite logo" className='vite-logo-footer'/>Vite
            </p>
    </>
  )
}

