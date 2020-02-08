import reduceLongFileName from './reduceLongFileName';

test('1234567891234567891.pdf - should return 1234567891234567891.pdf', () => {
  expect(reduceLongFileName('1234567891234567891.pdf')).toBe('1234567891234567891.pdf');
});

test('qwertyuiopasdfghjkl.pdf - should return qwertyuiopasdfghjkl.pdf', () => {
  expect(reduceLongFileName('qwertyuiopasdfghjkl.pdf')).toBe('qwertyuiopasdfghjkl.pdf');
});

test('QWERTYUIOPASDFGHJKL.pdf - should return QWERTYUIOPASDFGHJKL.pdf', () => {
  expect(reduceLongFileName('QWERTYUIOPASDFGHJKL.pdf')).toBe('QWERTYUIOPASDFGHJKL.pdf');
});

test('qwer_TYUIO-PasF--4.json - should return qwer_TYUIO-PasF--4.json', () => {
  expect(reduceLongFileName('qwer_TYUIO-PasF--4.json')).toBe('qwer_TYUIO-PasF--4.json');
});
