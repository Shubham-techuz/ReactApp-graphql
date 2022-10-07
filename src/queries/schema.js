import { gql } from "@apollo/client";

export const getAllProducts = () => {
    return gql`
    query MyQuery {
        products {
            id
            title
            description
            price
            quantity
        } 
    }
    `;
}

export const createNewProduct = () => {
    return gql`
    mutation CreateProduct($title: String!, $description: String!, $price: float8!, $quantity: numeric!) {
        insert_products(objects: {title: $title, description: $description, price: $price, quantity: $quantity}) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;
}

export const updateProduct = () => {
    return gql`
    mutation UpdateProduct($id: bigint!, $title: String!, $description: String!, $price: float8!, $quantity: numeric!) {
        update_products(where: {id: {_eq: $id}}, _set: {title: $title, description: $description, price: $price, quantity: $quantity}) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;
}

export const deleteProduct = () => {
    return gql`
    mutation RemoveProduct($id: bigint!) {
        delete_products(where: {id: {_eq: $id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;
}

  