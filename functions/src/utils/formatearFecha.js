const admin = require('../../firebase-service')    

const milliseconds_a_timestamp = ( milliseconds = Date.now() ) => {
    if ( !milliseconds ) {
        return null
    }

    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
} 

module.exports = milliseconds_a_timestamp