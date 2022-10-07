/* eslint-disable */
import React from 'react';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import './Mutation.css'
import { useLocation } from 'react-router-dom';

const Mutation = () => {

    const location = useLocation();
    let isIdPresent = null;
    if(location.state !== null){
        const { productId } = location.state;
        isIdPresent = productId;
    }


    return (
        <div className='mutation'>
            <div className='container'>
                <div className='formContainer'>
                    {isIdPresent ? <UpdateProduct  productId={isIdPresent}/> : <AddProduct />}
                </div>
            </div>
        </div>
    );
}

export default Mutation;
