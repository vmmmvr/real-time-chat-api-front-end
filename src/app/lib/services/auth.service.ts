import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../providers/ReactQueryProvider";
import { getMe, signIn, signUp } from "../axios/axios";
import { SignInData, SignUpData } from "../types/user";

export const useSignUp = (body: SignUpData) => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: async () => {
      return await signUp(body);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["signUp"], data);
    },
  });
};
export const useSignIn = (body: SignInData) => {
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async () => {
      return await signIn(body);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["signIn"], data);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["getMe"], // Unique key for this query
    queryFn: async () => {
      const data = await getMe();
      return data;
    },
  });
};
