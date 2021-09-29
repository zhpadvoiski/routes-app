import React, {createContext, useContext, useState} from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect, useLocation, useHistory} from 'react-router-dom';

// interface IState {
//     user: null | string;
// }

// interface IContextProps {
//     state: IState;
//     dispatch: ({type}:{type:string}) => void;
//   }
interface GlobalContext {
    user : null | string;
    signin : (cb : () => void) => void;
    signout : (cb : () => void) => void;
}

const AuthContext = createContext({} as GlobalContext);

function useAuth() {
    return useContext(AuthContext);
}

function useProvideAuth(){
    const [user, setUser] = useState<null | string>(null);

    const signin = (cb : any) => {
        return fakeAuth.signin(() => {
            setUser('user');
            cb();
        })
    }
    const signout = (cb : any) => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        })
    }

    return {
        user,
        signin,
        signout
    }
}

function ProvideAuth({children}: {children: any}){
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb : any){
        fakeAuth.isAuthenticated = true;
        console.log(fakeAuth);
        setTimeout(cb, 100);
    },
    signout(cb : any){
        fakeAuth.isAuthenticated = false;
        console.log(fakeAuth);
        setTimeout(cb, 100);
    }
}

function PrivateRoute({children, path} : {children : any, path : string}){
    let auth = useAuth();
    return (
        <Route path={path} render={({location}) => 
            auth.user ? children : <Redirect to={{pathname: 'login', state: {from: location}}} />
        } /> 
    )
}

interface ILocation{
    from : {
        pathname: string;
    };
}

function LoginPage() : React.ReactElement{
    let location = useLocation<ILocation>();
    let history = useHistory();
    let auth = useAuth();

    let { from } = location.state || {from : {pathname: '/'}};

    console.log(from);
    const login = () => {
        auth.signin(() => {
            history.push(from);
        })
    }
    
    return (
        <div>
            <p>You must be logged in to view page at {from.pathname}</p>
            <button onClick={login}>Login</button>
        </div>
    )
}

function AuthButton(){
    let auth = useAuth();
    let history = useHistory();

    const signout = () => {
        auth.signout(() => {
            history.push('/');
        });
    }
    
   return auth.user ? (<div>
       <p>Welcome!</p>
       <button onClick={signout}>Sign Out</button>
   </div>) : (<div>
       <p>You are not logged in!</p>
   </div>)
}

export default function AuthComponent() : React.ReactElement{
    return (
        <ProvideAuth>
            <Router>
                <AuthButton />
                <div>
                    <ul>
                        <li>
                            <Link to='/public'>Public Page</Link>
                        </li>
                        <li>
                            <Link to='/private'>Private Page</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path='/public'>
                        <h1>This is a Public Page</h1>
                    </Route>
                    <PrivateRoute path='/private'>
                        <h1>This is a Private Page</h1>
                    </PrivateRoute>
                    <Route path='/login'>
                        <LoginPage/>
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}