import colors from "colors";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers = []

export function primeNumbers(n){ 
  primeNumNext:
  for (let i = 2; i <= n; i++){
    for (let j = 2; j < i; j++) {
      if (i % j == 0) 
      continue primeNumNext
    }
  numbers.push(i)
  }
  return numbers
}

function colorNumbers(arr) {
  for (let i = 0; i < arr.length; i += 3) {
    process.stdout.write(`${arr[i]}, `.green);
    if (arr[i + 1]) {
      process.stdout.write(`${arr[i + 1]}, `.yellow);
      if (arr[i + 2]) {
        process.stdout.write(`${arr[i + 2]}, `.red);
      }
    } 
  }
  process.stdout.moveCursor(-2)
  process.stdout.write(' ')
}

export const Application = () => {
  process.stdout.write('Введите число:  ');
  rl.on('line', (answer) => {
    const num = Number(answer);
    if (isNaN(num)) {
      process.stdout.write(colors.red('Вы ввели не число'));
      rl.close();
    }
    if (num === 1 || num <= 0) {
      process.stdout.write(colors.red('В указанном диапазоне нет простых чисел'));
      rl.close();
    } else {
      primeNumbers(num);
      colorNumbers(numbers);
    }
  });
};

Application();