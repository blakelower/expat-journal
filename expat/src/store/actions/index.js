import axios from "axios";
import {axiosWithAuth} from "../../utils/axiosWithAuth";

export const GET_POSTS_START = "GET_POSTS_START";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";

// GET_USER_POSTS
//-----------------------------------------------------|
export const GET_USER_POSTS_START = "GET_USER_POSTS_START";
export const GET_USER_POSTS_SUCCESS = "GET_USER_POSTS_SUCCESS";
export const GET_USER_POSTS_FAILED = "GET_USER_POSTS_FAILED";

// ADD_POST
//-----------------------------------------------------|
export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILED = "ADD_POST_FAILED";

// UPDATE_POST
//-----------------------------------------------------|
export const UPDATE_POST_START = "UPDATE_POST_START";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILED = "UPDATE_POST_FAILED";

// DELETE_POST
//-----------------------------------------------------|
export const DELETE_POST_START = "DELETE_POST_START";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILED = "DELETE_POST_FAILED";

// LOGIN/LOGOUT
//-----------------------------------------------------|
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

// REGISTER
//-----------------------------------------------------|
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

///CHECK LOGGED IN
export const CHECK_LOGGED_IN_START = "CHECK_LOGGED_IN_START";
export const CHECK_LOGGED_IN_SUCCESS = "CHECK_LOGGED_IN_SUCCESS";
export const CHECK_LOGGED_IN_FAILED = "CHECK_LOGGED_IN_FAILED";

export const getPosts = () => {
  return dispatch => {
    dispatch({ type: GET_POSTS_START });
    axiosWithAuth()
      .get("https://expat-journals.herokuapp.com/api/v1/journals")
      .then(res => {
        console.log(res.data)
        const payload = res.data
        dispatch({ type: GET_POSTS_SUCCESS, payload});
      })
      .catch(err => {
        console.log(err.response)
        const payload = err.response ? err.response.data : err;
        dispatch({ type: GET_POSTS_FAILED, payload });
    });
  };
};

export const createPost = post => {
  return dispatch => {
    dispatch({ type: ADD_POST_START });

    const token = localStorage.getItem("token");

    return axios
      .post("https://expat-journals.herokuapp.com/api/v1/journals", post, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        getPosts();
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ADD_POST_FAILED, payload: err.errorMessage });
      });
  };
};

export const editPost = (post, id) => {
  return dispatch => {
    dispatch({ type: UPDATE_POST_START });
    const token = localStorage.getItem("token");
    return axios
      .put(`https://expat-journals.herokuapp.com/api/v1/journals/${id}`, post, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
      })
      .catch(err => {
          dispatch({
        type: UPDATE_POST_FAILED,
        payload: err.response.data.error_message
      });
    });
  };
};

export const deletePost = id => {
  return dispatch => {
    dispatch({ type: DELETE_POST_START });

    const token = localStorage.getItem("token");

    return axios
      .delete(`https://expat-journals.herokuapp.com/api/v1/journals/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err.response)
        dispatch({ type: DELETE_POST_FAILED, payload: err.errorMessage });
      });
  };
};

export const getUserPosts = () => {
  return dispatch => {
    dispatch({ type: GET_USER_POSTS_START });
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    return axios
      .get(`https://expat-journals.herokuapp.com/api/v1/journals/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        // sort user posts by most recent post
        const payload = res.data.posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        dispatch({ type: GET_USER_POSTS_SUCCESS, payload });
      })
      .catch(err => {
        dispatch({
          type: GET_USER_POSTS_FAILED,
          // payload: err.response.data.error_message
      });
    });
  };
};

export function login(email, password) {
  return dispatch => {
    dispatch({ type: LOGIN_START });

    return axios
      .post("https://expat-journals.herokuapp.com/api/v1/auth/login", {
        email,
        password
      })
      .then(res => {
        // store user in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);

        const payload = {
          id: res.data.id,
        };

        dispatch({ type: LOGIN_SUCCESS, payload });
      })
      .catch(err => {
      let payload = err;
      if (Object.keys(err.response.data).length) {
      payload = err.response.data.errorMessage;
      } else {
      payload = "Please review your login information";
      }
      dispatch({ type: LOGIN_FAILED, payload });
    });
  };
}

export function signup(
  first_name,
  last_name,
  email,
  password,
  confirm_password
) {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    return axios
      .post("https://expat-journals.herokuapp.com/api/v1/auth/signup", {
        password: password,
        email: email,
        confirm_password: confirm_password,
        first_name: first_name,
        last_name: last_name
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);

        const payload = {
          id: res.data.id,
          successMsg: res.statusText
        };
        dispatch({ type: SIGNUP_SUCCESS, payload });
      })
      .catch(err => {
        debugger;
        const payload = err.response ? err.response.data : err;
        dispatch({ type: SIGNUP_FAILED, payload });
      });
  };
}

// export const checkLoggedIn = () => {
//   return dispatch => {
//     dispatch({ type: CHECK_LOGGED_IN_START });

//     const id = localStorage.getItem("id");
//     const token = localStorage.getItem("token");

//     axios
//       .get(`https://expat-journal-backend.herokuapp.com/api/users/${id}`, {
//         headers: {
//           Authorization: token
//         }
//       })
//       .then(res => {
//         dispatch({ type: CHECK_LOGGED_IN_SUCCESS, payload: res.data });
//       })
//       .catch(err => {
//         dispatch({
//         type: CHECK_LOGGED_IN_FAILED,
//         payload: "Login expired! Please sign in again."
//       });
//     });
//   };
// };
