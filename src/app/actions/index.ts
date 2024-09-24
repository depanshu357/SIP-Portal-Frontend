'use server'

import {signIn, signOut } from '@/auth';

type formData = {
    email: string;
    password: string;
}

export async function doCredentialLogin(formData: formData){
    try {
        const response = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect:false
        });
        return response;
    } catch (error: any) {
        return {error: "Invalid credentials"};
        throw new Error(error);
    }
}