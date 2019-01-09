const jwt = require('jsonwebtoken');

function set(user) {
  return new Promise((resolve, error) => {
    const token = jwt.sign({ user: user.userName }, 'HypertubeSecretKey', { expiresIn: '1d' });
    resolve(token);
  })
}

function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'HypertubeSecretKey', function (err, decoded) {
      if (err) { reject('token.invalidToken') }
      else {
        // Rajouter ici le controle du blacklistage ip et renvoyer le resolve si pas blackliste
      /*  BlackListManager.get(token).then(getResult => {
          console.log(getResult)
        })*/
        resolve(decoded)
      }
    })
  })
}

module.exports.decode = decode;
module.exports.set = set;
