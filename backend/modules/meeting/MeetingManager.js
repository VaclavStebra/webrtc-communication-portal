'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const Meeting = mongoose.model('Meeting');

class MeetingManager {
  createMeeting(params) {
    const meeting = new Meeting({
      name: params.title,
      organizer: params.userId,
      ended: false,
      private: params.private,
      messages: [],
      participants: params.participants
    });

    return meeting.save();
  }

  getMeeting(id) {
    const options = {
      criteria: { _id: id },
      select: 'title startDate ended private messages participants'
    };

    return Meeting.findOne(options.criteria).select(options.select).exec()
      .catch(() => {
        return null;
    });
  }

  async endMeeting(id) {
    const meeting = await this.getMeeting(id);
    meeting.ended = true;
    return meeting.save();
  }

  async addMessageToMeeting(meetingId, message) {
    message.timestamp = moment.utc().valueOf();
    const meeting = await this.getMeeting(meetingId);

    meeting.messages.push(message);

    return meeting.save();
  }
}

module.exports = MeetingManager;
