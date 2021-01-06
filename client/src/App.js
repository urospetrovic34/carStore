import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainPage from './components/MainPage'
import AppNavbar from './components/layout/AppNavbar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route path="/" exact component={MainPage}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
