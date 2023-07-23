import { Event } from '../models';
import ServerError from '../errors/ServerError';
import ApplicationError from '../errors/ApplicationError';
import { type RequestHandler } from 'express';
import type { InferType } from 'yup';
import { type eventSchem } from '../validationSchemes/schems';

export const createEvent: RequestHandler<
  unknown,
  unknown,
  InferType<typeof eventSchem>
> = async (req, res, next) => {
  try {
    const { body } = req;
    Object.assign(body, { date: new Date(body.date) });

    const event = await Event.create(body as typeof body & { date: Date });
    res.send(event);
  } catch (error) {
    if (error instanceof ApplicationError) {
      return next(error);
    }
    next(new ServerError((error as any)?.message ?? 'Could not create event'));
  }
};

