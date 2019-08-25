// Helper function to print data in console
export const printData = (data) => console.log(JSON.stringify(data, null, 2));

// Helper function to convert roman numerals into integers
export const romanToInt = (num) => {
  const roman = ['I', 'II', 'III', 'IV'];
  const value = ['1', '2', '3', '4'];
  for (let i = 0; i < roman.length; i += 1) {
    if (roman[i] === num) {
      return value[i].toString();
    }
  }
  return 'error';
};
