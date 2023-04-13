const express = require('express');
const jwt = require('jsonwebtoken')
const PORT = 5000;

const app = express();

app.get('/api', (req, res) => {
  res.json({
    msg: "Nodejs and JWT"
  })
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    name: "Weizman",
    email: "weizman@gmail.com"
  }

  jwt.sign({ user }, 'secretkey', { expiresIn: '32s' }, (err, token) => {
    res.json({
      token
    })
  })
})

app.post('/api/posts', verifyToken, (req, res) => {
  //verificar si el token es valido
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        msg: "Post fue creado",
        authData
      })
    }
  })
  res.json({
    msg: "Post fue creado"
  })
})

//Authorization: Bearer <token>
function verifyToken(req, res, next) {
  let bearerHeader = req.headers['authorization']
  //verificar si el token existe
  if (typeof bearerHeader !== 'undefined') {
    bearerToken = bearerHeader.split(" ")[1]
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(404)
  }
}

app.listen(PORT, () => console.log(`Node Js app running at port ${PORT}`))