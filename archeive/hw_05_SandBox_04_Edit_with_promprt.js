// alert("Sand Box");

// **********
// SB E01:
//

// edit function with prompt

// ****************
// level 01: main
// ****************

let p1 = new Person("aa", "aaa", 111111111, "aaaa", "1985-12-01", "111111121");
let p2 = new Person("bb", "bbb", 211111111, "bbbb", "1987-11-02", "111111122");
let p3 = new Person("cc", "dd", 311111111, "aaaa", "1987-11-03", "111111111");
let p4 = new Person("dd", "ccc", 411111111, "aaaa", "1987-11-04", "111111124");
let p5 = new Person("ee", "eee", 511111111, "aaaa", "1987-11-05", "111111111");
let p6 = new Person("ff", "fff", 611111111, "aaaa", "1987-11-06", "111111126");
let p7 = new Person("gg", "ggg", 711111111, "aaaa", "1987-11-07", "111111127");

let p8 = new Person("gYOs ", "fos", 111111111, "aa", "1987-11-07", "111111127");
let p9 = new Person("yos", "yos", 111111111, "aa", "1987-11-07", "111111127");
let p10 = new Person("gg", "GGYos", 111111111, "aa", "1987-11-07", "111111127");
let p11 = new Person("gf", "GGYos", 111111111, "aa", "1987-11-07", "111111127");

let person_data_base = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];
console.table(person_data_base);

// console.table(person_data_base);

// *******************
// level 02: key function
// *******************

// E00: create a object

function Person(f_name, l_name, id, city, birthday, parant_id) {
  this.f_name = f_name;
  this.l_name = l_name;
  this.id = id;
  this.city = city;
  this.birthday = new Date(birthday);
  this.parant_id = parant_id;
}

// print_person(p1, true, person_data_base);
// print_person(p2, true, person_data_base);

// E01: insert person
function insert_person() {
  let f_name = get_string("first name");
  let l_name = get_string("last name");
  let id = get_id("id with 9 digit");
  let city = get_string("city");
  let birthday = get_date("birthday (YYYY-MM-DD)");
  let parant_id = get_parent_id(
    "parent id with 9 digit or press ok if there is no parent"
  );

  // let temp_person = new Person(f_name, l_name, id, city, birthday, parant_id);
  person_data_base.push(
    new Person(f_name, l_name, id, city, birthday, parant_id)
  );
  // return new Person(f_name, l_name, id, city, birthday, parant_id);
}
// insert_person();

// E02: delete a person

function delete_person_and_kids(arr, id) {
  try {
    if (check_valid_id(id) == false) throw "id not valid";
    if (check_if_exist_exact_in_data(arr, "id", id) == false)
      throw "doesn't exist";
  } catch (err) {
    console.log(err);
    return false;
  }
  let arr_kids_of_parent = find_all_kids(arr, id);

  if (arr_kids_of_parent == "") {
    console.log("no kids to delete");
  } else {
    delete_person_array(
      arr,
      get_list_of_fields_from_object_array(arr_kids_of_parent, "id")
    );
  }

  delete_person_array(arr, id);
}
// console.log("before delet");
// console.table(person_data_base);

// delete_person_and_kids(person_data_base, "111111111");
// console.log("after delet");
// console.table(person_data_base);

// E04: edit person

function edit_person() {
  // with prompt.
  // TODO: fix so can't edit perent number same ass id number
  let flag = true;
  let new_value = "";
  let id = get_id_to_edit(person_data_base);
  let field_name = "";
  let field_get_name = "";
  do {
    let arr_filed = get_filed_name_to_edit();
    field_name = arr_filed[0];
    field_get_name = arr_filed[1];
    console.log("FFF");
    console.log(field_name);
    console.log(field_get_name);

    if (
      field_name == "f_name" ||
      field_name == "l_name" ||
      field_name == "city"
    ) {
      new_value = get_string(field_get_name);
    } else if (field_name == "id") {
      new_value = get_id(field_get_name);
    } else if (field_name == "parant_id") {
      new_value = get_parent_id(field_get_name);
    }
  } while (flag == false);

  let old_value =
    person_data_base[find_index_in_arr_object(person_data_base, "id", id)][
      field_name
    ];
  person_data_base[find_index_in_arr_object(person_data_base, "id", id)][
    field_name
  ] = new_value;
  console.log(`Person id: ${id} was updated.\n
  the old value in property ${field_name} was:${old_value}.\n
  The new value is: ${new_value}`);
}

