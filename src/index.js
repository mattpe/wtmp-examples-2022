import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import {fetchData} from './modules/network';

let language = 'fi';

/**
 * Renders menu courses on page
 */
const renderMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

/**
 * Toggle between en/fi
 */
const switchLanguage = () => {
  if (language === 'fi') {
    language = 'en';
    renderMenu(SodexoData.coursesEn, 'sodexo');
    renderMenu(FazerData.coursesEn, 'fazer');
  } else {
    language = 'fi';
    renderMenu(SodexoData.coursesFi, 'sodexo');
    renderMenu(FazerData.coursesFi, 'fazer');
  }
};

/**
 * Sort courses alphapetically
 *
 * @param {Array} courses menu array
 * @param {string} order 'asc'/'desc'
 * @returns {Array} sorted menu
 */
const sortCourses = (courses, order = 'asc') => {
  const sortedCourses = courses.sort();
  if (order === 'desc') {
    sortedCourses.reverse();
  }
  return sortedCourses;
};

/**
 * Picks a random dish
 *
 * @param {Array} courses menu
 * @returns {string} random dish
 */
const pickARandomCourse = courses => {
  const randomIndex = Math.floor(Math.random() * courses.length);
  return courses[randomIndex];
};

/**
 * Initialize application
 */
const init = () => {

  // TODO: switch to real sodexo api data (no need to use proxy)
  // update sodexo data module to be similar than Fazer
  renderMenu(SodexoData.coursesFi, 'sodexo');
  fetchData('https://www.sodexo.fi/ruokalistat/output/weekly_json/152').then(data => {
    console.log(data);
  });

  // Render Fazer
  fetchData(FazerData.dataUrlFi, true).then(data => {
    // TODO: when using proxy move JSON.parse stuff to Network module??
    const menuData = JSON.parse(data.contents);
    // TODO: How to set correct weekday?
    const courses = FazerData.parseDayMenu(menuData.LunchMenus, 1);
    renderMenu(courses, 'fazer');
  });

  // Event listeners for buttons
  document.querySelector('#switch-lang').addEventListener('click', () => {
    switchLanguage();
  });
  document.querySelector('#pick-random').addEventListener('click', () => {
    // choose random dish & display it
    alert(pickARandomCourse(currentMenu));

  });
  document.querySelector('#sort-menu').addEventListener('click', () => {
    // currentMenu = sortCourses(currentMenu);
    currentMenu = sortCourses(currentMenu, 'desc');
    // TODO: fix sorting for both restaurant
    //renderMenu();
  });
};
init();
