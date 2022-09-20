const knex = require('../../db/connection');
const mapProperties = require('../../utils/map-properties');

const addCritic = mapProperties({
    // critic_id: 'critic.critic_id',
    preferred_name: 'critic.preferred_name',
    surname: 'critic.surname',
    organization_name: 'critic.organization_name',
    // created_at: 'critic.created_at',
    // updated_at: 'critic.updated_at'
})

// function read(reviewId) {
//     return knex('reviews as r')
//         .join('critics as c', 'r.critic_id', 'c.critic_id')
//         .select('r.*', 'c.*')
//         .where({ review_id: reviewId })
//         .first()
//         .then(data => data.map(addCritic))
// }

// function update(updatedReview, reviewId) {
//     console.log(updatedReview)
//     return knex('reviews')
//         .select()
//         .where({ review_id: reviewId })
//         .update(updatedReview, '*');
// } 


// 
// const addCritic = mapProperties({
//     preferred_name: "critic.preferred_name",
//     surname: "critic.surname",
//     organization_name: "critic.organization_name"
// });

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
    return knex("reviews as r")
        .select("*")
        .where({ review_id: updatedReview.review_id }) 
        .update(updatedReview, "*")
}
  
function updateCritic(reviewId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: reviewId })
        .then(data => data.map(addCritic))
}


function destroy(reviewId) {
    return knex('reviews')
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    read,
    update,
    updateCritic,
    destroy,
}