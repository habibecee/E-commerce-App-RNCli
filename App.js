import React from 'react';

import {MainContextProvider} from './src/Context/Context';
import Navigation from './src/Navigators/Navigation';

function App() {
  return (
    <MainContextProvider>
      <Navigation />
    </MainContextProvider>
  );
}

export default App;
