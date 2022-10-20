import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import { Provider } from 'react-redux';
import store from './sr';
export default App = () => {
  return(
      <>
       <Provider store={store}>
        <AppContainer />
       </Provider>
      </>
  )
}
