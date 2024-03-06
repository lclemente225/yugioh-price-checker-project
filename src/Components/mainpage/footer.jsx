import React from 'react';
import { Link } from 'react-router-dom';
//CSS IS IN MAINPAGE.CSS

export const HomepageFooter = () => {
  return (
    <>
      <div className='footer-info'>
                <h3>
                    Lawrence Clemente
                </h3>
                <h6>
                    San Jose, California
                </h6>
                <h6>
                    lawrenceclemente3@gmail.com
                </h6>
        </div>
        <div>
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
        <div style={{padding: '0 10px', display: 'flex', flexDirection: 'column'}}>
            <span>
                *Prices may not be 100% accurate. Check the links for actual listings. 
            </span>
            <span>
                Thank you to the YugiOh! API provided by <a href="https://ygoprodeck.com/api-guide/">YGOPRODECK</a>
            </span>
        </div>
    </>
  )
}

