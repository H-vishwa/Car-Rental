import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server.js";

describe("GET /", () => {
  it("should respond with 200 and Server is running...", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server is running...");
  });
});
