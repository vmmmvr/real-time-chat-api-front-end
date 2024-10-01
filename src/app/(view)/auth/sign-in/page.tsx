"use server";
import { cookies } from "next/headers";
import SignInComponent from '../../../components/SignInComponent/SignInComponent';

const SignInPage = () => {
  return (
    <SignInComponent  />
  );
};

export default SignInPage;
