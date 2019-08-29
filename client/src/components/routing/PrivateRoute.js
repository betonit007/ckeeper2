import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

//This is very common setup for creating a private route component

const PrivateRoute = ({ component: Component, ...rest }) => {  //destructoring and taking a component and setting it to Component and then anything else thats passed in (...rest operator) Standard way to set a private route component
    const authContext = useContext(AuthContext);               
    const { isAuthenticated, loading } = authContext;
    
    return (
        <Route { ...rest } render={props => !isAuthenticated && !loading ? (  //...rest passes in any extra props and then add a render that will take props. if user is not authenicated and the state is done loading then redirect to login page (they're not authenticated)
            <Redirect to='/login' />
        ) : (
            <Component {...props} />
        )} />  
            
    )
};

export default PrivateRoute;
