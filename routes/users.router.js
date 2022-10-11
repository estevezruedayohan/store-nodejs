const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  if(userId){
    res.json({
      userId: userId,
      name: 'JHON DOE'
    });
  }else{
    res.send('Debe especificar un usuario');
  }
});

module.exports = router;
