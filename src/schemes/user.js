// add one
const addOne = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['firstName', 'lastName', 'username', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      lastName: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      username: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      email: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      password: {
        type: 'string',
        minLength: 10,
        maxLength: 100
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
        enum: ['id', 'firstName', 'lastName', 'username', 'email', 'password'],
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
      firstName: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      lastName: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      username: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      password: {
        type: 'string',
        minLength: 10,
        maxLength: 100
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

// unenroll one in an event
const unenrollOne = {
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
  unenrollOne,
  deleteOne
}
