import './styles.scss';
import {
  iconFacebook,
  iconInstagram,
  iconPinterest,
  iconTwitter,
  working,
  logo,
  cyanLine,
  openMenu,
  closeMenu
} from '../../images';
import { useState } from 'react';
import API from '../../middleware';
import { useMediaQuery } from 'react-responsive';


function App() {

  const isMobile = useMediaQuery({ query: '(max-width: 950px)' });

  const shortenLink = (link) => {
    const input = document.querySelector(".shorten-link-input");
    if (!shortenLinkValue) {
      input.placeholder = "Please add a link";
      input.classList.add("shorten-link-warning");
      return;
    } else {
      if (input.classList.contains("shorten-link-warning")) {
        input.classList.remove("shorten-link-warning");
      };
    }
    const config = {
      method:'get',
      url:`/shorten?url=${link}`
    };
    API(config)
    .then((response) => {
      if (response.data.ok) {
        const obj = {};
        obj.originalLink = response.data.result.original_link;
        obj.shortenedLink = response.data.result.short_link;
        obj.code = response.data.result.code;
        setCreatedLinks(createdLinks => [...createdLinks, obj]);
      }
    });
  };

  const copyLink = (e) => {
    if (e.target.classList.contains("not-copied")) {
      e.target.classList.replace("not-copied", "copied");
      e.target.innerText = "Copied!"
    }
    const textToCopy = e.target.parentNode.querySelector('.created-link').innerText;
    navigator.clipboard.writeText(textToCopy);
  }

  const [createdLinks, setCreatedLinks] = useState([]);
  const [shortenLinkValue, setShortenLinkValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const jsxLinks = createdLinks.map((link) => 
    <div className="created-link-container" key={link.code}>
      <p className="original-link">
        {link.originalLink}
      </p>
      <div className="created-link-right">
        <p className="created-link">
          {link.shortenedLink}
        </p>
        <div
        className="copy-link not-copied"
        onClick={(e) => copyLink(e)}>
        Copy
        </div>
      </div>
    </div>  
  );

  const jsxMenu = () => {
    return (
      <div className="menu-container">
        <div className="menu">
          <div className="menu-top">
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>Resources</li>
            </ul>
          </div>
          <div className="menu-bottom">
            <ul>
              <li>Login</li>
              <li>Sign Up</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-top-left">
          <ul>
            <li className="home-button">Shortly</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
        </div>
        <div className="header-top-right">
          <ul>
            <li>Login</li>
            <li className="sign-up">Sign Up</li>
          </ul>
        </div>
        <img 
        className={isMobile ? "open-menu" : "display-none"}
        src={menuOpen ? closeMenu : openMenu}
        alt="Open menu"
        onClick={() => {setMenuOpen(!menuOpen)}}
        />
      </header>
      {menuOpen && jsxMenu()}
      <div className="container-top">
        <div className="container-top-left">
          <h1 className="container-top-title">More than just shorter links</h1>
          <p className="container-top-paragraph">
            Build your brand's recognition and get detailed insights on how your links are performing.
          </p>
          <div className="get-started">Get Started</div>
        </div>
        <img className="container-top-image" src={working} alt="A person working" />
      </div>
      <div className="container-middle">
        <div className="container-middle-shorten-link">
          <input className="shorten-link-input" placeholder="Shorten a link here..." type="text"
          value={shortenLinkValue}
          onChange={((e) => setShortenLinkValue(e.target.value))}
          />
          <div className="shorten-button" onClick={() => {shortenLink(shortenLinkValue)}} >Shorten it!</div>
        </div>
        {jsxLinks}
        <div className="container-middle-title">
          <h2>Advanced Statistics</h2>
          <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
        </div>
        <div className="small-section-container">
          <div className="small-section">
            <div className="small-section-image image-brand" />
            <p className="small-section-title">
              Brand recognition
            </p>
            <p className="small-section-paragraph">
              Boost your brand recognition with each click. Generic links don’t 
              mean a thing. Branded links help instil confidence in your content.
            </p>
          </div>
          <div className="small-section">
            <div className="small-section-image image-records" />
            <p className="small-section-title">
              Detailed Records
            </p>
            <p className="small-section-paragraph">
              Gain insights into who is clicking your links. Knowing when and where 
              people engage with your content helps inform better decisions.
            </p>
          </div>
          <div className="small-section">
            <div className="small-section-image image-customizable" />
            <p className="small-section-title">
              Fully Customizable
            </p>
            <p className="small-section-paragraph">
            Improve brand awareness and content discoverability through customizable 
            links, supercharging audience engagement.
            </p>
          </div>
          <img className="cyan-line" src={cyanLine} alt="" />
        </div>
      </div>
      <div className="container-bottom">
        <h3 className="container-bottom-title">
          Boost your links today
        </h3>
        <div className="get-started">Get Started</div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <img src={logo} alt="Shortly Logo" className="logo" />
          </div>
          <div className="footer-section">
            <ul>
              <li>Features</li>
              <li>Link Shortening</li>
              <li>Branded Links</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul>
              <li>Resources</li>
              <li>Blog</li>
              <li>Developers</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul>
              <li>Company</li>
              <li>About</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-section">
            <img src={iconFacebook} alt="Facebook" />
            <img src={iconTwitter} alt="Twitter" />
            <img src={iconPinterest} alt="Pinterest" />
            <img src={iconInstagram} alt="Instagram" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
