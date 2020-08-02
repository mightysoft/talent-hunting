import * as actions from '../actions/actionTypes';

const initialState = {
  jobs: null,
  job: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.JOBS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case actions.GET_ALL_JOBS:
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

    default:
      return state;
  }
}