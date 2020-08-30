import config from './config';

const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
}

export default {

    getUser: async (username, password) => {
        const response = await api(`/users`, 'GET', null, true, { username, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    },

    createUser: async (user) => {
        const response = await api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
    },

    getCourses: async () => {
        const response = await api(`/courses`, 'GET', null, false, null);
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else {
          throw new Error();
        }
    },

    getCourse: async (id) => {
        const response = await api(`/courses/${id}`, 'GET', null, false, null);
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else {
          throw new Error();
        }
    },

    updateCourse: async (user, id, title, description, estimatedTime, materialsNeeded) => {
        const username = user.emailAddress;
        const password = user.password;
    
        const body = {
            id, title, description, estimatedTime, materialsNeeded
        }  
    
        const response = await api(`/courses/${id}`, 'PUT', body, true, { username, password });
        if (response.status === 204) {
            return response.status;
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log(data.errors);
                return data.errors;
            });
        } else {
            throw new Error();
        }
    },

    createCourse: async (user, title, description, estimatedTime, materialsNeeded) => {
        const username = user.emailAddress;
        const password = user.password;
        const userId = user.id;
    
        const body = {
            title, description, estimatedTime, materialsNeeded, userId
        }  
    
        const response = await api(`/courses`, 'POST', body, true, { username, password });
        if (response.status === 201) {
            return response.status;
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log(data.errors);
                return data.errors;
            });
        } else {
            return response.status;
        }  
    },

    deleteCourse: async (user, id) => {
        const username = user.emailAddress;
        const password = user.password;
    
    
        const response = await api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    
        if (response.status === 204) {
            return response.status;
        } else if (response.status === 400 || response.status === 403) {
            return response.json().then(data => {
                console.log(data.errors);
                return data.errors;
            });
        } else {
            throw new Error();
        } 
    }
}

