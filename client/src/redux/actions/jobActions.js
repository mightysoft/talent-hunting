import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// Job Post -> only for recruiters
export const jobPost = body => (dispatch, getState) => {
  axios
    .post('/api/job/create-job-post', body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: actions.JOB_POST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'JOB_POST_FAIL')
      );
      dispatch({
        type: actions.JOB_POST_FAIL,
      });
    });
};

// get recruiter postes jobs
export const getRecPostedJobs = id => (dispatch, getState) => {
  dispatch(setJobsLoading());
  axios
    .get(`/api/job/get-posted-jobs/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: actions.REC_POSTED_JOBS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get all posted jobs -> only for candidate
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

// apply a job => only for candidate
export const applyJob = body => (dispatch, getState) => {
  axios
    .post(`/api/job/apply-job`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: actions.GET_JOB_APPLIED_DATA,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get applied data based on job id => only for recruiters
export const getAppliedData = jobId => (dispatch, getState) => {
  axios
    .get(`/api/job/get-applied-data/${jobId}`, tokenConfig(getState))
    .then(res =>
      // console.log('getAppliedData ',res.data)
      dispatch({
        type: actions.GET_JOB_APPLIED_DATA,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// get applied data based on job id AND candidate id => only for candidate
export const getCandidateAppliedData = (candidateEmail, jobId) => (
  dispatch,
  getState
) => {
  axios
    .get(
      `/api/job/get-applied-data-candidate/${candidateEmail}/${jobId}`,
      tokenConfig(getState)
    )
    .then(res =>
      // console.log('getAppliedData ',res.data)
      dispatch({
        type: actions.GET_JOB_APPLIED_DATA,
        payload: res.data.data,
      })
    )
    .catch(err => 
      dispatch({type: actions.NO_DATA_FOUND})
      // console.log('err : ', err.response.data)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// search jobs by job location, title, type, company
export const searchJobs = text => (dispatch, getState) => {
  dispatch(setJobsLoading());
  axios
    .get(`/api/job/search-jobs/${text}`, tokenConfig(getState))
    .then(res =>
      // console.log('getAppliedData ', res.data)
      dispatch({
        type: actions.SEARCH_JOBS,
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
