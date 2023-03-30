const express = require('express');
const { Octokit } = require('@octokit/rest');

const app = express();

const octokit = new Octokit({
  auth : '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'
});
app.get('/',(req,res)=>res.send('hy i am running'))

app.get('/files', async (req, res) => {
  try {
    const { owner, repo } = req.query;
    const response = await octokit.repos.getContent({
      owner,
      repo,
      ref: 'master'
    });
    const files = response.data.filter(item => item.type === 'file');
   //res.json(files);
   const fileNames = files.map(file => file.name);
   res.json(fileNames);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving repository files');
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
