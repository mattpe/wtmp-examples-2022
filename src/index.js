// wtmp js examples 31.1.2022

const netPromise = fetch('https://api.github.com/users/mattpe');

netPromise.then(data => data.json()).then((json) => {
  console.log(json);
  fetch(json.repos_url).then(data => data.json()).then(data => {
    console.log(data);
        // fetch(data[0].collaborators_url).then();
  });
}).catch(error => {
  // do something with the error..
});

console.log('promise 1', netPromise);
console.log('moro');

// Async - await & error handling
const getGithubUserProfile = async username => {
  let userData = {};
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('problem: '+ response.statusText);
    }
    userData = await response.json();
  } catch (error) {
    console.error(error);
    // In real case you should nofify user too?
  }
  return userData;
};

getGithubUserProfile('mattpe').then(data => {
  console.log(data);
});
