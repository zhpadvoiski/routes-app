import React, {createContext, useContext, useState} from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom';

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
        setTimeout(cb, 100);
    },
    signout(cb : any){
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

function PrivateRoute({children, path, ...rest} : {children : any, path : string}){
    let auth = useAuth();
    return (
        <Route path={path} render={({location}) => 
            auth.user ? children : <Redirect to={{pathname: 'login', state: {from: location}}} />
        } /> 
    )
}
function LoginPage() : React.ReactElement{
    console.log('login page')
    return (
        <h1>This is a Login Page</h1>
    )
}

export default function AuthComponent() : React.ReactElement{
    return (
        <ProvideAuth>
            <Router>
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