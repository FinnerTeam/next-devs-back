# Next-devs server-client

Next-devs server-client show a nice JWT-server-client-auth with integration to existing react app

## Personal notes-Front

- Because of the integration to an existing react app I was having trouble implementing typescript and making the toast messaging system work properly.
- I use more than one way to solve problems like async requests (redux-thunk/HTTP custom hook) to show several skill sets.
- I was trying to deploy react app with AWS amplify but some of the config files were failing during the build and I didn't have much more time so I skipped it at the end.

## Personal notes-Back

- The JWT auth and the other request are in 1 server in this assignment but if I had more time it should be implemented with separation of concerns with 1 server only to auth like JWT and others and one for data API requests, In addition, the refresh token would be saving in Redis instead of MongoDB for performance issues.
- I was trying to implement also to add refresh token method with JWT but couldn't finish because of lack of time(the partial work I done is the main branch)
- I deployed the server with Heroku.
