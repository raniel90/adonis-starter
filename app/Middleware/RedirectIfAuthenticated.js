'use strict'

class RedirectIfAuthenticated {
  async handle({ auth, request, response }, next) {
    try {
      await auth.check()

      return response.redirect('/')
    } catch (e) { 
      console.log('error', e);
    }
    await next()
  }
}

module.exports = RedirectIfAuthenticated
