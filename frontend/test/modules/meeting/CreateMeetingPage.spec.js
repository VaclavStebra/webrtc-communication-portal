import React from 'react';
import { shallow } from 'enzyme';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import { CreateMeetingPage } from '../../../src/modules/meeting/CreateMeetingPage';
import CreateMeetingForm from '../../../src/modules/meeting/components/CreateMeetingForm';

function renderCreateMeetingPage(actionInProgress = false, actionFailure = false) {
  const props = {
    actionInProgress,
    actionFailure
  };

  return shallow(<CreateMeetingPage
    {...props}
    onCreate={() => {}}
  />);
}

describe('Meeting module', () => {
  it('has heading Create meeting', () => {
    const element = renderCreateMeetingPage();

    const heading = element.find('h1').at(0);

    expect(heading.text()).to.equal('Create meeting');
  });

  it('has CreateMeetingForm', () => {
    const element = renderCreateMeetingPage();

    const createMeetingForm = element.find(CreateMeetingForm);

    expect(createMeetingForm).to.have.length(1);
  });

  it('has CircularProgress when action is in progress', () => {
    const element = renderCreateMeetingPage(true);

    const circularProgress = element.find(CircularProgress);

    expect(circularProgress).to.have.length(1);
  });

  it('does not have CircularProgress when action is not in progress', () => {
    const element = renderCreateMeetingPage();

    const circularProgress = element.find(CircularProgress);

    expect(circularProgress).to.have.length(0);
  });


  it('has closed Snackbar when action did not fail', () => {
    const element = renderCreateMeetingPage();

    const snackbar = element.find(Snackbar).at(0);

    expect(snackbar.prop('open')).to.equal(false);
  });

  it('has opened Snackbar when action failed', () => {
    const element = renderCreateMeetingPage(false, true);

    const snackbar = element.find(Snackbar).at(0);

    expect(snackbar.prop('message')).to.equal('Something went wrong');
    expect(snackbar.prop('open')).to.equal(true);
  });
});

