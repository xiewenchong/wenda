const getters = {
  requestLoading: state => state.app.requestLoading,
  token: state => state.user.token,
  name: state => state.user.name
};
export default getters;
