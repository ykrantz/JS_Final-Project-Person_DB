// reports:

// חתכים, שאילתות ודו"חות
//  .1הצגת בני אדם מעל גיל מסוים )המשתמש מזין גיל(.
//  .2הצגת ילדים של אדם מסוים. )חיפוש ע"י ת"ז(
//  .3כל מי שעומד באחד התנאים הבאים:
//  .aנולד בחודש זוגי
//  .bיש לו  2ילדים לפחות
//  .cהשם שלו או של אחד הילדים שלו הוא פלינדרום )לדוג' דוד, שמש; גם בפרטי וגם במשפ'(
//  .4הצגת כל עיר והתושבים שלה.
// לדוגמא:
// רעננה
// -אדם 1
// -אדם 2
// חיפה
// -אדם 3
// הצגת האדם עפ"י התבנית של הדפסת אדם

// **********
// SB E01:
//
// TODO: prompt to choose:

// *******************
// reports:
// *******************
// *******************
// level 01: main
// *******************

// choose_report();

// *******************
// level 02: key functions
// *******************
function choose_report() {
  let report_kind = Number(
    prompt(`chooe report:
  [1]- show men above age
  [2]- show person kids
  [3]- show personn that :
  even month birthday or 
  at least 2 kids or
  firrst or last name of his or kids are olindrom
  [4]-show all persons by city
  [5]-exit 
  
  `)
  );

  if (!check_if_valid_number(report_kind)) {
    choose_report();
  } else {
    switch (report_kind) {
      case 1:
        show_men_above_age();
        break;
      case 2:
        show_man_kids();
        break;
      case 3:
        show_only_one_person_with_one_of_three_conditions();
        break;
      case 4:
        show_city_citisen();
        break;
      case 5:
        console.log("exit");
        break;
      default:
        choose_report();
    }
  }
}

// E07: man above certian age:

function show_men_above_age() {
  let flag_age = true;
  let age = "";
  do {
    age = prompt("please enter min age of peple to be shown");

    flag_age = check_valid_age(age);
    console.log(age);
  } while (flag_age == false);
  // let arr_persons = person_data_base.filter((v) => v["f_name"] == "gg");
  let arr_above_age = person_data_base.filter((v) => v["age"]() > age);

  if (arr_above_age.length > 1) {
    console.log(`The persons above age: ${age} are :`);
    arr_above_age.forEach((v) => print_single_person(v.id));
  } else {
    console.log(`No persons above age: ${age}`);
  }
}
//   console.log(show_men_above_age(36));
// show_men_above_age();

// E08: shpw man kids
function show_man_kids() {
  // let falg_kids=true;
  let parent_id_to_print = get_id(
    "Parent id (with 9 digit) that you want to find kids",
    false
  );
  let arr_kids = person_data_base.filter(
    (v) => v.parant_id == parent_id_to_print
  );

  if (arr_kids.length != 0) {
    console.log(`the kids of id : ${parent_id_to_print}`);
    arr_kids.forEach((v) => v.print());
  } else {
    console.log("no kids found");
  }
}

// show_man_kids();

// E09: show person with condition:

function show_only_one_person_with_one_of_three_conditions() {
  let arr_person_with_conditions = [];

  arr_person_with_conditions.push(
    ...person_with_enen_month(),
    ...person_with_2_kids_or_more(),
    ...person_or_kids_pilindron()
  );

  console.log("The persons that got aone of three conditions");

  console.table(remove_duplicate_in_array(arr_person_with_conditions));
}

// console.log("KKK");
// show_only_one_person_with_one_of_three_conditions();

// console.log(p1.birthday.getMonth() + 1);

// E09: show city and it citizen

function show_city_citisen() {
  let cities = get_cities_list();
  cities.forEach((v1) => {
    console.log(`********************
  Person in city ${v1}
******************`);
    person_data_base.filter((v2) => v2.city == v1).forEach((v) => v.print());
  });
}
// show_city_citisen();

// ****************
// level 03: side function
// ****************

function remove_duplicate_in_array(arr) {
  return arr.filter((v, idx) => arr.indexOf(v) == idx);
}

function person_with_enen_month() {
  return person_data_base.filter((v) => (v.birthday.getMonth() + 1) % 2 == 0);
}

function person_with_2_kids_or_more() {
  let arr_person_2_kids = [];
  person_data_base.forEach((v) => {
    if (find_all_kids(person_data_base, v.id).length >= 2) {
      arr_person_2_kids.push(v);
    }
  });
  return arr_person_2_kids;
}
// console.log("FF");
// console.table(person_with_2_kids_or_more());

function person_or_kids_pilindron() {
  let arr_person_polidrom = person_data_base.filter(
    (v) => check_if_pilindrom(v.f_name) || check_if_pilindrom(v.l_name)
  );
  let arr_the_person_kids_are_polidrom = [];
  // debugger;
  person_data_base.forEach((v1) => {
    let bool_kids_polidrom = false;
    find_all_kids(person_data_base, v1.id).forEach((v2) => {
      bool_kids_polidrom ||=
        check_if_pilindrom(v2.f_name) || check_if_pilindrom(v2.l_name);
    });
    bool_kids_polidrom && arr_the_person_kids_are_polidrom.push(v1);
  });
  return [...arr_person_polidrom, ...arr_the_person_kids_are_polidrom];
}
// console.log("AAA");
// console.table(person_or_kids_pilindron());

// *******************
// level 04: help  function
// *******************

function get_cities_list() {
  // debugger;
  let city_list = person_data_base.map((v) => v.city);
  city_list = remove_duplicate_in_array(city_list);
  return city_list;
}

// console.log("QQQ");
// console.log(get_cities_list());

function check_if_pilindrom(str) {
  return str == String(str).split("").reverse().join("");
}

// *******************
// level 05: validate  function
// *******************
function check_valid_age(age) {
  if (
    isNaN(age) ||
    age == "" ||
    age == null ||
    age == undefined ||
    age < 1 ||
    age > 120
  ) {
    console.log("not valid age");
    return false;
  }
  return true;
}
