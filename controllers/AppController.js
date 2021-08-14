const pdf = require('html-pdf');

const options = {
  format: "A4",
  orientation: "portrait",
  border: "0mm",
};

exports.convertToPdf = (req, res) => {
  const requestModel = req.body;
  if(requestModel.htmlBase64String == null)
    res.status(400).send({message: "The html base64 string is required"});

  const base64String = requestModel.htmlBase64String;
  const htmlBuffer = Buffer.from(base64String, 'base64'); // Ta-da

  const html = htmlBuffer.toString();
  pdf.create(html,options).toStream(function(error, stream){
    if(error) 
      res.status(500).send({message: error.stack});

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    stream.pipe(res);
  });
};
