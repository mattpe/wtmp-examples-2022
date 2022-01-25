import FazerLunchMenuFi from './fazer-week-example.json';
import FazerLunchMenuEn from './fazer-week-example-en.json';

// console.log(FazerLunchMenuEn, FazerLunchMenuFi);

/**
 * Parses Fazer json data to simple array of strings
 *
 * @param {Array} lunchMenus lunch menu data
 * @param {Number} dayOfWeek 0-6
 * @returns {Array} daily menu
 */
const parseDayMenu = (lunchMenus, dayOfWeek) => {
  const dayMenu = lunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    const name = setMenu.Name;
    let meals = '';
    // TODO: clean output
    for (const meal of setMenu.Meals) {
      meals += meal.Name + ', ';
    }
    return  name ? name + ': ' + meals : meals;
  });
  return dayMenu;
};
// console.log(parseDayMenu(FazerLunchMenuEn.LunchMenus, 0));

const coursesEn = parseDayMenu(FazerLunchMenuEn.LunchMenus, 0);
const coursesFi = parseDayMenu(FazerLunchMenuFi.LunchMenus, 0);

const FazerData = {coursesEn, coursesFi};
export default FazerData;
