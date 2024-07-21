// parseCsv.js
import { readString } from 'react-native-csv';

export const parseCsvViaReactNativeCsv = (csvContent) => {
  const results = readString(csvContent, {
    header: true,
    dynamicTyping: true,
  });

  console.log(results);
  return results.data;
};



export const parseCsvManually = (csvContent) => {
  const lines = csvContent.split('\n');
  console.log(lines)

  const headers = lines[0].split(',');
  console.log(headers)

  return lines.slice(1).map(line => {
    const data = line.split(',');
    const obj = {};

    headers.forEach((header, index) => {
      obj[header.trim()] = data[index].trim();
    });

    console.log(obj);
    return obj;
  });
};