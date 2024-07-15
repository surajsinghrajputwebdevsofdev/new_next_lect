import { Request, Response } from "express";
import ReportModel from "../models/testreport";

const createTestResult = async (req: Request, res: Response) => {
  try {
    const newTestResult = new ReportModel(req.body);
    await newTestResult.save();
    res.status(201).json(newTestResult);
  } catch (error) {
    res.status(400).json({ error:"data was can not be saved" });
  }
};

export {
    createTestResult,

};
