import fs from 'fs';
import pdf from 'pdf-parse';

let dataBuffer = fs.readFileSync('e:\\My works IT\\ALERT 4.0 GOVERNMENT\\AlertGov_Login_Credentials.pdf');

pdf(dataBuffer).then(function(data) {
    const lines = data.text.split('\n');
    let javaMapLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Look for village operators
        if (line.includes(' Operator ')) {
            const parts = line.split(' Operator ');
            const leftPart = parts[0];
            const jurisdiction = parts[1].trim();
            
            const usernameMatch = leftPart.match(/^(VEO-[A-Z0-9-]+)\s/);
            if (usernameMatch) {
                const username = usernameMatch[1];
                javaMapLines.push(`        if (username.equals("${username}")) { user.put("village", "${jurisdiction}"); }`);
            }
        }
        
        // Look for taluk officers
        if (line.includes(' Taluk Officer ')) {
            const parts = line.split(' Taluk Officer ');
            const leftPart = parts[0];
            const jurisdiction = parts[1].trim();
            
            const usernameMatch = leftPart.match(/^(TAL-[A-Z0-9-]+)\s/);
            if (usernameMatch) {
                const username = usernameMatch[1];
                javaMapLines.push(`        if (username.equals("${username}")) { user.put("taluk", "${jurisdiction}"); }`);
            }
        }
    }
    
    fs.writeFileSync('e:\\My works IT\\ALERT 4.0 GOVERNMENT\\alertgov-frontend\\java_map.txt', javaMapLines.join('\n'));
    console.log("Successfully created java_map.txt with " + javaMapLines.length + " entries!");
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
