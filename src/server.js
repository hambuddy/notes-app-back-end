require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');
//notes
const notes = require('./api/notes');
const NotesValidator = require('./validator/notes');
const NotesService = require('./services/postgres/NotesService');
//users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');
//authentication
const authentication = require('./api/auths');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/auths');
const AuthenticationService = require('./services/postgres/AuthsService');


const init = async () => {
    const notesService = new NotesService();
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
            origin: ["*"],
            },
        },
    });

    await server.register([
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: authentication,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
    ]);

    server.ext("onPreResponse", (request, h) => {
        const { response } = request;
        
        if (response instanceof ClientError) {
            const newResponse = h.response({
            status: "fail",
            message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }
        return h.continue;
    });
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();