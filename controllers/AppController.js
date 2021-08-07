const pdf = require('html-pdf');
const options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
};

exports.convertToPdf = (req, res) => {
  const base64String = req.body.base64String;
  const htmlBuffer = Buffer.from(base64String, 'base64'); // Ta-da

  const html = htmlBuffer.toString();
  pdf.create(html,options).toStream(function(error, stream){
    if(error != null)
      res.status(500).send(error);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    stream.pipe(res);
  });
};
