import React from 'react';


//const Banner = ({ appName, token }) => {

/*
  if (token) {
    return null;
  }
*/  
const Banner = ({ appName }) => {
  return (
    <div className="banner">
      <div className="container">
        <a href="http://www.wimmalab.org">  
          <img src={require('./images/wimmalab-logo-round-black-transparent.png')} />
        </a>

        <h1 className="logo-font">
        <a href="/">  
          <span> Wimma Lab</span> <br></br>Forum   
        </a>  
        </h1>        
      </div>
    </div>
  );
};

export default Banner;
