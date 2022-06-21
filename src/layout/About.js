import React from 'react'
import { Link } from 'react-router-dom';

const About =()=>{
return(
  <>
  <section className="breadcrumb breadcrumb_bg">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb_iner text-center">
            <div className="breadcrumb_iner_item">
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb start*/}
  {/* about part start*/}
  <section className="about_part about_bg">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-sm-4 col-lg-5 offset-lg-1">
          <div className="about_img">
            <img src="img/about.png" alt="" />
          </div>
        </div>
        <div className="col-sm-8 col-lg-4">
          <div className="about_text">
            <h5>Our History</h5>
            <h2>The belly rules the mind.</h2>
            <h4>Satisfying people hunger for simple pleasures</h4>
            <p>
              May over was. Be signs two. Spirit. Brought said dry own firmament
              lesser best sixth deep abundantly bearing, him, gathering you
              blessed bearing he our position best ticket in month hole deep{" "}
            </p>
            <Link to="/signup" className="btn_3">
              Join Us <img src="img/icon/left_2.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer className="footer-area">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-3 col-sm-6 col-md-3 col-lg-3">
                      <div className="single-footer-widget footer_1">
                        <h4>About Us</h4>
                        <p>Heaven fruitful doesn't over for these theheaven fruitful doe over days
                          appear creeping seasons sad behold beari ath of it fly signs bearing
                          be one blessed after.</p>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-md-2 col-lg-3">
                      <div className="single-footer-widget footer_2">
                        <h4>Important Link</h4>
                        <div className="contact_info">
                          <ul>
                            <li><Link to="/connexion">Food Recipes</Link></li>
                            <li><Link to="/"> Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/connexion">Shopping Cart</Link></li>
                            <li><Link to="/contact"> Our Shop</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-md-3 col-lg-3">
                      <div className="single-footer-widget footer_2">
                        <h4>Contact us</h4>
                        <div className="contact_info">
                          <p><span> Address :</span>Zaghwen,Tunis</p>
                          <p><span> Phone :</span> +216 29 000 123 </p>
                          <p><span> Email : </span>info@dingo.com </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-md-4 col-lg-3">
                      <div className="single-footer-widget footer_3">
                        <h4>Newsletter</h4>
                        <p>Heaven fruitful doesn't over lesser in days. Appear creeping seas</p>
                        <form action="#">
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="Email Address"/>
                              <div className="input-group-append">
                                <button className="btn" disabled type="button"><i className="fas fa-paper-plane" /></button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="copyright_part_text">
                    <div className="row">
                      <div className="col-lg-8">
                        <p className="footer-text m-0">
                          Copyright © All rights reserved<i className="ti-heart" aria-hidden="true" /> by <a href="" target="_blank">Dingo</a></p>
                      </div>
                      <div className="col-lg-4">
                        <div className="copyright_social_icon text-right">
                          <a href="#"><i className="fab fa-facebook-f" /></a>
                          <a href="#"><i className="fab fa-twitter" /></a>
                          <a href="#"><i className="ti-dribbble" /></a>
                          <a href="#"><i className="fab fa-behance" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
</>
   
)
        }
      ;
export default About