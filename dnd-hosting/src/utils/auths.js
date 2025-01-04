import { getUser, addUser, saveCharactersForUser, getCharactersForUser } from "./database.js";

let loggedInUser = null;

export const signup = (username, password) => {
  if (getUser(username)) return false;
  addUser({ username, password, characters: [] });
  return true;
};

export const login = (username, password) => {
  const user = getUser(username);
  if (user && user.password === password) {
    loggedInUser = user;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    return true;
  }
  return false;
};

export const logout = () => {
  loggedInUser = null;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getLoggedInUser = () => {
  if (!loggedInUser) {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      loggedInUser = getUser(username);
    }
  }
  return loggedInUser;
};

export const saveCharacters = (characters) => {
  if (loggedInUser) {
    saveCharactersForUser(loggedInUser.username, characters);
  }
};

export const getCharacters = () => {
  if (loggedInUser) {
    return getCharactersForUser(loggedInUser.username) || [];
  }
  return [];
};
