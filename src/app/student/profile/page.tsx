'use client'
import React from 'react'
import {useSession} from 'next-auth/react'

import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { branchList, ProfileDataType, defaultProfileData, programList } from '@/data/profileRealtedInfo';
import { profileTheme,  inputStyle, textFieldStyle } from '@/theme';

// import { SessionProvider } from 'next-auth/react'

const Home = () => {
  const [profileData, setProfileData] = React.useState<ProfileDataType>(defaultProfileData);
  const {data: session} = useSession()
  // console.log(session)
  const handleChange = (field: string) => (event: { target: { value: string; }; }) => {
    setProfileData({ ...profileData, [field]: event.target.value });
    // console.log(formData);
  };
  return (
    <div >Student Home
      <div>
        {session ? (
          <div> 
            <p>Signed in as {session?.user?.email}</p>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
          </div>
        )}
      </div>
      <div>
      <ThemeProvider theme={profileTheme}>
        <Paper
          sx={{ maxWidth: "1200px", width: "90vw", margin: "auto" }}
          elevation={3}
        >
          <h1 className='text-center text-4xl p-2 font-bold text-emerald-600'>Profile</h1>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
            // onSubmit={handleSubmit}
          >
            <div style={inputStyle}>
              <Typography variant="body1">Name</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                onChange={handleChange("name")}
                value={profileData.name}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">IITK Email</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                onChange={handleChange("email")}
                value={profileData.email}
                sx={textFieldStyle}
                disabled
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">IITK Roll No.</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                onChange={handleChange("rollNumber")}
                value={profileData.rollNumber}
                sx={textFieldStyle}
                disabled
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Department</Typography>
              <FormControl sx={textFieldStyle}>
              <Select
                  value={profileData.department}
                  onChange={handleChange("department")}
                >
                  {branchList.map((branch) => (
                    <MenuItem value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Secondary Department</Typography>
              <FormControl sx={textFieldStyle}>
              <Select
                  value={profileData.secondaryDepartment}
                  onChange={handleChange("secondaryDepartment")}
                >
                  {branchList.map((branch) => (
                    <MenuItem value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Program</Typography>
              <FormControl sx={textFieldStyle}>
              <Select
                  value={profileData.program}
                  onChange={handleChange("program")}
                >
                  {programList.map((program) => (
                  <MenuItem value={program}>{program}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Secondary Program</Typography>
              <FormControl sx={textFieldStyle}>
              <Select
                  value={profileData.secondaryProgram}
                  onChange={handleChange("secondaryProgram")}
                >
                  {programList.map((program) => (
                  <MenuItem value={program}>{program}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Specialisation</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.specialisation}
                onChange={handleChange("specialisation")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Preference</Typography>
              <FormControl sx={textFieldStyle}>
                <Select
                  value={profileData.preference}
                  onChange={handleChange("preference")}

                >
                  <MenuItem value="male">Industrial</MenuItem>
                  <MenuItem value="female">Academic</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Gender</Typography>
              <FormControl sx={textFieldStyle}>
                {/* <InputLabel>Gender</InputLabel> */}
                <Select
                  value={profileData.gender}
                  onChange={handleChange("gender")}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Date of Birth</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                type="date"
                value={profileData.dob}
                onChange={handleChange("dob")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Contact Number</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.contactNumber}
                onChange={handleChange("contactNumber")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Current CPI</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.currentCPI}
                onChange={handleChange("currentCPI")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Tenth Board</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.tenthBoard}
                onChange={handleChange("tenthBoard")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Tenth Marks</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.tenthMarks}
                onChange={handleChange("tenthMarks")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Tenth Board Year</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.tenthBoardYear}
                onChange={handleChange("tenthBoardYear")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Twelfth Board</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.twelfthBoard}
                onChange={handleChange("twelfthBoard")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Twelfth Marks</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.twelfthMarks}
                onChange={handleChange("twelfthMarks")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Twelfth Board Year</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.twelfthBoardYear}
                onChange={handleChange("twelfthBoardYear")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Entrance Exam</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.entranceExam}
                onChange={handleChange("entranceExam")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Entrance Exam Rank</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.entranceExamRank}
                onChange={handleChange("entranceExamRank")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Category</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.category}
                onChange={handleChange("category")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Category Rank</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.categoryRank}
                onChange={handleChange("categoryRank")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Disability</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.disability}
                onChange={handleChange("disability")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Current Address</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.currentAddress}
                onChange={handleChange("currentAddress")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Permanent Address</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.permanentAddress}
                onChange={handleChange("permanentAddress")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Friends Name</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.friendsName}
                onChange={handleChange("friendsName")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Friends Contact Details</Typography>
              <TextField
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.friendsContactDetails}
                onChange={handleChange("friendsContactDetails")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Expected Graduation Year</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.expectedGraduationYear}
                onChange={handleChange("expectedGraduationYear")}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Personal Email</Typography>
              <TextField
                required
                id="filled-required"
                defaultValue=""
                variant="filled"
                value={profileData.personalEmail}
                onChange={handleChange("personalEmail")}
                sx={textFieldStyle}
              ></TextField>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px",
              paddingRight: "20px",
              width: "100%",
            }}
          >
            <Button
              // onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{backgroundColor:"green", "&:hover": { backgroundColor: "#008000de" }}}
              // disabled={loading}
            >
              Update
            </Button>
          </div>
        </Paper>
      </ThemeProvider>
      </div>
    </div>
  )
}

export default Home