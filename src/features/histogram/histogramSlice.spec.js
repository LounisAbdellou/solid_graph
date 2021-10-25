import histogramReducer, { switchHistogramType } from './histogramSlice';

describe('histogram reducer', () => {
  const initialState = {
    histogramType: "",
  };

  it('should handle initial state', () => {
    expect(histogramReducer(undefined, { type: 'unknown' })).toEqual({
      histogramType: "Not Selected",
    });
  });

  it('should handle histogram type switch', () => {
    const actual = histogramReducer(initialState, switchHistogramType("timeSpent"));
    expect(actual.histogramType).toEqual("timeSpent");
  });

});
