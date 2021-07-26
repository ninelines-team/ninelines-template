import 'core-js/stable';
import 'regenerator-runtime/runtime';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';

svg4everybody();
objectFitImages();
// objectFitVideos();

window.$ = $;
window.jQuery = $;
window.objectFitImages = objectFitImages;
// window.objectFitVideos = objectFitVideos;

require('ninelines-ua-parser');
