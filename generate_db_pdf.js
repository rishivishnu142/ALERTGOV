var markdownpdf = require("markdown-pdf")
  , fs = require("fs")

fs.createReadStream("database_documentation.md")
  .pipe(markdownpdf({
    paperFormat: 'A4',
    cssPath: 'css.css'
  }))
  .pipe(fs.createWriteStream("Database_Documentation.pdf"))
