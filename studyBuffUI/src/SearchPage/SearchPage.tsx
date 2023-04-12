import React, {FC, useState} from 'react';
import './SearchPage.css';
import NavBar from "../NavBar/NavBar";
import buff from '../buff.png'
import {Link} from "react-router-dom";
interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => (
  <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
{/*<div className='container h-100 align-items-center justify-content-center' style={{marginTop:'150px'}}>*/}
<div className={'d-flex justify-content-center'} style={{marginTop: "10%"}}>
    <img src={buff} height={200}></img>
</div>
<form>
<div className="input-group mx-auto mt-5" style={{width:'35%'}}>
  <input type="search" className="form-control rounded w-75" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <Link to = "/recommendation" className="custom-search-button w-25">
  <button type="submit" className="custom-search-button w-100 mt-1">Search</button>
  </Link>
</div>
</form>
{/*</div>*/}
      <div className="footer fixed-bottom">
          <div className='container mt-2'>
              <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
          </div>
      </div>
  </div>

);

export default SearchPage;
