'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2025-04-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jayant Dhake',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'mr-IN',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//jussst
// labelDate.innerHTML = '';
// labelDate.insertAdjacentHTML('afterbegin', new Date());

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) {
    return 'Today';
  }
  if (daysPassed === 1) {
    return 'Yesterday';
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date); //formatting Date here using Internationalization API
  }
};
//---------

const formatCurr = function (value, locale, currency) {
  const formattedMov = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
  return formattedMov;
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //innerHTML is little bit similar to textContent but the difference is that textContent simply returns the text itself and the innerHTML property returns everything including the html.
  //combined object for movemnts and movementsDates
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);

  if (sort) {
    combinedMovsDates.sort((a, b) => a.movement - b.movement);
  }

  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCurr(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); //for this google and check mdn
    // console.log(containerMovements.innerHTML); //will returns all of the HTML.
  });
};

//----------
//VIDEO: Magic of chaining methods
const calcDisplaySummary = function (acc) {
  console.log(acc.movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov, i, arr1) => {
      const ssa = acc + mov;
      return ssa;
    }, 0);
  // labelSumIn.textContent = incomes.toFixed(2) + '€';
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = Math.abs(out).toFixed(2) + '€';
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map((deposit, i, arr) => {
      console.log('deps ' + arr); //deps 200,450,3000,70,1300
      return (deposit * acc.interestRate) / 100;
    })
    .filter((intrst, i, arr) => {
      console.log('ints ' + arr); //ints 2.4,5.4,36,0.84,15.6
      return intrst >= 1;
    })
    .reduce((acc, intrsst, i, arr) => {
      console.log('positive interests ' + arr); //positive interests 2.4,5.4,36,15.6
      return acc + intrsst;
    }, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

//-------
//VIDEO : COMPUTING USERNAMES
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
console.log(accounts);

const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); //why we CAN SET this property on the ACTUAL ACCOUNT object, by the variable that we received as a function argument?????????????----------->SINCE all of these different references do actually point to exactly same object in memory heap
  const formattedBal = formatCurr(acc.balance, acc.locale, acc.currency);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formattedBal;
};

const updateUI = function (acc) {
  //display movements
  displayMovements(acc);
  // display balance
  calcAndDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
  console.log('LOGIN');
};

/////////////////////////
//Event Handlers Right here :
//Global scope
let currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// /experimenting with the Internationalization API
//ISO language code table----lingoes
const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long',
// };
// const locale = navigator.language;
// console.log(locale);
// //'mr-IN'
// labelDate.textContent = new Intl.DateTimeFormat('mr-IN', options).format(now);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from submitting
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    //display UI and Welcome Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    const locale = navigator.language;
    console.log(locale);
    //'mr-IN'
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the transfer--------if valid
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer date

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //update ui

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); //also does the type coercion
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add the movement
      currentAccount.movements.push(amount);
      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //update UI
      updateUI(currentAccount);
    }, 10000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  inputTransferAmount.value = inputTransferTo.value = '';

  console.log('Delete');
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

// LECTURES

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//First video : SIMPLE ARRAY METHODS

//why arrays has methods?-------->methods are simply func attach to object-----so if we have array methods, so array themselves are also objects
//          0    1    2    3    4
let arr = ['a', 'b', 'c', 'd', 'e'];
//          4    3    2    1    0
console.log(arr.slice(2)); //(3) ['c', 'd', 'e']
//slice() return new sliced array-----does not mutate the original array
console.log(arr.slice(2, 4)); //start to end-1
//(2) ['c', 'd']
console.log(arr.slice(-2)); //(2) ['d', 'e']---------->-2 means simply extract the last two elements
console.log(arr.slice(-1)); //['e']--->-1 means simply extract the last two elements
console.log(arr.slice(1, -2)); //(2) ['b', 'c']
//the above line is like slice() starts extracting from index 1,all elements till -2 means that it skips only the last two elements

//below we use slice method to create a shallow copy
console.log(arr.slice()); //(5) ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); //(5) ['a', 'b', 'c', 'd', 'e']

//SPLICE      -->
// splice(start, deleteCount)
// same as slice() but difference is it actually mutates the original array
//splice() actually deletes the extracted part

// console.log(arr.splice(2)); //(3) ['c', 'd', 'e']
// console.log(arr); //(2) ['a', 'b']
// //splice() actually deletes the extracted part
// console.log(arr.splice(-1)); //['b'];
// console.log(arr); //['a']
let arr1 = ['p', 'q', 'r', 's', 't', 'u', 'v'];
console.log(arr1.splice(1, 2)); //(2) ['q', 'r']
console.log(arr1); //(5) ['p', 's', 't', 'u', 'v']

