import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "./server.js";

describe("GET /", () => {
  it("should respond with 200 and Server is running...", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server is down...");
  });
});

describe("Environment Secrets", () => {
  it("should have JWT_SECRET available to sign tokens", () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    const token = jwt.sign({ userId: "test_user_123" }, process.env.JWT_SECRET);
    expect(typeof token).toBe("string");
  });
});