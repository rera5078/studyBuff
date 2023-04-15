import React, { useState } from 'react';
import './SearchPage.css';
import NavBar from "../NavBar/NavBar";
import buff from '../buff.png'
import { search, SearchResult } from '../RecommendationPage/api';
import { useNavigate } from 'react-router-dom';

interface SearchPageProps { 
  setResults: (results: SearchResult[]) => void;
}

function SearchPage({ setResults }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const results = await search(query);
      setResults(results);
      setLoading(false);
      console.log("SearchPage results", results);
      navigate('/recommendation');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  
  return (
    <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
      {loading && <div>Loading...</div>}
      {!loading && <div>
      <div className={'d-flex justify-content-center'} style={{ marginTop: "10%" }}>
        <img src={buff} height={200}></img>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mx-auto mt-5" style={{ width: '45%' }}>
          <input 
          type="search" 
          className="form-control rounded w-75" 
          placeholder="Search" 
          aria-label="Search" 
          aria-describedby="search-addon"
          value={query}
          onChange={(event) => setQuery(event.target.value)} 
          />
          <button type="submit" className="custom-search-button">Search</button>
        </div>
      </form>
      </div>}
      <div className="footer fixed-bottom">
        <div className='container mt-2'>
          <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
        </div>
      </div>
    </div>

  );
}

export default SearchPage;