// edit_person();
// console.log("new");
// console.table(person_data_base);

function print_person(p, bool_print_kids, arr) {
  if (bool_print_kids) {
    print_single_person(p);
    let kids = arr.filter((v) => v.parant_id == p.id);
    try {
      if (kids == "") throw "no kids was found";
    } catch (err) {
      console.log(err);
      return false;
    }
    console.log(`----------------------
  the kids of ${p.f_name}, ${p.f_name} :
----------------------`);
    kids.forEach((v) => print_single_person(v));
  } else {
    print_single_person(p);
  }
}

// E06: find a person
function find_person_by_text_or_id_and_print(arr, bool_type_of_search, str) {
  // type of search:
  // true- excaxt: for id
  //  false- includes: for text . looks in first and last name

  try {
    if (str == "") throw "empty";
    if (String(str).trim() == "") throw "contain only space";
  } catch (err) {
    console.log(err);
    return false;
  }

  if (bool_type_of_search == true) {
    check_valid_id(str);
  } else {
    check_valid_string(str);
  }

  if (bool_type_of_search) {
    let id_exist = check_if_exist_exact_in_data(arr, "id", str, true);
    if (id_exist != false) {
      print_single_person(id_exist);
    } else {
      console.log(`no persons  id : ${str}`);
    }
  } else {
    let arr_person_includes_text = check_if_text_includes_in_data(
      person_data_base,
      str
    );
    if (arr_person_includes_text != "") {
      print_persons_array(arr_person_includes_text);
    } else {
      console.log(`no persons  name includes: ${str}`);
    }
  }
}
// find_person_by_test_or_id(person_data_base, 0, "f1");

// console.log(insert_person());

// *******************
// level 03: support function
// *******************

function get_filed_name_to_edit() {
  let flag_feild = true;
  let field_name = "";

  let field_get_name = "";
  do {
    let field_number = Number(
      prompt(`Pick which field name that you want to edit:\n
  [1]- f_name
  [2]- l_name
  [3]- id
  [4]- city
  [5]- parant_id
 
  `)
    );
    flag_feild = check_if_valid_number(field_number);

    switch (field_number) {
      case 1:
        field_name = "f_name";
        field_get_name = "first name";
        break;
      case 2:
        field_name = "l_name";
        field_get_name = "last name";
        break;
      case 3:
        field_name = "id";
        field_get_name = "id with 9 digit";
        break;
      case 4:
        field_name = "city";
        field_get_name = "city";
        break;
      case 5:
        field_name = "parant_id";
        field_get_name =
          "parent id with 9 digit or press ok if there is no parent";
        break;
      default:
        console.log("please choose valid number 1-5");
        flag_feild = false;
    }
  } while (flag_feild == false);
  return [field_name, field_get_name];
}

function get_id_to_edit(arr) {
  let flag = true;
  let id = "";
  do {
    id = prompt("please enter id with 9 digit to edit property");
    flag = check_valid_id(id);
    flag == true && (flag = check_if_exist_exact_in_data(arr, "id", id, false));
  } while (flag == false);
  return id;
}
// let x11 = get_id_to_edit(person_data_base);
// console.log(x11);

function delete_person_array(arr_data_base, id_arr_to_delete) {
  // if there is only one id to delete- its not a array. so we need to change it to array object
  // so the find method will work
  if (typeof id_arr_to_delete != "object") {
    id_arr_to_delete = [id_arr_to_delete];
  }
  id_arr_to_delete.forEach((v) => {
    arr_data_base.splice(find_index_in_arr_object(arr_data_base, "id", v), 1);
  });
}
// console.table(person_data_base);
// delete_person_array(person_data_base, "211111111");
// console.table(person_data_base);

function find_index_in_arr_object(arr, field_name, str) {
  return arr.findIndex((v) => v[field_name] == str);
}
// console.log(find_index_in_arr_object(person_data_base, "id", 331111111));

function get_list_of_fields_from_object_array(arr, field_name) {
  let list_arr = [];
  arr.forEach((v) => list_arr.push(v[field_name]));
  return list_arr;
}

// console.table(get_list_of_fields_from_object_array(person_data_base, "l_name"));

function find_all_kids(arr, str) {
  let arr_kids = find_all_excat_in_field(arr, "parant_id", str);
  return arr_kids;
}
// console.table(find_all_kids(person_data_base, "111411111"));

function find_all_excat_in_field(arr, field_name, str) {
  let arr_persons = arr.filter((v) => v[field_name] == str);
  return arr_persons;
}

