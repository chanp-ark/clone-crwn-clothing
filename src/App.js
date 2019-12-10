import React from 'react';
import {Switch, Route} from 'react-router-dom'


import './App.css';

import HomePage from './pages/homepage/homepage.component' 
import ShopPage from './pages/shop/shop.component'
import SignUpAndSignIn from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null
  
    // the 'user' contains all the information as an object from the Google authentication
    // we will look at this object to access necessary keys
    
  
    
    componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // to call setState on 'currentUser'
        // we're going to use createUserProfileDocument to check if our database has updated with the new data
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        // calling onSnapshot; we get back the snapShot object where we get the data of the user we just stored or already stored in DB
          // but we don't get any data UNTIL we call the .data() method, i.e. snapShot.data() in the following
          // it will return an object with the desired properties
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log(this.state)
          })
          // the console.log(this.state) is to check
          // Can delete. keeping it here for future ref
        })
      } else { 
        this.setState({currentUser: userAuth})
      }
    })
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render () {
    return (
        <div>
          <Header currentUser = {this.state.currentUser}/>  
          {console.log(this.state.currentUser)}
          <Switch>  
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignUpAndSignIn} />
          </Switch>
          {/* Switch runs it in order (kind of like if true, then return) */}
        </div>
        
    );
  }
}

export default App;

