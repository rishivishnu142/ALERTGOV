var markdownpdf = require("markdown-pdf")
  , fs = require("fs")

fs.createReadStream("api_documentation.md")
  .pipe(markdownpdf({
    paperFormat: 'A4',
    cssPath: 'css.css'
  }))
  .pipe(fs.createWriteStream("API_Documentation.pdf"))
