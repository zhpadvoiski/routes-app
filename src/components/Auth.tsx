import React, {createContext, useContext, useState} from 'react';

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

function ProvideAuth({children} : {children : React.ReactChildren}){
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
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