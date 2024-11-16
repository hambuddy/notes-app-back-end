const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');


class AuthenticationsService {

    constructor() {
        this._pool = new Pool();
    }

    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO auths VALUES( $1 )',
            values: [token],
        };

        await this._pool.query(query);

        
    }

    async verifyRefreshToken(token) {
        const qurey = {
            text: 'SELECT token FROM auths WHERE token = $1',
            values: [token],
        };

        const result = await this._pool.query(qurey);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak valid');
        }
    }

    async deleteRefreshToken(token) {
        const query = {
            text: 'DELETE FROM auths WHERE token = $1',
            values: [token],
        };

        await this._pool.query(query);
    }
}

module.exports = AuthenticationsService;