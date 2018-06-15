'use strict'

const Post = use('App/Models/Post')
const GenericController = use('App/Controllers/Http/GenericController')

class PostController {

  async index() {
    try {
      return await Post.all()
    } catch (e) {
      return {
        error: 'ERROR_LIST_ALL',
        detail: JSON.stringify(e)
      }
    }
  }

  async add({ request }) {
    const fields = ['title', 'body']
    const validate = {
      title: 'required',
      body: 'required',
    }
    const options = {
      request: request,
      fields: fields,
      validate: validate,
      instance: Post
    }

    return await GenericController.add(options)
  }

  async edit({ params }) {
    try {
      return await Post.findOrFail(params.id)
    } catch (e) {
      return {
        error: 'ERROR_ON_EDIT',
        detail: JSON.stringify(e)
      }
    }
  }

  async update({ params, request, response }) {
    const fields = ['title', 'body']
    const validate = {
      title: 'required',
      body: 'required',
    }
    const options = {
      fields,
      validate,
      instance: Post
    }

    return await GenericController.update({ params, request, response }, options)
  }

  async delete({ params }) {
    return await GenericController.delete(params, Post)
  }
}

module.exports = PostController