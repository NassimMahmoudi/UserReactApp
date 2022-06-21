import axios from 'axios';
import authHeader from './auth.header';
const API_URL = 'http://localhost:3000/api/recipe/';
class RecipeService {
    getPublicContent() {
        return axios.get(API_URL + 'accepted-recipes');
    }
    getAll() {
        return axios.get("/");
    }
    addRecipe(data) {
        return axios.post(API_URL + "add-recipe", data);
    }
    readRecipe(id) {
        return axios.get(API_URL +`get-recipe/${id}`);
    }
    myRecipes(id) {
        return axios.get(API_URL +`my-recipes/${id}`);
    }
    myAcceptedRecipes(id) {
        return axios.get(API_URL +`my-accepted-recipes/${id}`);
    }
    deleteRecipe(id) {
        return axios.delete(API_URL +`delete-recipe/${id}`);
    }


}
export default new RecipeService();