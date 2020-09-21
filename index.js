// dependencies
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

// using promisify to write our readme
const writeFileAsync = util.promisify(fs.writeFile);

// array of question we will ask user
const questions = [
    {
        type: 'input',
        name: 'gitHubUserName',
        message: 'Please enter you gitHub username: ',
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title? ',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please give a brief description of your project:  ',
    },
    {
        type: 'input',
        name: 'install',
        message: 'Please, describe how you install this product.',
    },
    {
        type: "checkbox",
        message: "Select a license badge:",
        choices: ["NPM Inquirer", "Made With JS"],
        name: "badge",
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'Please, describe how you use this product.',
    },
    {
        type: 'input',
        name: 'license',
        message: 'If this app has a license, please describe which.',
    },

    {
        type: 'input',
        name: 'contributors',
        message: 'Who contributed to this project?',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Provide any information on testing.',
    }
    ];

// inquirer prompt to pass the questions will then use a nested then to call api and write file
inquirer.prompt(questions).then(function (answers) {
  // axios get ot call the github api
    axios.get(
        `https://api.github.com/users/${answers.gitHubUserName}?access_token=`
    ).then(function (results) {
        // console.log(results.data)
        //variable declarations for gitHub response data
        const avatar_url = results.data.avatar_url
        const email = results.data.email
        answers.gitHub = {avatar_url:avatar_url,email:email}
        // console.log(answers.badge);
        const badgeLicence = getBadge(answers.badge);
        // console.log(badgeLicence);
        // declare a variable to later pass the generateMarkdown function to async Writefile
        const md = generateMarkDown(answers);
        // declare a variable to later pass the appendContact function to async Writefile
        const newMd = appendContact(answers.gitHub);
        // console.log(md + newMd);
        writeFileAsync("README1.md",badgeLicence + md + newMd);

    })
})
    .catch(err => { console.log(err);}
    );

// functon that get a badge for the readme
function getBadge(answer) {
    let badgeSelected =[]
    for(let i = 0; i < answer.length; i++) {
        if (answer[i] === 'Made With JS') {
            badgeSelected.push('![MW JS](https://forthebadge.com/images/badges/made-with-javascript.svg)')
        }
        if (answer[i] === 'NPM Inquirer') {
            badgeSelected.push('![NPM](https://img.shields.io/npm/l/inquirer?style=for-the-badge)');
        }
    }
    return badgeSelected.join(' ');
}


// function that formats our markDownfile
function generateMarkDown(answers) {
    return`

 # ${answers.title}  
 
 
## Description
${answers.description}

## Table of Contents
1. [Installation](#install)
2. [Usage](#usage)
3. [License](#license)
4. [Contributors](#contributors)
5. [Tests](#tests)
6. [Contact](#contact)

### install
${answers.install}    
### usage
${answers.Usage}
### license
${answers.license}
### contributors
${answers.contributors}
### tests
${answers.test}
`
};
// function that adds the gitHub api call info to the markdown file
function appendContact(results) {
    return `
<a name="contact"></a>
## Contact
![Profile picture](${results.avatar_url})
#### for questions
[Email me @ ${results.email}]`
};






