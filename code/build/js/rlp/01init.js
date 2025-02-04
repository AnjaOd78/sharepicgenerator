/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const bgpic = {
  width: 800,
  height: 450,
  originalWidth: 1920,
  originalHeight: 1080,
  filename: '/assets/bg_small.jpg',
  fullBackgroundName: '../assets/bg.jpg',
};

var initialized = false;

$(document).ready(() => {
  config.layout = 'nolines';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clickId = urlParams.get('clickId');
  $(`#${clickId}`).click();

 

  $('#addtextX').val(50);
  $('#addtextY').val(draw.height() - 50);

  window.setTimeout(() => {
    setDrawsize();
    $('#textsize').val(342);
    $('#textX').val(41);
    $('#textY').val(272);
    text.draw();
  }, 200);

  showLayout();
});

// eslint-disable-next-line no-unused-vars
function initSharepic() {
  if (initialized) {
    return false;
  }
  // called after background pic is loaded
  $('#sizepresets').val('1200:1200').trigger('change');
  $('#textY').val(320);
  $('#textsize').val(402);
  initialized = true;

  return true;
}

// eslint-disable-next-line no-unused-vars
function reset() {
  // do nothing, stay here
}

// eslint-disable-next-line no-unused-vars
function reDraw(withAddPic = false) {
  if (withAddPic === true) {
    addPic1.draw();
    addPic2.draw();
    addPic3.draw();
    addPic4.draw();
    addPic5.draw();
  }

  window.setTimeout(() => {
    copyright.draw();
    pin.load();
    icon.load();
    gradient.draw();
  }, 20);

  window.setTimeout(() => {
    logo.load();
    text.draw();
    addtext.draw();
    quote.draw();
    nolines.draw();
    invers.draw();
    eraser.draw();
    url.draw();
  }, 100);

  if ($('#backgroundFlipped').val() === 'true') {
    $('#backgroundflip').click();
  }
}
