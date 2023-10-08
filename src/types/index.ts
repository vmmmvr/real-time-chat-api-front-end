export interface AuthCreditential {
    accessToken: string;
    refreshToken: string;
}

export interface UserProps {
    id?: number;
    uuid?: string;     
    name?: string;     
    email?: string;    
    password?: string; 
    sessions?: []; 
    active?: boolean   
    channels?: []
    messages?: [] 
    createdAt?: string
    myChannel?: []
}