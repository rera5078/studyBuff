import React, { FC } from 'react';
import './Footer.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
     <div className="footer fixed-bottom">
         <div className='mt-2'>
             <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
         </div>
     </div>

);

export default Footer;
