import axios from 'axios';
const API_URL = 'http://localhost:3000/api/interaction/';
class RecipeInteractionService {
  getInteractions(id) {
    return axios.get(API_URL +`interaction-recipe/${id}`);
  }
  likeRecipe(id,recipe) {
    return axios.patch(API_URL +`like-recipe/${id}/${recipe}`);
  }
  dislikeRecipe(id,recipe) {
    return axios.patch(API_URL +`unlike-recipe/${id}/${recipe}`);
  }
  CommentRecipe(text,email,commenterPseudo,recipe) {
    console.log('email')
    console.log(email)
    return axios.patch(API_URL +`comment-recipe/${recipe}`, {text:text,email:email,commenterPseudo:commenterPseudo});
  }
}
export default new RecipeInteractionService();