// const jwt = require('jsonwebtoken');

// module.exports = function auth(req, res, next) {
//     let token = req.header("Authorization");
//     if (token && token.startsWith('Bearer ')) {
//         // Remove Bearer from string
//         token = token.slice(7, token.length);
        
//     }
//     if (!token) res.status(401).send('Access Denied');

//     try {
//         // res.send(token);
//         // return;
//         // jwt.verify()
//         const decoded = jwt.verify(
//             token, 
//             process.env.SECRET,
//             { algorithms: ['HS512'] }  // Correct: pass 'HS512' as an array
//           );
          
//         req.user = decoded;
//         console.log("decoded",decoded);
//         // console.log("Printni date",decoded);
//         // return;
//         next();
//     } catch (e) {
//          res.status(400).send('Invalid token');
//     }
// }

const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    let token = req.header("Authorization");
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET, { algorithms: ['HS512'] });
        req.user = decoded;
        console.log("Decoded Token:", decoded);
        next();
    } catch (e) {
        console.error('JWT verification failed:', e);
        res.status(400).send('Invalid token');
    }
};
