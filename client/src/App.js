import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/pretraga" exact component={App}/>
            <Route path="/:id" exact component={App}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
