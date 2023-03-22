const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: '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'
});

async function getFiles() {
  const response = await octokit.repos.getContent({
    owner: 'Colt',
    repo: 'YelpCamp',
    path: 'https://github.com',
    ref: 'master'
  });

  const files = response.data.filter(item => item.type === 'file');
  console.log(files.map(file => file.name));
}

getFiles();