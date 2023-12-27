import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { socketInstance, SocketProvider } from "./context/socket";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistStore(store)}> */}
				{/* <SocketProvider value={socketInstance}> */}
					<App />
				{/* </SocketProvider> */}
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>
);
