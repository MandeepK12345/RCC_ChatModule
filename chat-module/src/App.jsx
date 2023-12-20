import { BrowserRouter} from 'react-router-dom';
// import Home from './pages/home';
// import Login from './pages/Login';
// import Register from './pages/register';
// import Profile  from './pages/profile';
// import Messages from './pages/messages';
 import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

// import { ReduxState } from './interfaces';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchInterceptor } from './interceptors';
import SocketContext from './context/socket';

import RoutesWrapper from "./router";

function App() {

  // fetchInterceptor();

  const socketInstance = useContext(SocketContext);
  // const isAuth = Boolean(useSelector((state: ReduxState) => state?.user?.token));
   const user = useSelector((state) => state.user);

  useEffect(() => {
    if(user?.userId){
      socketInstance.emit('join', user.userId);
    }  

    socketInstance.emit('join', '65802ed84bfcc3adf186df43');
      
    
  }, []);  

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {/* <ThemeProvider theme={theme}>
          <CssBaseline /> */}
        {/* </ThemeProvider> */}
        <RoutesWrapper />
      </BrowserRouter>
    </div>
  )
}

export default App

