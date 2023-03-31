const fs = require('fs');

function cleanSubtitleFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let regexParentheses = /\(([^)]+)\)/g;
    let regexSquareBrackets = /\[([^\]]+)]/g;

    let countParentheses = (data.match(regexParentheses) || []).length;
    let countSquareBrackets = (data.match(regexSquareBrackets) || []).length;

    console.log(`Count of text between parentheses: ${countParentheses}`);
    console.log(`Count of text between square brackets: ${countSquareBrackets}`);

    if (countParentheses !== countSquareBrackets) {
      let newData = data;

      if (countParentheses > countSquareBrackets) {
        newData = data.replace(regexParentheses, '');
      } else {
        newData = data.replace(regexSquareBrackets, '');
      }

      fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('File updated successfully');
      });
    } else {
      console.log('Equal number of parentheses and square brackets. No modifications made.');
    }
  });
}

if (process.argv.length < 3) {
  console.error('Usage: node app.js <path_to_srt_file>');
  process.exit(1);
}

const filePath = process.argv[2];
cleanSubtitleFile(filePath);
