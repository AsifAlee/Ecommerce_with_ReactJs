import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import {Route, Switch} from 'react-router-dom';
import ShopePage from './pages/shop/shop.component';
import './App.css'
import SignInSignUpPage from './pages/sign-up-sign-in/sign-up-sign-in.component';
import {auth,createUserProfileDocument} from './firebase/firebase-utils';

import Header from './components/header/header.component';
import {connect, connet} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action';





class App extends React.Component{

 

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
            
          });
        });
      }

      setCurrentUser(userAuth);
    });


    }
  

  componentWillUnmount(){
     this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
            <Switch>
            
            <Route exact  path='/' component={HomePage} />
            <Route exact  path='/shop' component= {ShopePage} /> 
            <Route exact path='/signinpage' component={SignInSignUpPage}/>
  
            </Switch>
      </div>
    );  
  }
  
} 

const mapDispatchToProps = dispatch =>({
  setCurrentUser:user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
