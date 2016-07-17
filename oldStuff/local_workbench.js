// resume-cli has no way of exporting with a local theme yet, export it manually

var fs = require('fs');

var fileName = "workbench";

var file = process.cwd() + '/' + fileName + '.json';
fs.readFile(file, function(err, resumeJson) {
    var resumeJson;
    if (err) {
        console.log(chalk.yellow(fileName + ' does not exist'));
        return;
    } else {
        resumeJson = JSON.parse(resumeJson);
    }
    var render = require(process.cwd() + '/workbench').render;
    fs.writeFileSync('/volume1/homes/ogun/www/adebali.com/' + fileName + '.html', render(resumeJson));
});