//REVERSE-------MUTATES The original ARRAY
arr1 = ['p', 'q', 'r', 's', 't', 'u', 'v'];
console.log(arr1);
const arr2 = ['j', 'k', 'i', 'l', 'm'];
console.log(arr2.reverse()); //(5) ['m', 'l', 'i', 'k', 'j']
console.log(arr2); //(5) ['m', 'l', 'i', 'k', 'j']

// CONCAT-------->doesnt mutate the involved arrays
const letters = arr1.concat(arr2);
console.log(letters);
console.log([...arr1, ...arr2]);

// JOIN-------->USE JOIN Methodto convert array to string
console.log(letters.join(' - ')); //p - q - r - s - t - u - v - m - l - i - k - j
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//VIDEO TITLE:---- The new at() method
const arr3 = [23, 11, 64];
console.log(arr3[0]); //23
console.log(arr3.at(0)); //23

console.log(arr3[arr3.length - 1]); //64
console.log(arr3.slice(-1)); //[64]
console.log(arr3.slice(-1)[0]); //64
console.log(arr3.at(-1)); //64
//we will use at method when we want to do method chaining
//at method also works on string as shown below
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//VIDEO TITLE:----

//positive value--deposit and negative value--withdraw
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log('You deposited' + movement);
//   } else {
//     console.log('You withdrawed' + Math.abs(movement));
//   }
// }
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} :You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} :You withdrewed ${Math.abs(movement)}`);
  }
}

console.log('-----------------------------------');
//forEach() is HOF and we pass the callback function as argument.
//what forEach() does is it loop over the array and in each iteration it will execute the callback function, and to callback function it pass current  element as an argument to the callback function
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log('You deposited' + movement);
//   } else {
//     console.log('You withdrawed' + Math.abs(movement));
//   }
// });

//below argumnets are current element,current index , entire array through which we are looping through.
//here the order matters
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} :You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} :You withdrewed ${Math.abs(movement)}`);
  }
});

//you cannot break from forEach Loop---so situation where u need to break from a loop simply use for-of loop

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////////////////////////////
// forEach With Maps and Sets
// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //In JS we use (_)underscore where we want unwanted variable and it is called as throw away variable.

// // Set-->in case of set below key===value because they are same ie set does not have key value.

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

//In JS we use _ where we want unwanted variable and it is called as throw away variable.
//'_' here is used to keep the same method signature
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });
/////////////////////////////////////////////////
//PROJECT : "BANKIST APP"
//VIDEO: Creating DOM ELEMENTS:

/////////////////////////////////////////////////

//Coding challenge #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

const arrJuliaData1 = [3, 5, 2, 12, 7];
const arrKateData1 = [4, 1, 15, 8, 3];

checkDogs([...arrJuliaData1], [...arrKateData1]);

*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//VIDEO TITLE:----The map Method  =>  Takes an array loops over an array and in each iteration it applies a callback function that we specify in our code and map returns a new array containing the results of applying an operation on all original array elements

const eurToUsd = 1.1; //ie 1eur=1.1$

console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movementsUSD); //new array with new elements

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}

console.log(movementsUSDfor);

