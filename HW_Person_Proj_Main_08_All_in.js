// **********
// SB E01:
//

// edit function with prompt

// ****************
// level 01: main
// ****************
let person_data_base = [];
defining_first_data_base();

console.log(`************
data before change:
***************`);
console.table(person_data_base);

choose_action();
console.log(`************
data after change:
***************`);

console.table(person_data_base);

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

  this.age = () => {
    let now_date = new Date();
    let temp_birthday = new Date(this.birthday);
    let difrance = new Date(now_date - temp_birthday);
    let age = difrance.getFullYear() - 1970;
    return age;
  };
  this.print = () => {
    console.log(`----------------------
  ${this.f_name} , ${this.l_name} | ${this.id}
  city: ${this.city}
  bitrhday: ${this.birthday.getDate()}/${this.birthday.getMonth()}/${this.birthday.getFullYear()}
  age: ${this.age()}
----------------------
  `);
  };
}

// E00: main intefface
function choose_action() {
  let action_kind = Number(
    prompt(`chooe action  :

  ****Main actions****
  [1]- Insert person
  [2]- delete person and kids
  [3]- edit person (can;t edit birthday)
  [4]- print person and choose if to print his children
  [5]-look for person by value

  ****Reports****
  [6]-show men above age
  [7]- show person kids
  [8]- show personn that :
  even month birthday or 
  at least 2 kids or
  firrst or last name of his or kids are olindrom
  [9]-show all persons by city
  [10]- Exit 
  
  `)
  );

  if (!check_if_valid_number(action_kind)) {
    choose_action();
  } else {
    switch (action_kind) {
      case 1:
        insert_person();
        break;
      case 2:
        delete_person_and_kids2();
        break;
      case 3:
        edit_person();
        break;
      case 4:
        print_person();
        break;
      case 5:
        find_person_by_text_or_id_and_print();
        break;

      // reports:
      case 6:
        show_men_above_age();
        break;
      case 7:
        show_man_kids();
        break;
      case 8:
        show_only_one_person_with_one_of_three_conditions();
        break;
      case 9:
        show_city_citisen();
        break;
      case 10:
        console.log("exit");
        break;

      default:
        choose_action();
    }
  }
}
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

  person_data_base.push(
    new Person(f_name, l_name, id, city, birthday, parant_id)
  );
}

// E02: delete a person

function delete_person_and_kids2() {
  // with a reqursion. delete all decindens

  let id = get_id("id with 9 digit", false);
  // alert("DDD " + id);
  try {
    if (check_if_exist_exact_in_data(person_data_base, "id", id) == false)
      throw "doesn't exist";
  } catch (err) {
    console.log(err);
    delete_person_and_kids2(person_data_base);
  }
  // alert("CCC " + id);
  delete_person_and_kids_reqursion(id);
  console.log("finish deleting");
}

// E04: edit person

