import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import UserDataService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.count = this.count.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      user : {},
      followers: [],
      following: [],
      likes: [],
      dislikes: [],
    };
  }
  componentDidMount() {
    const user =AuthService.getCurrentUser();
    console.log(user);
    this.getUser(user.id);
}
count(usertab) {
  return usertab.length;
}
getUser(id) {
  UserDataService.userInfo(id)
 .then(response => {
    this.setState({
      user: response.data,
      followers: response.data.followers,
      following: response.data.following,
      likes: response.data.likes,
      dislikes: response.data.dislikes,
     });
 })
 .catch(e => {
   console.log(e);
 });
}
  render() {
    const { currentUser,user,following,followers,likes,dislikes } = this.state;
    const mystyle = {
      "font-size" : "24px",
      "text-transform" : "capitalize",
       color : "#ff6426",
      "font-style" : "italic",
      "font-weight" : "400",
      "font-family" : "Lora, serif",
      "margin-bottom" : "25px",
    };
    return (
      <div>
        <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>Welcome { currentUser.pseudo } </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <div className="container">

      <div class="section-top-border">
				<h2 style={mystyle} class="mb-30">User Profile:</h2>
				<div class="row">
					<div class="col-md-3">
						<img src={"http://localhost:3000"+(user.picture)} alt="" class="img-fluid"/>
					</div>
					<div class="col-md-9 mt-sm-20">
            <ul className="unordered-list">
              <li>
                <div className="row">
                  <div class="col-md-4">
                    <h2>User Name :</h2>
                  </div>
                  <div class="col-md-4">
                    <h2><i className="fa fa-user" aria-hidden="true"></i> {user.pseudo}</h2>
                  </div>
                </div>
              </li><li>
                <div className="row">
                  <div class="col-md-4">
                    <h2>User Email :</h2>
                  </div> 
                  <div class="col-md-4">
                    <h2><i className="fa fa-envelope" aria-hidden="true"></i> {user.email}</h2>
                  </div>
                </div>
              </li>
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <section class="profile__details">
      <ul class="profile__stats">
        <li>
          <h3 class="profile_stat__heading">Followers</h3>
          <div class="profile_stat__number">{this.count(followers)}</div>
        </li>
       <li>
          <h3 class="profile_stat__heading">Following</h3>
          <div class="profile_stat__number">{this.count(following)}</div>
        </li>
        <li>
          <h3 class="profile_stat__heading">Likes</h3>
          <div class="profile_stat__number">{this.count(likes)}</div>
        </li>
        <li>
          <h3 class="profile_stat__heading">Dislikes</h3>
          <div class="profile_stat__number">{this.count(dislikes)}</div>
        </li>
      </ul>
            
     
    </section>
						
					</div>
				</div>
			</div>
      </div>
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
      </div>
    );
  }
}