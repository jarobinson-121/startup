# Conspiratorium

## Specification Deliverable

### Elevator Pitch

There is something so utterly fascinating about the idea that the general public doesn't know something, or that there's some force at play that's hidden beneath the surface. This application is a fun approach to scratching the conspiracy itch, without creating unsafe environments of misinformation online. The site allows you to generate conspiracy theories using chat GPT and some input from the user, and save your favorites to remember and share them with your friends.

### Design
![Home Screen Design Image](/Images/Design%20Screenshots/Home_Screen.png)
![Generated Theory Screen Design Image](/Images/Design%20Screenshots/New_Theory.png)
![Saved Theories Screen Design Image](/Images/Design%20Screenshots/Saved_Theories.png)
![Sign In Screen Design Image](/Images/Design%20Screenshots/Sign-in.png)

### Key Features

* Secure Login
* Ability to add themes for the generated theory
* Ability to save theories
* Ability to delete theories
* Ability to generate new themes
* Ability to see other recently generated themes on the home page

### Technologies

I will use the required technologies and services in this way: 

**HTML - ** Structure of the application. It has 3 pages, the Landing/Home page, the Results page, and the Saved page. 

**CSS - ** Add style and color to the application, while making it more responsive to different screens. It should implement good whitespace and accessibility.

** React - ** Provides login, display saved theories, and handles routing and components.

** Service - ** Backend services with endpoints for: 
* login
* generating theories
* storing theories
* retrieving theories
 
** DB/Login - ** Store users and theories in database. Regist and login users. Credentials stored in the database, and theories can't be saved without authentication.

** Websocket - ** Recently generated theories displayed on the Landing page.
