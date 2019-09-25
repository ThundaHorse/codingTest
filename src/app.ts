import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
const path = require("path");
const app: Application = express();
app.use(bodyParser.json());

interface RequestData {
  data: string;
  getV1?: (req: Request, res: Response) => object;
  getV2?: (req: Request, res: Response) => object;
}

var parse1: RequestData = {
  data: "JOHN0000MICHAEL0009994567",
  getV1: function(req: Request, res: Response) {
    var input = this.data;
    var letters = input.match(/[A-Z]+/gm);
    var zeros = input.match(/[\b0]+/gm);
    var output = {
      statusCode: res.statusCode,
      data: {
        firstName: `${letters[0] + zeros[0]}`,
        lastName: `${letters[1] + zeros[1]}`,
        clientId: input.match(/[^A-Z0]+/gm)[0]
      }
    };
    return output;
  }
};

var parse2: RequestData = {
  data: "JOHN0000MICHAEL0009994567",
  getV2: function(req: Request, res: Response) {
    var input = this.data;
    var letters = input.match(/[A-Z]+/gm);
    var id = input.match(/[^A-Z0]+/gm);
    var output = {
      statusCode: res.statusCode,
      data: {
        firstName: letters[0],
        lastName: letters[1],
        clientId: ""
      }
    };
    for (var i = 0; i < id[0].length; i++) {
      var ele = id[0][i];
      output.data.clientId += ele;
      if (i == 2) {
        output.data.clientId += "-";
      }
    }
    return output;
  }
};

app
  .route("/api/v1/parse")
  .get(function(req: Request, res: Response) {
    res.sendFile(path.join(__dirname + "/index.html"));
  })
  .post(function(req: Request, res: Response) {
    try {
      res.json(parse1.getV1(req, res));
    } catch (err) {
      console.log(err.message);
    }
  });

app
  .route("/api/v2/parse")
  .get(function(req: Request, res: Response) {
    res.sendFile(path.join(__dirname + "/index.html"));
  })
  .post(function(req: Request, res: Response) {
    try {
      res.json(parse2.getV2(req, res));
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(8080, () => {
  console.log("Running on port 8080");
});
