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
  // pdf.create(document, options)
  //   .then((result) => {
  //     console.log(result);
  //     res.status(201).json({data: result});
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //     console.error(error);
  //   });

    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    
    pdf.create(html).toStream(function(err, stream){
      // res.setHeader('Content-Length', stream.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      stream.pipe(res);
    });

  };
