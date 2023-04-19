// import { useState } from "react";
// import { Card, CardContent, Grid, IconButton } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// interface Data {
//   id: number;
//   title: string;
//   content: string;
// }

// interface Props {
//   data: Data[];
// }

// function CardCarousel({ data }: Props) {
//   const [startIndex, setStartIndex] = useState(0);

//   const handleClickLeft = () => {
//     setStartIndex((prevStartIndex) =>
//       Math.max(0, prevStartIndex - 3)
//     );
//   };

//   const handleClickRight = () => {
//     setStartIndex((prevStartIndex) =>
//       Math.min(data.length - 3, prevStartIndex + 3)
//     );
//   };

//   const leftArrow = (
//     <IconButton
//       disabled={startIndex === 0}
//       onClick={handleClickLeft}
//       sx={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)" }}
//     >
//       <ChevronLeftIcon />
//     </IconButton>
//   );

//   const rightArrow = (
//     <IconButton
//       disabled={startIndex >= data.length - 3}
//       onClick={handleClickRight}
//       sx={{ position: "absolute", top: "50%", right: "2%", transform: "translateY(-50%)" }}
//     >
//       <ChevronRightIcon />
//     </IconButton>
//   );

//   const cards = data.slice(startIndex, startIndex + 3).map((item) => (
//     <Grid item xs={4} key={item.id}>
//       <Card>
//         <CardContent>
//           <h2>{item.title}</h2>
//           <p>{item.content}</p>
//           <IconButton
//             onClick={handleClickRight}
//             sx={{ position: "absolute", top: "50%", right: "2%", transform: "translateY(-50%)" }}
//           >
//             <ChevronRightIcon />
//           </IconButton>
//           <IconButton
//             onClick={handleClickLeft}
//             sx={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)"}}
//           >
//             <ChevronLeftIcon />
//           </IconButton>
//         </CardContent>
//       </Card>
//     </Grid>
//   ));

//   return (
//     <div style={{ position: "relative" }}>
//       {leftArrow}
//       <Grid container spacing={2}>
//         {cards}
//       </Grid>
//       {rightArrow}
//     </div>
//   );
// }

// export default CardCarousel;

import { useState } from "react";
import {
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Suggestion {
  id: number;
  name: string;
}

function SearchBar() {
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
    const response = await fetch(`https://api.example.com/suggestions?q=${query}`);
    const data = await response.json();
    return data;
  };

  return (
    <Paper sx={{ display: "flex", alignItems: "center", width: "100%" }} className="w-75">
      <TextField
        id="search"
        label="Search"
        value={query}
        onChange={handleInputChange}
        fullWidth
        autoFocus
      />
      <IconButton type="submit" sx={{ p: 1 }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {loading && <CircularProgress size={20} sx={{ m: 1 }} />}
      {showSuggestions && (
        <List sx={{ position: "absolute", zIndex: 1, width: "100%", p: 0 }}>
          {suggestionItems}
        </List>
      )}
    </Paper>
  );
}

export default SearchBar;


