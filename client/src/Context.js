import React, { useState } from 'react';
import Cookies from 'js-cookie';
import data from './Data';

const Context = React.createContext(); 

export const Provider = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null);
    const [errors, setErrors] = useState([]);

    const signIn = async (username, password) => {
        let user = await data.getUser(username, password);
        if (user !== null) {
            user.password = password;
            setAuthenticatedUser(user);
            const cookieOptions = {
                expires: 1 // 1 day
            };
            Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
        }
        return user;
    }

    const signOut = () => {
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser');
    }

    const getCourses = async () => {
        const response = await data.getCourses();
        return response;
    }

    const getCourse = async (id) => {
        const response = await data.getCourse(id);
        return response;
    }

    const updateCourse = async (id, title, description, estimatedTime, materialsNeeded) => {
        const result = await data.updateCourse(authenticatedUser, id, title, description, estimatedTime, materialsNeeded);
        return result;
    }

    const createCourse = async (title, description, estimatedTime, materialsNeeded) => {
        const result = await data.createCourse(authenticatedUser, title, description, estimatedTime, materialsNeeded);
        return result;
    }

    const deleteCourse = async (id) => {
        const result = await data.deleteCourse(authenticatedUser, id);
        return result;
    }

    return (
        <Context.Provider value={{
            authenticatedUser,
            errors,
            data,
            actions: {
                signIn,
                signOut,
                getCourses,
                getCourse,
                updateCourse,
                setErrors,
                createCourse,
                deleteCourse
            }
        }}>
            {props.children}
        </Context.Provider>  
    );

}

export const Consumer = Context.Consumer;


export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

