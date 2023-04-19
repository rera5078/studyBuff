import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import white from '../white.png';
import { search, SearchResult } from '../RecommendationPage/api';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { List } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import './SearchPage.css';

interface SearchPageProps {
  setResults: (results: SearchResult) => void;
}

interface Suggestion {
  id: number;
  name: string;
}

function SearchPage({ setResults }: SearchPageProps) {
  const navigate = useNavigate();
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

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    setLoading(true);
    const newSuggestions = await fetchSuggestions(query);
    setSuggestions(newSuggestions);
    setLoading(false);
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  const suggestionItems = suggestions.map((suggestion) => (
    <ListItem key={suggestion.id} disablePadding>
      <ListItemButton onClick={() => handleSuggestionSelect(suggestion)}>
        <ListItemText primary={suggestion.name} />
      </ListItemButton>
    </ListItem>
  ));

  const showSuggestions = suggestions.length > 0 && !loading;

  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    const response = await fetch(`${process.env.REACT_APP_DROP_DOWN_URL}?query=${query}`);
    const data = await response.json();
    console.log("data", data)
    if(data?.length){
      const rec_suggestion: Suggestion[] = data.map((item: string) => {
        return {
          name: item
        }
      });
      console.log("rec_suggestion", rec_suggestion);
      return rec_suggestion;
    }
    return [];
  };

  return (
    <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
      {loading && <div>Loading...</div>}
      {!loading && <div>
        <div className={'d-flex justify-content-center'} style={{ marginTop: "10%" }}>
          <img src={white} height={200}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mx-auto mt-5" style={{ width: '75%', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper sx={{ display: "flex", alignItems: "center", width: "100%" }} className="w-75">
              <TextField
                id="search"
                label="Search"
                value={query}
                onChange={handleInputChange}
                fullWidth
                autoFocus
              />
              <IconButton type="submit" sx={{ p: 1 }} aria-label="search" className="custom-search-button">
                <SearchIcon /><span>Search</span>
              </IconButton>
              {loading && <CircularProgress size={20} sx={{ m: 1 }} />}
              {showSuggestions && (
                <List sx={{ position: "absolute", zIndex: 1, width: "100%", p: 0 }}>
                  {suggestionItems}
                </List>
              )}
            </Paper>
          </div>
        </form>
        <div className='sugestionOptions'>
            <Button className='suggest' variant="outlined">Outlined</Button>
            <Button className='suggest' variant="outlined">Outlined</Button>
            <Button className='suggest' variant="outlined">Outlined</Button>
            <Button className='suggest' variant="outlined">Outlined</Button>
        </div>
      </div>}
      <Footer></Footer>
    </div>

  );
}

export default SearchPage;
