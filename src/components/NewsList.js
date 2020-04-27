import React from 'react';

import './styles/NewsList.css';

class NewsListItem extends React.Component {
  render() {
    return (
      <div className='NewsListItem'>
        <div>
          <strong>
            {this.props.n.rank}. {this.props.n.title}
          </strong>
          <br />
          Points {this.props.n.points} | Comments {this.props.n.comments}
        </div>
      </div>
    );
  }
}

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

// custom hook
function useFilterNews(news) {
  const [filter, setFilter] = React.useState('');

  const [filteredNews, setfilteredNews] = React.useState(news);

  React.useMemo(() => {
    let result = news;
    if (filter === 'option1') {
      result = news.filter((n) => {
        return n.title.split(' ').length > 5;
      });
      result.sort(compareValues('comments', 'desc'));
    } else if (filter === 'option2') {
      result = news.filter((n) => {
        return n.title.split(' ').length <= 5;
      });
      result.sort(compareValues('points', 'desc'));
    }
    setfilteredNews(result);
  }, [news, filter]);

  return { filter, setFilter, filteredNews };
}

function NewsList(props) {
  const news = props.news;

  const { filter, setFilter, filteredNews } = useFilterNews(news);
  if (filteredNews.length === 0) {
    return (
      <div>
        <div className='form-group'>
          <strong>
            <label>Filter News</label>
          </strong>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='option1'
                checked={filter === 'option1'}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <strong>Filter 1:</strong> News with more than five words in the
              title ordered by the amount of comments first
            </label>
          </div>
          <br />
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='option2'
                checked={filter === 'option2'}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <strong>Filter 2:</strong> News with less than or equal to five
              words in the title ordered by points
            </label>
          </div>
          <br />
          <div className='radio'>
            <label>
              <input
                type='radio'
                value=''
                checked={filter === ''}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <strong>No filter</strong>
            </label>
          </div>
        </div>
        <h3>No news were found</h3>
      </div>
    );
  }
  return (
    <div className='NewsList'>
      <div className='form-group'>
        <strong>
          <label>Filter News</label>
        </strong>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='option1'
              checked={filter === 'option1'}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <strong>Filter 1:</strong> News with more than five words in the
            title ordered by the amount of comments first
          </label>
        </div>
        <br />
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='option2'
              checked={filter === 'option2'}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <strong>Filter 2:</strong> News with less than or equal to five
            words in the title ordered by points
          </label>
        </div>
        <br />
        <div className='radio'>
          <label>
            <input
              type='radio'
              value=''
              checked={filter === ''}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <strong>No filter</strong>
          </label>
        </div>
      </div>
      <ul className='list-unstyled'>
        {filteredNews.map((n) => {
          return (
            <li key={n.rank}>
              <NewsListItem n={n} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NewsList;
