import axios from 'axios';
import cheerio from 'cheerio';


async function fetchPost(URL) {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const posts = [];

        $('.post.op').each((index, element) => {
            const author = $(element).find('.name').text().trim(); 
            const content = $(element).find('.postMessage').text().trim();
            const publishTime = $(element).find('.dateTime').text().trim();
            const image = $(element).find('.fileText').text().trim();
            posts.push({author, publishTime, content, image})
        });

        return posts;
    } catch (error) {
        console.error('Fetching error:', error);
        return [];
    }
}


export default fetchPost;