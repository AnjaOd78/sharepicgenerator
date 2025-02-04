// eslint-disable-next-line no-unused-vars
const bgpic = {
  width: 800,
  height: 450,
  originalWidth: 1920,
  originalHeight: 1080,
  filename: '/assets/bg_small.jpg',
  fullBackgroundName: '../assets/bg.jpg',
};

let initialized = false;

$(document).ready(() => {
  $('#textsize').val(502);

  config.layout = 'hessenfullwidth';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clickId = urlParams.get('clickId');
  $(`#${clickId}`).click();

 

  //showLayout();

  $('#textX').val(41);
  $('#textY').val(372);
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
  }

  window.setTimeout(() => {
    pin.draw();
  }, 10);

  window.setTimeout(() => {
    logo.load();
    text.draw();
    addtext.draw();
    //quote.draw();
    nolines.draw();
    //invers.draw();
    hessenfullwidth.draw();
    eraser.draw();
  }, 100);

  window.setTimeout(() => {
    hessenfullwidth.draw();
  }, 500);

  if ($('#backgroundFlipped').val() === 'true') {
    $('#backgroundflip').click();
  }
}
