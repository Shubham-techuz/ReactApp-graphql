/* eslint-disable */

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { createNewProduct, getAllProducts } from '../queries/schema';
import { useNavigate } from 'react-router-dom/dist';
import {NotificationManager} from 'react-notifications';
import './AddProduct.css'

const AddProduct = ()=> {
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({});

  const handleOnChange = (event)=> {
    setProduct({ ...product, [event.target.name]: event.target.value});
  }

  const createOneProduct = createNewProduct();
  const [createProduct, { data, error }] = useMutation(createOneProduct, 
    {
      notifyOnNetworkStatusChange: true,
      refetchQueries: [
        { query: getAllProducts() }
      ]
    }  
  );

  // navigate to home screen

  const toProductListScreen=()=>{
    navigate('/');
  }

  // Form  handle Submit

  const handleSubmit = async (event)=> {
    event.preventDefault();
    try {
      let res = await createProduct({variables: { ...product }});
      if(res?.data?.insert_products?.returning?.length === 1) {
        NotificationManager.success("Product Created","",2000);
        toProductListScreen();
      } 
      console.log("-add data---->", data);  
      console.log("-add error---->", error);  
    } catch (error) {
      NotificationManager.error(`${error}`,"",3000);
      console.error(error);
    }
  }

  return <div>
    <h3 className='formHeading'>Add Product</h3>
    <form onSubmit={handleSubmit} className='form'>
      <div className='inputContainer'>
        <label for="title" className='formLabel'>Title: </label>
        <input onChange={handleOnChange} type="text" name="title" placeholder='Enter title' className='formInput' />
      </div>
      <div className='inputContainer'>
        <label for="description" className='formLabel'>Description: </label>
        <input onChange={handleOnChange} type="text" name="description" placeholder='Enter description' className='formInput' />
      </div>
      <div className='inputContainer'>
        <label for="price" className='formLabel'>Price: </label>
        <input onChange={handleOnChange} type="number" name="price" placeholder='Enter price' className='formInput' />
      </div>
      <div className='inputContainer'>
        <label for="quantity" className='formLabel'>Quantity: </label>
        <input onChange={handleOnChange} type="number" name="quantity" placeholder='Enter quantity' className='formInput' />
      </div>
      <input className='submitButton' type="submit" value="Create" />
    </form>
  </div>
}

export default AddProduct;
