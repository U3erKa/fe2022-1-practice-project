import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { refresh } from 'store/slices/userSlice';
import { RouterProvider } from './components';
import { ChatContainer } from 'components/Chat';
import browserHistory from 'browserHistory';

import { REFRESH_TOKEN } from 'constants/general';
import { router } from 'constants/router';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
      <ChatContainer />
    </Router>
  );
};

export default App;
