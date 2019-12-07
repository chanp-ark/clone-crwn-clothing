import React from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'


function App() {
  return (
    <div>
      {/* Switch runs it in order (kind of like if true, then return) */}
      <Switch> 
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
      
     
    </div>
  );
}

export default App;
