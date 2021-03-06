import React from 'react';
import { shallow } from 'enzyme';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CreateMeetingForm from '../../../../src/modules/meeting/components/CreateMeetingForm';

function renderCreateMeetingForm(actionInProgress = false) {
  return shallow(<CreateMeetingForm
    actionInProgress={actionInProgress}
    onSubmit={() => {}}
  />);
}

describe('Meeting module', () => {
  describe('CreateMeetingForm', () => {
    it('has fields for title and participants', () => {
      const element = renderCreateMeetingForm();

      const textFields = element.find(TextField);

      expect(textFields).to.have.length(2);

      const titleField = textFields.at(0);
      const participantsField = textFields.at(1);

      expect(titleField.prop('hintText')).to.equal('Title of the meeting');
      expect(titleField.prop('floatingLabelText')).to.equal('Title');
      expect(participantsField.prop('hintText')).to.equal('Participants of the meeting');
      expect(participantsField.prop('floatingLabelText')).to.equal('Participants');
    });

    it('has submit button', () => {
      const element = renderCreateMeetingForm();

      const button = element.find(RaisedButton).at(0);

      expect(button.prop('label')).to.equal('Plan new meeting');
      expect(button.prop('primary')).to.equal(true);
    });

    it('has disabled action button when action is in progress', () => {
      const element = renderCreateMeetingForm(true);

      const button = element.find(RaisedButton).at(0);

      expect(button.prop('disabled')).to.equal(true);
    });
  });
});
