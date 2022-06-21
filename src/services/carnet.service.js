import axios from 'axios';
const API_URL = 'http://localhost:3000/api/carnet';
class UserCarnetService {
  getCarnet(id) {
    return axios.get(API_URL +`/get-carnet/${id}`);
  }
  addToCarnet(id,recipe) {
    return axios.patch(API_URL +`/add-to-carnet/${id}/${recipe}`);
  }
  deleteFromCarnet(id,recipe) {
    return axios.patch(API_URL +`/delete-from-carnet/${id}/${recipe}`);
  }
}
export default new UserCarnetService();