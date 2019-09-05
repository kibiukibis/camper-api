const Order = require('./orderModel');
const _ = require('lodash');

exports.params = function(req, res, next, id) {
    Order.findById(id)
        .then(function(order) {
            if (!post) {
                next(new Error('No order with that id'));
            } else {
                req.order = order;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    Order.find({})
        .then(function(orders) {
            res.json(orders);
        }, function(err) {
            next(err);
        })
};

exports.getOne = function(req, res, next) {
    const order = req.order;
    res.json(order);
};

exports.put = function(req, res, next) {
    const order = req.order;

    const update = req.order;

    _.merge(order, update);

    order.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    const newOrder = req.body;

    Order.create(newOrder)
        .then(function(order) {
            res.json(order);
        }, function(err) {
            next(err);
        })
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    })
};


