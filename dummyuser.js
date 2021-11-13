const c_users = [];

function join_User(message) {
  const p_user = { ...message };
  c_users.push(p_user);
  console.log("user out", c_users);
  return p_user;
}

function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.myId === id);
  console.log("c_user disconnect",c_users)
  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
};