var markdownpdf = require("markdown-pdf")
  , fs = require("fs")

fs.createReadStream("C:/Users/RISHIKESH V/.gemini/antigravity-ide/brain/85aab00d-c35c-40c9-a9ff-e3e1904ae1bd/architecture_documentation.md")
  .pipe(markdownpdf({
    paperFormat: 'A4',
    cssPath: 'css.css'
  }))
  .pipe(fs.createWriteStream("Architecture_Documentation.pdf"))
