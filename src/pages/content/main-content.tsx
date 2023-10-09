import {useParams} from "react-router-dom";
import {  Routes, Route} from "react-router-dom";
import Channels from './channels';
import Rooms from './rooms';

export default function MainContent() {

 
   
    
  return (
      <Routes>
        <Route path='/rooms/:uuid' element={ <Rooms /> } />
        <Route path='/channels/*' element={ <Channels /> } />
      </Routes>
     
  )
}
