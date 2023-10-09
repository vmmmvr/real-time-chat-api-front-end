export interface AuthCreditential {
    accessToken: string;
    refreshToken: string;
    input?: object
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

export interface ChannelSliceProps   {
    status: string,
    publicChannels: [],
    myChannels: [],
}


export interface Room {
    id: number;          
    uuid: string;        
    name: string;       
    channel: object;     
    channeluuid: string; 
    messages   : [] 
    private     : boolean
    createdAt : string
}