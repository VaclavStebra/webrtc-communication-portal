import * as actions from '../../../../src/modules/meeting/actions/chatMessagesActions';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

describe('Meeting module', () => {
  describe('Chat messages actions', () => {
    it('creates an action to add message', () => {
      const expectedAction = {
        type: types.ADD_CHAT_MESSAGE,
        message: { text: 'test', email: 'test@test.com' }
      };

      expect(actions.addChatMessage({
        text: 'test',
        email: 'test@test.com'
      })).to.deep.equal(expectedAction);
    });
  });
});
