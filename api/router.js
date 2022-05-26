module.exports = function(app){
    let userCtrl = require('./controller/UserController');
    app.get('/users', userCtrl.getAllUser);
    app.get('/users/:id', userCtrl.getUserById);
    app.post('/users/getByName', userCtrl.getUserByName);
    app.post('/users/create', userCtrl.createUser);
    app.delete('/users/delete', userCtrl.deleteUser);
    app.put('/users/update', userCtrl.updateUser);
}