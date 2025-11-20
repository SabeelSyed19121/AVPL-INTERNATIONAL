const db = require('./models');

db.run("UPDATE users SET role='admin' WHERE id=1", function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('User 1 promoted to admin');
  }
});
