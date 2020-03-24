const core = require('@actions/core');
const github = require('@actions/github');
const Filter = require('bad-words'),
filter = new Filter();

async function run() {
  try { 
      const token = core.getInput('GITHUB_TOKEN');
      const closePermissionCheck = core.getInput('CLOSE_PERMISSION');
      const octokit = new github.GitHub(token);
      const { repo, payload } = github.context;
      let body;
      const message = 'Use of foul words detected';
      let closePermission;

      if(typeof closePermissionCheck !== 'boolean'){
        closePermission = false;
      }else{
        closePermission = closePermissionCheck;
      }


      if(payload && payload.issue && payload.issue.body){
        body = filter.clean(payload.issue.body);
        
        if(body !== payload.issue.body){
          const issue = await octokit.issues.createComment({owner: repo.owner, repo: repo.repo, issue_number: payload.issue.number, body: message}); 
          if(issue.status === 200 && closePermission){
            await octokit.issues.update({owner: repo.owner, repo: repo.repo, issue_number: payload.issue.number, state: 'closed'});
          }    
        }


      }else if(payload && payload.pull_request && payload.pull_request.body){
        body = filter.clean(payload.pull_request.body);

        if(body !== payload.pull_request.body){
          const pr = await octokit.issues.createComment({owner: repo.owner, repo: repo.repo, issue_number: payload.pull_request.number, body: message}); 
          if(pr.status === 200 && closePermission){
            await octokit.issues.update({owner: repo.owner, repo: repo.repo, issue_number: payload.pull_request.number, state: 'closed'});
          }    
        }

      }
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();