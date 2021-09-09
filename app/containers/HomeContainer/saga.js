import { put, call, takeLatest } from 'redux-saga/effects';
import { getItunes } from '@services/iTunesApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES_DATA } = homeContainerTypes;
const { successGetItunesData, failureGetItunesData } = homeContainerCreators;
export function* getItunesData(action) {
  const response = yield call(getItunes, action.searchTermName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesData(data));
  } else {
    yield put(failureGetItunesData(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_DATA, getItunesData);
}
