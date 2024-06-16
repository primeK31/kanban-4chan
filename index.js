import express from 'express'
import fetchPost from './scraper.js';
import cron from 'node-cron';

const app = express()
const URL = 'https://boards.4chan.org/a/'

let parsedPosts = [];
let fetchTime = new Date().toLocaleString();

const fetchData = async () => {
    fetchPost(URL).then(posts => {
        fetchTime = new Date().toLocaleString();;
        parsedPosts = posts;
    });
    res.send("Fetching posts...")
}

cron.schedule('0 */1 * * *', fetchData);

const PORT = 3000;    
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    fetchPost(URL).then(posts => {
        fetchTime = new Date().toLocaleString();;
        parsedPosts = posts;
    });
    res.send("Fetching posts...")
});


app.get('/fetchtime', (req, res) => {
    res.send("Last fetch time: " + fetchTime + "\n")
});

app.get('/posts', (req, res) => {
    res.send(parsedPosts);
});

