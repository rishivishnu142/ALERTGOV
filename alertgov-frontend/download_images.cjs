const fs = require('fs');
const path = require('path');
const https = require('https');

const districtsData = require('./src/data/districts_data.json');
const imgDir = path.join(__dirname, 'public', 'images', 'districts');

if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => reject(`Failed: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
}

async function run() {
    let count = 0;
    for (const d of districtsData) {
        const dName = encodeURIComponent(d.name.replace(/\s+/g, ''));
        const url = `https://www.tn.gov.in/sites/default/district-images/slide-images/${dName}.png`;
        const dest = path.join(imgDir, `${dName}.png`);
        
        if (!fs.existsSync(dest)) {
            try {
                console.log(`Downloading ${d.name}...`);
                await downloadImage(url, dest);
                count++;
            } catch (err) {
                console.error(`Error downloading ${d.name}:`, err);
            }
        } else {
             console.log(`Skipping ${d.name}, already exists`);
        }
    }
    console.log(`Done. Downloaded ${count} images.`);
}

run();
