const database = {
    users: [
      {
        username: "admin",
        password: "adam123",
        characters: [],
      },
    ],
  };
  
  export const saveDatabase = () => {
    localStorage.setItem("database", JSON.stringify(database));
  };
  
  export const loadDatabase = () => {
    const db = JSON.parse(localStorage.getItem("database"));
    if (db) {
      Object.assign(database, db);
    }
  };
  
  loadDatabase();
  
  export const getUser = (username) => {
    return database.users.find((user) => user.username === username);
  };
  
  export const addUser = (newUser) => {
    database.users.push(newUser);
    saveDatabase();
  };
  
  export const saveCharactersForUser = (username, characters) => {
    const user = getUser(username);
    if (user) {
      user.characters = characters;
      saveDatabase();
    }
  };
  
  export const getCharactersForUser = (username) => {
    const user = getUser(username);
    return user ? user.characters : [];
  };
  