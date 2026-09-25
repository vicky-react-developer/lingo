import './App.css'
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './state/store';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
