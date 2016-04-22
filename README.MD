Start the application by entering the following commands:
1) npm install (this will take some time)
2) At the end of the process, "gulp build", should run automatically. If it doesn't, please run the command, "gulp build".
3) npm start (start the Node server)

Tech stack:
Mongoose, Express, Angular, and Node

APIs:
Fusion Table, Google Maps, Google Place, and Google Maps Distance Matrix.

Notes:



I had a lot of fun building this application as I wanted to emulate some of things that we discussed during our interview.
I remember Webber mentioning that one of the future goals for the company was to develop a messanger application.
That was the first thing that came to mind when I was given this coding challenge.
Not only did I have fun building this application, I also wanted to make certain that I was learning something new from this experience.
The two concepts that I focused on were: Modularity and Scalability

I have also implemented some new design patterns and coding styles that I have not done beforehand.
For each technology, I have some brief notes as to what I did.

Future features:
Real-time geolocation for messengers
Pending, En Route, Completed orders
Browserify to further modularize my front end code by module.export certain functionality

// Angular 
I decided to pass functions into module methods rather than assign as a callback.
This aids with readability and reduces the volume of code "wrapped" inside the Angular framework.
I wanted to make more use of IIFE scoping to avoid polluting the global scope.

This was the first time I used controllerAs syntax with Angular. Controllers are classes
In the DOM we get a variable per controller, which aids nested controller methods, avoiding any $parent calls
The controllerAs syntax uses 'this' inside controllers, which gets bound to $scope

