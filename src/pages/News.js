import React from 'react';

import './styles/News.css';
import confLogo from '../images/news-header.svg';
import NewsList from '../components/NewsList';

import crawler from '../crawler';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';

class News extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await crawler.news.list(
        'https://cors-anywhere.herokuapp.com/https://news.ycombinator.com'
      );
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className='News'>
          <div className='News__hero'>
            <div className='News__container'>
              <img className='News_conf' src={confLogo} alt='Conf logo' />
            </div>
          </div>
        </div>

        <div className='News__container'>
          <div className='News__list'>
            <div className='News__container'>
              <NewsList news={this.state.data} />
              {this.state.loading && <MiniLoader />}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default News;
