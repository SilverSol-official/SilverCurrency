
import * as react from 'react';
import {FC} from 'react';

import DropDownMenu from './DropDown';
import InputForm from './InputForm';



const MainBody:FC = () => {


    return(
      <div className="container">
       <div className="mainBody row">
            <div className="bodyWrapper col-sm-12 col-6">
                <DropDownMenu position='left'/> 
                <InputForm position='left'/>
              
            </div>
            <div className="bodyWrapper col-sm-12 col-6">
                <DropDownMenu position='right'/>
                <InputForm position='right'/>
               
            </div>    
        </div>  
      </div>
       
    )
}

export default MainBody;