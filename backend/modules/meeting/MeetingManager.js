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
      private: params.private
    });

    return meeting.save();
  }

  getMeeting(id) {
    const options = {
      criteria: { _id: id },
      select: 'title startDate endDate private'
    };

    return Meeting.findOne(options.criteria).select(options.select).exec()
      .catch(() => {
        return null;
    });
  }
}

module.exports = MeetingManager;
