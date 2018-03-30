import * as actions from '../../../../src/modules/meeting/actions/participantsActions';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

describe('Meeting module', () => {
  describe('Participants actions', () => {
    it('creates an action to add participant', () => {
      const expectedAction = {
        type: types.ADD_PARTICIPANT,
        user: { id: '1', email: 'test@test.com' }
      };

      expect(actions.addParticipant({
        id: '1',
        email: 'test@test.com'
      })).to.deep.equal(expectedAction);
    });

    it('creates an action to remove participant', () => {
      const expectedAction = {
        type: types.REMOVE_PARTICIPANT,
        user: { id: '1', email: 'test@test.com' }
      };

      expect(actions.removeParticipant({
        id: '1',
        email: 'test@test.com'
      })).to.deep.equal(expectedAction);
    });
  });
});
