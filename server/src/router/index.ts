import express from 'express';
import * as basicMiddlewares from '../middlewares/basicMiddlewares';
import * as userController from '../controllers/userController';
import * as contestController from '../controllers/contestController';
import * as validators from '../middlewares/validators';
import * as chatController from '../controllers/chatController';
import * as upload from '../utils/fileUpload';
import authRouter from './authRouter';
import eventsRouter from './eventsRouter';
import { checkAccessToken } from '../middlewares/tokenMiddlewares';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/events', eventsRouter);

router.use(checkAccessToken);

router.route('/dataForContest').post(contestController.dataForContest);

router
  .route('/pay')
  .post(
    basicMiddlewares.onlyForCustomer,
    upload.uploadContestFiles,
    basicMiddlewares.parseBody,
    validators.validateContestCreation,
    userController.payment,
  );

router.route('/contests').get(contestController.getContests);

router
  .route('/contests/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .put(upload.updateContestFile, contestController.updateContest);

router.route('/downloadFile/:fileName').get(contestController.downloadFile);

router
  .route('/setNewOffer')
  .post(
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    contestController.setNewOffer,
  );

router
  .route('/setOfferStatus')
  .post(
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    contestController.setOfferStatus,
  );

router
  .route('/changeMark')
  .post(basicMiddlewares.onlyForCustomer, userController.changeMark);

router
  .route('/updateUser')
  .post(upload.uploadAvatar, userController.updateUser);

router
  .route('/cashout')
  .post(basicMiddlewares.onlyForCreative, userController.cashout);

router.route('/newMessage').post(chatController.addMessage);

router.route('/getChat').post(chatController.getChat);

router.route('/getPreview').post(chatController.getPreview);

router.route('/blackList').post(chatController.blackList);

router.route('/favorite').post(chatController.favoriteChat);

router.route('/createCatalog').post(chatController.createCatalog);

router.route('/updateNameCatalog').post(chatController.updateNameCatalog);

router.route('/addNewChatToCatalog').post(chatController.addNewChatToCatalog);

router
  .route('/removeChatFromCatalog')
  .post(chatController.removeChatFromCatalog);

router.route('/deleteCatalog').post(chatController.deleteCatalog);

router.route('/getCatalogs').post(chatController.getCatalogs);

export default router;
