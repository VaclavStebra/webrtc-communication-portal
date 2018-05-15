'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { wrapAsync } = require('../utils/routeUtils');
const MeetingManager = require('../modules/meeting/MeetingManager');

router.get(
  '/fetch',
  wrapAsync(async function (req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const meetingManager = new MeetingManager();

    const meeting = await meetingManager.getMeeting(id);

    if (meeting) {
      return res.json({
        meeting: {
          title: meeting.title,
          startDate: meeting.startDate,
          endDate: meeting.endDate,
          isPrivate: meeting.private
        }
      });
    } else {
      return res.json({
        meeting: null
      });
    }

  }));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  wrapAsync(async function (req, res, next) {
    const { title, startDate, endDate, isPrivate } = req.body;

    if (!title || !startDate || !endDate) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const meetingManager = new MeetingManager();

    const meeting = await meetingManager.createMeeting({
      title,
      startDate,
      endDate,
      private: isPrivate,
      userId: req.user._id
    });

    return res.json({ message: 'Meeting created', id: meeting._id });
  }));

module.exports = router;
