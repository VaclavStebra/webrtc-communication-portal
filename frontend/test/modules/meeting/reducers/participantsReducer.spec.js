import { participantsReducer } from '../../../../src/modules/meeting/reducers/participantsReducer';
import * as types from '../../../../src/modules/meeting/constants/ActionTypes';

const initialState = [];

describe('Meeting module', () => {
  describe('reducers', () => {
    describe('participants reducer', () => {
      it('returns the initial state', () => {
        expect(participantsReducer(undefined, {})).to.deep.equal(initialState);
      });

      it('handles ADD_PARTICIPANT', () => {
        const action = {
          type: types.ADD_PARTICIPANT,
          user: { id: '1', email: 'test@test.com' }
        };

        expect(participantsReducer(undefined, action)).to.deep.equal([
          {
            id: '1', email: 'test@test.com'
          }
        ]);
      });

      it('handles REMOVE_PARTICIPANT', () => {
        const action = {
          type: types.REMOVE_PARTICIPANT,
          user: { id: '1', email: 'test@test.com' }
        };

        const state = [
          {
            id: '1', email: 'test@test.com'
          },
          {
            id: '2', email: 'test2@test.com'
          }
        ];

        expect(participantsReducer(state, action)).to.deep.equal([
          {
            id: '2', email: 'test2@test.com'
          }
        ]);
      });
    });
  });
});
