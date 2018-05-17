'use strict';

const fs = require('fs');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

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
          ended: meeting.ended,
          isPrivate: meeting.private,
          messages: meeting.messages,
          participants: meeting.participants,
          record: meeting.record,
          files: meeting.files
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
    const { title, isPrivate, participants, record } = req.body;

    if (!title) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const participantsEmails = participants.split(',');
    participantsEmails.push(req.user.email);

    const meetingManager = new MeetingManager();

    const meeting = await meetingManager.createMeeting({
      title,
      private: isPrivate,
      userId: req.user._id,
      participants: participantsEmails,
      record
    });

    return res.json({ message: 'Meeting created', id: meeting._id });
  }));

router.get(
  '/recording',
  wrapAsync(async function (req, res, next) {
    const { meetingId } = req.query;

    if (!meetingId) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const meetingManager = new MeetingManager();
    const meeting = await meetingManager.getMeeting(meetingId);

    if (!meeting || !meeting.record) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const file = `/tmp/${meetingId}.webm`;
    return res.download(file);
  }));


router.get(
  '/files',
  wrapAsync(async function (req, res, next) {
    const { meetingId, fileName } = req.query;

    if (!meetingId || !fileName) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const meetingManager = new MeetingManager();
    const meeting = await meetingManager.getMeeting(meetingId);

    if (!meeting || !meeting.files.indexOf(fileName) === -1) {
      return next({ status: 422, message: 'Invalid params' });
    }

    const file = `./uploads/${meetingId}/${fileName}`;
    return res.download(file);
  }));

const upload = multer({ dest: './uploads' });

router.post(
  '/uploadFile',
  upload.single('file'),
  wrapAsync(async function (req, res, next) {
    let path = `./uploads/${req.body.id}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fs.renameSync(req.file.path, `${path}/${req.file.originalname}`);

    const meetingManager = new MeetingManager();
    await meetingManager.addFileToMeeting(req.body.id, req.file.originalname);

    return res.json({ success: true });
  }));

module.exports = router;
