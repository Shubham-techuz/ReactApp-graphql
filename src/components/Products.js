/* eslint-disable */
import './Products.css';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../queries/schema';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom/dist';
import {NotificationManager} from 'react-notifications';

function DisplayProducts() {
  const navigate = useNavigate();
  // navigate to home screen
  const toProductListScreen = () =>{
    navigate('/');
  }
  // delete Query
  const deleteOneProduct = deleteProduct();
  const [removeProduct, { loading: deleteProductLoading, error: deleteProductError, data: deleteProductData }] = useMutation(deleteOneProduct, 
    {
      notifyOnNetworkStatusChange: true,
      refetchQueries: [
        { query: getAllProducts() }
      ]
    }
  );

  // Form  handle Delete

  const onDelete = async (id)=> {
    if (confirm("Do you want to delete the row ?")) {
      console.log("Ok Pressed")
      try {
        let res = await removeProduct({variables: { id: id }});
        if(res?.data?.delete_products?.returning?.length === 1) {
          NotificationManager.success("Product Deleted","",2000);
          if(deleteProductLoading){
            toProductListScreen();
          }
        }
      } catch (error) {
        NotificationManager.error(`${error}`,"",2000);
        console.error(error);
      }
    } else {
      console.log("Cancel Pressed")
    } 
    
    
  }
  
  // get query
  const getProducts = getAllProducts();
  const { loading, error, data } = useQuery(getProducts);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className='isError'>Error :(</p>;

  // console.log("Products list =>", data?.products);

  return data?.products?.map(({ id, title, description, price, quantity }) => (
    
    <tr key={id}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td className='button_container'>
        <Link to="/mutation" state={{ productId: `${id}` }} className="button button_update">Update</Link>
        <button onClick={() => onDelete(id)} className='button button_delete'>Delete</button>  
      </td>
    </tr>
  ));
}

function Products() {
  return (
    <div>
      <h1 className='heading'>My first Apollo app 🚀</h1>
      <table  className="table_container">
        <thead>
          <tr className='table_heading'>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <DisplayProducts />
        </tbody>
      </table>
      <Link to="/mutation" className="button button_create">Create</Link>
    </div>
  );
}

export default Products;
