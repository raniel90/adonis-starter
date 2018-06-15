'use strict'

class AuthController {

  async login({ auth, request}) {
    const { username, password } = request.all()

    try {
      return await auth.attempt(username, password)
    } catch (e) {

      return {
        error: 'USER_NOT_FOUND'
      }
    }
  }

  async logout({ auth }) {
    return await auth.logout()
  }
}

module.exports = AuthController
