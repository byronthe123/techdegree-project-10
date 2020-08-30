import React, { useState, useEffect } from 'react';

export default ({ context, match, history }) => {

    // Use useState to store values for creating a new course:
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    // Handle creating a course:
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const result = await context.actions.createCourse(title, description, estimatedTime, materialsNeeded);
        if (result === 201) {
            history.push(`/`);
        } else if (result === 500) {
            history.push('/error');
        } else {
            context.actions.setErrors(result);
        }
    }

    return (
        <div class="bounds course--detail">
            <h1>Create Course</h1>
            {
                context.errors.length > 0 &&
                <div>
                    <h2 class="validation--errors--label">Validation errors</h2>
                    <div class="validation-errors">
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
                    <div class="grid-66">
                        <div class="course--header">
                            <h4 class="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <p>By</p>
                        </div>
                        <div class="course--description">
                            <div>
                                <textarea id="description" name="description" class="" placeholder="Course description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="grid-25 grid-right">
                        <div class="course--stats">
                            <ul class="course--stats--list">
                                <li class="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder="Hours" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
                                    </div>
                                </li>
                                <li class="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="grid-100 pad-bottom">
                        <button class="button" type="submit" onClick={(e) => handleCreateCourse(e)}>Create Course</button>
                        <button class="button button-secondary" onClick={() => history.push(`/`)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>            
    );
}