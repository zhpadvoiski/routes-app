import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/'><Home/></Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* <Switch> */}
        <Route path='/about'><About/></Route>
        <Route path='/contact'><Contact/></Route>
        <Route path='/users'><Users/></Route>
      {/* </Switch> */}
    </Router>
  );
}

function Home() : React.ReactElement {
  return (
    <div>Home</div>
  )
}

function About(): React.ReactElement {
  return (
    <div>About</div>
  )
}
function Contact(): React.ReactElement {
  return (
    <div>Contact</div>
  )
}
function Users(): React.ReactElement {
  return (
    <div>Users</div>
  )
}

export default App;
