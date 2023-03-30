import * as react from 'react';
import {FC} from 'react';
import DropDownMenu from './DropDown';
import LeftInput from './InputLeft';
import RightInput from './InputRight';

const MainBody:FC = () => {
    return(
        <div className="mainBody">
            <div className="bodyWrapper">
                <DropDownMenu/> 
                <LeftInput/>       
            </div>
            <div className="bodyWrapper">
                <DropDownMenu/>
                <RightInput/>        
            </div>    
        </div>
    )
}

export default MainBody;