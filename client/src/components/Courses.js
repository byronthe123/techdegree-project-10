import React, { useState, useEffect } from 'react';

export default ({ context, history  }) => {

  const [courses, setCourses] = useState([]);

  // Get all courses on page load:
  useEffect(() => {
    const getCourses = async () => {
      const response = await context.actions.getCourses();
      if (response.status !== 200) {
        history.push('/error');
      } else {
        response.json().then(data => setCourses(data));
      }
    }
    getCourses();
  }, [context.actions, history]);

  return (
    <div className="bounds">
        {
            courses.map((c, i) => 
                <div className='grid-33' key={i}>
                    <a className='course--module course--link' href={`/courses/${c.id}`}>
                        <h4 className='course--label'>Course</h4>
                        <h3 className='course--title'>{c.title}</h3>
                    </a>
                </div>
            )
        }
        <div className="grid-33">
            <a className="course--module course--add--module" href="/courses/create">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course
                </h3>
            </a>
        </div>
    </div>
  );
}