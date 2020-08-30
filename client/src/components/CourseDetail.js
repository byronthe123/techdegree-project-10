import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ context, match, history  }) => {

    const [course, setCourse] = useState([]);

    // Get the course data on page load:
    useEffect(() => {
        const getCourse = async () => {
            const course = await context.actions.getCourse(match.params.id);
            console.log(course);
            setCourse(course);
        }
        getCourse();
    }, []);

    // If no course is found, redirect the user to the "notFound" route:
    useEffect(() => {
        if (!course) {
            history.push('/notfound ');
        }
    }, [course]);

    const { authenticatedUser } = context;

    // Delete the course using context actions:
    const handleDeleteCourse = async (id) => {
        const response = await context.actions.deleteCourse(id);
        if (response === 204) {
            history.push(`/`);
        }
    }

    return (
        <>
            {
                course && 
                <>
                    <div className="actions--bar">
                        <div className="bounds">
                            {
                                context.errors.length > 0 &&
                                <div>
                                    <h2 className="validation--errors--label">Errors</h2>
                                    <div className="validation-errors">
                                        <ul>
                                            {
                                                context.errors.map((e, i) => 
                                                    <li key={i}>{e}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            }
                            <div className="grid-100">
                                {
                                    authenticatedUser && authenticatedUser.id === course.userId && 
                                    <span>
                                        <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
                                        <button className="button" onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
                                    </span>
                                }
                                <a className="button button-secondary" href="/">Return to List</a>
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            {
                                course && course.User && 
                                <p>By {course.User.firstName} {course.User.lastName}</p>
                            }
                            </div>
                            <div className="course--description">
                                <ReactMarkdown
                                    source={course.description} 
                                />
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown 
                                        source={course.materialsNeeded}
                                    />
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}