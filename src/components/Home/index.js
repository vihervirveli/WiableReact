import Banner from '../Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import { Link } from 'react-router-dom';
//Cookie bar - uncomment when it's appears in some US.
//import CookieConsent, { wimmalabforumcookieconsent } from "react-cookie-consent";

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner/>

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
              
                <div className="logo">
                <a href="http://www.wimmalab.org">  
                    <img src={require('./../images/wimmalab-logo-rect-bgtransparent.png')} />
                </a>
                </div>

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>
{/*     
It's too early for this bar. Uncomment when appears in the future - US.
        <CookieConsent
        location="bottom"
        buttonText="Understood"
        cookieName="wimmalabforumcookieconsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        debug="false"
      >
      We use essential cookies to perform essential website functions.{ "  "} 

      
        <span style={{ fontSize: "10px" }}>
          <Link className="privacy" to={`/privacy`}>
          See our Privacy Policy
          </Link>
        </span>
      </CookieConsent>
*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
