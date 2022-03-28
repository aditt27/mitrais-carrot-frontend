import { Provider } from 'react-redux';
import store from './stores';
import CarrotRouter from './routes';

const App = ()=> {
  return (
    <Provider store={store}>
        <CarrotRouter />
    </Provider>
    
  );
}

export default App;
