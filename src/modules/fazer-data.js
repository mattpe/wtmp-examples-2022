// TODO: fix data urls: how to get menu for correct day?

const today = new Date().toISOString().split('T')[0];
// console.log('today is ', today);

const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${today}`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${today}`;

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

const FazerData = {parseDayMenu, dataUrlFi, dataUrlEn};
export default FazerData;
