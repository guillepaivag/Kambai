const admin = require('../../firebase-service')    

milliseconds_a_timestamp = ( milliseconds ) => {
    if ( !milliseconds ) {
        return null
    }

    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
} 

module.exports = milliseconds_a_timestamp