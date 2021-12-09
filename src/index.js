import './css/styles.css';
import CountriesApiService from './js/fetchCountries';
import countriesList from './templates/countries-list';
import countryCard from './templates/country-card';
import getRefs from './js/get-refs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getRefs();


refs.inputTag.addEventListener('input', debounce(onSearchCountries, DEBOUNCE_DELAY));
const countriesApiService = new CountriesApiService();

function onSearchCountries(event) {
  refs.listTag.innerHTML = '';
  refs.divTag.innerHTML = '';
  countriesApiService.value = event.target.value.trim();

  countriesApiService.fetchCountries().then(countries => {
    makeCountyCard(countries);
  });
}

function makeCountyCard(countries) {
  return countries.map(({ name, capital, population, flags, languages }) => {
    console.log({ languages });
    if (countries.length === 1) {
      return refs.divTag.insertAdjacentHTML(
        'afterbegin',
        countryCard({ name, capital, population, flags, languages }),
      );
    }
    refs.listTag.insertAdjacentHTML(
      'afterbegin',
      countriesList({ name, capital, population, flags, languages }),
    );
  });
}