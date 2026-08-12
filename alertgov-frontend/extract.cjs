const fs = require('fs');

const html = fs.readFileSync('C:/Users/RISHIKESH V/.gemini/antigravity-ide/brain/efe56563-094f-45bf-90c9-717e4d4cb9bd/.system_generated/steps/82/content.md', 'utf8');

// Looking for next data or just regex extracting district info
const districts = [];

// Try to find __NEXT_DATA__
const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
if (nextDataMatch) {
  try {
    const data = JSON.parse(nextDataMatch[1]);
    console.log("Found NEXT_DATA");
    // We can dig into data.props.pageProps
    fs.writeFileSync('next_data.json', JSON.stringify(data, null, 2));
  } catch(e) {
    console.error(e);
  }
} else {
  console.log("No NEXT_DATA found");
}

// Or, the HTML might have the data directly embedded in self.__next_f
const nextFMatch = html.match(/self\.__next_f\.push\((.*)\)/g);
if (nextFMatch) {
    fs.writeFileSync('next_f.json', nextFMatch.join('\n'));
    console.log("Found next_f pushes, wrote to next_f.json");
}
