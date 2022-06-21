import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";
import AuthService from "../services/auth.service";
import UserCarnetService from "../services/carnet.service";
import RecipeInteractionService from "../services/interaction.service";


export default class Home extends Component {
    constructor(props) {
      super(props);
      this.retrieveRecipes = this.retrieveRecipes.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.getCurrentUser = this.getCurrentUser.bind(this);
      this.verifLike = this.verifLike.bind(this);
      this.shareRecipe = this.shareRecipe.bind(this);
      this.likeRecipe = this.likeRecipe.bind(this);
      this.dislikeRecipe = this.dislikeRecipe.bind(this);
      this.getUser = this.getUser.bind(this);

      this.state = {
        recipes: [],
        likes: {},
        currentUser : AuthService.getCurrentUser(),
        users: [],
      };
    }
    componentDidMount() {
      let user =  AuthService.getCurrentUser()
      this.getCurrentUser(user.id);
      console.log(user)
      this.retrieveRecipes(user.id);
      this.retrieveUsers();
    }
    shareRecipe(id,recipe) {
      UserCarnetService.addToCarnet(id,recipe)
      .then(response => {
        console.log(response.data);
        window.location.href="/menu";
      })
      .catch(e => {
        console.log(e);
      });
    }
    retrieveRecipes(id) {
      UserDataService.userHome(id)
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
    verifLike(idRecipe,tab) {
      for (let index = 0; index < tab.length; index++) {
        if( tab[index]==idRecipe){
          console.log(tab);
          return true;
        }
      } 
    return false;
    }
    getCurrentUser(id) {
      UserDataService.userInfo(id)
        .then(response => {
          
          this.setState({
            likes: response.data.likes,
          });
          console.log('response.data.likes');
          console.log(response.data.likes);
        })
        .catch(e => {
          console.log(e);
        });
    }
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
    dislikeRecipe(id,recipe) {
      RecipeInteractionService.dislikeRecipe(id,recipe)
      .then(response => {
        console.log(response.data);
        this.refreshList(id);
        let user = AuthService.getCurrentUser();
        this.getCurrentUser(user.id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    refreshList(id) {
      this.retrieveRecipes(id);
    }
    likeRecipe(id,recipe) {
      RecipeInteractionService.likeRecipe(id,recipe)
      .then(response => {
        console.log(response.data);
        this.refreshList(id);
        let user = AuthService.getCurrentUser();
         this.getCurrentUser(user.id);
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
  
    
    render(){
      const { recipes, users,getUser,currentUser,verifLike } = this.state;
     
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
                          <p>As the world is advancing day by day, it is becoming easier to get 
                              access to many kinds of food at our doorstep. Every day, we all want 
                              to consume great and delicious cuisine.There are many different 
                              varieties of food accessible all throughout the world.
                               We all like different foods, however,
                                my personal favourite is burgers.
                                 I have eaten many cuisines but my
                                  favourite food is definitely a burger. 
                                  I cannot resist myself when it comes to burgers.</p>
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
                          <p> # {this.getUser(recipe.posterId)}</p>
                          <br/>
                          
                          <div className="row">
                            
                            
                            <div className="col-sm-4">
                              <Link  className="genric-btn info circle" id="iconrecipe" to={`/${recipe._id}`}> <i className="fa fa-info"></i></Link>
                            </div>
                            <div className="col-sm-4">
                              <Link  className="genric-btn success circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to Share this recipe?')) this.shareRecipe(currentUser.id,recipe._id)}} to="#"> <i className="fa fa-share" ria-hidden="true"></i></Link>
                            </div>
                            {this.verifLike(recipe._id,this.state.likes) ?(   
                               <div className="col-sm-4">
                               <Link  className="genric-btn warning circle" id="iconrecipe" onClick={() => this.dislikeRecipe(currentUser.id,recipe._id)} to="#"> <i className="fa fa-skull" ></i></Link>
                             </div> 
                              ): (  <div className="col-sm-4">
                              <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() =>  this.likeRecipe(currentUser.id,recipe._id)}   to="#"> <i className="fa fa-heart"></i></Link>
                            </div> )}
                          </div>                        
                        </div>
                      </div>
                    </div>
                  ))} 
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
        
      