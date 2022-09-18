const { where } = require('../../db/connection');
const knex = require('../../db/connection');

function getReview(reviewId) {
    return knex('reviews')
        .select()
        .where({ review_id: reviewId })
        .first();
}
//Need to adjust service file to nest critic data
function update(updatedReview, reviewId) {
    return knex('reviews')
        .select()
        .where({ review_id: reviewId })
        .update(updatedReview, '*');
} 

module.exports = {
    getReview,
    update,
}