'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  name: String,
  organizer: { type: Schema.Types.ObjectId, ref: 'User'},
  ended: Boolean,
  private: Boolean,
  messages: [],
  participants: []
});

mongoose.model('Meeting', MeetingSchema);
