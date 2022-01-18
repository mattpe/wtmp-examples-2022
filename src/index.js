import SodexoData from './modules/sodexo-data';

let language = 'fi';
let currentMenu = SodexoData.coursesFi;

/**
 * Renders menu courses on page
 */
const renderMenu = () => {
  const ulElement = document.querySelector('#sodexo');
  ulElement.innerHTML = '';
  for (const item of currentMenu) {
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
    currentMenu = SodexoData.coursesEn;
  } else {
    language = 'fi';
    currentMenu = SodexoData.coursesFi;
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
  renderMenu();
  // Event listeners for buttons
  document.querySelector('#switch-lang').addEventListener('click', () => {
    switchLanguage();
    renderMenu();
  });
  document.querySelector('#pick-random').addEventListener('click', () => {
    // choose random dish & display it
    alert(pickARandomCourse(currentMenu));

  });
  document.querySelector('#sort-menu').addEventListener('click', () => {
    // currentMenu = sortCourses(currentMenu);
    currentMenu = sortCourses(currentMenu, 'desc');
    renderMenu();
  });
};
init();
