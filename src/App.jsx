import { RouterProvider } from "react-router-dom";
import mainRouter from "./router/main-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { WebSocketProvider } from "./lib/hooks/useWebSocket";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider>
          <RouterProvider router={mainRouter} />
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
