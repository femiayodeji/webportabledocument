const fs = require("fs");
const pdf = require('html-pdf');
const options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
};

exports.convertToPdf = (req, res) => {
  // let html = req.body.htmlString;
  let html = fs.readFileSync("./public/customer-order-invoice.html", "utf8");
    pdf.create(html,options).toStream(function(err, stream){
      // res.setHeader('Content-Length', stream.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      stream.pipe(res);
    });
  };
