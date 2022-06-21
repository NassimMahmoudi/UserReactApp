import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";
import RecipeInteractionService from "../services/interaction.service";
import UserCarnetService from "../services/carnet.service";
import withRouter from "../withRouter";
import AuthService from "../services/auth.service";

const required = value => {
   if (!value) {
     return (
       <div className="alert alert-danger" role="alert">
         This field is required!
       </div>
     );
   }
 };
 const email = value => {
   if (!isEmail(value)) {
     return (
       <div className="alert alert-danger" role="alert">
         This is not a valid email.
       </div>
     );
   }
 };
 const vusername = value => {
   if (value.length < 2 || value.length > 500) {
     return (
       <div className="alert alert-danger" role="alert">
         The Comment must be between 3 and 500 characters.
       </div>
     );
   }
 };
class Recipe extends Component {
   constructor(props) {
      super(props);
      this.getRecipe = this.getRecipe.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.handleComment = this.handleComment.bind(this);
      this.onChangeCommenterPseudo = this.onChangeCommenterPseudo.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.dislikeRecipe = this.dislikeRecipe.bind(this);
      this.followUser = this.followUser.bind(this);
      this.unFollowUser = this.unFollowUser.bind(this);
      this.likeRecipe = this.likeRecipe.bind(this);
      this.shareRecipe = this.shareRecipe.bind(this);
      this.getInteractions = this.getInteractions.bind(this);
      this.getCurrentUser = this.getCurrentUser.bind(this);
      this.verifFollowing = this.verifFollowing.bind(this);
      this.verifLike = this.verifLike.bind(this);
      this.verifMine = this.verifMine.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.deleteRecipe = this.deleteRecipe.bind(this);
      this.getUser = this.getUser.bind(this);
      this.getUserPic = this.getUserPic.bind(this);
      this.myRecipes = this.myRecipes.bind(this);
      this.count = this.count.bind(this);
      this.state = {
         posterId: '',
         recipeId: '',
         IsFollowed: false,
         IsLiked: false,
         IsMine: false,
         users: [],
         recipes: [],
         likes: [],
         currentUser : AuthService.getCurrentUser(),
         dislikes: [],
         comments: [],
         followers: [],
         interaction: {},
         currentRecipe: {},
         text: "",
         email: "",
         commenterPseudo: "",
         successful: false,
         message: ""
      };
    }
    componentDidMount() {
         const id =this.props.params.recipe
         console.log(id);
         this.getRecipe(id);
         this.getInteractions(id);
         this.retrieveUsers();
         let user = AuthService.getCurrentUser();
         this.getCurrentUser(user.id);
    }
    
