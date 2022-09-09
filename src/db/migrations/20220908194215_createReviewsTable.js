
exports.up = function(knex) {
  return knex.schema.createTable('reviews', table => {
    table.incrememnts('review_id');
    table.text('content');
    table.integer('score');
    table
        .foreign('critic_id')
        .reference('critic_id')
        .inTable('critics')
        .onDelete('')
  })
};

exports.down = function(knex) {
  
};
