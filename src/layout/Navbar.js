import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
const Navbar =()=>{
return(
    <div>
        
      <header className="main_menu home_menu">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/"> <img src="img/logo.png" alt="logo" /> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse main-menu-item justify-content-end" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/public">recipes</Link>
                    </li>                   
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="menu_btn">
                  <Link  className="btn_1 d-none d-sm-block" to="/connexion">connexion</Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      </div>
    );
  
;


}




export default Navbar
