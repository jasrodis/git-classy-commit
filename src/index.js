'use strict';

import inquirer from 'inquirer';

const collectInputs = async (inputs = []) => {
  const prompts = [
    {
      type: 'input',
      name: 'issues',
      message: 'Enter the Issue(s) number: ',
      filter: function (answer) {
        if(answer.length == 0){
          return '';
        }
        return '[' + answer.split(' ').map(issue => issue = 'Issue #' + issue).join(', ') + ']';
      }
    },
    {
      type: 'checkbox',
      message: 'Select type',
      name: 'type',
      choices: [
        {
          name: '🌟 feat'
        },
        {
          name: '🛠️ fix'
        },
        {
          name: '📈 perf'
        },
        {
          name: '♻️ ci'
        },
        {
          name: '⚙️ build',
        },
        {
          name: '📖 docs'
        },
        {
          name: '😎 style'
        },
        {
          name: '🧹 refactor'
        },
        {
          name: '🧪 test'
        },
        {
          name: '🥶 chore'
        }
      ],
      validate: function (answer) {
        if (answer.length < 1) {
          return 'You must choose at least one type.';
        }
        return true;
      },
      filter: function (answer) {
        return answer.join(', ');
      }
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Enter scope: ',
      filter: function (answer) {
        if(answer.length == 0){
          return '';
        }
        return '('+answer+')';
      }
    },
    {
      type: 'confirm',
      name: 'wip',
      message: 'Work in progress? ',
      transform: function (answer) {
        return answer = "input ? 'WIP' : '';"
      }
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Enter subject: ',
      filter: function (answer) {
        var res = answer.charAt(0).toLowerCase() + answer.substr(1);
        if (res.charAt(res.length-1) == "." ){
          res = res.replace(/.$/,'');
        }       
        return res;
      },
      validate: function (answer) {
        if (answer.length > 72) {
          return 'You must use less that 72 characters!';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter message: ',
    },
    {
      type: 'input',
      name: 'refs',
      message: 'Enter the References number: ',
      filter: function (answer) {
        if(answer.length == 0){
          return '';
        }
        return answer.split(' ').map(issue => issue = 'Ref #' + issue).join(', ');
      }
    },
    {
      type: 'input',
      name: 'closes',
      message: 'Enter the Closes number: ',
      filter: function (answer) {
        if(answer.length == 0){
          return '';
        }
        return  answer.split(' ').map(issue => issue = 'Closes #' + issue).join(', ');
      }
    },
    {
      type: 'input',
      name: 'reopens',
      message: 'Enter the Reopens number: ',
      filter: function (answer) {
        if(answer.length == 0){
          return '';
        }
        return answer.split(' ').map(issue => issue = 'Reopens #' + issue).join(', ');
      }
    },
    
  ];

  const { again, ...answers } = await inquirer.prompt(prompts);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

const main = async () => {
  const inputs = await collectInputs();
  console.log(inputs);
  var input = inputs[0];
  console.log('\n\n');
  console.log(buildCommit(input));
  
};

function buildCommit(input){
  var res = input['issues'] + ' ' + input['type'] + ': ';
  res = res + (input['wip'] ? 'WIP ' : '');
  res = res + input['subject'];
  res = res + '\n\n';
  res = res + input['message']
  res = res + '\n\n';
  res = res + input['refs']
  res = res + '\n';
  res = res + input['closes']
  res = res + '\n';
  res = res + input['reopens']
  return res;
}


/* 
[Issue-Code-17, Issue-Code-29] fix: WIP for e-signature return error, change payload for upload docs

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw exceptions.

Refs Issue-Code-17, Issue-Code-29
*/

main();
