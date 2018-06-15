'use strict'

const { validateAll } = use('Validator')

class GenericController {

    static async add(options) {
        const data = options.request.only(options.fields)

        try {
            let status = await this.validate(data, options.validate)

            if (status && status.error) {
                return status;
            }
        } catch (e) {
            return {
                error: 'ERROR_ON_VALIDATE_CREATE',
                detail: JSON.stringify(e)
            }
        }

        try {
            await options.instance.create(data)
        } catch (e) {
            return {
                error: 'ERROR_ON_CREATE_ROW',
                detail: JSON.stringify(e)
            }
        }

        return {
            success: 'RECORD_CREATED'
        }
    }

    static async update(options) {
        let dataFinded
        const data = options.request.only(options.fields)

        await this.validate(data, options.validate)

        try {
            dataFinded = await options.instance.findOrFail(options.params.id)
            dataFinded.merge(data)
        } catch (e) {
            return {
                error: 'ERROR_ON_FIND_ROW_TO_UPDATE',
                detail: JSON.stringify(e)
            }
        }

        try {
            await dataFinded.save()
        } catch (e) {
            return {
                error: 'ERROR_ON_UPDATE',
                detail: JSON.stringify(e)
            }
        }

        return {
            success: 'RECORD_UPDATED'
        }
    }

    static async delete(params, instance) {
        let objDelete;

        try {
            objDelete = await instance.findOrFail(params.id)
        } catch (e) {
            return {
                error: 'RECORD_NOT_FOUND'
            };
        }

        try {
            await objDelete.delete()

            return {
                success: 'RECORD_DELETED'
            };
        } catch (e) {
            return {
                error: 'ERROR_ON_DELETE',
                detail: JSON.stringify(e)
            };
        }
    }

    static async validate(data, validateFields) {
        let validation;
        let status;

        if (validateFields) {
            validation = await validateAll(data, validateFields)
        }

        if (validation && validation.fails()) {
            status = {
                error: validation.messages()
            };
        }

        return status;
    }
}

module.exports = GenericController