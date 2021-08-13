function initStore(config = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    dbName: 'card_eventstore_gp',
    eventsCollectionName: 'events',
    snapshotsCollectionName: 'snapshots',
    transactionsCollectionName: 'transactions',
    timeout: 10000,
    options: {
        useNewUrlParser: true
    }
}) {
    const es = require('eventstore')(config);
    es.useEventPublisher(function(evt, callback) {
        console.log('emitting event', evt);
        callback();
    });
    // ACL - Anti Corruption Layer
    es.close = function() {
        es.store.db && es.store.db.close();
    };
    return new Promise(function(resolve, reject) {
        es.init(function (err) {
            if(err) reject(err);
            resolve(es);
        });
    });
}

module.exports = initStore;