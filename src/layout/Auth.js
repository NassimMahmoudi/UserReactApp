

import React , { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";
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
export default class Auth extends Component{
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          window.location.href="/home";
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) || 
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
            <div>
              <section className="banner_part">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="login-signup l-attop" id="login">
                        <div className="login-signup-title">
                          LOG IN
                        </div>
                        <Form
                          onSubmit={this.handleLogin}
                          ref={c => {
                            this.form = c;
                          }}
                        >
                        <div className="login-signup-content">
                          <div className="input-name">
                            <h2>Email</h2>
                          </div>
                          <Input
                            type="email" 
                            name="username" 
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[email]}
                            className="field-input"
                          />
                          <div className="input-name input-margin">
                            <h2>Password</h2>
                          </div>
                          <Input 
                            type="password"
                            name="password"
                            className="field-input"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                          />
                          <div className="input-r">
                            <div className="check-input">
                              <input type="checkbox" id="remember-me-2" name="rememberme" defaultValue className="checkme" />
                              <label className="remmeberme-blue" htmlFor="remember-me-2" />
                            </div>
                            <div className="rememberme"><label htmlFor="remember-me-2">Remember Me</label></div>
                          </div>
                          <button
                            className="submit-btn"
                            disabled={this.state.loading}
                           >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                           <span>Enter</span>
                          </button>
                          
                          {this.state.message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {this.state.message}
                              </div>
                            </div>
                          )}
                          <div className="forgot-pass">
                            <a href="/signup">If you dont have an account please SignUP ?</a>
                          </div>
                          <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                              this.checkBtn = c;
                            }}
                            />
                        </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

          );
        }
      }

