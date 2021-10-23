const passwordUtil = require('../utils/passwordUtil');

describe("Tesing passwordUtil's validatePassword", ()=>{
  test("tesing valid password", ()=>{
    const password = "abcd1234";
    const hash = "e6ca6e5b539ca273fd861e24130b64ac21544e95427a7177e0427841e120b04f0fd69083122b3b73d7a206ebcf79368bee6cf6668145c7e26b662cb262cb197e";
    const salt = "527d3a9c1fcb4e6279454df8112331811c62bee691e24d5bec788191f61de649"

    const result = passwordUtil.validatePassword(password, hash, salt);
    expect(result).toBe(true);
  });

  test("tesing invalid password", ()=>{
    const password = "invalid password";
    const hash = "e6ca6e5b539ca273fd861e24130b64ac21544e95427a7177e0427841e120b04f0fd69083122b3b73d7a206ebcf79368bee6cf6668145c7e26b662cb262cb197e";
    const salt = "527d3a9c1fcb4e6279454df8112331811c62bee691e24d5bec788191f61de649"

    const result = passwordUtil.validatePassword(password, hash, salt);
    expect(result).toBe(false);
  });

});

describe("Testing passwordUtil's isPasswordStrong", ()=>{
  test("testing valid passwords", ()=>{
    const validPasswords = ["abcd1234", "password1", "123456#(*7a", "veryStrongPass9!!"];
    for(validPassword of validPasswords){
      const result = passwordUtil.isPasswordStrong(validPassword);
      expect(result).toBe(true);
    }
  });

  test("testing invalid passwords", ()=>{
    const invalidPasswords = ["abcd123", "ppppppppppp", "123456#(*7", "892323222!!"];
    for(invalidPassword of invalidPasswords){
      const result = passwordUtil.isPasswordStrong(invalidPassword);
      expect(result).toBe(false);
    }
  });
});
