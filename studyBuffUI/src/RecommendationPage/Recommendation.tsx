import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
import './Recommendation.css';
import { useEffect, useState } from "react";
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
  courseID: string,
  courseName: string,
  departmentID: string,
  instructionMode: string,
  books: string,
  notes: string,
  restrictedInfo: string,
  sectionInfo: any[],
  isAdded: boolean = false
) {
  return {
    courseID,
    courseName,
    departmentID,
    instructionMode,
    books,
    notes,
    restrictedInfo,
    sectionInfo,
    isAdded
  };
}


const rows: any[] = [
  createData("ECEN 5341", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    },
  ]),
  createData("ECEN 5342", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
  createData("ECEN 5343", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
  createData("ECEN 5344", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
];

const table_rows: ReturnType<typeof createData>[] = []


function Recommendation({ results }: DashboardProps) {
  console.log("results", results);
  const top_course = results?.top_similar_courses
  console.log("top_course", top_course);

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    function handleDeleteRow(id: any){
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
              {row.courseID}
            </StyledTableCell>
            <StyledTableCell align="center">{row.courseName}</StyledTableCell>
            <StyledTableCell align="center">{row.departmentID}</StyledTableCell>
            <StyledTableCell align="center">{row.instructionMode}</StyledTableCell>
            <StyledTableCell align="center">{row.books}</StyledTableCell>
            <StyledTableCell align="center">{row.notes}</StyledTableCell>
            <StyledTableCell align="center">{row.restrictedInfo}</StyledTableCell>
            <StyledTableCell>
              <IconButton aria-label="delete" onClick = {() => handleDeleteRow(row.courseID)}>
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
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Instructor</StyledTableCell>
                        <StyledTableCell>Schedule</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {row.sectionInfo.map((sectionRow) => (
                          <StyledTableRow key={sectionRow.sectionId}>
                            <StyledTableCell component="th" scope="row">
                              {sectionRow.sectionId}
                            </StyledTableCell>
                            <StyledTableCell>{sectionRow.instructor}</StyledTableCell>
                            <StyledTableCell>{sectionRow.schedule}</StyledTableCell>
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


  /////////
  /////////
  /////////
  console.log("Recommendation Page results", results);
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })
  }, [])
const cards = rows.map(course => <div className="card">
  <div className="card-details">
    <p className="text-title">{course.courseID}</p>
    <p className="text-body">
      Effects of electric and magnetic fields on biological systems are described with applications to therapy and safety. The complexity of biological systems is described to provide a better understanding of the distribution of fields inside the body. Risk analysis is also introduced. Same as ECEN 4341.
    </p>
  </div>
  <button className="card-button" onClick={() => handleAddToTable(course)}>ADD</button>
</div>);
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
        {cards}
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
                      <StyledTableCell align="center">Department ID</StyledTableCell>
                      <StyledTableCell align="center">Instruction Mode</StyledTableCell>
                      <StyledTableCell align="center">Course Materials</StyledTableCell>
                      <StyledTableCell align="center">Notes</StyledTableCell>
                      <StyledTableCell align="center">Restricted Info</StyledTableCell>
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