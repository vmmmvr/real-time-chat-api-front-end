'use client'
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Typography } from '@material-tailwind/react';
import { UserSignInSchema } from '@/app/lib/validators/user.schema';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/Loading/Loading';
import { useSignIn } from '@/app/lib/services/auth.service';
import { SignInData } from '@/app/lib/types/user';
import { redirect } from 'next/navigation';
import ErrorAlert from '@/app/components/ErrorAlert/ErrorAlert';
import  cookies  from 'js-cookie';
import Link from 'next/link';
import { missingProperties } from '@/app/lib/utils/utils';


export default function SignInComponent() {
  const [userBody, setUserBody] = useState<SignInData>({});

  const {mutateAsync: signIn, data: userSignInData, isPending: loading, isError, error: userSignInError, } = useSignIn(userBody);
  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: UserSignInSchema,
    onSubmit: (values) => {
      setUserBody({...values});
      signIn().then(data => {
   
      })
    },
  });
 // sign in data
 useEffect(() => {
  if(userSignInData) {
    const { refreshToken, accessToken } = userSignInData.data;
    
    if (refreshToken && accessToken) {
      // Set cookies for accessToken and refreshToken
      cookies.set('refreshToken', refreshToken, { path: '/' });
      cookies.set('accessToken', accessToken, { path: '/' });
      
      // Redirect user after successful sign-in
      redirect('/');
    } else {
      console.error('Missing refreshToken or accessToken in response');
    }
  }

return () => {}
}, [userSignInData]);

// loading
if(loading) {
return <Loading />
}

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
    {
     userSignInError &&  <ErrorAlert  message={`${userSignInError}`} />
    }
 <div>
   <Typography {...missingProperties} variant="h4" color="blue-gray">
     Sign In
   </Typography>
   <Typography  {...missingProperties} color="gray" className="mt-1 font-normal">
     Enter your details to sign in.
   </Typography>
 </div>
 <div className="space-y-4">
   <div>
     <Input
            crossOrigin={undefined} label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? true : undefined}
            size="lg"
            className="w-full" {...missingProperties}        />
      <small className='text-warning'>{formik.errors.email}</small>
   </div>
   <div>
     <Input
       label="Password"
       type="password"
       name="password"
       value={formik.values.password}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       error={formik.touched.password && formik.errors.password ? true : undefined}
       size="lg"
       className="w-full"  crossOrigin={undefined}   {...missingProperties}        />
     <small className='text-warning'>{formik.errors.password}</small>
   </div>
 </div>
 <div className="flex justify-between items-center">
   <a href="/auth/forget-password" className="text-sm text-primary-500 hover:underline">
     Forgot password?
   </a>
 </div>
 <Button    {...missingProperties} 
   type="submit"
   className="w-full bg-primary-700 hover:bg-primary-800 text-primary-50 font-semibold py-4 px-4 rounded-md shadow-md"
 >
   Sign In
 </Button>
 <div className="flex justify-between items-center">
   <span className="text-gray-500">You don&apos;t have an account </span> <Link href="/auth/sign-up" className="text-sm text-primary-500 hover:underline">
       Sign up
   </Link>
 </div>
</form>
  )
}
