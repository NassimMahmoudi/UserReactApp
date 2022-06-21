import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.state = {
      recipes: [],
      users: [],
    };
  }
  componentDidMount() {
    this.retrieveRecipes();
    this.retrieveUsers();
  }
  retrieveRecipes() {
    RecipeDataService.getPublicContent()
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveUsers() {
    UserDataService.getAllUsers()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }  
  convertDescription = description => {
    const Desc = description.substring(0,40);
    return Desc;
  };
  
  render(){
    const { recipes, users } = this.state;

    return(
            <div>
              <section className="banner_part">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="banner_text">
                        <div className="banner_text_iner">
                          <h5>yummy recipes</h5>
                          <h1>smell good feel good</h1>
                          <p>Together creeping heaven upon third dominion be upon won't darkness rule land
                            behold it created good saw after she'd Our set living. Signs midst dominion
                            creepeth morning</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* banner part start*/}
              {/*::exclusive_item_part start::*/}
              <section className="exclusive_item_part blog_item_section">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5">
                      <div className="section_tittle">
                        
                      <p>Popular Dishes</p>
                        <h2>Our Exclusive recipes</h2>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                  {recipes &&
                    recipes.map((recipe, index) => (
                    <div key={recipe._id} className="col-sm-6 col-lg-4">
                      <div className="single_blog_item">
                        <div className="single_blog_img">
                          <img src= {"http://localhost:3000"+(recipe.picture)} alt="" />
                        </div>
                        <div className="single_blog_text">
                          <h3>{recipe.name}</h3>
                          <p> {this.convertDescription(recipe.description)}...</p>
                          <Link to="/connexion" className="btn_3">Read More <img src="img/icon/left_2.svg" alt="" /></Link>
                        </div>
                      </div>
                    </div>
                   ))} 
                  </div>
                </div>
              </section>
              {/*::exclusive_item_part end::*/}
              {/* about part start*/}
              <section className="about_part">
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
                        <p>May over was. Be signs two. Spirit. Brought said dry own firmament lesser best sixth deep
                          abundantly bearing, him, gathering you
                          blessed bearing he our position best ticket in month hole deep </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="intro_video_bg">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="intro_video_iner text-center">
                        <h2>Expect The Best</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="chefs_part blog_item_section section_padding">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5">
                      <div className="section_tittle">
                        
                        <h2>Our Experience Chefs</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  {users &&
                    users.map((user, index) => (      
                    <div  key={user._id} className="col-sm-6 col-lg-4">
                      <div className="single_blog_item">
                        <div className="single_blog_img">
                          <img src={"http://localhost:3000"+(user.picture)} alt="" />
                        </div>
                        <div className="single_blog_text text-center">
                          <h3>{user.pseudo}</h3>
                          <p><i className="fa fa-envelope" aria-hidden="true"></i> {user.email}</p>
                          <div className="social_icon">
                            <Link to="/connexion"> <i className="ti-facebook" /> </Link>
                            <Link to="/connexion"> <i className="ti-twitter-alt" /> </Link>
                            <Link to="/connexion"> <i className="ti-instagram" /> </Link>
                            <Link to="/connexion"> <i className="ti-skype" /> </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))} 
                    
                   
                   
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
            </div>
          );
        }
      }
      
    

