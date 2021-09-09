import { selectHomeContainer, selectItunesDataName, selectItunesData, selectItunesDataError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let searchTermName;
  let searchTermData;
  let searchTermError;

  beforeEach(() => {
    searchTermName = 'keane';
    searchTermData = { totalCount: 1, items: [{ searchTermName }] };
    searchTermError = 'There was some error while fetching the artist/song details';

    mockedState = {
      homeContainer: {
        searchTermName,
        searchTermData,
        searchTermError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the searchTermName', () => {
    const artistSelector = selectItunesDataName();
    expect(artistSelector(mockedState)).toEqual(searchTermName);
  });

  it('should select searchTermData', () => {
    const artistDataSelector = selectItunesData();
    expect(artistDataSelector(mockedState)).toEqual(searchTermData);
  });

  it('should select the searchTermError', () => {
    const artistErrorSelector = selectItunesDataError();
    expect(artistErrorSelector(mockedState)).toEqual(searchTermError);
  });
});
