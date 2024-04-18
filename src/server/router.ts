import { RightsError } from 'errors';
import express from 'express';
import { chatController, notificationController } from 'server';
import { CUSTOMER } from 'constants/general';
import { verifyAccessToken, type TokenData } from 'services/jwtService';
import { checkAuthorization } from 'utils/checkAuthorization';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tokenData: TokenData;
    }
  }
}

const router = express.Router();
router.use(async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    checkAuthorization(authorization);
    const [, accessToken] = authorization.split(' ') as ['Bearer', string];
    req.tokenData = await verifyAccessToken(accessToken);
    next();
  } catch (error) {
    next(error);
  }
});

router.route('/changeMark').post(async (req, res, next) => {
  try {
    const {
      tokenData: { role },
      body: { creatorId },
    } = req;
    if (role !== CUSTOMER) {
      next(new RightsError('This page is only for customers'));
      return;
    }
    notificationController.emitChangeMark(creatorId);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.route('/newMessage').post(async (req, res, next) => {
  try {
    const {
      body: { recipient, message },
    } = req;

    chatController.emitNewMessage(recipient, message);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.route('/blackList').post(async (req, res, next) => {
  try {
    const {
      body: { recipient, message },
    } = req;

    chatController.emitChangeBlockStatus(recipient, message);
    res.end();
  } catch (error) {
    next(error);
  }
});

export default router;
