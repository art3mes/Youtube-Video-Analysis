import React from "react";
// import RefreshIcon from '@mui/icons-material/Refresh';

function Footer() {
  //const year = new Date().getFullYear();
  // const openInNewTab = url => {
  //   window.open(url, '_blank', 'noopener,noreferrer');
  // };
  return (
    <div>
        <footer>
          {/* <p>art3mes ⓒ {year}</p> */}
          <div className="footer-text">
            <div>Afreen Qamar</div>
            <div>Mohammad Ali</div>
            <div>Mohammad Shoaib</div>
          </div>
        </footer>
        {/* <button className="refreshButton" onClick={() => openInNewTab('https://keeper-app-backend-dyr1.onrender.com/')}><RefreshIcon /></button> */}
    </div>
  );
}

export default Footer;
