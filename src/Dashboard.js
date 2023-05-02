import './App.css';
import React, { useState, useEffect } from 'react';
//import sqlite3 from 'sqlite3';

//import sslkeylog from 'sslkeylog';

function Dashboard() {
  const [articles, setArticles] = useState(null);
  const [query, setQuery] = useState('');
  const [currentRequestSize, setCurrentRequestSize] = useState(0);
  const [sessionRequests, setSessionRequests] = useState(0);
  const [totalRequestSize, setTotalRequestSize] = useState(0);
  const [currentTime, setCurrentTime] = useState('--');

  useEffect(() => {
    try {
      fetch('/time')
        .then((res) => {
          const contentLength = res.headers.get('content-length');
          setCurrentRequestSize(contentLength);
          return res.json();
        })
        .then((data) => {
          setCurrentTime(data.time);
          //   setCurrentRequestSize(data.headers.get('content-length'));
          //   console.log(currentRequestSize);
        });

      //   console.log(currentTime);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);
  //   sslkeylog.hookAll();

  useEffect(() => {
    // console.log('articles:', articles);
    displayArticles(articles);
  }, [articles]);

  useEffect(() => {
    setSessionRequests(
      parseInt(sessionRequests) + parseInt(currentRequestSize)
    );
    // setTotalRequestSize(
    //   parseInt(totalRequestSize) + parseInt(currentRequestSize)
    // );
  }, [currentRequestSize]);

  //   useEffect(async () => {
  //     const result = await fetch('/requests_to_date');
  //     setTotalRequestSize(result.json());
  //   }, [currentRequestSize]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/requests_to_date');
        const data = await response.json();
        setTotalRequestSize(data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [currentRequestSize]);

  const sendRequestToDB = async (requestSize) => {
    console.log(requestSize);
    try {
      const request = { packetSize: requestSize };
      const response = await fetch('/send_to_db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // This function makes a fetch request to NYT article search REST API
  const articleSearch = async () => {
    try {
      const API_KEY = process.env.REACT_APP_NYT_API_KEY;
      console.log(query);
      const result = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`
      )
        .then(() => {
          setCurrentRequestSize(result.headers.get('content-length'));
        })
        .then(() => {
          console.log(currentRequestSize);
          sendRequestToDB(currentRequestSize);
        });
      setArticles(jsonResult.response.docs);
    } catch (error) {
      console.error('Error:', error);
    }
    return articles;
  };

  // This function renders the article headlines from the articleSearch output
  const displayArticles = (articles) => {
    if (articles == null) return <p>No articles found</p>;
    return articles.map((doc) => (
      <a href={doc.web_url} key={doc._id}>
        <h3>{doc.headline.main}</h3>
      </a>
    ));
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className='time'>
        <p>The current time is: {currentTime}</p>
      </div>
      <div className='currentRequest'>
        <h3>Most recent request: </h3>
        {currentRequestSize <= 0 ? (
          <p>--</p>
        ) : (
          <div>
            <p>{currentRequestSize} bytes</p>
            <p>{currentRequestSize / 1000000} megabytes</p>
          </div>
        )}
      </div>
      <div className='sessionHistory'>
        <h3>Data Usage of current session: </h3>
        {sessionRequests <= 0 ? (
          <p>--</p>
        ) : (
          <div>
            <p>{sessionRequests} bytes</p>
            <p>{sessionRequests / 1000000} megabytes</p>
          </div>
        )}
      </div>
      <div className='totalHistory'>
        <h3>Data Usage to date: </h3>
        <div>
          <p>{totalRequestSize} bytes</p>
          <p>{totalRequestSize / 1000000} megabytes</p>
        </div>
      </div>
      <div className='nytSearch'>
        <p>
          Try testing your data usage by searching the New York Times article
          database:
        </p>
        <input
          type='text'
          id='query'
          placeholder='Enter a search term'
          onChange={(event) => setQuery(event.target.value)}
        ></input>
        <button type='button' onClick={articleSearch}>
          Search Articles
        </button>
        {articles === null ? (
          <div className='headlines'>
            <h3>Your article results will display here</h3>
          </div>
        ) : (
          <div className='headlines'>{displayArticles(articles)}</div>
        )}
      </div>
    </>
  );
}
export default Dashboard;
