import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default ({ context, location, history }) => {

    // Take the user back to the page they came from once they sign in:
    const { from } = location.state || { from: { pathname: '/' } };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    /*  Attempt to sign the user in - if successful, go to the previous page.
        Otherwise, display errors. In the case of unhandled errors, go to /error.
    */
    const submit = () => {
        context.actions.signIn(email, password)
            .then((user) => {
                if (user === null) {
                    setErrors([ 'Sign-in was unsuccessful' ]);
                } else {
                    history.push(from);
                }
            })
            .catch((error) => {
                history.push('/error');
            });
    }

    const cancel = () => history.push('/');

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <Form 
                    cancel={() => cancel()}
                    errors={errors}
                    submit={() => submit()}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <input 
                                id="email" 
                                name="email" 
                                type="text"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="User Name" 
                            />
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                            />                
                        </React.Fragment>
                    )} />
                <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p>
            </div>
        </div>
    );
}

