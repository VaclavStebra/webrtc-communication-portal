import { chatMessagesReducer } from '../../../../src/modules/meeting/reducers/chatMessagesReducer';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

const initialState = [];

describe('Meeting module', () => {
  describe('reducers', () => {
    describe('chat messages reducer', () => {
      it('returns the initial state', () => {
        expect(chatMessagesReducer(undefined, {})).to.deep.equal(initialState);
      });

      it('handles ADD_CHAT_MESSAGE', () => {
        const action = {
          type: types.ADD_CHAT_MESSAGE,
          message: { text: 'test', email: 'test@test.com' }
        };

        expect(chatMessagesReducer(undefined, action)).to.deep.equal([
          {
            text: 'test', email: 'test@test.com'
          }
        ]);
      });
    });
  });
});
