export default class User {
    constructor(
      userId,
      firstName,
      lastName,
      email,
      password,
      role,
      token
    ) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.role = role;
      this.token = token;
    }
  }
  