function edit_person() {
  // with prompt.
  let flag = true;
  let new_value = "";
  let id = get_id_make_actions(
    person_data_base,
    "please enter id with 9 digit to edit property"
  );
  let field_name = "";
  let field_get_name = "";
  do {
    let arr_filed = get_filed_name_to_edit();
    field_name = arr_filed[0];
    field_get_name = arr_filed[1];

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

// E05:print person and choose of to print kids
function print_person() {
  let p = get_id_make_actions(
    person_data_base,
    "please enter id with 9 digit to be printed"
  );
  let bool_print_kids = confirm("Do you want to print also kids?");
  print_single_person(p);
  if (bool_print_kids) {
    let kids = person_data_base.filter((v) => v.parant_id == p);
    try {
      if (kids == "") throw "no kids was found";
    } catch (err) {
      console.log(err);
      return false;
    }
    console.log(`----------------------
  his kids are :
----------------------`);
    kids.forEach((v) => v.print());
  } else {
    console.log("you choose not to print kids");
  }
}

// E06: find a person
function find_person_by_text_or_id_and_print() {
  let choose_flag = true;
  let choose_filed_kind = 0;
  do {
    choose_filed_kind = Number(
      prompt(`Please pick what you want yo search:
  [1]- Text: For first & last name
  [2]- ID`)
    );
    choose_flag =
      check_if_valid_number(choose_filed_kind) &&
      choose_filed_kind <= 2 &&
      choose_filed_kind > 0;
  } while (!choose_flag);

  switch (choose_filed_kind) {
    case 1:
      let str_to_search = get_string("char to look for");
      let arr_person_includes_text = check_if_text_includes_in_data(
        person_data_base,
        id_to_search
      );
      if (arr_person_includes_text != "") {
        print_persons_array(arr_person_includes_text);
      } else {
        console.log(`no persons  name includes: ${str_to_search}`);
      }
      break;
    case 2:
      let id_to_search = get_id("exact ID to search", false);
      // debugger;

      let id_exist = check_if_exist_exact_in_data(
        person_data_base,
        "id",
        id_to_search,
        true
      );

      if (id_exist != false) {
        print_single_person(id_exist.id);
      } else {
        console.log(`no persons  id : ${id_to_search}`);
      }
      break;
    default:
      console.log(eror);
      find_person_by_text_or_id_and_print();
  }
}

// *******************
// level 03: support function
// *******************

function delete_person_and_kids_reqursion(id) {
  let arr_kids_of_parent = find_all_kids(person_data_base, id);
  arr_kids_of_parent.forEach((v) => {
    delete_person_and_kids_reqursion(v.id);
  });
  let idx = find_index_in_arr_object(person_data_base, "id", id);
  person_data_base.splice(idx, 1);
}

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

function get_id_make_actions(arr, str) {
  let flag = true;
  let id = "";
  do {
    id = prompt(str);
    flag = check_valid_id(id);
    flag == true && (flag = check_if_exist_exact_in_data(arr, "id", id, false));
  } while (flag == false);
  return id;
}

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

function find_index_in_arr_object(arr, field_name, str) {
  return arr.findIndex((v) => v[field_name] == str);
}

function get_list_of_fields_from_object_array(arr, field_name) {
  let list_arr = [];
  arr.forEach((v) => list_arr.push(v[field_name]));
  return list_arr;
}

function find_all_kids(arr, str) {
  let arr_kids = find_all_excat_in_field(arr, "parant_id", str);
  return arr_kids;
}

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

function print_persons_array(arr) {
  for (i of arr) {
    print_single_person(i.id);
  }
}

function print_single_person(id) {
  let inx_person_in_arr = find_index_in_arr_object(person_data_base, "id", id);

  person_data_base[inx_person_in_arr].print();
}

function get_string(str_type) {
  let str = "";
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_string(str);
  } while (flag == false);
  return str;
}

function get_id(str_type, uniq_id = true) {
  let flag = false;
  let id = "";

  while (flag == false) {
    id = prompt(`Please enter ${str_type}`);
    flag = check_valid_id(id);
    flag == true &&
      uniq_id &&
      (flag = check_if_uniqe(person_data_base, "id", id));
  }

  return id;
}

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

function get_date(str_type) {
  let str = "";
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_date(str);
  } while (flag == false);
  return str;
}

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
    return arr.find((v) => v[field_name] == str);
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

