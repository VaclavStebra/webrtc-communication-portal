'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { wrapAsync } = require('../utils/routeUtils');
const MeetingManager = require('../modules/meeting/MeetingManager');

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  wrapAsync(async function (req, res, next) {
  const { title, startDate, endDate, participants } = req.body;

  if (!title || !startDate || !endDate || !participants) {
    return next({ status: 422, message: 'Invalid params' });
  }

  const participantsEmails = participants.split(',');

  const meetingManager = new MeetingManager();

  const meeting = await meetingManager.createMeeting({
    title,
    startDate,
    endDate,
    participants: participantsEmails,
    userId: req.user._id
  });

  return res.json({ message: 'Meeting created', id: meeting._id });
}));

module.exports = router;
