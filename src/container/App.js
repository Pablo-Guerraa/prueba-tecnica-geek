import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import AppRoutes from '../routes/AppRoutes';
import '../App.css';

function App() {
  return (
    <Provider store={ store }>
      <AppRoutes/>
    </Provider>
  );
}

export default App;