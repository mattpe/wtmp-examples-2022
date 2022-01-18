import SodexoLunchMenu from '../assets/sodexo-day-example.json';
// console.log(SodexoLunchMenu);

const coursesEn = [];
const coursesFi = [];

/**
 * Extract course titles from Sodexo menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 */
const parseSodexoMenu = (menu) => {
  const courses = Object.values(menu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};
parseSodexoMenu(SodexoLunchMenu.courses);

const SodexoData = {coursesEn, coursesFi};
export default SodexoData;
