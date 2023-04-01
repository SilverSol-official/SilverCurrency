
import * as react from 'react';
import {FC} from 'react';

import DropDownMenu from './DropDown';
import InputForm from './InputForm';


const MainBody:FC = () => {



    

    return(
        <div className="mainBody container">
            <div className="bodyWrapper row">
                <div className=' col-sm-6 mt-1'>
                    <DropDownMenu position='left'/> 
                    <InputForm position='left'/>
                </div>
                <div className=' col-sm-6 mt-1'>
                        <DropDownMenu position='right'/>
                        <InputForm position='right'/>
                </div> 
                </div>  
        </div>
    )
}

export default MainBody;