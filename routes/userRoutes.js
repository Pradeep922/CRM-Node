//const express = require('express');
import express from "express";
const router = express.Router();
import {createUser, getUsers, loginUser, logoutUser} from '../Controllers/userController.js'
//const { createUser, getUsers, loginUser, logoutUser } = require('../controllers/userController');

// protections
//const protect = require('../middleware/protect');
import protect from '../middleware/protect.js'
//const admin = require('../middleware/admin');
import admin from '../middleware/admin.js'

router.route('/').get(protect, admin, getUsers).post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(protect, logoutUser);

export default router;
