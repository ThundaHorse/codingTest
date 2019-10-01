import ParseString from "../src/app";

describe("ParseString", () => {
  const parse = new ParseString("JOHN0000MICHAEL0009994567");
  const v1Response: object = {
    statusCode: 200,
    data: {
      firstName: "JOHN0000",
      lastName: "MICHAEL000",
      clientId: "9994567"
    }
  };
  const v2Response: object = {
    statusCode: 200,
    data: {
      firstName: "JOHN",
      lastName: "MICHAEL",
      clientId: "999-4567"
    }
  };

  it("should return the correct data type for v1Parse and v2Parse", () => {
    expect(typeof parse.v1Parse()).toEqual("object");
    expect(typeof parse.v2Parse()).toEqual("object");
  });
  it("should return the expected data from v1Parse", () => {
    expect(parse.v1Parse()).toEqual(v1Response);
  });
  it("should return the expected data from v2Parse", () => {
    expect(parse.v2Parse()).toEqual(v2Response);
  });
});
