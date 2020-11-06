import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    //let imgavatar = <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
    //{props.currentUser.username}

    let imgavatar = props.currentUser.image;    

    if (!imgavatar) {    
      props.currentUser.imageClass = " nolog"
      imgavatar = "https://static.productionready.io/images/smiley-cyrus.jpg"
    } 

    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className={`nav-link nolog`}> 
            <img src={imgavatar} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container"> 
          
          {/*<Link to="/" className="navbar-brand">
            {this.props.appName.toUpperCase()}
          </Link>*/}
          <a href="http://www.wimmalab.org" className="navbar-brand">   
            {this.props.appName.toUpperCase()}
          </a>
          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
          
          <a href="http://www.wimmalab.org">   
          <img src={require('./images/wimmalab-logo-square-small-green.png')} />
          </a>

        </div>
      </nav>
    );
  }
}

export default Header;
