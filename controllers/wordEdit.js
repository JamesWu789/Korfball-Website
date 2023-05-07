const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");

// 1. read template file
module.exports = (req,res)=>{ 
    const templateFile = fs.readFileSync('./template/紀錄表.docx');
    const zip = new PizZip(templateFile);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // 2. process the template
    doc.render({
         team: [
            { person: 'Allen', height: '175' },
            { person: 'James', height: '165' },
            { person: 'Begg', height: '165' },
        ]
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE"
});

    // 3. save output
    fs.writeFileSync('./template/myTemplate - output.docx', buf); // doc);
    res.redirect('/product');
}