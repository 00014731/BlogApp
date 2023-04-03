
const express = require('express');
const app = express();
const fs = require('fs');
const port = 8000;

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(express.json());

const posts = [
  { id: 1, title: 'First post', content: 'This is my first post.' },
  { id: 2, title: 'Second post', content: 'This is my second post.' },
  { id: 3, title: 'Third post', content: 'This is my third post.' }
];

app.get('/', (req, res) => {
  res.render('home', { posts: posts });
});

app.post('/create-post', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const timestamp = new Date().getTime();
    const filename = `posts/post-${timestamp}.md`;
    const data = `# ${title}\n\n${content}`;
    fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log(`New post saved to ${filename}`);
        res.redirect('/');
    });
});

app.get('/posts', (req, res) => {
    fs.readdir('posts', (err, files) => {
        if (err) throw err;
        const posts = [];
        files.forEach((file) => {
            const filepath = `posts/${file}`;
            const data = fs.readFileSync(filepath, 'utf-8');
            const lines = data.split('\n');
            const title = lines[0].replace('# ', '');
            const content = lines.slice(2).join('\n');
            const id = file.replace('post-', '').replace('.md', '');
            const post = { id, title, content };
            posts.push(post);
        });
        res.render('posts', { posts });
    });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const filename = `posts/post-${id}.md`;
    const data = fs.readFileSync(filename, 'utf-8');
    const lines = data.split('\n');
    const title = lines[0].replace('# ', '');
    const content = lines.slice(2).join('\n');
    const post = { id, title, content };
    res.render('edit', { post });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
