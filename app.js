const fs = require('fs');

function cleanSubtitleFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let regexBoth = /^ *(?:\(([^)]+)\)|\[([^\]]+)\]) *$/gm;
    let newData = data.replace(regexBoth, '');

    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('File updated successfully');
    });
  });
}

if (process.argv.length < 3) {
  console.error('Usage: node app.js <path_to_subtitle_file>');
  process.exit(1);
}

const filePath = process.argv[2].trim();
console.log(`Cleaning file: ${filePath}`);
cleanSubtitleFile(filePath);
