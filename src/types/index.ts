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
    privateChannels: []
    openedChannel: {}
}
export interface MessageSliceProps   {
    status: string,
    openedRoomMessages: [],
    message: string | null,
}
export interface RoomSliceProps   {
    status: string,
room: Room | null,
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

export interface SendMessageProps {
    message: string;
     roomuuid: string;
      channeluuid: string;
       senderuuid: string;
       accessToken?: string;
       refreshToken?: string;
}
export interface GetRoomProps {
     roomuuid: string;
       accessToken?: string;
       refreshToken?: string;
}
export interface CreateRoomThunk {
    name: string;
    channeluuid: string;
    enabled: boolean;
       accessToken?: string;
       refreshToken?: string;
}
export interface GetChannelProps {
    channeluuid: string;
       accessToken?: string;
       refreshToken?: string; 
}

export interface OpenMenuProps {
    itemuuid: string;
    isOpen?: boolean
}