import { Request, Response } from "express";
import { UserApplicationService } from "../../application/UserApplicationService.js";

export class UserController {
  constructor(private readonly service: UserApplicationService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.service.createUser(req.body);
      res.status(201).json({ message: "Usuario creado correctamente", user });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Error al crear usuario",
      });
    }
  };
}
