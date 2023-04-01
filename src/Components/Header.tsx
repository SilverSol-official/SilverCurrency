import React from 'react';
import { FC } from 'react';

const Header:FC = () => {
    return(
        <div className='header'>
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/us.png" alt='usa flag'/>
                <p>32/44</p>
            </div>  
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/eu.png" alt='eu flag'/>   
                <p>32/44</p>
            </div> 

        </div>
    )
}

export default Header;