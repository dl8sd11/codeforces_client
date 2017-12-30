#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const request = require('request');
const Table = require('cli-table');
const CFonts  = require('cfonts');

program
  .version('0.0.1')
  .option('-r, --rating [handle]','show the rating changes of a hadle')
  .parse(process.argv);




if (program.rating) {
  //console.log(chalk.green("USER"),chalk.white(program.rating));
  var url = 'http://codeforces.com/api/user.rating?handle='+program.rating;
  request(url,function (error, response, body) {
    if (error) console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    var bodyObj = JSON.parse(body);
    if (bodyObj.status == 'FAILED') {
      console.log(chalk.bgRed('FAILED'),":",bodyObj.comment);
    } else if (bodyObj.status == 'OK') {
      CFonts.say('Rating',{
        font: 'block',        //define the font face
        align: 'center',        //define text alignment
        colors: ['cyan'],    //define all colors
        background: 'black',  //define the background color
        letterSpacing: 2,     //define letter spacing
        lineHeight: 1,        //define the line height
        space: true,          //define if the output text should have empty lines on top and on the bottom
        maxLength: '0'        //define how many character can be on one line
      });
      bodyObj.result.reverse();
      let table = new Table({ head: ["", "Contest", "Rank","Rating Change"] });
      for (var idx = 0; idx < bodyObj.result.length; idx++) {
        element = bodyObj.result[idx];
        table.push(
             [idx+1,element.contestName, element.rank,'1500->1493']

        );
      }
      console.log(table.toString());
    }


  });


}
