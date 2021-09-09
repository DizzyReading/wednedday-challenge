import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = (state) => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () => createSelector(selectHomeContainerDomain, (substate) => substate);

export const selectItunesData = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchTermData'));

export const selectItunesDataError = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchTermError'));

export const selectItunesDataName = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchTermName'));
export default selectHomeContainer;