function check_if_can_edit_filed(field_name) {
  try {
    if (field_name == "birthday") throw "can't edit birthday field";
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

function check_valid_string(str) {
  try {
    if (str == "" || str == null || str == undefined) throw "empty";
    if (String(str).search(/\d/) >= 0) throw "contain a number";
    if (String(str).length > 20) throw "string more than 20 char";
    if (String(str).trim() == "") throw "contain only space";
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

// *********
// level 06: define first DB
// ***********

function defining_first_data_base() {
  let p1 = new Person(
    "adfga",
    "ada",
    "111111111",
    "aaaa",
    "1985-12-01",
    "111111121"
  );
  let p2 = new Person(
    "bsdb",
    "bdfgb",
    "211111111",
    "bbbb",
    "1987-11-02",
    "111111111"
  );
  let p3 = new Person(
    "cbfgbc",
    "dadfd",
    "311111111",
    "aaaa",
    "1987-10-03",
    "111111111"
  );
  let p4 = new Person(
    "dasdd",
    "aaddfs",
    "411111111",
    "aaaa",
    "1987-11-04",
    "211111111"
  );
  let p5 = new Person(
    "ebbe",
    "sdfr",
    "511111111",
    "aaaa",
    "1987-08-05",
    "311111111"
  );
  let p6 = new Person(
    "fhjf",
    "ferf",
    "611111111",
    "aaaa",
    "1987-11-06",
    "411111111"
  );
  let p7 = new Person(
    "gkkg",
    "gdfg",
    "711111111",
    "aaaa",
    "1987-11-07",
    "111111111"
  );

  let p8 = new Person(
    "gYOs ",
    "fos",
    "121111111",
    "aa",
    "1987-02-07",
    "311111111"
  );
  let p9 = new Person(
    "yossoy",
    "yos",
    "131111111",
    "aa",
    "1987-11-07",
    "123556789"
  );
  let p10 = new Person(
    "l9l",
    "GGxdcdGG",
    "231111111",
    "aa",
    "1987-11-07",
    "211111111"
  );
  let p11 = new Person(
    "geqef",
    "GGYos",
    "151111111",
    "aa",
    "1985-11-07",
    "411111111"
  );
  let p12 = new Person(
    "gedef",
    "GGddYos",
    "156111111",
    "aa",
    "1985-11-07",
    "411111111"
  );
  let p13 = new Person(
    "gdfdf",
    "GGdfYos",
    "157111111",
    "aa",
    "1985-11-07",
    "123456789"
  );
  let p14 = new Person(
    "gf",
    "GGYos",
    "158111111",
    "aa",
    "1985-11-07",
    "123456789"
  );
  let p15 = new Person(
    "gwwf",
    "GGYos",
    "159111111",
    "aa",
    "1985-11-07",
    "123456789"
  );
  let p16 = new Person(
    "gqwf",
    "GGPP",
    "159211111",
    "aa",
    "1985-11-07",
    "411111111"
  );

  person_data_base = [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    p15,
    p16,
  ];
}

// TEMP: alternative data

// let p1 = new Person("adfga", "ada", "1", "aaaa", "1985-12-01", "9");
// let p2 = new Person("bsdb", "bdfgb", "2", "bbbb", "1987-11-02", "1");
// let p3 = new Person("cbfgbc", "dadfd", "3", "aaaa", "1987-10-03", "1");
// let p4 = new Person("dasdd", "aaddfs", "4", "aaaa", "1987-11-04", "2");
// let p5 = new Person("ebbe", "sdfr", "5", "aaaa", "1987-08-05", "3");
// let p6 = new Person("fhjf", "ferf", "6", "aaaa", "1987-11-06", "2");
// let p7 = new Person("gkkg", "gdfg", "7", "aaaa", "1987-11-07", "3");

// let p8 = new Person("gYOs ", "fos", "8", "aa", "1987-02-07", "6");
// let p9 = new Person("yossoy", "yos", "9", "aa", "1987-11-07", "99");
// let p10 = new Person("l9l", "GGxdcdGG", "10", "aa", "1987-11-07", "99");
// let p11 = new Person("geqef", "GGYos", "11", "aa", "1985-11-07", "99");
// let p12 = new Person("gedef", "GGddYos", "12", "aa", "1985-11-07", "98");
// let p13 = new Person("gdfdf", "GGdfYos", "13", "aa", "1985-11-07", "98");
// let p14 = new Person("gf", "GGYos", "14", "aa", "1985-11-07", "98");
// let p15 = new Person("gwwf", "GGYos", "15", "aa", "1985-11-07", "97");
// let p16 = new Person("gqwf", "GGPP", "16", "aa", "1985-11-07", "41119711111");
