import InfoCard from "../InfoCard/InfoCard";
import NavBar from "../NavBar/NavBar";
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

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
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
          <IconButton aria-label="delete">
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

const rows = [
  createData("ECEN 5341", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    },
  ]),
  createData("ECEN 5341", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
  createData("ECEN 5341", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
  createData("ECEN 5341", "Bioelectromagnetics", "ECEN", "In Person", "The teacher has not indicated if course materials are required for this course.", "", "Restricted to graduate students only.", [
    {
      sectionId: "001",
      instructor: "N. Wright",
      schedule: "Th 9:30a-12p"
    }
  ]),
];


function Recommendation() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <div className="footer fixed-bottom">
        <div className='container mt-2'>
          <p> Copyright &copy; 2023 University of Colorado Boulder. All rights reserved.</p>
        </div>
      </div>
      <div className="container">
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
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
                    {rows.map((row) => (
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