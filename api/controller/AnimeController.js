let pool = require('./../db');

const getAllAnime = (request, response) => {
    pool.query(`select * from animes inner join (
        select anime_genre.anime_id, array_agg(genrename) as arrGenreName, array_agg(anime_genre.genre_id) as arrGenreId
        from anime_genre inner join genres on anime_genre.genre_id = genres.id
    GROUP BY anime_genre.anime_id
    ORDER BY anime_genre.anime_id) as A
    on animes.id = a.anime_id`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getAnimeById = (request, response) => {
    const id = parseInt(request.body.id)
    console.log(id);
    if (id) {
        pool.query(`select * from animes inner join (
            select anime_genre.anime_id, array_agg(genrename) as arrGenreName, array_agg(anime_genre.genre_id) as arrGenreId
            from anime_genre inner join genres on anime_genre.genre_id = genres.id
        GROUP BY anime_genre.anime_id
        ORDER BY anime_genre.anime_id) as A
        on animes.id = a.anime_id
        where animes.id = $1
        `, [id], (err, results) => {
            if (err) {
                throw error;
            }
            response.status(200).json(results.rows);
        })
    } else {
        response.status(400).send('Missed id field on payload');
    }
}

const getAnimeByName = (request, response) => {
    const name = request.body.name;
    if (name) {
        pool.query(`select * from animes inner join (
            select anime_genre.anime_id, array_agg(genrename) as arrGenreName, array_agg(anime_genre.genre_id) as arrGenreId
            from anime_genre inner join genres on anime_genre.genre_id = genres.id
        GROUP BY anime_genre.anime_id
        ORDER BY anime_genre.anime_id) as A
        on animes.id = a.anime_id
        where upper(animes.title) LIKE upper('%${name}%')
        `, (err, results) => {
            if (err) {
                throw error;
            }
            response.status(200).json(results.rows);
        })
    } else {
        response.status(400).send('Missed name field on payload');
    }

}

//not test

const createAnime = (request, response) => {
    const { title, description, hype, startyear, link, genre} = request.body;
    if (title) {
        pool.query(`insert into animes (title, description, hype, startyear, link, genre) 
        select $1, $2, $3, $4, $5, $6 where not exists ( select * from animes where title = $1)`,
         [title, description, hype, startyear, link, genre], (err, results) => {
            if (err) {
                throw err;
            }
            response.status(200).send(`Create success`);
        })
    } else {
        response.status(400).send('Missed title field on payload');
    }

}

//not test
const updateAnime = (request, response) => {
    const { id, name, email } = request.body;
    if (name && email) {
        pool.query('UPDATE users SET name = $2, email = $3 WHERE id = $1', [id, name, email], (err, results) => {
            if (err) {
                throw err;
            }
            response.status(200).send('Update success');
        })
    } else {
        if (!name) {
            pool.query('UPDATE users SET email = $2 WHERE id = $1', [id, email], (err, results) => {
                if (err) {
                    throw err;
                }
                response.status(200).send('Update success');
            })
        } else {
            pool.query('UPDATE users SET name = $2 WHERE id = $1', [id, name], (err, results) => {
                if (err) {
                    throw err;
                }
                response.status(200).send('Update success');
            })
        }
    }


}

const deleteUser = (request, response) => {
    const { id } = request.body;
    pool.query('DELETE FROM users where id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        response.status(200).send('Delete success');
    })
}

module.exports = { getAllAnime, getAnimeById, getAnimeByName };