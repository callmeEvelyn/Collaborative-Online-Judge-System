# Collaborative-Online-Judge-System

### Steps to run the application

* You can simply run:

````
sh runner.sh
````

* Or

1. under your dir :

````
npm install
````

2. under dir/oj-client:

````
ng build --watch
````
3. under dir/oj-server:

```
nodemon server.js
```

Then you can check http://localhost:3000 to see the collaborative online judge website.

#### Tips

* For mongodb connection, please replace the url in oj-server/server.js

* For Login, I used auth0 for authorilariztion in auth.service in oj-client. You may need to go to https://auth0.com to get your own information.
