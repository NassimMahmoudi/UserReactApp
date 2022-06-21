import axios from 'axios';
import authHeader from './auth.header'
const API_URL = 'http://localhost:3000/api/user';
class UserService {
  getUserBoard(id) {
    return axios.get(API_URL + `/home/${id}`, { headers: authHeader() });
  }
  getAllUsers() {
    return axios.get(API_URL +"/accepted");
  }
  userInfo(id) {
    return axios.get(API_URL +`/${id}`);
  }
  userHome(id) {
    return axios.get(API_URL +`/home/${id}`);
  }
  updateUser(id, data) {
    return axios.put(API_URL +`/${id}`, data);
  } 
  followUser(id, idToFollow) {
    return axios.patch(API_URL +`/follow/${id}/${idToFollow}`);
  }
  unfollowUser(id, idToFollow) {
    return axios.patch(API_URL +`/unfollow/${id}/${idToFollow}`);
  }
}
export default new UserService();