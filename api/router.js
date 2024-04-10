module.exports = function (app) {
    let userCtrl = require('./controller/UserController');
    let animeCtrl = require('./controller/AnimeController');
    app.get('/users', userCtrl.getAllUser);
    app.get('/users/:id', userCtrl.getUserById);
    app.post('/users/getByName', userCtrl.getUserByName);
    app.post('/users/create', userCtrl.createUser);
    app.delete('/users/delete', userCtrl.deleteUser);
    app.put('/users/update', userCtrl.updateUser);

    app.get('/animes', animeCtrl.getAllAnime);
    app.post('/animes/getById', animeCtrl.getAnimeById);
    app.post('/animes/getByName', animeCtrl.getAnimeByName);
}