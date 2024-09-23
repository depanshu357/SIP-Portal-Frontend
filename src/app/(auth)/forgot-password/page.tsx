'use client'
import ForgotPasswordBox from "@/components/ForgotPasswordBox";
import SignInBox from "@/components/SignInBox";
import { Snackbar } from "@mui/material";
import Image from "next/image"
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
    <div className='min-h-screen bg-emerald-200 flex items-center justify-center h-full'>

      <div className='overflow-hidden max-w-7xl p-1 md:p-4 w-full h-[90vh] max-h-[900px]'>
        <div className='grid grid-cols-12 h-full'>
          <SnackbarProvider anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} 
          autoHideDuration={3000}
          >
            <ForgotPasswordBox />
          </SnackbarProvider>

          <div className='relative p-4 mx-2 h-full bg-white rounded-lg shadow-lg hidden md:col-span-7 md:flex text-black justify-center items-center'>
            {/* <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button> */}
            <div className="flex flex-row absolute top-4 right-4 gap-4 text-emerald-600">
              <div className="flex flex-row cursor-pointer">
                <Image src='/assets/images/user.png' width={24} height={20} alt="creativity" />
                Sign up
              </div>
              <div className="flex flex-row cursor-pointer">
                <Image src='/assets/images/contact.png' width={24} height={20} alt="creativity" />
                Contact Us
              </div>
            </div> 
            <Image src='/assets/images/forgot-password.jpeg' width={500} height={500} alt="creativity" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword