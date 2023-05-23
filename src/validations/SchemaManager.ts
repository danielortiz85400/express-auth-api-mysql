import { Request, Response, NextFunction } from "express";
import {ObjectSchema as JoiSchema} from "joi";

export const SchemasValidator =
  (schema: JoiSchema) =>
  ({body}: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(body);

    error?.message
      ? res.status(400).send({
          validationError: {
            mssg: error.details.map(
              ({ message }: { message: string }) => message
            ),
          },
        })
      : next();
  };