    getRecipe(id) {
      RecipeDataService.readRecipe(id)
      .then(response => {
         this.setState({
            currentRecipe: response.data,
            posterId: response.data.posterId,
            recipeId: response.data._id,
          });
          this.myRecipes(response.data.posterId);
          console.log(response.data);
          let user = AuthService.getCurrentUser();
          this.setState({
            IsMine: this.verifMine(response.data.posterId,user.id)
          });
      })
      .catch(e => {
        console.log(e);
      });
    }
    myRecipes(id_user) {
      RecipeDataService.myAcceptedRecipes(id_user)
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
    getInteractions(id) {
      RecipeInteractionService.getInteractions(id)
      .then(response => {
         this.setState({
            interaction: response.data,
            likes: response.data.likes,
            dislikes: response.data.dislikes,
            comments: response.data.comments
          });
          console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    dislikeRecipe(id,recipe) {
      RecipeInteractionService.dislikeRecipe(id,recipe)
      .then(response => {
        console.log(response.data);
        this.refreshList(recipe);
        let user = AuthService.getCurrentUser();
        this.getCurrentUser(user.id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    followUser(id,idToFollow) {
      UserDataService.followUser(id,idToFollow)
      .then(response => {
        console.log(response.data);
        let user = AuthService.getCurrentUser();
         this.getCurrentUser(user.id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    unFollowUser(id,idToUnFollow) {
      UserDataService.unfollowUser(id,idToUnFollow)
      .then(response => {
        console.log(response.data);
        let user = AuthService.getCurrentUser();
         this.getCurrentUser(user.id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    count(usertab) {
      return usertab.length;
    }
    likeRecipe(id,recipe) {
      RecipeInteractionService.likeRecipe(id,recipe)
      .then(response => {
        console.log(response.data);
        this.refreshList(recipe);
        let user = AuthService.getCurrentUser();
         this.getCurrentUser(user.id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    shareRecipe(id,recipe) {
      UserCarnetService.addToCarnet(id,recipe)
      .then(response => {
        console.log(response.data);
        this.refreshList(recipe);
        window.location.href="/menu";
      })
      .catch(e => {
        console.log(e);
      });
    }
    getCurrentUser(id) {
      UserDataService.userInfo(id)
        .then(response => {
          
          this.setState({
            followers: response.data.following,
            IsFollowed: this.verifFollowing(this.state.posterId,response.data.following),
            IsLiked: this.verifLike(this.state.recipeId,response.data.likes)
          });
          console.log('response.data.followers');
          console.log(response.data);
          console.log(response.data.following);
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
    verifFollowing(idUser,tab) {
      for (let index = 0; index < tab.length; index++) {
        if( tab[index]==idUser){
          console.log(tab);
          return true;
        }
      } 
    return false;
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
    verifMine(idRecipe,tab) {
     
        if( tab==idRecipe){
          console.log(tab);
          return true;
        }
    return false;
    }
    getUser(id) {
      var userName= "";
      for (let index = 0; index < this.state.users.length; index++) {
        if( this.state.users[index]._id==id){
          userName=this.state.users[index].pseudo;
        }
      } 
    return userName;
    }
    getUserPic(id) {
      var picture= "";
      for (let index = 0; index < this.state.users.length; index++) {
        if( this.state.users[index]._id==id){
         picture=this.state.users[index].picture;
        }
      } 
    return picture;
    }
     convertISOStringToMonthDay = date => {
      const tempDate = new Date(date).toString().split(' ');
      const formattedDate = `${tempDate[3]} ${+tempDate[2]} ${tempDate[1]}`;
      return formattedDate;
    };
    refreshList(id) {
      this.getRecipe(id);
      this.getInteractions(id);
    }
    onChangeText(e) {
      this.setState({
        text: e.target.value
      });
    }
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
    deleteRecipe(id) {
      RecipeDataService.deleteRecipe(id)
      .then(response => {
        console.log(response.data);
        window.location.href="/myrecipes";
      })
      .catch(e => {
        console.log(e);
      });
    }
    onChangeCommenterPseudo(e) {
      this.setState({
         commenterPseudo: e.target.value
      });
    }
    handleComment(e) {
      e.preventDefault();
      this.setState({
        message: "",
        successful: false
      });
      this.form.validateAll();
      if (this.checkBtn.context._errors.length === 0) {
         let idRecipe= this.state.currentRecipe._id;
         console.log('idRecipe')
         console.log(idRecipe)
        const data = new FormData();
        data.append('text', this.state.text)
        data.append('email', this.state.email)
        data.append('commenterPseudo', this.state.commenterPseudo)
        let text= this.state.text;
        let email= this.state.email;
        let commenterPseudo= this.state.commenterPseudo;
        RecipeInteractionService.CommentRecipe(
         text,email,commenterPseudo,idRecipe
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
            this.refreshList(idRecipe);
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }
    render(){
      const { currentRecipe,IsFollowed,IsMine,IsLiked,currentUser,interaction,likes,dislikes,comments,recipes,posterId } = this.state;
      console.log('IsFollowed');
      console.log(IsFollowed);
      console.log('IsLiked');
      console.log(IsLiked);
      console.log('IsMine');
      console.log(IsMine);
      const mystyle = {
         width : "150px",
         height : "150px"
       };
        const FollowStyle = {
          'background-color' : '#04AA6D',
          'border-radius': '5px',
          'font-size': '17px',
          'font-family': 'Source Sans Pro',
           padding: '1px 6px',
           color : '#ffff ! important'
       };
return(
  <div>


        <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>Food recipe</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog_area single-post-area section_padding">
      <div className="container">
         <div className="row">
            <div className="col-lg-8 posts-list">
               <div className="single-post">
                  <div className="feature-img">
                     <img className="img-fluid" style={{width: "-webkit-fill-available"}} src={"http://localhost:3000"+(currentRecipe.picture)} alt=""/>
                  </div>
                  <div className="blog_details">
                                   
                     <div className="blog-author">
                  <div className="media align-items-center">
                    {IsMine ?( <div></div>                       
                    ):( <img src={"http://localhost:3000"+(this.getUserPic(currentRecipe.posterId))} alt=""/>
                    )}
                     <div className="media-body">
                     {IsMine ?(  <div></div>   
                    ):( <div className='row'>
                    <div className='col-6'>
                       <h2> # {this.getUser(currentRecipe.posterId)}</h2>
                     </div>
                     <div className='col-4'>
                     {IsFollowed ?(   
                       <Link className="unfoloowbtn" style={FollowStyle} onClick={() =>  this.unFollowUser(currentUser.id,currentRecipe.posterId)} to='#'  >
                       <span className='' style={{display: "center"}}>UnFollow</span>
                     </Link> 
                     ): (  <Link className="foloowbtn" style={FollowStyle} onClick={() =>  this.followUser(currentUser.id,currentRecipe.posterId)} to='#'  >
                     <span className='' style={{display: "center"}}>Follow</span>
                   </Link> )}
                     </div>
                   </div>)}
                          
                           <h2>{currentRecipe.name}</h2>
                     <h3>created at : {this.convertISOStringToMonthDay(currentRecipe.createdAt)}</h3>     
                       
                     </div>
                  </div>
               </div>
                     <div className="quote-wrapper">
                        <div className="quotes">
                        {currentRecipe.description}.
                        </div>
                     </div>
                     
                  </div>
               </div>
               <div className="navigation-top">
               {IsMine ?(   <div className="row">
                               <div className="col-sm-4">
                            <Link  className="genric-btn success circle" id="iconrecipe" to="#"> <i className="fa fa-edit" ria-hidden="true"></i></Link>
                             </div>
                              <div className="col-sm-4">
                                <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to delete this recipe?')) this.deleteRecipe(currentRecipe._id)}}  to="#"> <i className="fa fa-trash"></i></Link>
                             </div> 
                             </div> 
                              ): (  <div className="row">
                              {IsLiked ?(   
                                       <div className="col-sm-4">
                                       <Link  className="genric-btn warning circle" id="iconrecipe" onClick={() => this.dislikeRecipe(currentUser.id,currentRecipe._id)} to="#"> <i className="fa fa-skull" ></i></Link>
                                     </div> 
                                      ): (  <div className="col-sm-4">
                                      <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() =>  this.likeRecipe(currentUser.id,currentRecipe._id)}   to="#"> <i className="fa fa-heart"></i></Link>
                                    </div> )}
                                   
                                     <div className="col-sm-4">
                                      <Link  className="genric-btn success circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to Share this recipe?')) this.shareRecipe(currentUser.id,currentRecipe._id)}} to="#"> <i className="fa fa-share" ria-hidden="true"></i></Link>
                                    </div>
                                    
                                  </div> )}
               
                  <div className="d-sm-flex justify-content-between text-center">
                     <ul className="blog-info-link mt-3 mb-4">
                        <li><a href="#"><i className="far fa-heart"></i>{this.count(likes)} Likes</a></li>
                        <li><a href="#"><i className="far fa-user"></i>{this.count(dislikes)} Dislikes</a></li>
                        <li><a href="#"><i className="far fa-comments"></i> {this.count(comments)} Comments</a></li>
                     </ul>
                  </div>
               </div>

               <div className="comments-area">
                  <h4>Comments</h4>
                  {comments &&
                    comments.map((comment, index) => (
                  <div  key={comment._id} className="comment-list">
                     <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                           <div className="thumb">
                              <img src= {"http://localhost:3000"+(comment.commenterPhoto)} alt=""/>
                           </div>
                           <div className="desc">
                              <p className="comment">
                                {comment.text}
                                </p>
                              <div className="d-flex justify-content-between">
                                 <div className="d-flex align-items-center">
                                    <h5>
                                       <a to="#"> # {comment.commenterPseudo}</a>
                                    </h5>
                                    <p className="date"> {this.convertISOStringToMonthDay(comment.timestamp)} </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                   ))}
               </div>
               <div className="comment-form">
                  <h4>Leave a Reply</h4>
                  <Form
                     className="form-contact comment_form"
                     onSubmit={this.handleComment}
                     ref={c => {
                     this.form = c;
                     }}
                  >
                     <div className="row">
                        <div className="col-12">
                           <div className="form-group">
                              <Textarea className="form-control w-100"  id="comment" cols="30" rows="9"
                                 placeholder="Write Comment"
                                 name="text"
                                 value={this.state.text}
                                 onChange={this.onChangeText}
                                 validations={[required, vusername]}>

                                 </Textarea>
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <Input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              name="commenterPseudo"
                              value={this.state.commenterPseudo}
                              onChange={this.onChangeCommenterPseudo}
                              validations={[required, vusername]}
                            />   
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <Input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                              validations={[required, email]}
                            />
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <button type="submit" className="button button-contactForm">Send</button>
                     </div>
                     {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
                  </Form>
               </div>
            </div>
            {IsMine ?(<div></div>):(
            <div className="col-lg-4">
            <div className="blog_right_sidebar">
               <aside className="single_sidebar_widget popular_post_widget">
                  <h3 className="widget_title">Same author</h3>
                  {recipes &&
                     recipes.map((recipe, index) => (
                        <div key={recipe._id} className="media post_item">
                           <img style={mystyle} src= {"http://localhost:3000"+(recipe.picture)} alt="post"/>
                           <div className="media-body">
                              <a onClick={() => {(window.location.href=`/${recipe._id}`)}} to={`/${recipe._id}`}>
                                 <h3>{recipe.name}</h3>
                              </a>
                              <p>{this.convertISOStringToMonthDay(recipe.createdAt)}</p>
                           </div>
                        </div>
                  ))} 
               </aside>
            </div>
         </div>)}
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
export default withRouter(Recipe)