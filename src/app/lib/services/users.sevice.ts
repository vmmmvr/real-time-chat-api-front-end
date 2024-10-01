import {  useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../providers/ReactQueryProvider";
import { addFriend, getUsers, removeFriend} from "../axios/axios";
import { SignInData, SignUpData } from "../types/user";

export const useGetUsers = () => {
    return useQuery({
      queryKey: ["getUsers"], // Unique key for this query
      queryFn: async () => {
        const data = await getUsers();
        return data;
      },
    });
  };

export const useAddFriend = (username?: String) => {
    return useMutation({
      mutationKey: ["addFriend"], // Unique key for this query
      mutationFn: async () => {
        const data = await addFriend(username);
        return data;
      },
    });
  };

export const useRemoveFriend = (username?: String) => {
    return useMutation({
      mutationKey: ["removeFriend"], // Unique key for this query
      mutationFn: async () => {
        const data = await removeFriend(username);
        return data;
      },
    });
  };