//map() has access to same args as that of forEach()
const movementsDescription = movements.map((mov, i, arr) => {
  return `Movement ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});
console.log(movementsDescription); //(8) ['Movement 1 :You Deposited 200', 'Movement 2 :You Deposited 450', 'Movement 3: You withdrewed 400', 'Movement 4 :You Deposited 3000', 'Movement 5: You withdrewed 650', 'Movement 6: You withdrewed 130', 'Movement 7 :You Deposited 70', 'Movement 8 :You Deposited 1300']
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//video: filter() method
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
// console.log(movements);
// console.log(deposits);
const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//video: reduce() method
// ----> has 2 parameters a callback function and a initial value of an accumulator. The callback function has 4 input parameters accumulator,curr element,current index and an array
//--->reduce() is just to boiling down the array to a single value, that value can be whatever we want
console.log(movements);
//accumulator is like a snowball effect it gets bigger and bigger

// const balance11 = movements.reduce(function (accumulator, curr, i, arr) {
//   console.log(`Iteration ${i} :  ${accumulator}`);
//   return accumulator + curr;
// }, 0);

//using arrow function
const balance11 = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
console.log(balance11);

//same thing using for loop
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

//maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov; //returning mov as a new acc in next iteration
  }
}, movements[0]);

console.log(max);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  const adultAges = ages
    .map(function (age) {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(age => age >= 18);

  // const average =
  //   adultAges.reduce(function (acc, age) {
  //     return acc + age;
  //   }, 0) / adultAges.length;

  //Above codes alternative way
  const average = adultAges.reduce(function (acc, age) {
    return acc + age / adultAges.length;
  }, 0);

  return average;
};
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));//method call
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));//method call
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Video: Magic of Chaining

//PIPELINING Operations...
console.log('movements ' + movements);

//we can inspect the current array at any stage of pipeline using the 3rd parameter of the callback function.
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// adults.length

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//VIDEO : find() method
//------>To retrieve one element of an array based on condition
const firstWithdrawal = movements.find(mov => mov < 0);
//find()--->It wont return a new array but, the "first" element that satisfies the condition
//filter() --> returns all the elements that match the condition
// filter()--> return a new array
//find()---> only return a first element that satisfy the consition
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// for (const account1 of accounts) {
//   if (account1.owner === 'Jessica Davis') {
//     console.log(account1);
//     break;
//   }
// }

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//VIDEO :findIndex()----->works almost same as find()------>returns the index of found element and not the element
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//VIDEO : findlast() and findlastIndex() methods
// console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);

//SMALL CHALLENGE
const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 2000
);
// console.log(
//   `Your latest large movement was ${
//     movements.length - latestLargeMovementIndex
//   } movements ago`
// );
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//VIDEO  : some and every methods

console.log(movements);
console.log(movements.includes(-130)); //to test for equality

//what if we want something to test for a CONDITION----->some()
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

console.log(movements.some(mov => mov === -130));
console.log('----------------------------------------------------------');
//every()---->every() returns true, only if all of the elements in the array satisfies the condition that we pass in.

console.log(account4.movements.every(mov => mov > 0));

//separate callback
const depposit = mov => mov > 0;
console.log(account3.movements.every(depposit));
console.log(account2.movements.filter(depposit));
console.log(account1.movements.some(depposit));

//==============================================================================================
//VIDEO : flat() and flatMap()
const arrayy = [[1, 2, 3], [4, 5, 6], 7, 8, 9, 0]; //Nested Array
console.log(arrayy.flat()); //removed the nested arrays and flatten the nested array
const arrayDeep = [
  [[1, 2, 3], [4, 5, 6, 44], [32, 45, 56], 555],
  [1, 2, 34, 5556],
  [34, 54, 675, 78],
  777,
  897,
];
console.log(arrayDeep.flat()); //(14) [Array(3), Array(4), Array(3), 555, 1, 2, 34, 5556, 34, 54, 675, 78, 777, 897]
//Above here internal nesting wont get flatten, since the flat() only goes 1 level deep

//below here 2 that we specified is the level of nesting
console.log(arrayDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 44, 32, 45, 56, 555, 1, 2, 34, 5556, 34, 54, 675, 78, 777, 897]

//calculate overall balance of all the movements of all the accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(`${overalBalance}€`);

//flat
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
//flatMap
const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

///////////////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1.
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2.
const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes('fetch') && breed.activities.includes('running')
).breed;
console.log(dogBothActivities);

// 3.
// const allActivities = breeds.map(breed => breed.activities).flat();
const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5.
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes('swimming'))
      .flatMap(breed => breed.activities)
      .filter(activity => activity !== 'swimming')
  ),
];
console.log(swimmingAdjacent);

// 6.
console.log(breeds.every(breed => breed.averageWeight > 10)); //for every() if just one of the element does not satisfy the condition then the whole thing becomes false---->Its little bit like the && but applied to all of the elements, whereas the some() is more like the || operator

// 7.
console.log(breeds.some(breed => breed.activities.length >= 3)); //some() is more like the || operator

// BONUS
const fetchWeights = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);
const heaviestFetchBreed = Math.max(...fetchWeights); //Math.max() wont accpet the array it wants the values separated by comma.

console.log(fetchWeights);
console.log(heaviestFetchBreed);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------
//VIDEO : SORTING ARRAYS

//by default sort() does the sorting based on strings thats why it doesnt work as in case of NUMBERs i.e for our movements array

//STRINGS
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //['Adam', 'Jonas', 'Martha', 'Zach'];

