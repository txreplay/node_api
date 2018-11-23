const {Router} = require('express');
const {AuthRouterClass} = require('./auth/auth.route');
const {ChatRouterClass} = require('./chat/chat.route');

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const chatRouter = new ChatRouterClass();

mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/chat', chatRouter.init());

module.exports = { mainRouter };