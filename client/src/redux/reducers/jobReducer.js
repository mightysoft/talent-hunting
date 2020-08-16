import * as actions from '../actions/actionTypes';

const initialState = {
  jobs: [],
  job: [],
  recPostJobs: [],
  allAppliedData: [],
  appliedData: [],
  isApplied: false,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.JOBS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case actions.JOB_POST:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
        isLoading: false,
      };

    case actions.GET_ALL_JOBS:
      return {
        ...state,
        jobs: action.payload,
        isLoading: false,
      };

    case actions.SEARCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
        isLoading: false,
      };

    case actions.JOB_DETAIL:
      return {
        ...state,
        job: action.payload,
        isLoading: false,
      };

    case actions.GET_JOB_APPLIED_DATA:
      return {
        ...state,
        appliedData: action.payload,
        isApplied: true,
      };

    case actions.NO_DATA_FOUND:
      return {
        ...state,
        appliedData: [],
        isApplied: false,
      };

    case actions.GET_CANDIDATE_APPLIED_DATA:
      return {
        ...state,
        allAppliedData: action.payload,
      };

    case actions.REC_POSTED_JOBS:
      return {
        ...state,
        recPostJobs: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
