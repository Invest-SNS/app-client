import { RouterProvider } from 'react-router-dom';
import mainRouter from './router/main-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={mainRouter} />
      </PersistGate>
    </Provider>
  )
}

export default App;
