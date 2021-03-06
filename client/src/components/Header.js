import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {

    const authUser = context.authenticatedUser;

    /*
        Use conditional rendering to dispaly the authenticated 
        user's name or then Sign Up/Sign In buttons.
    */
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    {authUser ? (
                        <React.Fragment>
                            <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                            <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    );
}
