#### Creator - Meer Piyush Shah

#### Development Tools and Packages:
* Editor - [Atom](https://atom.io/)
* Browser - [Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Node.js](https://nodejs.org/en/) Packages:
  * [Express.js](https://expressjs.com/)
  * [Passport.js](https://www.passportjs.org/)
  * For an exhaustive list, refer the package.json file.

#### Project ER Diagram:
![ERD]('database/ER Diagram.svg');

#### Reference and Tutorials:
* Node and Express - [FreeCodeCamp](https://www.youtube.com/watch?v=Oe421EPjeBE)
* Passport.js - [FreeCodeCamp](https://www.youtube.com/watch?v=F-sFp_AvHc8)
* FrontEnd Reference - [MDN](https://developer.mozilla.org/en-US/docs/Learn)

#### Credits:
* FrontEnd Template - [HTML5 Up](https://html5up.net/story)
* Homepage Video - [BBC Earth](https://www.bbcearth.com/shows/serengeti-ii)
* Logo - [Tree Favicon](https://www.favicon.cc/?action=icon&file_id=795443)
* Title Font - [Twiggy](https://www.dafont.com/twiggy.font)
* Icons - [FlatIcon](https://www.flaticon.com/authors/kiranshastry)

#### Unit Testing Strategy and Explanation:

In the current assignment, most of the JavaScript files are routing and config files. <br/>
To help with maintainability and adopt better code practices, the main functionality, i.e. almost all the verification logic, is written in the utils file.
These are the files (for now) that need to be tested.<br/>

databaseUtil.js contains all the logic for interacting with the users.json file, that is temporarily acting as the DB.<br/>
The first function of this file is exists which checks if a certain value already exists in the DB.<br/>
It takes two parameters, fieldType and it's value.<br/>
To tests need to cover valid and invalid values for both these parameters.<br/>
So, for each fieldType, a valid and invalid value is tested.<br/>
Finally, an invalid fieldType is also tested.<br/>
This function also returns a user object, if the user does exist. This functionality is also tested.<br/>
This file also contains addUser method, which appends the user to a file and does not return anything, hence has to be tested manually.<br/>

passportUtil.js contains code to check passwords.<br/>
Contains 3 methods.<br/>
hashPassword cannot be tested, because a random salt is generated each time and output cannot be predicted.<br/>
validatePassword checks the entered password.<br/>
This function is tested by entering a valid combination, an invalid password and an invalid hash.<br/>
isPasswordStrong is also tested by providing a few strong and a few weak passwords.<br/>
