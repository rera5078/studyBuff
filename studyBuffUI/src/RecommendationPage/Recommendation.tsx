import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
import './Recommendation.css';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import Loading from "../Loading/Loading";
import { SearchResult } from "./api";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";

interface DashboardProps {
  results: SearchResult | undefined;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  CourseId: string,
  CourseName: string,
  DepartmentName: string,
  Mode: string[],
  CourseDifficultyBand: string,
  CourseDifficulty: string,
  ConfidenceScore: string,
  CourseDetails: any[],
) {
  return {
    CourseId,
    CourseName,
    DepartmentName,
    Mode,
    CourseDifficulty,
    CourseDifficultyBand,
    ConfidenceScore,
    CourseDetails
  };
}


let rows: any[] = [];

const table_rows: ReturnType<typeof createData>[] = []


function Recommendation({ results }: DashboardProps) {
  rows = []
  const myMethod = (value: any) => {
    console.log("value", value)
    rows.push(
      createData(
        value.CourseId,
        value.CourseName,
        value.DepartmentName,
        value.Mode,
        value.CourseDifficulty,
        value.CourseDifficultyBand,
        value.ConfidenceScore,
        [{
          summary: value.CourseSummary,
          description: value.Desc,
          courseKeywords: value.CourseKeywords
        }]),
    )
  }

  if (results) {
    const top_course = results?.top_similar_courses

    for (let i = 0; i < top_course?.length; i++) {
      myMethod(top_course[i]);
    }
  }
  else {
    rows = []
  }

  console.log("rows 111 ", rows)

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    function handleDeleteRow(id: any) {
      const newList = tableData.filter((item) => item.courseID !== id);
      setTableData(newList);
      return undefined;
    }
    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {row.CourseId}
          </StyledTableCell>
          <StyledTableCell align="center">{row.CourseName}</StyledTableCell>
          <StyledTableCell align="center">{row.DepartmentName}</StyledTableCell>
          <StyledTableCell align="center">
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {row.Mode.map((data: any) => {
                return (
                  <ListItem>
                    <Chip label={data.label} color="primary" variant="outlined" />
                  </ListItem>
                );
              })}
            </Paper>
          </StyledTableCell>
          <StyledTableCell align="center">{row.CourseDifficultyBand}</StyledTableCell>
          <StyledTableCell align="center">{row.CourseDifficulty}</StyledTableCell>
          <StyledTableCell align="center">{row.ConfidenceScore}</StyledTableCell>
          <StyledTableCell>
            <IconButton aria-label="delete" onClick={() => handleDeleteRow(row.CourseId)}>
              <DeleteIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Sections
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Summary</StyledTableCell>
                      <StyledTableCell>Course Keywords</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {row.CourseDetails.map((sectionRow) => (
                      <StyledTableRow>
                        <StyledTableCell>{sectionRow.summary}</StyledTableCell>
                        <StyledTableCell>
                          <Paper
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              flexWrap: 'wrap',
                              listStyle: 'none',
                              p: 0.5,
                              m: 0,
                            }}
                            component="ul"
                          >
                            {sectionRow.courseKeywords.map((data: any) => {
                              return (
                                <ListItem>
                                  <Chip label={data.label} color="primary" variant="outlined" />
                                </ListItem>
                              );
                            })}
                          </Paper>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([]);

  const [startIndex, setStartIndex] = useState(0);

  const handleClickLeft = () => {
    setStartIndex((prevStartIndex) =>
      Math.max(0, prevStartIndex - 4)
    );
  };

  const handleClickRight = () => {
    setStartIndex((prevStartIndex) =>
      Math.min(rows.length - 4, prevStartIndex + 4)
    );
  };

  const leftArrow = (
    <IconButton
      disabled={startIndex === 0}
      onClick={handleClickLeft}
      sx={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)" }}
    >
      <ChevronLeftIcon />
    </IconButton>
  );

  const rightArrow = (
    <IconButton
      disabled={startIndex >= rows.length - 3}
      onClick={handleClickRight}
      sx={{ position: "absolute", top: "50%", right: "2%", transform: "translateY(-50%)" }}
    >
      <ChevronRightIcon />
    </IconButton>
  );

  const cards = rows.slice(startIndex, startIndex + 4).map((item) => (
    <Grid item xs={4} key={item.id}>
      <div className="card">
        <div className="card-details">
          <p className="text-title">{item.CourseId}</p>
          <p className="text-body">
            {item.CourseDetails[0].description}
          </p>
        </div><button className="card-button" onClick={() => handleAddToTable(item)}>ADD</button>
      </div>
      <IconButton
        onClick={handleClickRight}
        sx={{ position: "absolute", top: "50%", right: "2%", transform: "translateY(-50%)" }}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        onClick={handleClickLeft}
        sx={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)" }}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Grid>
  ));

  function handleAddToTable(course: any): undefined {
    const newTableRows = tableData.concat(course);
    setTableData(newTableRows);
    return undefined;
  }

  return (
    <div>
      {loading ? <Loading /> : undefined}
      <NavBar></NavBar>
      <Footer></Footer>
      <div className="container">
        <div style={{ position: "relative" }}>
          {leftArrow}
          <Grid container spacing={2}>
            {cards}
          </Grid>
          {rightArrow}
        </div>
      </div>
      <div className="tabel">
        <div className="App">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table customized table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell />
                      <StyledTableCell>Course ID</StyledTableCell>
                      <StyledTableCell align="center">Course Name</StyledTableCell>
                      <StyledTableCell align="center">Department Name</StyledTableCell>
                      <StyledTableCell align="center">Instruction Mode</StyledTableCell>
                      <StyledTableCell align="center">Course Difficulty Score</StyledTableCell>
                      <StyledTableCell align="center">Course Difficulty Level</StyledTableCell>
                      <StyledTableCell align="center">Model Performance</StyledTableCell>
                      <StyledTableCell />
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <Row key={row.courseID} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;