const Promise = require('./01-promise')
it('works with promises', () => {
  return new Promise((resolve) => {
    resolve(100)
  }).then(data => expect(data).toEqual(100));
});