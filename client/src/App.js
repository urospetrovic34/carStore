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
            <Route path="/" exact component={}/>
            <Route path="/pretraga" exact component={}/>
            <Route path="/:id" exact component={}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
