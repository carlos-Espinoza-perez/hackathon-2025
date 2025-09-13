import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response): void => {
  res.json([{ id: 1, name: "Carlos" }]);
};
