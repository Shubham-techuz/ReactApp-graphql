/* eslint-disable */
import './App.css';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Products from './components/Products';
import Mutation from './components/Mutation';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const client = new ApolloClient({
  uri: 'https://techuz-hasura.herokuapp.com/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (

      <BrowserRouter>
        <NotificationContainer />
        <ApolloProvider client={client}>
          <Routes>
            <Route exact path='/' element={<Products />} />
            <Route path='/mutation' element={<Mutation />}/>
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
  );
}
export default App;
