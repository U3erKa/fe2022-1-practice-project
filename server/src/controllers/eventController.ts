import { Event, User } from '../models';
import ServerError from '../errors/ServerError';
import NotFoundError from '../errors/NotFoundError';
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
    const {
      tokenData: { userId },
      body,
    } = req;
    Object.assign(body, { date: new Date(body.date) });

    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const event = await user.createEvent(body);
    res.send(event);
  } catch (error) {
    if (error instanceof ApplicationError) {
      return next(error);
    }
    next(new ServerError((error as any)?.message ?? 'Could not create event'));
  }
};

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;

    const events = await Event.findAll({ where: { userId } });
    if (!events?.length) {
      throw new NotFoundError('Events not found');
    }
    res.send(events);
  } catch (error) {
    if (error instanceof ApplicationError) {
      return next(error);
    }
    next(new ServerError((error as any)?.message ?? 'Could not create event'));
  }
};
