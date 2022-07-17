const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    // TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', UsersController.findById);

    // GUARDAR DATOS
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    
    // ACTUALIZAR DATOS
    app.put('/api/users/update', upload.array('image', 1), UsersController.update);
}