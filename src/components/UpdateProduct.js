/* eslint-disable */

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { updateProduct, getAllProducts } from '../queries/schema';
import { useNavigate } from 'react-router-dom/dist';
import {NotificationManager} from 'react-notifications';


const UpdateProduct = ({ productId })=> {
  const navigate = useNavigate();

  const [updateNewProduct, setUpdateNewProduct] = useState({ id: productId });

  const updateOneProduct = updateProduct();
  const [updateExistingProduct] = useMutation(updateOneProduct, 
    {
        notifyOnNetworkStatusChange: true,
        refetchQueries: [
          { query: getAllProducts() }
        ]
    }  
  );

  const handleOnChange = (event)=> {
    setUpdateNewProduct({ ...updateNewProduct, [event.target.name]: event.target.value});
  }

  // navigate to home screen

  const toProductListScreen=()=>{
    navigate('/');
  }

  // Form  handle Submit

  const handleSubmit = async (event)=> {
    event.preventDefault();
    try {
      let res = await updateExistingProduct({variables: { ...updateNewProduct }});
      if(res?.data?.update_products?.returning?.length === 1) {
        NotificationManager.success("Product Updated","",2000);
        toProductListScreen();
      } 
    } catch (error) {
      NotificationManager.error(`${error}`,"",3000);
      console.error(error);
    }
  }

  return <div>
        <h3 className='formHeading'>Update Product</h3>
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
            <input className='submitButton' type="submit" value="Update" />
        </form>
    </div>
}

export default UpdateProduct;



// {
//   "title": "Changed the title", 
//   "description": "Changed the description", 
//   "price": 400, 
//   "quantity": 4
// }
// {
//   "title": "Without ID", 
//   "description": "without id description", 
//   "price": 200, 
//   "quantity": 4
// }
// {
//   "id": 5
// }