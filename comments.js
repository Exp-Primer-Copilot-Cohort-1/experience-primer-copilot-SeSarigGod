// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4001;
const router = express.Router();
const comments = require('./data/comments');
const products = require('./data/products');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.get('/comments', (req, res) => {
    res.send(comments);
});

router.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment._id === id);
    res.send(comment);
});

router.get('/products', (req, res) => {
    res.send(products);
});

router.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product._id === id);
    res.send(product);
});

router.get('/products/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product._id === id);
    const productComments = comments.filter(comment => comment.productId === id);
    res.send(productComments);
});

router.post('/products/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const newComment = req.body;
    newComment._id = comments.length + 1;
    newComment.productId = id;
    comments.push(newComment);
    res.send(newComment);
});

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`);
});