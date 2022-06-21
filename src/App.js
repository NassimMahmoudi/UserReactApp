import React, { Component }  from "react";
import Navbar from "./layout/Navbar";
import NavbarUser from "./layout/NavbarUser";
import Banner from "./layout/Banner";
import About from "./layout/About";
import Menu from "./layout/Menu";
import Recipes from "./layout/Recipes";
import Public from "./layout/PublicRecipes";
import Recipe from "./layout/Recipe";
import MyRecipes from "./layout/MyRecipes";
import Addrecipe from "./layout/Addrecipe";
import Editrecipe from "./layout/Editrecipe";
import Edit from "./layout/Edit";
import Contact from "./layout/Contact";
import Auth from "./layout/Auth";
import Signup from "./layout/Signup";
import Home from "./layout/Home";
import Profile from "./layout/Profile";
import AuthService from "./services/auth.service";
import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser} = this.state;
  
  return (
    
    

        <Router>
          {currentUser ?(    
        <NavbarUser/>
          ): (<Navbar/> )}
          
        <Routes>  
        <Route  path="/" element={<Banner/>}/>
        <Route  path="edit" element={<Edit/>}>
        <Route  path=":id" element={<Editrecipe/>}/>
        </Route>
        <Route  path="/about" element={<About/>}/>
        <Route  path="/menu" element={<Menu/>}/>
        <Route  path="/recipes" element={<Recipes/>}/>
        <Route  path="/public" element={<Public/>}/>
        <Route  path="/:recipe" element={<Recipe/>}/>
        <Route  path="/myrecipes" element={<MyRecipes/>}/>
        <Route  path="/contact" element={<Contact/>}/>
        <Route  path="/connexion" element={<Auth/>}/>
        <Route  path="/signup" element={<Signup/>}/>
        <Route  path="/home" element={<Home/>}/>
        <Route  path="/addrecipe" element={<Addrecipe/>}/>
        
        <Route  path="/profile" element={<Profile/>}/>



        </Routes>
      

        </Router>
        


        
  );
}
}
export default App;