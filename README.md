
## FAVS_API FILE
This project was created with MVC model, in __CONTROLLERS__ file you can find the logic about the __LOGIN__, the __CRUD__ about __LIST__, the __CRUD__ about __USER__. In __DATABASE__ file you can find the logic about the connection with mongoose. In __HELPERS__ you can find logic about validations that are used in many parts of the code. In __MIDDLEWARES__ file you can find our own middlewares. In __MODELS__ file you can find the models from our database and model from our Server. In __ROUTES__ file you can find the all routes about our project.
***
## ENDPOINTS
You have to know this concepts
1. __BASE_URL:__ _http://localhost:8080/api_
2. __ID_LIST:__ _this is the unique id of a list in Mongo_
3. __ID_USER:__ _this is the unique id of a user in Mongo_

To Login, the route is: __BASE_URL/auth/login__ the method for this route is POST and you have to send a body, similar like this:
```
{
    "correo": "correo_value",
    "password": "password_value"
}
```
When you log-in you receive a token that is like a permission to execute other routes, so you have to save this token.

To create a User and save the information in Mongo, the route is: __BASE_URL/usuario/crearUsuario__ the method for this route is POST and you have yo send a body, similar like this:
```
{
    "nombre": "nombre_value",
    "apellido": "appelido_value",
    "correo": "correo_value",
    "password": "password_value"
}
```

To edit a User and save the information in Mongo, the route is: __BASE_URL/usuario/editarUsuario/ID_USER__ the method for this route is PUT, _you can change nombre, apellido and password_, and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__, after that you have to send a body similar like this:
```
{
    "nombre": "nombre_value", //OPTIONAL
    "apellido": "appelido_value", //OPTIONAL
    "password": "password_value" //OPTIONAL
}
```

To get all users that are registered in Mongo, the route is: __BASE_URL/usuario/obtenerUsuarios__ the method for this route is GET

To delete a user, the route is: __BASE_URL/usuario/eliminarUsuario/ID_USER__ the method is DELELETE and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__

To create a fav list, the route is: __BASE_URL/favs__ the method is POST and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__ to know who created the fav list, after that you have to send a body similar like this: 
```
{
    "title": "title_value",
    "description": "description_value",
    "link": "link_value"
}
```

To get all favs lists, the route is: __BASE_URL/favs__ the method is GET and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__

To get a fav list with ID, the route is: __BASE_URL/favs/ID_LIST__ the method is GET and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__

To delete a fav list with ID, the route is: __BASE_URL/favs/ID_LIST__ the method is DELETE and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__

To get all list of a User, the route is: __BASE_URL/favs/listasPorUsuario/ID_USER__ the method is GET and you have to send the token in HEADERS - AUTHORIZATION that you receive in __LOGIN__
