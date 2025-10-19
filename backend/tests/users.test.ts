import request from "supertest";
import { createApp } from "../src/app";
import { db } from "../src/db/database";

process.env.NODE_ENV = "test";
const app = createApp();

let userId: string;

describe("🔍 User API Integration", () => {
  beforeAll(() => {
    console.log("Starting integration tests...");
  });

  afterAll((done) => {
    db.close(() => {
      console.log("Test database closed.");
      done();
    });
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "john@example.com", role: "user", status: "active" });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("john@example.com");
    userId = res.body.user.id;
  });

  it("should update an existing user", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ role: "admin", status: "inactive" });

    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe("admin");
    expect(res.body.user.status).toBe("inactive");
  });

  it("should export users in protobuf format", async () => {
    const res = await request(app).get("/api/users/export");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toContain("application/x-protobuf");
    expect(res.body).toBeDefined();
  });

  it("should return user stats", async () => {
    const res = await request(app).get("/api/users/stats");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  it("should serve the public key", async () => {
    const res = await request(app).get("/api/public-key");
    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toContain("application/x-pem-file");
    expect(res.text).toContain("BEGIN PUBLIC KEY");
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Endpoint not found");
  });
});
