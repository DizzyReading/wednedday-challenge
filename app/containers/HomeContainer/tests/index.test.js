/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchClearItunesData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesData on empty change', async () => {
    const getItunesDataSpy = jest.fn();
    const clearItunesDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearItunesData={clearItunesDataSpy} dispatchItunesData={getItunesDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesDataSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesDataSpy).toBeCalled();
  });

  it('should call dispacthItunesData on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchItunesData={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some artist' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
