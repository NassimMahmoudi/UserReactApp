import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import AuthService from "../services/auth.service";
import RecipeDataService from "../services/recipe.service";
import withRouter from "../withRouter";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Recipename = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The recipe name must be between 3 and 20 characters.
      </div>
    );
  }
};
const Recipedescription = value => {
  if (value.length < 40 || value.length > 500) {
    return (
      <div className="alert alert-danger" role="alert">
        The recipe description must be between 40 and 500 characters.
      </div>
    );
  }
};

export default class Editrecipe extends Component {
  constructor(props) {
    super(props);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.onChangeRecipename = this.onChangeRecipename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.state = {
      name: "",
      video: "",
      description : "",
      posterId: AuthService.getCurrentUser(),
      selectedfile: null,
      successful: false,
      message: ""
    };
  }
  onChangeRecipename(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeFile(e) {
    this.setState({
      selectedfile: e.target.files[0]
    });
  }
  handleAddRecipe(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      const data = new FormData();
      data.append('file', this.state.selectedfile)
      data.append('name', this.state.name)
      data.append('description', this.state.description)
      data.append('posterId', this.state.posterId.id)
      data.append('video', this.state.video)
      RecipeDataService.addRecipe(
        data
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          window.location.href="/myrecipes";
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
  render() {
return(
    <div>
        <section className="regervation_part section_padding">
        <div className="container">
            <div className="row">
                <div className="col-xl-5">
                    <div className="section_tittle">
                        <p>Edit Recipe</p>
                        <h2>Edit your food recipe </h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="regervation_part_iner">
                      <Form
                        onSubmit={this.handleAddRecipe}
                        ref={c => {
                          this.form = c;
                        }}
                      >
                          {!this.state.successful && (
                            <div>
                              <div className="form-row">
                                  <div className="form-group col-md-12">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Recipe Name *"
                                        value={this.state.name}
                                        onChange={this.onChangeRecipename}
                                        validations={[required, Recipename]}
                                      />  
                                  </div>
                                  <div className="form-group col-md-12">
                                      <Input
                                        type="file"
                                        className="form-control"
                                        name="file"
                                        onChange={this.onChangeFile}
                                      />  
                                  </div>
                                  <div className="form-group col-md-12">
                                      <Textarea 
                                        className="form-control"  
                                        rows="4"
                                        placeholder="Recipe Description *"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        validations={[required, Recipedescription]}>
                                        </Textarea>
                                  </div>
                              </div>
                              <button className="submit-btn">
                              Edit Recipe
                            </button>
                          </div>
                       )}
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