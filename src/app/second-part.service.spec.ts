import { findTopTenMostRepeatedWords } from './second-part.service';

describe('findTopTenMostRepeatedWords function', () => {

  it('should return the top 10 words which has the highest occurrence from highest to lowest order', () => {
    const result = findTopTenMostRepeatedWords('Yoshinoya is in business to create the structure and systems needed to allow our customers access to the majority of their away-from-home daily meal requirements on a one-stop-shop basis. All our products shall be of the highest quality and value, be healthy, nutritious and provided with outstanding personal services at the lowest possible prices consistent with a fair return on investment for our shareholders, job enhancementsecurity for our employees and a level of community involvement by everyone connected with our business. All of our products and services shall be delivered consistently and measured one satisfied customer at a time, whether by company-owned or franchised operations, in superior, clean, convenient, fun and friendly neighborhood environments. We pledge to make Yoshinoya the best place to eat and the best place to work.');
    expect(result).toEqual([
                            {key: 'and', value: 8},
                            {key: 'our', value: 6},
                            {key: 'the', value: 6},
                            {key: 'to', value: 6},
                            {key: 'a', value: 4},
                            {key: 'of', value: 4},
                            {key: 'with', value: 3},
                            {key: 'be', value: 3},
                            {key: 'place', value: 2},
                            {key: 'best', value: 2}
                          ]);
  })

  it('should return the top used words even if the passed string has less than 10 words', () => {
    const result = findTopTenMostRepeatedWords('To deliver an exceptional');
    expect(result).toEqual([
                            {key: 'exceptional', value: 1},
                            {key: 'an', value: 1},
                            {key: 'deliver', value: 1},
                            {key: 'to', value: 1}
                          ]);
  })

  it('should not return words that contain any special characters', () => {
    const result = findTopTenMostRepeatedWords('service, value, quality, serve. *totally value deliver to an exceptional passed return string');
    expect(result[0].key).toBe('value');
  })

  it('should ignore any words with uppercase letters', () => {
    const result = findTopTenMostRepeatedWords('To deliver the best shopping experience by offering the BEST');
    expect(result[0].key).toBe('best');
  })

  it('should return an empty array if an empty string is passed', () => {
    const result = findTopTenMostRepeatedWords('');
    expect(result.length).toEqual(0);
  })
});
