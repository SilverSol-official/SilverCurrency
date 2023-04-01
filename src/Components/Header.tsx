import React from 'react';
import { FC,useEffect } from 'react';
import { AppDispatch, RootState } from '../rdx/Store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDollar, fetchEuro } from '../rdx/Features/header';

const Head:FC = () => {
    const dispatch:AppDispatch = useDispatch();
    const values:number[] = useSelector((state:RootState)=>state.header.values);

    useEffect(()=>{
        dispatch(fetchDollar(true));
        dispatch(fetchEuro(true));
        console.log('header',values);
    },[dispatch,values])
    

    return(
        <div className='header'>
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/us.png" alt='usa flag'/>
                <p>{values[0]}</p>
            </div>  
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/eu.png" alt='eu flag'/>   
                <p>{values[1]}</p>
            </div> 

        </div>
    )
}

export default Head;