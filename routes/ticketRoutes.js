//const express = require('express');
import express from "express";
const router = express.Router();
//const { getTickets, createTicket } = require('../controllers/ticketsController');
import {getTickets, createTicket} from '../Controllers/ticketController.js'
import protect from '../middleware/protect.js'
import admin from '../middleware/admin.js'

router.route('/').get(protect, getTickets).post(protect, admin, createTicket);

export default router;