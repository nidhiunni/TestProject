import React from "react";
import './App.css';
import Main from './components/main'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  
  return (
    <div className="App">
     
   
     <Router>
      <Switch>
        <Route path="/" exact component={Main} />
       
      </Switch>
      </Router>
    </div>
  );
}

export default App;
