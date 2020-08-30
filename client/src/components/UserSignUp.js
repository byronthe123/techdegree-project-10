import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default ({ context, history }) => {

    // Use useState to store values for signing up: 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // Attempt to sign up: validation errors will be displayed: 
    const handleSubmit = () => {
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        context.data.createUser(user)
        .then( errors => {
            if (errors.length) {
                    setErrors(errors);
            } else {
                context.actions.signIn(emailAddress, password)
                    .then(() => {
                        history.push('/');    
                    });
            }
        });
    }

    const cancel = () => history.push('/');

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <Form 
                    cancel={() => cancel()}
                    errors={errors}
                    submit={() => handleSubmit()}
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder="First Name" />
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder="Last Name" />
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text"
                                value={emailAddress} 
                                onChange={(e) => setEmailAddress(e.target.value)} 
                                placeholder="Email Address" />
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" />
                            </React.Fragment>
                        )} 
                    />
                <p>
                    Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                </p>
            </div>
        </div>
    );
}
