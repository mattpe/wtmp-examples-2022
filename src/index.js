import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import {fetchData} from './modules/network';
import {getTodayIndex} from './modules/tools';
import HSLData from './modules/hsl-data';

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
 * Display pages/vies in carousel mode
 *
 * @param {number} activeView - view index to be displayed
 * @param {number} duration - seconds between page updated
 */
const createViewCarousel = (activeView, duration) => {
  const views = document.querySelectorAll('section');
  for (const view of views) {
    view.style.display = 'none';
  }
  if (activeView === views.length) {
    activeView = 0;
  }
  views[activeView].style.display = 'block';
  setTimeout(() => {
    createViewCarousel(activeView + 1, duration);
  }, duration * 1000);

  // TODO: how frequently to update displayed data?

};


/**
 * Initialize application
 */
const init = () => {

  createViewCarousel(0, 10);
  // TODO:
  // update sodexo data module to be similar than Fazer

  fetchData(SodexoData.dataUrlDaily).then(data => {
    console.log('sodexo', data);
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMenu(courses, 'sodexo');
  });
  // Render Fazer
  // fetchData(FazerData.dataUrlFi, {}, 'fazer-php').then(data => {
  //   console.log('fazer', data);
  //   const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
  //   renderMenu(courses, 'fazer');
  // });

  // Playing with hsl data
  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/graphql'},
    body: HSLData.getQueryForNextRidesByStopId(2132207)
  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
    const stop = response.data.stop;
    let time = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000);
    document.querySelector('#hsl-data').innerHTML = `<p>
      Seuraava dösä pysäkiltä ${stop.name} on ${stop.stoptimesWithoutPatterns[0].headsign} ja saapuu
      ${time}
    </p>`;
  });

};
init();
