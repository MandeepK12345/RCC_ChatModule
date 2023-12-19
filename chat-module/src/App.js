import { BrowserRouter} from 'react-router-dom';
// import Home from './pages/home';
// import Login from './pages/Login';
// import Register from './pages/register';
// import Profile  from './pages/profile';
// import Messages from './pages/messages';
// import { useContext, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";

// import { ReduxState } from './interfaces';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { fetchInterceptor } from './interceptors';
// import SocketContext from './context/socket';

import RoutesWrapper from "./Router";

function App() {

  // fetchInterceptor();

  // const socketInstance = useContext(SocketContext);
  // const mode = useSelector((state: ReduxState) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);
  // const isAuth = Boolean(useSelector((state: ReduxState) => state?.user?.token));
  // const user = useSelector((state: ReduxState) => state.user);

  // useEffect(() => {
  //   if(user?.userId){
  //     socketInstance.emit('join', user.userId);
  //   }  
  // }, []);  

  return (
    <div className="App">
      {/* <ToastContainer /> */}
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

