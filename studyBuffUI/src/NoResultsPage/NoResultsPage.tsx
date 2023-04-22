import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DelayedContent from '../Loading/Loading';
import { useNavigate } from "react-router-dom";
import sadEmoji from "../sadEmoji.webp";

const NoResultsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/search")
    };

    return (
        <div>
            <DelayedContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: "sans-serif" }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 4 }}>
                  <img src={sadEmoji} alt="Sad face" style={{ width: '250px' }} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ mb: 0.5, fontWeight: "700" }}>
                    OOPS! No Recommendations...
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    We understand that you are looking for recommendations, but unfortunately<br />
                    we need  the  Full Course Name or Course ID  to  generate them.  Could you<br />
                    please provide us with this information so that we can assist you further?
                  </Typography>
                  <Button variant="contained" onClick={handleGoBack}>
                  Try Again
                </Button>
                </Box>
              </Box>
            </Box>
            </DelayedContent>
        </div>
    );
};

export default NoResultsPage;
