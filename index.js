const inquirer = require('inquirer');
const fs = require('fs');
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
    }
    {
        type: 'input',
        name: 'description',
        message: 'Please give a brief description of our project:  ',
    }
    {
        type: 'input',
        name: 'tableOfContents',
        message: '',
    },
    {
        type: 'input',
        name: 'installationGuide',
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
    },



];


inquirer.prompt(questions);
fs.writeFile("README.md", "utf8", function(err, data) {
    if (err) {
        throw err;
    }
function writeToFile(fileName, data) {
}

function init() {
writeToFile(README.md,)

}

init();





