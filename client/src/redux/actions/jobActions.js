import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// Job Post -> only for recruiters
export const jobPost = body => (dispatch, getState) => {
  axios
    .post('/api/job/create-job-post', body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: actions.JOB_POST,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'JOB_POST_FAIL')
      );
      dispatch({
        type: actions.JOB_POST_FAIL,
      });
    });
};

// get all posted jobs -> only for developer/engineer
export const getAllJobs = () => (dispatch, getState) => {
  dispatch(setJobsLoading());
  axios
    .get('/api/job/all-jobs', tokenConfig(getState))
    .then(res =>
      // console.log(res.data)
      dispatch({
        type: actions.GET_ALL_JOBS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get job DETAILS
export const getJobDetails = id => (dispatch, getState) => {
  dispatch(setJobsLoading());
  axios
    .get(`/api/job/get-job-post/${id}`, tokenConfig(getState))
    .then(res =>
      // console.log(res.data)
      dispatch({
        type: actions.JOB_DETAIL,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setJobsLoading = () => {
  return {
    type: actions.JOBS_LOADING,
  };
};