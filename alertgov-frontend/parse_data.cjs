const fs = require('fs');

const content = fs.readFileSync('next_f.json', 'utf8');

const regex = /\\"stats\\":{\\"Area\\":\\"(.*?)\\",\\"Population\\":\\"(.*?)\\"(?:.*?)\\}.*?\\"title\\":\\"(.*?)\\"/g;
const districts = [];
let match;
while ((match = regex.exec(content)) !== null) {
  districts.push({
    name: match[3].replace(/\\/g, ''),
    area: match[1],
    population: match[2]
  });
}

// Remove duplicates if any
const uniqueDistricts = [];
const map = new Set();
for (const d of districts) {
  if (!map.has(d.name)) {
    map.add(d.name);
    uniqueDistricts.push(d);
  }
}

fs.writeFileSync('districts_data.json', JSON.stringify(uniqueDistricts, null, 2));
console.log(`Extracted ${uniqueDistricts.length} districts.`);
