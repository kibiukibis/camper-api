# To start local mongoDB run in terminal
mongod --config /usr/local/etc/mongod.conf

# To start services run
brew services start mongodb/brew/mongodb-community@4.0

# run server 
npm run start

# Then run
# in mongoose.connect('mongodb://localhost/yourDB', { useNewUrlParser: true }); yourDB is your database name. 
mongo
use yourDB



