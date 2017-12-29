#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const request = require('request');


program
  .version('0.0.1')
  .option('-r, --rating [handle]','show the rating changes of a hadle')
  .parse(process.argv);


if (program.rating) {
  console.log(chalk.green("USER"),chalk.white(program.rating));
  var url = 'http://codeforces.com/api/user.rating?handle='+program.rating;
  request(url,function (error, response, body) {
    if (error) console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });


}
