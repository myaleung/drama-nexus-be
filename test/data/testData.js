const testUserData = {
  existingUsers: [
    {
      "name": {
        "firstName": "Test",
        "lastName": "User",
      },
      "email": "some@user.com",
      "password": "Pasword777?",
      "role": "user",
      "id": "60f1b0f1b5f7b40015f6b3f1",
    },
    {
      "name": {
        "firstName": "Tess",
        "lastName": "Person",
      },
      "email": "some@person.com",
      "password": "Pasword789?",
      "role": "user",
      "id": "60f1b0f1b5f7b40015f6b3f2",
    },
  ],
  testSignUpUsers: [
    {
      "firstName": "Kyung",
      "lastName": "Bandile",
      "email": "kyung.bandile@gmail.com",
      "password": "SomePassword123!",
    },
    {
      "firstName": "Aran",
      "lastName": "Shelby",
      "email": "aran.shelby@gmail.com",
      "password": "SomePassword123!",
    },
  ],
  testLoginUser: {
    "email": "some@user.com",
    "password": "Pasword777?",
  },
  testInvalidUsers: {
    invalidEmailLoginUser: {
      "email": "invalidEmail",
      "password": "Password777?",
    },
    invalidPasswordLoginUser: {
      "email": "some@person.com",
      "password": "WrongPassword?",
    },
  },
};

export default testUserData;
