import {useParams} from "react-router-dom";
import {  Routes, Route} from "react-router-dom";
import Channels from '../Channel/channels';
import Rooms from '../Room/rooms';

export default function MainContent() {

 
   
    
  return (
      <Routes>
        <Route path='/rooms/:uuid' element={ <Rooms /> } />
        <Route path='/channels/:uuid' element={ <Channels /> } />
      </Routes>
     
  )
}
