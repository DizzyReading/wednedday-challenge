import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { injectSaga } from 'redux-injectors';

import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { selectHomeContainer, selectItunesData, selectItunesDataError, selectItunesDataName } from './selectors';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchItunesData,
  dispatchClearItunesData,
  intl,
  iTunesData,
  iTunesError,
  iTunesName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(iTunesData, 'results', null) || iTunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [iTunesData]);

  useEffect(() => {
    if (iTunesName && !iTunesData?.results?.length) {
      dispatchItunesData(iTunesName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchItunesData(rName);
      setLoading(true);
    } else {
      setLoading(false);
      dispatchClearItunesData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(iTunesData, 'results', []);
    const totalCount = get(iTunesData, 'resultCount', 0);

    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {iTunesName && (
              <div>
                <T id="search_query" values={{ iTunesName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching" values={{ totalCount }} />
              </div>
            )}
            {items?.map(({ artistName, collectionName, collectionPrice }, index) => (
              <CustomCard key={index}>
                <T id="artist_name" text="artist" values={{ name: artistName }} />
                <T id="artist_album_name" values={{ fullName: collectionName }} />
                <T id="artist_album_price" values={{ stars: collectionPrice }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let itunesDataError;
    if (iTunesError) {
      itunesDataError = iTunesError;
    } else if (!get(iTunesData, 'totalCount', 0)) {
      itunesDataError = 'arist_song_search_default';
    }
    return (
      !loading &&
      itunesDataError && (
        <CustomCard color={iTunesError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'details_list' })}>
          <T id={itunesDataError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'itunes_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_search_details" />
        <Search
          data-testid="search-bar"
          defaultValue={iTunesName}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItunesData: PropTypes.func,
  dispatchClearItunesData: PropTypes.func,
  intl: PropTypes.object,
  iTunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    results: PropTypes.array
  }),
  iTunesError: PropTypes.string,
  iTunesName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  iTunesData: [],
  iTunesError: null
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  iTunesData: selectItunesData(),
  iTunesError: selectItunesDataError(),
  iTunesName: selectItunesDataName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesData, clearItunesData } = homeContainerCreators;
  return {
    dispatchItunesData: (iTunesName) => dispatch(requestGetItunesData(iTunesName)),
    dispatchClearItunesData: () => dispatch(clearItunesData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
