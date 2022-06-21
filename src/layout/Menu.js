import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";
import CarnetDataService from "../services/carnet.service";
import AuthService from "../services/auth.service";

export default class Menu extends Component {
    constructor(props) {
      super(props);
      this.retrieveRecipes = this.retrieveRecipes.bind(this);
      this.retrieveCarnet = this.retrieveCarnet.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.deleteRecipeFcarnet = this.deleteRecipeFcarnet.bind(this);
      this.getUser = this.getUser.bind(this);
      this.getRecipe = this.getRecipe.bind(this);
      this.getRecipes = this.getRecipes.bind(this);
      this.state = {
        carnet: {},
        idCarnet : "",
        CurrentUser : AuthService.getCurrentUser(),
        recipes: [],
        Carnetrecipes: [],
        users: [],
      };
    }
    componentDidMount() {
      let user =  AuthService.getCurrentUser()
      this.retrieveRecipes();
      this.retrieveUsers();
      this.retrieveCarnet(user.id);
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
    retrieveCarnet(id) {
      CarnetDataService.getCarnet(id)
        .then(response => {
          this.setState({
            carnet: response.data
          });
          this.getRecipes();
        })
        .catch(e => {
          console.log(e);
        });
    }
    deleteRecipeFcarnet(id,recipe) {
      CarnetDataService.deleteFromCarnet(id,recipe)
        .then(response => {
          this.setState({
            carnet: response.data
          });
          console.log( "response.dataresponse.dataresponse.dataresponse.dataresponse.dataresponse.data")
          console.log( response.data)
          this.getRecipes();
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
    getRecipe(id) {
      console.log('this.recipes')
      console.log(this.state.recipes)
      for (let index = 0; index < this.state.recipes.length; index++) {
        if( this.state.recipes[index]._id==id){
          let recipe=this.state.recipes[index];
          return recipe;
        }
        
      } 
    
    }
    convertISOStringToMonthDay = date => {
      const tempDate = new Date(date).toString().split(' ');
      const formattedDate = `${tempDate[3]} ${+tempDate[2]} ${tempDate[1]}`;
      return formattedDate;
    };
    getRecipes() {     
      let tabResult = []; 
      console.log('this.carnet')
      console.log(this.state.carnet)
      let tabInCarnet =this.state.carnet.recipes;
      for (let index = 0; index < tabInCarnet.length; index++) {
        let recipe = this.getRecipe(tabInCarnet[index]);
        if(recipe){tabResult.push(recipe)}  
      } 
      this.setState({
        Carnetrecipes: tabResult
      });
    }
    render(){
      const { recipes, users,carnet,Carnetrecipes,CurrentUser } = this.state;
      console.log(Carnetrecipes)
      const mystyle = {
        width : "175px",
        height : "163px"
      };

return(
  <>


        <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>My Food Carnet</h2>
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
                  <p>My Carnet</p>
                  <h2>My Delicious Food Recipes</h2>
                </div>
              </div>
            
              <div className="col-lg-12">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active single-member" id="Special" role="tabpanel">
                    <div className="row">
                    {Carnetrecipes &&
                    Carnetrecipes.map((recipe, index) => (
                      <div key={recipe._id} className="col-sm-6 col-lg-6">
                        <div className="single_food_item media">
                          <img style={mystyle} src={"http://localhost:3000"+(recipe.picture)} className="mr-3" alt="..." />
                          <div className="media-body align-self-center">
                            <h3>{recipe.name}</h3>
                            <h5> # {this.getUser(recipe.posterId)}</h5>
                            <br/>
                            <p> Created At : {this.convertISOStringToMonthDay(recipe.createdAt)}</p>
                            <br/>
                            <div className="row">
                            <div className="col-sm-4">
                            <Link  className="genric-btn info circle" id="iconrecipe" to={`/${recipe._id}`}> <i className="fa fa-info"></i></Link>
                            </div><div className="col-sm-4">
                            <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to Delete this recipe From your carnet?')) this.deleteRecipeFcarnet(CurrentUser.id,recipe._id)}}   to="#"> <i className="fa fa-trash"></i></Link>
                            </div></div>
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
   
   );
  }
}
