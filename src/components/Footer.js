import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
        <footer>
            <div className="container">
                <div className="logo">
                <a href="http://www.wimmalab.org">  
                    <img src={require('./images/wimmalab-logo-rect-bgtransparent.png')} />
                </a>
                </div>
                <div className="copyright">

                    Copyright 2020 Wimmalab.

                    <Link className="privacy" to={`/privacy`}>
                      See our Privacy Policy
                    </Link>
                  
                </div>  
                <div className="partner">
                <a href="http://www.jamk.fi">  
                    <img src={require('./images/jamk_tunnus_valkoinen_nimella_englanti.png')} />
                </a>
                </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
