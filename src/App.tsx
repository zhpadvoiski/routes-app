import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router, useRouteMatch, useParams} from 'react-router-dom';
import Auth from './components/Auth';

function App() {
  return (
    <div>
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
                <Link to='/topics'>Topics</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path='/about'><About/></Route>
          <Route path='/contact'><Contact/></Route>
          <Route path='/users'><Users/></Route>
          <Route exact path='/'><Home/></Route>
          <Route path='/topics'><Topics/></Route>
        </Switch>
      </Router>

      <Auth />
      </div>
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

function InnerComponent(): React.ReactElement {
  const match = useRouteMatch();
  console.log('inner component: ', match);
  return (
    <div></div>
  )
}

function Topic(): React.ReactElement {
  let {topicId} : {topicId : string} = useParams();
  let match = useRouteMatch();
  console.log('match Topic: ', match);
  return (
    <div>
      <h3>{topicId}</h3>
      <ul>
        <li>
          <Link to={`${match.url}/inner-component`}>Inner Component of {topicId}</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.url}/inner-component`}><InnerComponent/></Route>
      </Switch>
    </div>
  );
}

function Topics(): React.ReactElement {
  let match = useRouteMatch();
  console.log(match);
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/todos`}>Todos</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}><Topic/></Route>
        <Route path={`${match.url}`}>Select topic</Route>
      </Switch>
    </div>
  );
}

export default App;
