let pool = require('./../db');

const getAllUser = (request, response) =>{
    pool.query('SELECT id, name, email  FROM users ORDER BY id ASC', (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) =>{
    const id = parseInt(request.params.id)
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) =>{
        if(err){
            throw error;
        }
        response.status(200).json(results.rows);
    } )
}

const getUserByName = (request, response) =>{
    const username = request.body.name;
    pool.query(`SELECT * FROM users WHERE name LIKE '%${username}%'`, (err, results) =>{
        if(err){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const createUser = (request, response) =>{
    const {name, email} = request.body;
    pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email], (err, results)=>{
        if(err){
            throw err;
        }
        response.status(201).send(`Create success`);
    })
}

const updateUser = (request, response) =>{
    const {id, name, email} = request.body;
    if(name && email){
        pool.query('UPDATE users SET name = $2, email = $3 WHERE id = $1', [id, name, email], (err, results) =>{
            if(err){
                throw err;
            }
            response.status(200).send('Update success');
        })
    } else {
        if(!name){
            pool.query('UPDATE users SET email = $2 WHERE id = $1', [id, email], (err, results) =>{
                if(err){
                    throw err;
                }
                response.status(200).send('Update success');
            })
        } else {
            pool.query('UPDATE users SET name = $2 WHERE id = $1', [id, name], (err, results) =>{
                if(err){
                    throw err;
                }
                response.status(200).send('Update success');
            })
        }
    }
    
   
}

const deleteUser = (request, response) =>{
    const {id} = request.body;
    pool.query('DELETE FROM users where id = $1', [id], (err, results) =>{
        if(err){
            throw err;
        }
        response.status(200).send('Delete success');
    })
}

module.exports = { getAllUser, getUserById, getUserByName, createUser, deleteUser, updateUser};