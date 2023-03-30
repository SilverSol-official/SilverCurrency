import React from 'react';
import { FC } from 'react';

const Header:FC = () => {
    return(
        <div className='header'>
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/us.png" alt='usa flag'/>
                <h2>32/44</h2>
            </div>  
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/eu.png" alt='eu flag'/>   
                <h2>32/44</h2>
            </div> 

        </div>
    )
}

export default Header;