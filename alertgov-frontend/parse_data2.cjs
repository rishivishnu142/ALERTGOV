const fs = require('fs');

const content = fs.readFileSync('next_f.json', 'utf8');

// The JSON in next_f.json is heavily escaped. Let's just unescape it all.
let unescaped = content;
for(let i = 0; i < 5; i++) {
  try {
     unescaped = JSON.parse('"' + unescaped.replace(/"/g, '\\"') + '"'); // Or just regex replace
  } catch(e) {}
}
// Actually, let's just use simple regex to find every "title":"Name","stats":{"Area":"...","Population":"..."}
// But wait, the previous log said:
// tamilnadu.com/Guidance/Uploads/Photos/tn-nagapattinam.svg\",\"stats\":{\"Area\":\"2715.83 sq km\",\"Population\":\"1,616,450\",\"Literacy Rate\":\"83.59%\"},\"iconLabels\":[{\"label\":\"Tiruchirappalli International Airport\"},{\"label\":\"Cuddalore Port \u0026 Thoothukudi Port\"},{\"label\":\"Nagapattinam Railway Station\"}],\"details\":{\"title\":\"Nagapattinam\",\"heroTitle\":\"Nagapattinam has

const regex2 = /\\"stats\\":{\\"Area\\":\\"(.*?)\\",\\"Population\\":\\"(.*?)\\".*?\\"title\\":\\"(.*?)\\"/g;

let match2;
const districts2 = [];
while ((match2 = regex2.exec(content)) !== null) {
  districts2.push({
    name: match2[3].replace(/\\/g, ''),
    area: match2[1],
    population: match2[2]
  });
}

console.log("Found:", districts2.length);
fs.writeFileSync('districts_data.json', JSON.stringify(districts2, null, 2));

// If still 0, let's just find the stats object
const statsRegex = /\\"stats\\":\\{.*?\\}/g;
const statsMatches = content.match(statsRegex);
if(statsMatches) {
   console.log("Stats found:", statsMatches.length);
   console.log("Sample:", statsMatches[0]);
}

const titleRegex = /\\"title\\":\\"(.*?)\\"/g;
const titleMatches = content.match(titleRegex);
if(titleMatches) {
   console.log("Titles found:", titleMatches.length);
   console.log("Sample:", titleMatches[0]);
}
