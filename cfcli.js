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
  var url = 'http://codeforces.com/api/user.rating?handle='+program.rating;
  request(url,function (error, response, body) {
    if (error) {
      console.log('error:', error);
      return;
    }
    var bodyObj = JSON.parse(body);
    if (bodyObj.status == 'FAILED') {
      console.log(chalk.bgRed('FAILED'),":",bodyObj.comment);
    } else if (bodyObj.status == 'OK') {
      CFonts.say('Rating',{
        font: 'block',
        align: 'center',
        colors: ['cyan'],
        background: 'black',
        letterSpacing: 2,
        lineHeight: 1,
        space: true,
        maxLength: '0'
      });
      //bodyObj.result.reverse();
      let table = new Table({ head: ["", "Contest", "Rank","Rating Change"] });
      for (var idx = 0; idx < bodyObj.result.length; idx++) {
        element = bodyObj.result[idx];
        table.push(
             [idx+1,element.contestName, element.rank,element.oldRating+'->'+element.newRating]

        );
      }
      console.log(table.toString());
    }


  });


}
