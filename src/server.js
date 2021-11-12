// server.js
const express = require('express');
const readline = require('readline');
const fs = require('fs');

// Define Express App
const app = express();
app.use(express.static('./public'));

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});

const data = [];

async function processLineByLine(callback) {
    const fileStream = fs.createReadStream('chessDataFiles/ratedClassicalGame.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        data.push(line);
    }
    callback(data);
}

// processLineByLine(parseCSV);

function parseCSV(dataArray) {
    let headerArray = dataArray[0].split(',');
    const breaks = [0, 40000, 80000, 120000, 160000, 200000, 240000, 280000, 320000, 360000, 400000, 440000, 480000, 520000, 560000, 600000];
    for (let k = 0; k < breaks.length - 1; k++) {
        const jsonData = [];
        for (let i = breaks[k]; i < breaks[k + 1]; i++) {
            let jsonObject = {};
            const lineArray = dataArray[i].split(',');
            for (let j = 0; j < headerArray.length; j++) {
                jsonObject[headerArray[j]] = lineArray[j];
            }
            if (jsonObject.Termination !== 'Abandoned' && jsonObject.Termination !== 'Rules infraction' && jsonObject.Termination !== 'Time forfeit') jsonData.push(jsonObject);
            if (i % 50000 === 0) console.log(i);
        }
        fs.writeFile('chessDataFiles/ratedClassicalGame_' + k + '.json', JSON.stringify(jsonData), (error, result) => {
            if (error) console.log(error);
        });
    }
}


