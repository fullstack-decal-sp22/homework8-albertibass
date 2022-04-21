const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require('../model/User');





router.get('/list', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error in Fetching shopping list' });
    }
  });

router.post('/add', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.shoppinglist.push(req.body.item);
        user.shoppinglist = list;
        await user.save();
        res.send(user.shoppinglist);
    } catch (e) {
        res.send({ message: 'Error in adding item to shopping list'});
    }
});

router.delete('/delete', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const index = user.shoppinglist.indexOf(req.body.item);
        if (index > -1) {
            user.shoppinglist.splice(index, 1);
        }
        await user.save();
        res.send(user.shoppinglist);
    } catch (e) {
        res.send({ message: 'Error in deleting from shopping list'});
    }
});


module.exports = router;