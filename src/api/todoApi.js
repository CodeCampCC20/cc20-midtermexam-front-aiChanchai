import axios from "axios";

const todoApi = {};

const BASEURL =
  "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com";

todoApi.createTodo = (input) => {
  return axios.post(`${BASEURL}/api/V1/todos`, input);
};

todoApi.getAllTodoByUserID = (userId) => {
  console.log("id", userId);
  console.log("FULL URL", `${BASEURL}/posts/${userId}`);
  return axios.get(`${BASEURL}/api/V1/todos/${userId}`);
};

todoApi.deleteTodo = (id, userId) => {
  return axios.delete(`${BASEURL}/api/V1/todos/${id}/${userId}`);
};

todoApi.updateTodo = (id, input, userId) => {
  console.log("input", input);
  console.log("userId", userId);
  console.log("BASEURL", BASEURL);
  console.log("FULL URL", `${BASEURL}/posts/${userId}`);
  return axios.patch(`${BASEURL}/api/V1/todos/${id}/${userId}`, input);
};

export default todoApi;
