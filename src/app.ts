import express, { Application, Request, Response, response } from "express";
import bodyParser from "body-parser";
const path = require("path");
const app: Application = express();
app.use(bodyParser.json());

interface StringToParse {
  data: string;
  parseEndpoint: (req: Request, res: Response) => object;
}

class ParseString implements StringToParse {
  parseEndpoint: (req: express.Request, res: express.Response) => object;
  constructor(public data: string) {
    if (this.data.length < 25)
      throw new Error("Please re-check supplied string to parse!");
    this.data = data;
  }
  v1Parse() {
    var output: object,
      letters: any = this.data.match(/[A-Z]+/gm),
      zeros: any = this.data.match(/[\b0]+/gm),
      output: object = {
        statusCode: response.statusCode,
        data: {
          firstName: `${letters[0] + zeros[0]}`,
          lastName: `${letters[1] + zeros[1]}`,
          clientId: this.data.match(/[^A-Z0]+/gm)[0]
        }
      };
    return output;
  }
  v2Parse() {
    var output: object,
      letters: any = this.data.match(/[A-Z]+/gm),
      id: any = this.data.match(/[^A-Z0]+/gm);
    output = {
      statusCode: response.statusCode,
      data: {
        firstName: letters[0],
        lastName: letters[1],
        clientId: id[0].slice(0, 3) + "-" + id[0].slice(3)
      }
    };
    return output;
  }
}

var testString: string = "JOHN0000MICHAEL0009994567";

app
  .route("/api/v1/parse")
  .get((req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  })
  .post((req: Request, res: Response) => {
    try {
      var newRequest = new ParseString(testString);
      res.json(newRequest.v1Parse());
    } catch (err) {
      console.log(err.message);
    }
  });

app
  .route("/api/v2/parse")
  .get((req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  })
  .post((req: Request, res: Response) => {
    try {
      var newRequest = new ParseString(testString);
      res.json(newRequest.v2Parse());
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(8080);
