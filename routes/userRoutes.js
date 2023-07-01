import express from "express";
const router = express.Router();
import {createUser, getUsers, loginUser, logoutUser} from '../Controllers/userController.js'

import protect from '../middleware/protect.js'
import admin from '../middleware/admin.js'

router.route('/').get(protect, admin, getUsers).post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(protect, logoutUser);

export default router;
