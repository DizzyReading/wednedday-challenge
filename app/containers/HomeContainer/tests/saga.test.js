/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getItunes } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItunesData } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const searchTermName = 'keane';
  let getItunesDataGenerator = getItunesData({ searchTermName });

  it('should start task to watch for REQUEST_GET_ITUNES_DATA action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_ITUNES_DATA, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_DATA is dispatched when the api call fails', () => {
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, searchTermName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching artist/song information.'
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ITUNES_DATA,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_REPOS is dispatched when the api call succeeds', () => {
    getItunesDataGenerator = getItunesData({ searchTermName });
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, searchTermName));
    const artistResponse = {
      totalCount: 1,
      items: [{ artistProfile: searchTermName }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, artistResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ITUNES_DATA,
        data: artistResponse
      })
    );
  });
});
