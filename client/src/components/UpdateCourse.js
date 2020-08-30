import React, { useState, useEffect } from 'react';

export default ({ context, match, history }) => {

    const { id } = match.params;

    const [course, setCourse] = useState([]);

    // Function to check if the user owns the course they are trying to edit:
    const checkAuthorizedUser = (courseUserId) => {
        if (context.authenticatedUser.id !== courseUserId) {
            history.push('/forbidden');
        }
    }

    // Get the course data on page load:
    useEffect(() => {
        const getCourse = async () => {
            const course = await context.actions.getCourse(match.params.id);
            checkAuthorizedUser(course.userId);
            setCourse(course);
        }
        getCourse();
    }, []);

    // If the course is not found, redirect to notFound:
    useEffect(() => {
        if (!course) {
            history.push('/notfound ');
        }
    }, [course]);

    // Use useState to store the values for updating the course:
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');


    // Set initial values using the course data:
    useEffect(() => {
        if (context.course) {
            const { title, description, materialsNeeded, estimatedTime } = context.course;
            setTitle(title);
            setDescription(description);
            setMaterialsNeeded(materialsNeeded ? materialsNeeded : '');
            setEstimatedTime(estimatedTime ? estimatedTime : '');
        }
    }, [context.course]);

    // Update the course using context:
    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await context.actions.updateCourse(id, title, description, estimatedTime, materialsNeeded);
        if (result === 204) {
            history.push(`/courses/${id}`);
        } else if (result === 500) {
            history.push(`/error`);
        } else {
            context.actions.setErrors(result);
        }

    }

    return (
        <>
            {
                course && 
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    {
                        context.errors.length > 0 &&
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
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
                    <div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <p>By</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={(e) => handleUpdate(e)}>Update Course</button>
                                <button className="button button-secondary" onClick={() => history.push(`/courses/${course.id}`)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>            
            }
        </>
    );
}