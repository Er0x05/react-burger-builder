import React from 'react';

import Layout from './compunents/Layout/Layout';
import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder';

import './App.css';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
