import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";

export default class Recipes extends Component {
    constructor(props) {
      super(props);
      this.retrieveRecipes = this.retrieveRecipes.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.getUser = this.getUser.bind(this);
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
    getUser(id) {
      var userName= "";
      console.log('this.users')
      console.log(this.state.users)
      for (let index = 0; index < this.state.users.length; index++) {
        if( this.state.users[index]._id==id){
          userName=this.state.users[index].pseudo;
        }
        
      } 
    return userName;
    }
    render(){
      const { recipes, users } = this.state;
      const mystyle = {
        width : "175px",
        height : "163px"
      };
return(
  <div>
  
  
  <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>Popular Food recipes</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="food_menu gray_bg">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="section_tittle">
                  <p>Popular Menu</p>
                  <h2>Delicious Food Menu</h2>
                </div>
              </div>
              
              <div className="col-lg-12">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active single-member" id="Special" role="tabpanel" aria-labelledby="Special-tab">
                    <div className="row">
                    {recipes &&
                    recipes.map((recipe, index) => (
                      <div key={recipe._id} className="col-sm-6 col-lg-6">
                        <div className="single_food_item media">
                          <img style={mystyle} src={"http://localhost:3000"+(recipe.picture)} className="mr-3" alt="..." />
                          <div className="media-body align-self-center">
                            
                          <Link to={`/signup`}> <h3>{recipe.name}</h3></Link>

                            <p> {this.convertDescription(recipe.description)}...</p>
                            <h5>#  {this.getUser(recipe.posterId)}</h5>
                          </div>
                        </div>
                      </div>

                    ))} 
                    </div>
                  </div>
                  
                  
                  
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* food_menu part end*/}
        {/*::chefs_part end::*/}
        {/* intro_video_bg start*/}
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
