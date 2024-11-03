/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */

const path = require('path');
const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNotesByIdHandler, deleteNotesByIdHandler } = require('./handler');

const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: addNoteHandler,
      options: { 
        cors: {
            origin: ['*'],
        },
      },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesByIdHandler,
    }
];

module.exports = routes;
