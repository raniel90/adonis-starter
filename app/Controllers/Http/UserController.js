'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  async add ({ session, request, response }) {
    const data = request.only(['username', 'email', 'password', 'password_confirmation'])
   
    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })
   
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    delete data.password_confirmation
  
    return await User.create(data)
  }
}

module.exports = UserController
