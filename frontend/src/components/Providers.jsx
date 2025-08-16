'use client';


import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
// import { store } from '../redux/store';
import { store } from '../Redux/store.jsx';
import { loadFromStorage } from '../Slices/userSlice'; // adjust path if needed



// import { Provider } from 'react-redux';
// import { store } from '../redux/store'; // adjust path if needed




function ReduxInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return null;
}



export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ReduxInitializer />
      {children}
    </Provider>
  );
}
