// alert("Test")

// **********
// TEST 01:
// check the try catch with gandchild and grandpa

let a1 = [];
a1.forEach((v) => console.log("G"));
console.log("AAA");
let s = "assqqa";
console.log("DDDD");
console.log(s == s.split("").reverse().join(""));
console.log("DDDD");

let arr = [];

// let age = 19;
f1_grandparnet();
function f1_grandparnet() {
  try {
    console.log("111");
    f2_son_1(2);
    f3_son_2(3);
  } catch (err) {
    console.log(err);
  }
}
function f2_son_1(x) {
  try {
    f4_grandchild(x);
    if (x == 2) {
      console.log("4444");
      throw "trrow 4";
      console.log("after throw");
    }
  } catch (err) {}
  console.log(RRRRRRR);
  console.log("didnt throw2");
}
function f3_son_2(x) {
  if (x == 3) {
    console.log("55555");
    throw "trrow 5";
    console.log("after throw5");
  }
}
function f4_grandchild(x) {
  if (x == 4) {
    console.log("55555");
    throw "throw 4";
    console.log("after throw5");
  }

  console.log("didnt throw2");
}
//   catch (err) {
//     console.log(err);
//   }

// let welcome = age < 18 ? alert("Hello") : alert("Greetings!")
// welcome();

// function showCount(count) {
//   alert(count ?? "unknown");
// }
// showCount(""); // 0
// showCount(null); // unknown
// showCount(); // unknown

// let x = prompt("helow");

// if (x == null) {
//   console.log("nulllll");
// }
// if (x == "") {
//   console.log("empty");
// }

// s = "asdfg";
// console.log(s.split(""));

// let arr = [4, 3, 2, 10];
// let arr1 = ["d", "b", "f", "a"];

// console.log(arr.sort());
// console.log(arr1.sort());
// let a = 1;
// let a1 = [];
// a1.push(...a);
// a1.forEach((v) => console.log(v));
// console.log(a1);
// console.log("FFFFF");

// let a2 = [1, 3, 2];
// let a3 = [];
// a3.push(...a2);
// a3.forEach((v) => console.log(v));
// console.log(a3);
// arr_data_base = [1, 2, 3, 4, 5, 6];
// a.forEach((v) => {
//   arr_data_base.splice(v, 1);
// });
// console.table(arr_data_base);

// let s = "asdf";
// flag = Boolean(s.search(/\d/));
// console.log(flag);

// // **********

// let fruit = prompt("Which fruit to buy?", "apple");
// console.log(fruit);

// let d1 = new Date();
// let d2 = new Date("1921-01-03");

// console.log(d1, "  ", d2);
// d3 = new Date(d1 - d2);
// console.log(d3.getUTCFullYear() + "FFF");

// d4 = new Date(d1.getFullYear() - d2.getFullYear());
// console.log(d4.getUTCFullYear() + "aaa");

// d5 = new Date(d1 - d2);
// console.log(d5, "SSS");
// console.log(d5.getFullYear() - 1970 + "bbb");
// console.log(d5.getUTCFullYear() - 1970 + "ccc");

// // console.log(d1.getFullYear());

// // console.log(d1.getFullYear());
// // console.log(d2.getFullYear());
// // console.log(d1.getUTCFullYear());
// // console.log(d2.getUTCFullYear());
// function calc_age(birthday) {
//   let now_date = new Date();
//   birthday = new Date(birthday);
//   let difrance = new Date(now_date - birthday);
//   console.log(now_date);
//   console.log(birthday);
//   console.log(difrance);
//   age = difrance.getFullYear() - 1970;
//   return age;
// }

// console.log(calc_age("1985-12-03"));
// console.log(calc_age("1000-12-03"));
