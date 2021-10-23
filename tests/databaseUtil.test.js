const databaseUtil = require('../utils/databaseUtil');

describe("Testing database' exists function: ", ()=>{
  test("Testing existing user id", ()=>{
    const existingUserId = 221477;
    const userValue = databaseUtil.exists("userId", existingUserId);
    expect(userValue).not.toBe(false);
    expect(userValue.userId).toBe(existingUserId);
  });

  test("Testing invalid user id", ()=>{
    const invalidUserId = -1;
    const userValue = databaseUtil.exists("userId", invalidUserId);
    expect(userValue).toBe(false);
  });

  test("Testing existing email", ()=>{
    const existingEmail = "email@example.com";
    const userValue = databaseUtil.exists("email", existingEmail);
    expect(userValue).not.toBe(false);
    expect(userValue.email).toBe(existingEmail);
  });

  test("Testing invalid email", ()=>{
    const invalidEmail = "invalidEmail@example.com";
    const userValue = databaseUtil.exists("email", invalidEmail);
    expect(userValue).toBe(false);
  });

  test("Testing existing username", ()=>{
    const existingUsername = "Fat Panda";
    const userValue = databaseUtil.exists("username", existingUsername);
    expect(userValue).not.toBe(false);
    expect(userValue.username).toBe(existingUsername);
  });

  test("Testing invalid username", ()=>{
    const invalidUsername = "";
    const userValue = databaseUtil.exists("email", invalidUsername);
    expect(userValue).toBe(false);
  });

  test("Testing invalid fieldType", ()=>{
    const invalidFieldType = "invalidFieldType";
    const userValue = databaseUtil.exists(invalidFieldType, "random value");
    expect(userValue).toBe(false);
  });
});
