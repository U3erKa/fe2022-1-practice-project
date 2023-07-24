import { Router } from 'express';
import * as eventController from '../controllers/eventController';
import * as validators from '../middlewares/validators';

const eventsRouter = Router();

eventsRouter
  .route('/')
  .get(eventController.getEvents)
  .post(validators.validateEvent, eventController.createEvent);

export = eventsRouter;
