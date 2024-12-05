# Conspiratorium

## Specification Deliverable

### Elevator Pitch

There is something so utterly fascinating about the idea that the general public doesn't know something, or that there's some force at play that's hidden beneath the surface. This application is a fun approach to scratching the conspiracy itch, without creating unsafe environments of misinformation online. The site allows you to generate conspiracy theories using chat GPT and some input from the user, and save your favorites to remember and share them with your friends.

### Design
![Home Screen Design Image](/Images/Design%20Screenshots/Home_Screen.png)
![Generated Theory Screen Design Image](/Images/Design%20Screenshots/New_Theory.png)
![Saved Theories Screen Design Image](/Images/Design%20Screenshots/Saved_Theories.png)
![Sign In Screen Design Image](/Images/Design%20Screenshots/Sign_in.png)

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


## HTML Deliverable

For this deliverable I built out the structure of my application in HTML.

* HTML Pages - Four HTML pages for landing, sign in, the generated conspiracies, and saved conspiracies.
* Links - There are links in the navigation bar at the top to navigate between pages. 
* Text - The generated theories are represented with filler text on the pages.
* Images - I didn't have any images to add, really, but I added an icon to the nav.
* DB/Login - Input boxes and button to login were added to the sign in page.
* Websocket - Recently generated theories are displayed on the home page. 

## CSS Deliverable

For this deliverable I added CSS styling to the pages so they will appear as designed.

* Header, Footer, and Main Content Body
* Navigation Elements - Link styling and navbar styling was updated using Bootstrap and CSS. 
* Responsive Sizing - The content resizes with the window. 
* Elements - Good whitespace, object placement, and colors used.
* Text - Consistent fonts imported.
* Images - Bonus image added behind page content. 

## React Deliverable

For this deliverable I shifted the code to use Javascript and React components, as well as using local storage in place of a database.

* Components - Login, Generator, and My Files are components  with mocks for login and Service
    * Login - Login saves username, and unlocks My Files and Generator
    * My Files - Shows saved theories from local storage
    * Generator - allows them to enter a prompt and shows placeholder theory (will be generated using API in service)
* Router - Routing between login and voting components.
