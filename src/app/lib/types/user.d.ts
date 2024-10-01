export interface User {
  _id?: String;
  id: String;
  uuid?: String;
  name?: String;
  email?: String;
  active?: Boolean;
  createdAt?: Date;
  username?: String;
  friends?: User[];
  description?: String;
}

export type  Users = User[] 

export interface SignInData {
  email?: string;
  password?: string;
}
export interface SignUpData extends SignInData {
  name?: string;
  username?: string;
}

export interface SignupResponse {
  user: any; // Replace `any` with the actual user type if available
}
