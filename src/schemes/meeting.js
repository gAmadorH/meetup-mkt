// add one
const addOne = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'description', 'date', 'location'],
    properties: {
      name: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      description: {
        type: 'string'
      },
      date: {
        type: 'string'
      },
      location: {
        type: 'object',
        additionalProperties: false,
        required: ['country', 'state', 'city', 'street', 'number'],
        properties: {
          country: {
            type: 'string'
          },
          state: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          street: {
            type: 'string'
          },
          number: {
            type: 'string'
          },
          reference: {
            type: 'string'
          }
        }
      }
    }
  }
}

// get all
const getAll = {
  query: {
    type: 'object',
    additionalProperties: false,
    properties: {
      limit: {
        type: 'integer',
        default: 10,
        minimum: 1,
        maximum: 100
      },
      step: {
        type: 'integer',
        default: 1,
        minimum: 1
      },
      orderBy: {
        enum: [
          'id',
          'name',
          'description',
          'date',
          'location.country',
          'location.state',
          'location.city',
          'location.street',
          'location.number',
          'location.reference'
        ],
        default: 'id'
      },
      order: {
        enum: ['DESC', 'ASC'],
        default: 'DESC'
      }
    }
  }
}

// get one
const getOne = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      }
    }
  }
}

// update one
const updateOne = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      name: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      description: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      date: {
        type: 'string'
      }
    }
  }
}

// delete one
const deleteOne = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      }
    }
  }
}

module.exports = {
  addOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
}
