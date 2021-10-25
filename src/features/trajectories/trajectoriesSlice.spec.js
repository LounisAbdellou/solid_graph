import trajectoriesReducer, { switchPersonId } from './trajectoriesSlice';

describe('trajectories reducer', () => {
  const initialState = {
    personId: "1234",
  };

  it('should handle initial state', () => {
    expect(trajectoriesReducer(undefined, { type: 'unknown' })).toEqual({
      personId: "",
    });
  });

  it('should handle person id switch', () => {
    const actual = trajectoriesReducer(initialState, switchPersonId("2442"));
    expect(actual.personId).toEqual("2442");
  });

});
