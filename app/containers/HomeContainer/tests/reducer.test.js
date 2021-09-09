import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomeContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_ITUNES_DATA is dispatched', () => {
    const searchTermName = 'keane';
    const expectedResult = { ...state, searchTermName };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_ITUNES_DATA,
        searchTermName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when SUCCESS_GET_ITUNES_DATA is dispatched', () => {
    const data = { name: 'Keane' };
    const expectedResult = { ...state, searchTermData: data };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_ITUNES_DATA,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FAILURE_GET_ITUNES_DATA is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, searchTermError: error };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_ITUNES_DATA,
        error
      })
    ).toEqual(expectedResult);
  });
});