//NUMBERS
console.log(movements);
// console.log(movements.sort()); //wont work since convert numbers  to string then sort according to LEXOCOGRAPHICAL WAY

//in a callback fn if we return <0, then a will be before b
// //in a callback fn if we return >0, then a will be after b
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return 1;
//     if (b > a) return -1;
//   })
// ); //a, b are simply 2 consecutive numbers--->here array will be sorted in ascending order

console.log(movements.sort((a, b) => a - b)); //another way to sort
///////////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VIDEO :ARRAY GROUPING
// --------->group values in an array based on a condition
console.log(movements);
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposit' : 'withdrawal'
);
// console.log(groupedMovements); // {withdrawal: Array(3), deposit: Array(5)}

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
// console.log(groupedByActivity);

//use case: This grouping makes more sense when used with objects, and then grouping simply by one of the object property
// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// console.log(groupedAccounts);

const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);
///////////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VIDEO :MORE WAYS OF CREATING AND FILLING ARRAYS
//---->how to progamaticaaly create and fill arrays
console.log([11, 223, 4566, 7, 8, 9, 57]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

//using array constructor function
//empty arrays + fill() method
const x = new Array(7); //new array with 7 empty elements
console.log(x); //(7) [empty × 7]
console.log(x.map(() => 5)); //(7) [empty × 7]--------->NO CHANGE, therefore we need to fill array using fill() method

// console.log(x.fill(5)); //(7) [5, 5, 5, 5, 5, 5, 5]----------->mutate the underlying array

//fil() is little bit similar to slice()
// console.log(x.fill(1, 3));//(7) [empty × 3, 1, 1, 1, 1]
// console.log(x.fill(1, 3, 5)); //(7) [empty × 3, 1, 1, empty × 2]
//-==============================================================

//using from() on Array constructor and making array programatically
//Array.from() was introduced in JS inorder to create arrays from array like structures, ex. Iterables
//array like data structures is the result of using querySelectorAll which returns NodeList, which is not a real array, so we cant use array methods on that like map, filter etc, so inorder to use methods on that we need to convert NodeList to array.
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (current, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    element => Number(element.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

///////////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///VIDEO TITLE :non desctructive alternatives---> toreversed,tosorted,tospliced
//we will learn the alternatives of reverse, sort and splice method since these methods actually mutate the array

console.log(movements);
// const reversedMovements = movements.reverse();
// //movements.slice().reverse()    --> will create shallow copy
const reversedMovements = movements.toReversed(); //NON DESTRUCTIVE since wont change the original movements array
console.log(reversedMovements);
// console.log(movements); //REVERSED so, here the original array is mutated so this reverse() is destructive method

//toSorted() as sort() , toSpliced() as splice()
// movements[1] = 2000;
const newMovements = movements.with(1, 2000); //here
console.log(newMovements); //
console.log(movements);
////////////////////////////////////////////////////////////////////////////
//Array Methods Practice
console.log('----------------------------1-------------------------------');

// const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);
console.log('-----------------------------2------------------------------');
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, current) => {
  //   return current > 1000 ? count + 1 : count;
  // }, 0);//will work
  .reduce((count, current) => {
    return current > 1000 ? ++count : count; //WONT work here since used increment operator
  }, 0);
console.log(numDeposits1000);

let a = 10;
console.log(a++); //10----will increment by one but will return the previous value
console.log(a); //11
console.log('---------------------------3--------------------------------');
// how to use something other than a primitive value as the accumulator---here we used object in JS.
const { deps, withs } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deps += curr) : (sums.withs += curr);
      sums[curr > 0 ? 'deps' : 'withs'] += curr;
      return sums;
    },
    { deps: 0, withs: 0 }
  );

console.log(deps, withs);
console.log('---------------------------4--------------------------------');
//this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/

/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog eats too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3.
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersTooMuch);
console.log(ownersTooLittle);

// 4.
console.log(`${ownersTooMuch.join(' and ')}'s dogs are eating too much`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs are eating too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const checkEatingOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;

console.log(dogs.every(checkEatingOkay));

// 7.
const dogsEatingOkay = dogs.filter(checkEatingOkay);
console.log(dogsEatingOkay);

// 8.
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood) {
    return 'too-much';
  } else if (dog.curFood < dog.recFood) {
    return 'too-little';
  } else {
    return 'exact';
  }
});
console.log(dogsGroupedByPortion);

// 9.
const dogsGroupedByOwners = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}-owners`
);
console.log(dogsGroupedByOwners);

// 10.
const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
