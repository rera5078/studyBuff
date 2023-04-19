import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import NavBar from "../NavBar/NavBar";
import white from '../white.png';
import { search, SearchResult } from '../RecommendationPage/api';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

interface SearchPageProps {
  setResults: (results: SearchResult[]) => void;
}

interface Option {
  id: string;
  name: string;
}

function SearchPage({ setResults }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getOptionSelected = (option: Option, value: Option) => option.id === value.id;

  const getOptionLabel = (option: Option) => option.name;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log("search query", query);
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

  useEffect(() => {
    let timer: any;
    if (query !== "") {
      console.log("query", query);
      timer = setTimeout(async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_DROP_DOWN_URL}`, { params: { query } });
          if (response.status === 200) {
            setOptions(["1"]);
            console.log("data", response)
          } else {
            console.log('failed response', response);
          }
          setQuery(query);
        } catch (error) {
          console.error('API call failed', error);
          setQuery(query);
        }
      }, 2000);
    } else {
      setOptions([]);
    }
    setQuery(query);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
      {loading && <div>Loading...</div>}
      {!loading && <div>
        <div className={'d-flex justify-content-center'} style={{ marginTop: "10%" }}>
          <img src={white} height={200}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mx-auto mt-5" style={{ width: '45%' }}>
            <Autocomplete
              className="w-75"
              id="dropdown"
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              // getOptionSelected={getOptionSelected}
              getOptionLabel={getOptionLabel}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={query}
                  label="Search"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setQuery(event.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            /><button type="submit" className="custom-search-button">Search</button>
          </div>
        </form>
      </div>}
      <Footer></Footer>
    </div>

  );
}

export default SearchPage;
