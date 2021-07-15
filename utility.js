const csv = require('csv-parser');
const fs = require('fs');

const fileExistsSync = (filePath) => {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (err) {
        return false;
    }
};
const readFile = (fileName, columns = []) =>
    new Promise((resolve, reject) => {
        const content = [];
        if (fileExistsSync(fileName) && fileName.includes('.csv')) {
            fs.createReadStream(fileName)
                .pipe(csv())
                .on('data', (data) => {
                    if (columns.length) {
                        const requiredColumns = columns.reduce((objAccumulator, column) => {
                            if (data[column] === undefined) {
                                reject(new Error('Column does not exist'));
                            }
                            objAccumulator[column] = data[column];
                            return objAccumulator;
                        }, {});
                        content.push(requiredColumns);
                    } else {
                        content.push(data);
                    }
                })
                .on('end', () => {
                    // eslint-disable-next-line no-unused-expressions
                    content.length ? resolve(content) : reject(new Error('The csv file is empty.'));
                });
        } else {
            reject(new Error('Incorrect file or path.'));
        }
    });

module.exports = { readFile };
