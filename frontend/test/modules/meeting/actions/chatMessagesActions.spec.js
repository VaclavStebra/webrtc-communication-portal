import * as actions from '../../../../src/modules/meeting/actions/chatMessagesActions';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

describe('Meeting module', () => {
  describe('Chat messages actions', () => {
    it('creates an action to add message', () => {
      const timestamp = new Date().getTime();

      const expectedAction = {
        type: types.ADD_CHAT_MESSAGE,
        message: { text: 'test', email: 'test@test.com', timestamp }
      };

      expect(actions.addChatMessage({
        text: 'test',
        email: 'test@test.com',
        timestamp
      })).to.deep.equal(expectedAction);
    });
  });
});
