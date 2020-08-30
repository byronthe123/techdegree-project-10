import React, { useState, useEffect } from 'react';

export default ({ context  }) => {

  // Get all courses on page load:
  useEffect(() => {
    context.actions.getCourses();
  }, []);

  return (
    <div className="bounds">
        {
            context.courses.map((c, i) => 
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