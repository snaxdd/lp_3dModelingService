'use strict';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'element-closest-polyfill';
import 'mdn-polyfills/Node.prototype.append';

import countTimer from './modules/countTimer';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import teamPhoto from './modules/teamPhoto';

//Timer
countTimer();

//Menu
toggleMenu();

//Popup
togglePopup();

//Tabs
tabs();

//Slider
slider();

//TeamPhoto - смена фотографии при наведении  
teamPhoto();

//Calculator
calc();

//Send AJAX form
sendForm();