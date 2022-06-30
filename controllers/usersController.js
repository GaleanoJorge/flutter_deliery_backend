const User = require('../models/user');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarions: ${data}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    }
};