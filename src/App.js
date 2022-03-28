import { Provider } from 'react-redux';
import store from './stores';
import CarrotRouter from './routes';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import './assets/css/style.css';

library.add(faLock)

const App = ()=> {
  return (
    <Provider store={store}>
        <CarrotRouter />
    </Provider>
    
  );
}

export default App;
