import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
const path = require("path");
const app: Application = express();
app.use(bodyParser.json());

interface RequestData {
  data: string;
  getParsed: (req: Request, res: Response) => object;
}

var parseData: RequestData = {
  data: "JOHN0000MICHAEL0009994567",
  getParsed: function(req: Request, res: Response) {
    var output: object,
      input: string = this.data,
      letters: any = input.match(/[A-Z]+/gm),
      zeros: any = input.match(/[\b0]+/gm),
      id: any = input.match(/[^A-Z0]+/gm);
    if (req.path === "/api/v1/parse") {
      output = {
        statusCode: res.statusCode,
        data: {
          firstName: `${letters[0] + zeros[0]}`,
          lastName: `${letters[1] + zeros[1]}`,
          clientId: input.match(/[^A-Z0]+/gm)[0]
        }
      };
    } else {
      output = {
        statusCode: res.statusCode,
        data: {
          firstName: letters[0],
          lastName: letters[1],
          clientId: id[0].slice(0, 3) + "-" + id[0].slice(3)
        }
      };
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
      res.json(parseData.getParsed(req, res));
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
      res.json(parseData.getParsed(req, res));
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(8080, () => {
  console.log("Running on port 8080");
});
