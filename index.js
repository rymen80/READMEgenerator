const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

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
        message: 'Please give a brief description of our project:  ',
    },
    {
        type: 'input',
        name: 'install',
        message: 'Please, describe how you install this product.',
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
    }
    {
        type: 'input',
        name: 'test',
        message: 'Provide any information on testing.',
    }
    ];


inquirer.prompt(questions).then(function (answers) {
    const md = generateMarkDown(answers);
    console.log(answers)
    writeFileAsync("README.md", md);
    axios.get(
        `https://api.github.com/users/${answers.github}`
    ).then(function (results) {
        console.log(results);
        const appendMD = appendContact(results)
        appendFileAsync("README.md", appendMD)
    })
})
    .catch(err => { console.log(err);}
    );

function generateMarkDown(answers) {
    return `
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

<a name="installation"></a>
${answers.install}
<a name="Usage"></a>
${answers.Usage}
<a name="license"></a>
${answers.license}
<a name="contributors"></a>
${answers.contributors}
<a name="tests"></a>
${answers.test}`
};

function appendContact(results) {
    return `
<a name="contact"></a>
## Contact
![Profile picture](${results.data.avatar_url})
[Email me @ ${results.data.email}]`
};






