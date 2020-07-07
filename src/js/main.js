import { includeHTML, preventIEError } from './lib';


function initializePage() {

}

function main() {
  // init
  preventIEError();
  includeHTML(function () {
    initializePage();
  });

  // for api
}

main();


