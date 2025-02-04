/* eslint-disable no-undef */
const logofont = {
  family: 'FuturaCondensedExtraBold',
  size: 78,
  anchor: 'left',
};

const logo = {
  isLoaded: false,
  config: {
    sonnenblume: {
      file: '/assets/rlp/logo.png',
      widthFraction: 0.3,
      position: 'bottomright',
    },
    'sonnenblume-weiss': {
      file: '/assets/logos/sonnenblume-weiss.svg',
      widthFraction: 0.1,
      position: 'topright',
    },
    custom: {
      widthFraction: 0.2,
      position: 'topright',
    },
  },

  load() {
    const whichLogo = $('#logoselect').val();
    if (logo.svg) logo.svg.remove();
    logo.isLoaded = false;

    if (whichLogo === 'void') {
      return false;
    }

    this.logoinfo = this.config[whichLogo];

    $('#logosize').val(this.logoinfo.widthFraction * 100);

    this.svg = draw.group().attr('id', 'svg-logo');
    const logofile = draw.image(this.logoinfo.file, () => {
      logo.isLoaded = true;
      logo.svg.add(logofile);

      // add text to logo
      if (this.logoinfo.showChapter && $('#logochapter').val()) {
        const chapter = draw.text($('#logochapter').val().toUpperCase()).font(logofont).fill('#ffffff').move(23, 1495);
        logo.svg.add(chapter);
      }

      setTimeout(logo.draw, 100); // with no timeout, error at hard reload of page
    });
    return true;
  },

  draw() {
    if (!logo.isLoaded) return false;

    // let width = Math.max(50, draw.width() * logo.logoinfo.widthFraction);
    const width = draw.width() * logo.logoinfo.widthFraction;
    logo.svg.size(width, null);
    let x;
    let y;

    switch (logo.logoinfo.position) {
      case 'bottomleft':
        x = 10;
        y = draw.height() - logo.svg.height() - 10 - 20;
        break;
      case 'bottomright':
        x = draw.width() - width - 10;
        y = draw.height() - logo.svg.height() - 10 - 20;
        break;
      case 'bottomleftbig':
        x = 0;
        y = draw.height() - logo.svg.height();
        break;
      default:
        x = draw.width() - width - 10;
        y = 10;
    }

    logo.svg.move(x, y);

    return true;
  },

  resize(percent) {
    let newPercent = parseInt(percent, 10);
    newPercent = Math.min(100, newPercent);
    newPercent = Math.max(1, newPercent);

    logo.logoinfo.widthFraction = newPercent / 100;
    logo.draw();
  },
};
logo.load();

$('#logoselect').on('change', function changeLogo() {
  if ($(this).val() === 'custom') {
    logo.config.custom.file = $('#logoselect option:selected').data('file');
    logo.load();
  }

  config.user.prefs.lastLogo = $(this).val();
  setUserPrefs();

  logo.load();
});

$('.uselogo').on('click', function clickUseLogo() {
  $('#logoselect').val($(this).data('logo'));
  logo.load();
});

$('#logosize').bind('input propertychange', () => {
  logo.resize($('#logosize').val());
});

$('#logochapter').bind('input propertychange', () => logo.load());

// eslint-disable-next-line func-names
$('#logochapter').focusout(function () {
  config.user.prefs.logoChapter = $(this).val();
  setUserPrefs();
});

$(document).ready(() => {
  $('.delete-logo').click(function deleteLogo() {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Logo wirklich löschen?')) {
      return false;
    }
    const file = $(this).data('file');

    $.post('/actions/delete.php', { action: 'logo', csrf: config.csrf, file })
      .done((response) => {
        const data = JSON.parse(response);

        if (data.error) {
          alert(data.error.code);
          return false;
        }
        return true;
      });

    $('#logoselect').val($('#logoselect option:first').val());
    $(this).parents('.samplesharepic').fadeOut().hide();

    return true;
  });
});
