const supertest = require("supertest");
const app = require("../index");
describe("Testing the validator Api", () => {
  it("Tests base route responses", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "My Rule-Validation API",
      status: "success",
      data: {
        name: "Leon Chux",
        github: "@baneofmorpheus",
        email: "epicgenii18@gmail.com",
        mobile: "08101209762",
        twitter: "@mansa_morpheus",
      },
    });
  });
  it("Tests validate route with sample example 1", async () => {
    const response = await supertest(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "field missions.count successfully validated.",
      status: "success",
      data: {
        validation: {
          error: false,
          field: "missions.count",
          field_value: 45,
          condition: "gte",
          condition_value: 30,
        },
      },
    });
  });
  it("Tests validate route with sample example 3", async () => {
    const response = await supertest(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante",
        },
        data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "field 5 is missing from data.",
      status: "error",
      data: null,
    });
  });
  it("Tests validate route with sample example 2", async () => {
    const response = await supertest(app)
      .post("/validate-rule")
      .send({
        rule: {
          field: "0",
          condition: "eq",
          condition_value: "a",
        },
        data: "damien-marley",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "field 0 failed validation.",
      status: "error",
      data: {
        validation: {
          error: true,
          field: "0",
          field_value: "d",
          condition: "eq",
          condition_value: "a",
        },
      },
    });
  });
});
