$(function() {

  var $groups = $('.groups'),
      $calendar = $('.calendar'),
      $reset = $('[data-reset]'),
      team = 'default';


  function showReset() {

    if( $reset.is(':visible') ) {
      if( team == 'default' ) {
        $reset.fadeOut();
      }
    } else {
      if( team != 'default' ) {
        $reset.fadeIn();
      }
    }

  }


  var menuIcon = $('[data-trigger]').html(),
      menuClose = '<svg class="navigation__icon navigation__icon--trigger svg-inline--fa fa-tshirt fa-w-20" aria-hidden="true" data-prefix="fas" data-icon="tshirt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M639 121C635.7 111.2 628.8 103.2 619.5 98.6L421.2 0C411.7 13.2 392.8 50.3 321 50.3 248.6 50.3 229.9 12.6 220.8 0L22.6 98.6C13.3 103.2 6.3 111.2 3 121 -0.3 130.9 0.4 141.4 5.1 150.7L58.1 256.9C67.7 276.1 91.1 283.9 109.7 274.6L133.7 263.3C139 260.8 145.1 264.7 145.1 270.5L145.1 455.8C145.1 486.8 170.2 512 201.1 512L441.1 512C472 512 497.1 486.8 497.1 455.8L497.1 270.6C497.1 264.7 503.2 260.9 508.5 263.4L532 274.5C551.1 284.2 574.5 276.3 584.1 257.1L637.1 150.9C641.5 141.4 642.3 130.9 639 121L639 121Z"></path></svg>';

  $('[data-trigger], [data-dropdown] a').on('click', function(e) {
    e.preventDefault();

    if ( $('html').hasClass('dropdown-open') ) {
      $('html').removeClass('dropdown-open');
    } else {
      $('html').addClass('dropdown-open');
    }

    if ( $('html').hasClass('dropdown-open') ) {
      $('[data-trigger]').html(menuClose);
    } else {
      $('[data-trigger]').html(menuIcon);
    }

    showReset();

  });


  $groups.on('click', 'a', function(e) {
    e.preventDefault();

    $('.groups a').each(function() {

      if( $(this).hasClass('group__link--highlight') ) {
        $(this).removeClass('group__link--highlight');
      }

    });

    $(this).addClass('group__link--highlight');

    if( $calendar.hasClass('calendar--day') ) {
      $calendar.removeClass('calendar--day').addClass('calendar--team');
    }

    team = $(this).data('team');
    console.log(team);

    $('body').removeAttr('class').addClass(team);

    $('.day').each(function() {

      if( $(this).hasClass('day--highlight') ) {
        $(this).removeClass('day--highlight');
      }

      $(this).find('li').each(function() {

        if( $(this).hasClass('fixture--highlight') ) {
          $(this).removeClass('fixture--highlight');
        }

        var team1 = $(this).data('team-1'),
            team2 = $(this).data('team-2');

        if( team1 == team || team2 == team ) {
          console.log(team1 + ' ' + team2);

          $(this).parents('.day').addClass('day--highlight');
          $(this).addClass('fixture--highlight');

        }

      });
    });

    showReset();

  });


  $reset.on('click', function(e) {
    e.preventDefault();

    if( $calendar.hasClass('calendar--team') ) {
      $calendar.removeClass('calendar--team').addClass('calendar--day');
    }

    team = 'default';

    $('body').removeAttr('class');

    $('.day').each(function() {

      if( $(this).hasClass('day--highlight') ) {
        $(this).removeClass('day--highlight');
      }

      $(this).find('li').each(function() {

        if( $(this).hasClass('fixture--highlight') ) {
          $(this).removeClass('fixture--highlight');
        }

      });

    });

    showReset();

  });
  

  setTimeout(function() {
    $('html').addClass('loaded');
  }, 1000);

});