function check_if_text_includes_in_data(arr, str) {
  // return array with persons that text includes
  // bool_exact: true
  str = String(str).toLowerCase();
  let person_array_includes_text = arr.filter(
    (v) =>
      v.f_name.toLowerCase().includes(str) ||
      v.l_name.toLowerCase().includes(str)
  );
  return person_array_includes_text;
}

// console.table(check_if_text_includes_in_data(person_data_base, "yos"));

function print_persons_array(arr) {
  for (i of arr) {
    print_single_person(i);
  }
}
// print_persons_array(person_data_base);

function print_single_person(p) {
  console.log(`----------------------
  ${p.f_name} , ${p.l_name} | ${p.id}
  city: ${p.city}
  bitrhday: ${p.birthday.getDate()}/${p.birthday.getMonth()}/${p.birthday.getFullYear()}
  age: ${calc_age(p.birthday)}
----------------------
  `);
}

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

function get_id(str_type) {
  let flag = false;
  let id = "";

  while (flag == false) {
    id = prompt(`Please enter ${str_type}`);
    flag = check_valid_id(id);
    flag == true && (flag = check_if_uniqe(person_data_base, "id", id));
  }

  return id;
}
// let x3 = get_id("id with 9 digit ");
// console.log(x3);
// let x4 = get_id("id with 9 digit ");
// console.log(x4);

function get_parent_id(str_type) {
  let flag = false;
  let id = "";
  let err_msg = "";
  while (flag == false) {
    id = prompt(`Please enter ${str_type}`);
    if (id !== "") {
      flag = check_valid_id(id);
      try {
        if (
          check_if_exist_exact_in_data(person_data_base, "id", id, false) ==
          false
        )
          throw "the id of parent doesn't exsist";
      } catch (err) {
        console.log(err);
        flag = false;
        msg_err = err;
      }
    } else {
      flag_single = confirm("Are you single?");
      if (flag_single) {
        id = "000000000";
        flag = true;
      } else {
        flag = false;
      }
    }
  }

  return id;
}

// let x6 = get_parent_id("id JJJ with 9 digit parent");
// console.log(x6);

function get_date(str_type) {
  let str = "";
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_date(str);
  } while (flag == false);
  return str;
}

// let x2 = get_birth_day("birth");
// console.log(x2);

// let p5 = insert_person();
// console.log(p5);

// *******************
// level 04: side  function
// *******************

function check_if_exist_exact_in_data(arr, field_name, str, bol_return_person) {
  // exists exatly
  //  bol_return_person:
  // true- if exists, the data of person will be returned
  // false- if exists, bolean true will be returnd

  if (arr.find((v) => v[field_name] == str) == undefined) {
    // msg_err="does'nt exist";
    console.log("doesn't exist");
    return false;
  } else if (bol_return_person) {
    return arr.find((v) => v[field_name]);
  } else {
    return true;
  }
}

function calc_age(birthday) {
  let now_date = new Date();
  let temp_birthday = new Date(birthday);
  let difrance = new Date(now_date - temp_birthday);
  let age = difrance.getFullYear() - 1970;
  return age;
}

// *******************
// level 05: validate function
// *******************

function check_if_valid_number(str) {
  str = Number(str);
  flag = true;

  try {
    if (str == null) throw "you pressed cancel";
    if (str == "") throw "empty";
    if (isNaN(str)) throw "not a number";
    // ****to check why it dos't work
    if (!Number.isInteger(str)) throw "not a integer";
  } catch (err) {
    console.log(err);
    flag = false;
  }
  return flag;
}

// console.log(check_if_valid_number("6J"));

function check_if_can_edit_filed(field_name) {
  try {
    if (field_name == "birthday") throw "can't edit birthday field";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
// console.log("GGG");
// console.log(check_if_can_edit_filed("birthday"));

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
function check_valid_id(id) {
  try {
    if (id == "" || id == null || id == undefined) throw "empty";
    if (id == null || id == undefined) throw "you press cancel";
    if (isNaN(id)) throw "contains a char";
    if (String(id).length != 9) throw "doesn't contain 9 digits";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

function check_if_uniqe(arr, field_name, str) {
  try {
    if (check_if_exist_exact_in_data(arr, field_name, str, false) == true)
      throw "not uniqe";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

// console.log(check_if_uniqe(person_data_base, "f_name", "yos"));

// let x7 = check_valid_id("1234ss56789");
// console.log(x7);

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
