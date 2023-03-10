import React, { FC } from 'react';
import './SearchPage.css';
import NavBar from "../NavBar/NavBar";
import bull from '../icons8-bull-80.png';
interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => (
  <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
      <div className={'d-flex justify-content-center'}>
          <img src={bull} height={250} margin-top={250} margin-bottom={20}></img>
      </div>
      {/* <div id="cover">
          <form className={"custom-search"} method="get" action="">
              <input className={"custom-search-input "} type={"text"} placeholder={"Search"}></input>
              <button className={'custom-search-button'}>Search</button>
          </form>
      </div> */}
<form method="get" action="">
<div className='container mt-5' style={{width:'700px'}}>
<div className="cover">
    <div className="row">
        <div className="col-md-6">
            <input className={'custom-search-input'}type={"text"} placeholder={"Search"}></input>
        </div>
        <div className="col-md-3">
            <select className='custom-select'>Search By
                <option value={"po"} selected disabled hidden>Search By</option>
                <option value={"course name"}>Course Name</option>
                <option value={"prof"}>Professor</option>
                <option value={'sem'}>Semester</option>
            </select>
        </div>
        <div className="col-md-2">
            <button className={'custom-search-button'}>Submit</button>
        </div>
    </div>
</div>
</div>
</form>
  </div>
);

export default SearchPage;
