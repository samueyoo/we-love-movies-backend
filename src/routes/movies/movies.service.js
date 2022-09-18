const knex = require('../../db/connection');
const mapProperties = require('../../utils/map-properties');
const reduceProperties = require('../../utils/reduce-properties');

function list() {
    return knex('movies')
        .select('movie_id as id', 
            'title', 
            'runtime_in_minutes', 
            'rating', 
            'description', 
            'image_url');
}

function listIsShowing() {
    return knex('movies as m')
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .distinct('m.movie_id as id', 
            'm.title', 
            'm.runtime_in_minutes', 
            'm.rating', 
            'm.description', 
            'm.image_url')
        .where('mt.is_showing', '=', '1')
        .orderBy('m.movie_id');
}

function read(movieId) {
    return knex('movies')
        .select('created_at',
            'movie_id',
            'title',
            'runtime_in_minutes',
            'rating',
            'description',
            'image_url',
            'updated_at')
        .where('movie_id', '=', `${movieId}`)
        .first();
}

function theaters(movieId) {
    return knex('theaters as t')
        .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
        .select('t.theater_id',
            't.name',
            't.address_line_1',
            't.address_line_2',
            't.city',
            't.state',
            't.zip',
            't.created_at',
            't.updated_at',
            'mt.is_showing',
            'mt.movie_id')
        .where('mt.movie_id', '=', `${movieId}`);
}

//Legacy: once map-properties until function works, mapping within reviews()
// const addCritic = mapProperties({
//     critic_id: 'critics.critic_id',
//     preferred_name: 'preferred_name',
//     surname: 'critics.surname',
//     organization_name: 'critics.organization_name',
//     created_at: 'critics.created_at',
//     updated_at: 'critics.updated_at',
// });

async function reviews(movieId) { //Returning each matching result as object properties?
    const data = await knex('reviews as r')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .where('r.movie_id', '=', `${movieId}`)
        .select('r.review_id',
        'r.content',
        'r.score',
        'r.created_at',
        'r.updated_at',
        'r.critic_id',
        'r.movie_id',
        'c.critic_id',
        'c.preferred_name',
        'c.surname',
        'c.organization_name',
        'c.created_at',
        'c.updated_at',
        )

    const mapped = await data.map(review => {
        const { review_id, content, score, created_at, updated_at, critic_id, movie_id, preferred_name, surname, organization_name } = review
        return {
            review_id: review_id,
            content: content,
            score: score,
            created_at: created_at,
            updated_at: updated_at,
            critic_id: critic_id,
            movie_id: movie_id,
            critic: {
                critic_id,
                preferred_name,
                surname,
                organization_name,
                created_at,
                updated_at
            }
        }
    });

    return mapped;
}

module.exports = {
    list,
    listIsShowing,
    read,
    theaters,
    reviews,
}