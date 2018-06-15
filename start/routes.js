'use strict'

const Route = use('Route')

Route.get('/', 'PostController.index')

// when you are not logged in
Route.group(() => {
  Route.post('login', 'AuthController.login')

  Route.post('register', 'UserController.add')
}).middleware(['guest'])

// when you are logged in
Route.group(() => {
  Route.get('logout', 'AuthController.logout')

  Route.get('posts', 'PostController.index')
  Route.post('posts', 'PostController.add')
  Route.get('posts/:id', 'PostController.edit')
  Route.get('posts/:id/delete', 'PostController.delete')
  Route.put('posts/:id', 'PostController.update')
}).middleware(['auth'])
