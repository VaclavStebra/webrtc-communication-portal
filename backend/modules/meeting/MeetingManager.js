'use strict';

const mongoose = require('mongoose');

const Meeting = mongoose.model('Meeting');

class MeetingManager {
  createMeeting(params) {
    const meeting = new Meeting({
      name: params.title,
      organizer: params.userId,
      startDate: params.startDate,
      endDate: params.endDate,
      participants: params.participants
    });

    return meeting.save();
  }
}

module.exports = MeetingManager;
