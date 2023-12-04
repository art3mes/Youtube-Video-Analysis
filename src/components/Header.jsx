//import React from "react";
import React, { Fragment } from 'react';
import Media from 'react-media';
import AnalyticsIcon from '@mui/icons-material/Analytics';
function Header() {
  return (
    <div>
      <Media queries={{
        small: "(max-width: 719px)"
      }}>
        {matches => (
          <Fragment>
            {matches.small ?
              <header className=' headerSmall'>
                <h1 className='h1Small'><AnalyticsIcon/> Keeper</h1>
              </header> 
            :
              <header>
                <h1><AnalyticsIcon/> Comment Scope</h1>
              </header>
            }
            
          </Fragment>
        )}
      </Media>
    </div>
  );
}

export default Header;