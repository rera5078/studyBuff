import React, { FC } from 'react';
import './SearchPage.css';
import NavBar from "../NavBar/NavBar";
import bull from '../icons8-bull-80.png';
import buff from '../buff.png'
interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => (
  <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
{/* <form method="get" action="">
<div className='container mt-5 mx-auto' style={{width:'50%', textAlign: 'center', justifyContent: 'center'}}>
<div className="cover mx-auto">
    <div className="row">
        <div className="col-md-7">
            <input className={'custom-search-input'}type={"text"} placeholder={"Search"}></input>
        </div>
        <div className="col-md-1">
            <button className={'custom-search-button'}>Submit</button>
        </div>
    </div>
</div>
</div>
</form> */}
<div className='container h-100 align-items-center justify-content-center' style={{marginTop:'150px'}}>
<div className={'d-flex justify-content-center mt-5'}>
    <img src={buff} height={200}></img>
</div>
<form>
<div className="input-group mx-auto mt-5" style={{width:'600px'}}>
  <input type="search" className="form-control rounded w-75" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="submit" className="custom-search-button w-25">Search</button>
</div>
</form>
</div>
      <div className="footer fixed-bottom">
          <div className='container mt-2'>
              <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
          </div>
      </div>
  </div>

);

export default SearchPage;
