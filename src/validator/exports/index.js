const ExportNotesPlayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportsValidatior = {
    validateExportNotesPayload: (payload) => {
        const validationResult = ExportNotesPlayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = ExportsValidatior;