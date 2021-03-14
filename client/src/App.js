import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'rc-slider/assets/index.css'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import SingleCarPage from './components/singleCarPage/SingleCarPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SearchPage from './components/searchPage/SearchPage'
import MyCars from './components/addDeleteReviewCarPages/MyCars'
import AddCar from './components/addDeleteReviewCarPages/AddCar'
import EditCar from './components/addDeleteReviewCarPages/EditCar'
import MaterialSearch from './components/searchPage/MaterialSearch'
import { QueryParamProvider } from 'use-query-params'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

export class App extends Component {

  render() {

    const persistor = persistStore(store)

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <QueryParamProvider ReactRouterRoute={Route}>
            <div className="App">
              <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/search" exact component={SearchPage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/myCars" exact component={MyCars}/>
                <Route path="/addCar" exact component={AddCar}/>
                <Route path="/editCar/:id" exact component={EditCar}/>
                <Route path="/gaw" exact component={MaterialSearch}/>
                <Route path="/:id" exact component={SingleCarPage}/>
              </Switch>
            </div>
            </QueryParamProvider>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
