import './App.css'
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import store from './state/store';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
