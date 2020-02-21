// add one
const addOne = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 10,
        maxLength: 50
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
        enum: ['id', 'name'],
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
      }
    }
  }
}

// enroll one in an event
const enrollOne = {
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
      meetingIds: {
        type: 'array',
        minItems: 1,
        uniqueItems: true,
        items: {
          type: 'integer',
          minimum: 1
        }
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
  enrollOne,
  deleteOne
}
