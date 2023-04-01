import React from 'react';
import { FC,useEffect } from 'react';
import { AppDispatch, RootState } from '../rdx/Store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDollar, fetchEuro } from '../rdx/Features/header';

const Head:FC = () => {
    const dispatch:AppDispatch = useDispatch();
    const values:number[] = useSelector((state:RootState)=>state.header.values);
    type status = "loading" | "resolved" | "rejected";
    type error = object | null | unknown;
    const { status:status, error:error } = useSelector((state:RootState) => state.currency)
    useEffect(()=>{
        dispatch(fetchDollar(true));
        dispatch(fetchEuro(true));
        console.log('header',values);
    },[dispatch,values])
    
    const checkoutConnection:Function = () => {
        if (status === "loading" && error === null) {
          return <h3>Loading...</h3>;
        } else if (error != null) {
          return <h3>An error occured</h3>;
        } else {
          return(
            <>
                <div className="wrapper">
                <img src="https://flagcdn.com/w80/us.png" alt='usa flag'/>
                <p>{values[0]}</p>
            </div>  
            <div className="wrapper">
                <img src="https://flagcdn.com/w80/eu.png" alt='eu flag'/>   
                <p>{values[1]}</p>
            </div> 
            </>
          );
        };
      }

    return(
        <div className='header'>
            {checkoutConnection()}

        </div>
    )
}

export default Head;