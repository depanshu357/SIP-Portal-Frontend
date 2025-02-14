'use client'
import React, { useContext, useEffect } from 'react'
import {useSession} from 'next-auth/react'

import axios from 'axios'
import { enqueueSnackbar } from 'notistack';
import {RecruiterProfileDataType} from "@/data/profileRealtedInfo"
import { ThemeProvider } from "@mui/material/styles";
import { profileTheme,  inputStyle, textFieldStyle, textInputStyle } from '@/theme';
import { Button, Paper, TextField, Typography } from '@mui/material';

function modifyData(data: any): RecruiterProfileDataType {
  const modifiedData: RecruiterProfileDataType = {
    Company: data.Company,
    Email: data.Email,
    ContactNumber: data.ContactNumber,
    AdditionalInfo: data.AdditionalInfo,
    NatureOfBusiness: data.NatureOfBusiness,
  }
  return modifiedData;
}

const RecruiterProfile = () => {
  const {data: session} = useSession()
  const [profileData, setProfileData] = React.useState<RecruiterProfileDataType | null>(null)
  
  const handleChange = (field: string) => (event: { target: { value: string; }; }) => {
    setProfileData((prev) => prev ? ({ ...prev, [field]: event.target.value }) : null);
    // console.log(formData);
  };

  useEffect(() => {
    const intializeProfileInfo = async () => {
      if(!session) return
      const instance = axios.create({
        withCredentials: true,
      })
      await instance.get(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/profile`).then((res)=> {
        // setProfileData(res.data)
        const recruiter_data:RecruiterProfileDataType = res.data.user
        setProfileData(modifyData(recruiter_data))
        console.log(recruiter_data)

      }).catch((err)=>{
        console.log(err)
        enqueueSnackbar("Error fetching profile data", { variant: "error" });
      })
    }
    intializeProfileInfo()
  
    return () => {
      
    }
  }, [session])
  
  const handleProfileUpdate = async () => {
    const instance = axios.create({
      withCredentials: true,
    })
    console.log({id: session?.user?.id,                // ID from session
      ...profileData})
    await instance.post(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/update-profile`, {
      ...profileData
    }).then((res)=> {
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
    }).catch((err)=>{
      console.log(err)
      enqueueSnackbar("Error updating profile", { variant: "error" });
    })
  }
  
  return (
    <div>
      <div>
        {session ? (
          <div> 
            
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
          </div>
        )}
      </div>
      <ThemeProvider theme={profileTheme}>
        <Paper
          sx={{ maxWidth: "1200px", marginX: "10px", margin: "auto", marginTop:"2rem" }}
          elevation={3}
        >
          <h1 className='text-center text-4xl p-2 font-bold text-emerald-600'>Profile</h1>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
            // onSubmit={handleSubmit}
          >
            <div style={inputStyle}>
              <Typography variant="body1">Company Name</Typography>
              <TextField
                required
                id="filled-required"
                variant="filled"
                disabled
                // onChange={handleChange("name")}
                value={profileData?.Company}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Recruiter Email</Typography>
              <TextField
                required
                id="filled-required"
                variant="filled"
                // onChange={handleChange("email")}
                value={profileData?.Email} 
                sx={textFieldStyle}
                disabled
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Contact Number</Typography>
              <TextField
                required
                id="filled-required"
                variant="filled"
                onChange={handleChange("ContactNumber")}
                value={profileData?.ContactNumber}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={inputStyle}>
              <Typography variant="body1">Nature Of Business</Typography>
              <TextField
                required
                id="filled-required"
                variant="filled"
                onChange={handleChange("NatureOfBusiness")}
                value={profileData?.NatureOfBusiness}
                sx={textFieldStyle}
              ></TextField>
            </div>
            <div style={textInputStyle}>
              <Typography variant="body1">Additional Information</Typography>
              <TextField
                required
                id="filled-required"
                variant="filled"
                onChange={handleChange("AdditionalInfo")}
                value={profileData?.AdditionalInfo}
                sx={textFieldStyle}
              ></TextField>
            </div>
            </form>
            <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "10px",
              width: "100%",
            }}
          >
            <Button
              onClick={handleProfileUpdate}
              variant="contained"
              type="submit"
              sx={{backgroundColor:"#059669 !important", "&:hover": { backgroundColor: "#008000de" }}}
              // disabled={loading}
            >
              Update
            </Button>
          </div>
        </Paper>
      </ThemeProvider>

    </div>
  )
}

export default RecruiterProfile