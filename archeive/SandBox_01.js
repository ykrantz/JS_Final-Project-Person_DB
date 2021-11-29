// alert("Sand Box");

// **********
// SB E01:
//

// *******************
// level 0
// *******************

// *******************
// level 01: main
// *******************

// *******************
// level 02: key function
// *******************

function Person(f_name, l_name, id, city, birthday, parant_id) {
  this.f_name = f_name;
  this.L_name = l_name;
  this.id = id;
  this.city = city;
  this.birthday = new Date(birthday);
  this.parant_id = parant_id;
}

// let p1 = new Person("yossi", "kar", 0900909, "jersi", "1987-11-30");

function insert_person() {
  let f_name = get_string("first name");
  let l_name = get_string("last name");
  let id = get_id("id with 9 digit", true);
  let city = get_string("city");
  let birthday = get_date("birthday (YYYY-MM-DD)");
  let parant_id = get_id(
    "parent id with 9 digit or press ok if there is no parent",
    false
  );
  // TODO :to check if parent exsists already

  // let temp_person = new Person(f_name, l_name, id, city, birthday, parant_id);
  return new Person(f_name, l_name, id, city, birthday, parant_id);
}

// *******************
// level 03: support function
// *******************

function get_string(str_type) {
  let str = "";
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_string(str);
  } while (flag == false);
  return str;
}

// let x = get_string("last name");
// console.log(x);

function get_id(str_type, need_id) {
  let flag = false;
  let flag_single = true;
  let str = "";
  do {
    while (flag == false) {
      str = prompt(`Please enter ${str_type}`);
      flag = check_valid_id(str, need_id);
      flag_single = true;
    }
    if (str == "" && need_id == false) {
      flag_single = confirm("Are you single?");
      flag_single ? (str = "000000000") : (flag = false);
    }
  } while (!flag_single);
  return str;
}
// let x3 = get_id("id with 9 digit parent", false);
// console.log(x3);
// let x4 = get_id("id with 9 digit ", true);
// console.log(x4);

function get_parent_id(str_type) {
  let flag = false;
  while (flag == false) {
    str = prompt(`Please enter ${str_type}`);

    if (str !== "") {
      flag = check_valid_id(str, need_id);
    } else {
      flag_single = confirm("Are you single?");
      flag_single ? (str = "000000000") : (flag = false);
    }
  }
}

function get_date(str_type) {
  let str = "";
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_date(str);
  } while (flag == false);
  return str;
}

// *******************
// level 04: validate function
// *******************

function check_valid_string(str) {
  try {
    if (str == "" || str == null || str == undefined) throw "empty";
    if (String(str).search(/\d/) >= 0) throw "contain a number";
    if (String(str).length > 20) throw "string more than 20 char";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

//  id-9 digits. if true id cant be empty. if false, id can  be empty
function check_valid_id(id, need_id) {
  if (need_id) {
    try {
      if (id == "" || id == null || id == undefined) throw "empty";
      if (id == null || id == undefined) throw "you press cancel";
      if (isNaN(id)) throw "contains a char";
      if (String(id).length != 9) throw "doesn't contain 9 digits";
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    try {
      if (id == null || id == undefined) throw "you press cancel";
      if (isNaN(id)) throw "contains a char";
      if (String(id).length != 9 && String(id).length > 0)
        throw "doesn't contain 9 digits";
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return true;
}

// date needs to be less then this date
function check_valid_date(the_date) {
  let temp_date = new Date(the_date);
  let now_date = new Date(Date());
  try {
    if (temp_date == "Invalid Date") throw "Invalid Date";
    if (temp_date > now_date) throw "in future";
    if (temp_date.getFullYear() < 1900) throw "less than 1900";
    if (String(the_date).length < 8) throw "date too short";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

// let x2 = get_birth_day("birth");
// console.log(x2);

// let p5 = insert_person();
// console.log(p5);
