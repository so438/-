var express = require("express");
var app = express();

app.get("/edi", function (req: any, res: any) {
  const { serviceKey, numOfRows, pageNo, mcatCd } =
    req.query;

  var api_url =
    "http://apis.data.go.kr/B551182/mcatInfoService1.2/getPaymentNonPaymentList1.2?";
  var request = require("request");
  var options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, mcatCd },
  };
  
  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/edi?serviceKey=2a48f93a5348af17db0d725602e187d8bbb0569c6092441acaf20573b0985fb0&numOfRows=10&pageNo=1&mcatCd=G8207118 app listening on port 3000!"
  );
});