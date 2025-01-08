import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'restaurantinfodb'
  }
});

export {db};


function testConnection() {
  db.raw('SELECT 1')
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Error connecting to database:', error));
}
testConnection();


// Function to insert a swipe interaction
async function insertSwipeInteraction(userId, restaurantId, swipeDirection) {
  try {
    await db('user_interactions').insert({
      user_id: userId,
      restaurant_id: restaurantId,
      swipe_direction: swipeDirection
    });
    console.log('Swipe interaction inserted successfully');
  } catch (error) {
    console.error('Error inserting swipe interaction:', error);
  }
};

export { insertSwipeInteraction };

//test the inserstion of swipe interaction here
//insertSwipeInteraction(1, 1, 'right');
