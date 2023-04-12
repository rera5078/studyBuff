import React, { FC } from 'react';
import './Loading.css';
import NavBar from "../NavBar/NavBar";
interface LoadingProps {}

const Loading: FC<LoadingProps> = () => (
 <React.Fragment>
     <NavBar></NavBar>
     <div className="container justify-content-center" style={{marginTop: "20%"}}>
         <div className="spinner-container">
             <div className="loading-spinner">
             </div>
         </div>
     </div>
 </React.Fragment>
);

export default Loading;
