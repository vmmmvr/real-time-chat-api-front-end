'use client';

import { useFormik } from 'formik';
import { Input, Button, Typography } from '@material-tailwind/react';
import { useSignUp } from '@/app/lib/services/auth.service';
import { useEffect, useState } from 'react';
import { SignUpData, SignupResponse } from '@/app/lib/types/user';
import { redirect } from 'next/navigation';
import { UserSignUpSchema } from '@/app/lib/validators/user.schema';
import ErrorAlert from '@/app/components/ErrorAlert/ErrorAlert';
import Loading from '@/app/components/Loading/Loading';
import { missingProperties } from '@/app/lib/utils/utils';

const SignUpForm = () => {
  const [userBody, setUserBody] = useState<SignUpData>({ });

  const {mutateAsync: signUp, data: userSignupData, isPending: loading, isError, error: userSignupError, } = useSignUp(userBody);
  // formik
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: UserSignUpSchema,
    onSubmit: (values) => {
      
      setUserBody({...values});
      signUp().then(data => {
      })
    },
  });
  // sign up data
  useEffect(() => {
      if(userSignupData) {
        redirect("/auth/sign-in")
      }
    return () => {}
  }, [userSignupData])
  // loading
  if(loading) {
    return <Loading />
  }

  function handleNameOnChange(e:any)  {
    formik.setFieldValue('name', e.target.value);
    const username = (e.target.value + Math.floor(Math.random() * 100)).toString().trim().replace(/\s/g, "");
    formik.setFieldValue('username', username);
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
         {
          userSignupError &&  <ErrorAlert  message={`${userSignupError}`} />
         }
      <div>
        <Typography   variant="h4" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >
          Sign Up
        </Typography>
        <Typography   color="gray" className="mt-1 font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
          Create a new account.
        </Typography>
      </div>
      <div className="space-y-4">
        <div>
          <Input
            label="Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={handleNameOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? true : undefined}
            size="lg"
            className="w-full"  crossOrigin={undefined}      {...missingProperties}           />
             <small className='text-warning'>{formik.errors.name}</small>
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? true : undefined}
            size="lg"
            className="w-full"  crossOrigin={undefined}          {...missingProperties}    />
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
            className="w-full"  crossOrigin={undefined}      {...missingProperties}        />
          <small className='text-warning'>{formik.errors.password}</small>
        </div>
      </div>
      <Button    {...missingProperties}
        type="submit"
        className="w-full bg-primary-700 hover:bg-primary-800 text-primary-50 font-semibold py-4 px-4 rounded-md shadow-md"        >
        Sign Up
      </Button>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Already have an account? </span>
        <a href="/auth/sign-in" className="text-sm text-primary-500 hover:underline">
          Sign In
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
