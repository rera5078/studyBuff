import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import white from '../white.png';
import { search, SearchResult } from '../RecommendationPage/api';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import './SearchPage.css';
import TypingAnimation from '../typingAnimation/TypingAnimation';
import AsyncSelect from 'react-select/async';

interface SearchPageProps {
  setResults: (results: SearchResult) => void;
}

interface Suggestion {
  value: string;
  label: string;
}

function SearchPage({ setResults }: SearchPageProps) {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      localStorage.removeItem('Recommendations');
      console.log("search query", query);
      const results = await search(query);
      // const results: SearchResult = {
      //   query: '',
      //   platform: [],
      //   ner: [],
      //   top_similar_count: 0,
      //   top_similar_courses: [
      //     {
      //       CourseId: "CSCI 5622",
      //       CourseName: "Machine Learning",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     },
      //     {
      //       CourseId: "ENGL 4003",
      //       CourseName: "Old English 1: Introduction to Old English",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     },
      //     {
      //       CourseId: "LING 1010",
      //       CourseName: "The Study of Words",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     },
      //     {
      //       CourseId: "SPAN 1010",
      //       CourseName: "Beginning Spanish 1",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     },
      //     {
      //       CourseId: "HIST 4103",
      //       CourseName: "England from the Viking Age to the Tudors",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     },
      //     {
      //       CourseId: "CSCI 4593",
      //       CourseName: "Computer Organization",
      //       DepartmentName: "Department of Computer Science",
      //       Mode: ["person", "online"],
      //       CourseDifficulty: "0.64381233",
      //       CourseDifficultyBand: "Medium",
      //       ConfidenceScore: "69.7053222656",
      //       CourseSummary: "Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       Desc: "Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.",
      //       CourseKeywords: ["computer systems learn", "decision trees", "data mining", "machines learning", "decision trees support", "unsupervised learning", "used algorithms neural", "learning"],
      //     }
      //   ]
      // }
      setResults(results);
      setLoading(false);
      localStorage.setItem('Recommendations', JSON.stringify(results));
      navigate('/recommendation');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (userInput: string): Promise<Suggestion[]> => {
    try {
      if (query.length === 0){
        setQuery(userInput)
      }
      const response = await fetch(`${process.env.REACT_APP_DROP_DOWN_URL}?query=${userInput}`);
      const data = await response.json();
      // const data = [
      //   "top courses from Department of Biology are what?",
      //   "Provide me a list of coursework related to Big Data ??"
      // ]
      if (data?.length) {
        const rec_suggestion: Suggestion[] = data.map((item: string) => {
          return {
            value: item,
            label: item
          }
        });
        return rec_suggestion;
      }
    } catch (error) {
      return [];
    }
    return [];

  };


  const loadOptions = (
    inputValue: string,
    callback: (options: Suggestion[]) => void
  ) => {
    setTimeout(async () => {
      callback(await fetchSuggestions(inputValue));
    }, 1000);
  };


  const onInputChange = (inputValue: any, event : any) => {
    console.log("event", event, inputValue)
    if (event.action==='input-change'){
      setQuery(inputValue)
    }  
}

  const text = "Study Buff";

  return (
    <div className="SearchPage" data-testid="SearchPage">
      <NavBar></NavBar>
      {loading && <div>Loading...</div>}
      {!loading && <div>
        <div className={'d-flex justify-content-center'} style={{ marginTop: "10%" }}>
          <img src={white} className="shake-on-hover" height={200}></img>
        </div>
        <div className="animated-text">
          {[...text].map((char, index) => (
            <span key={index} className="animated-letter">
              {char}
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mx-auto" style={{ width: '75%', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper sx={{ display: "flex", alignItems: "center", width: "100%", backgroundColor: "#12204F", borderRadius: "8px" , color: "white"}} className="w-75">
              <AsyncSelect
                className="w-100 search-bar"
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                inputValue={query}
                onInputChange={onInputChange}
                placeholder="Search..."
              />
              <IconButton type="submit" sx={{ p: 1 }} aria-label="search" className="custom-search-button search-text">
                <SearchIcon /><span className='search-text'>Search</span>
              </IconButton>
            </Paper>
          </div>
        </form>
        <div className='sugestionOptions'>
          <TypingAnimation sentences={[
            "  Hey! Recommend some courses similar to machine learning in psychology?",
            "  Okay, Recommend for Textual analysis in business, what are some good choices?",
            "  Provide me a list of coursework related to Big Data ?",
            "  Coursework like WGST 6190",
            "  Coursework from Department of Women's and Gender Studies?",
            "  Top courses from Department of Biology are What?"
          ]}></TypingAnimation>
        </div>
      </div>}
      <Footer></Footer>
    </div>

  );
}

export default SearchPage;
