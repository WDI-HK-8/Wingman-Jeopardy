$(document).ready(function() {
  //multiplayer
  var array = [{question : "Your Bro is super drunk and has thrown up, the girl he likes shows up, do you...", answer1 : 'Grab him and run', answer2 : 'Say it\'s your throw up', answer3 : 'Tell her that she looks beautiful', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro is partying hard when his mom calls and says that she wants him home, do you...", answer1 : 'Tell your Bro to leave', answer2 : 'Tell her to f*** off', answer3 : 'Pretend like you\'re an answering machine', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "You go to the gym with your Bro and his girl, she lifts more than him, do you...", answer1 : 'Tell your Bro he has to break up with her', answer2 : 'Start looking for a new Bro', answer3 : 'Start giving your Bro steriods', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "Your Bro wants to go watch \"A Fault In Our Stars\", do you...", answer1 : 'Punch him in the face', answer2 : 'Punch him in the balls to see if he has any', answer3 : 'Go see the movie with him', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro\'s side chick asks you who he is seeing besides her, do you...", answer1 : 'Tell her it\'s an ugly girl', answer2 : 'Tell her that your Bro wishes he was cool enough to see multiple women', answer3 : 'Tell her the truth', best : 'answer1', okay : 'answer2', bad : 'answer3'},
  {question : "There\'s a huge party going down, but your Bro is grounded, do you...", answer1 : 'Break him out', answer2 : 'Move the party to your Bro\'s house', answer3 : 'Ditch him and go to the party', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro is looking to score but needs a condom, but you only have one and want to score as well, do you...", answer1 : 'Give your Bro your condom', answer2 : 'Rip your condom in half and each keep a half', answer3 : 'Tell him you don\'t have one either', best : 'answer1', okay : 'answer2', bad : 'answer3'},
  {question : "You\'re at dinner with your Bro and his crush when your Bro lets out a loud fart, do you...", answer1 : 'Claim it as your own', answer2 : 'Exclaim loudly that your Bro\'s farts smell awful', answer3 : 'Blame it on his crush', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "You\'re out with your Bro when you see three girls: one attractive, one alright, and one unnattractive, do you...", answer1 : 'Go for the attractive one', answer2 : 'Go for the alright one', answer3 : 'Go for the ugly one', best : 'answer3', okay : 'answer2', bad : 'answer1'},
  {question : "You\'re about to go out with your Bro when you realize he's wearing a silk parrot shirt, do you...", answer1 : 'Ignore it, he can dress how he likes', answer2 : 'Tell him he has to change if wants any action', answer3 : 'Slyly spill some beer on it before going out', best : 'answer3', okay : 'answer2', bad : 'answer1'},
  {question : "You threw a party at your house and your Bro is getting action but doesn't have anywhere to go with the chick, do you...", answer1 : 'Let him use your bed', answer2 : 'Tell him that\'s not alright in your house', answer3 : 'Tell him to use the bathroom', best : 'answer1', okay : 'answer3', bad : 'answer2'},
  {question : "You\'re out at a club when you see your Bro's girl with another guy, do you...", answer1 : 'Ignore it, what your Bro doesn\'t know can\'t hurt him', answer2 : 'Let your Bro know immediately', answer3 : 'Confront her', best : 'answer2', okay : 'answer3', bad : 'answer1'}];
  var clicked = [];
  var player1;
  var player2;
  var timer;
  var curIndex = -1;
  var curPlayer;
  var player1Score = 0;
  var player2Score = 0;
  var secondsLeft = 15;

  timer = setTimeout(function() {
    $('.wrapper').fadeIn(1000);
    $('.container-fluid').fadeOut(1000);
    $('.container-fluid').remove();
  },2000);

  $(document).on('click','#double-start',function() {
    while($('input')[0].value == '') {
      $('input')[0].value = prompt('please enter a name');
    }
    player1 = $('input')[0].value;
    while($('input')[1].value == '') {
      $('input')[1].value = prompt('please enter a name');
    }
    player2 = $('input')[1].value;
    $('#player1').text(player1+': 0');
    $('#player2').text(player2+': 0');
    curPlayer = player1;
    $('.main').fadeIn(1000);
    $('.main-div').show();
    $('.single').hide();
    $('.enter').fadeOut(1000).hide();
  });

  function ind(x) {
    for(var a = 0; a <= 11; a++) {
      if($('.question')[a] == x) {
        return a;
      }
    }
  }

  function disableGraph(x) {
    clicked.push(x);
    for(var a = 0; a <= 11; a++) {
      var cur = $('.question')[a];
      cur.disabled = true;
    }
  }

  function enableGraph() {
    for(var a=0;a<=11;a++) {
      var cont = true;
      var cur = $('.question')[a];
      for(c in clicked) {
        if(clicked[c] == a) {
          cont = false;
        }
      }
      if(cont == true) {
        cur.disabled = false;
      }
    }
    $('footer .col-xs-7').remove();
    $('footer>section').removeClass('col-xs-5').addClass('col-xs-12');
  }

  function getSolution(x) {
    for(var a=0;a<=2;a++) {
      if($('.answer')[a] == x) {
        for(c in array[curIndex]) {
          var check = 'answer'+(a+1);
          if(check == array[curIndex][c]) {
            return c;
          }
        }
      }
    }
  }

  function initAnswers(cur) {
    $('footer img').remove();
    $('footer > section').removeClass('col-xs-12').addClass('col-xs-5');
    $('#question').css({'text-align' : 'left'});
    var html = "";
    html += '<section class="col-xs-7">';
    html +=   '<button class="btn btn-primary answer"></button>';
    html +=   '<button class="btn btn-primary answer"></button>';
    html +=   '<button class="btn btn-primary answer"></button>';
    html += '</section>';
    $('footer').append(html);
    for(var a = 0; a <= 2; a++) {
      var btn = $('.answer')[a];
      var str = 'answer'+(a+1);
      $(btn).text(cur[str]);
    }
  }

  function addScore() {
    var cur = $('.question')[curIndex];
    if(curPlayer == player1) {
      player1Score += parseInt($(cur).text());
      $('#player1').text(player1+': '+player1Score);
    } else {
      player2Score += parseInt($(cur).text());
      $('#player2').text(player2+': '+player2Score);
    }
  }

  function addHalfScore() {
    var cur = $('.question')[curIndex];
    if(curPlayer == player1) {
      player1Score += (parseInt($(cur).text())/2);
      $('#player1').text(player1+': '+player1Score);
    } else {
      player2Score += (parseInt($(cur).text())/2);
      $('#player2').text(player2+': '+player2Score);
    }
  }

  function subtractScore() {
    var cur = $('.question')[curIndex];
    if(curPlayer == player1) {
      player1Score -= parseInt($(cur).text());
      $('#player1').text(player1+': '+player1Score);
    } else {
      player2Score -= parseInt($(cur).text());
      $('#player2').text(player2+': '+player2Score);
    }
  }

  function updateScore(sol) {
    if(sol == 'best') {
      $('#question').text('You got this question completely right!');
      $('#question').css({'text-align' : 'center'});
      $('footer').prepend('<img src="assets/images/bro-fist.png">');
      addScore();
    } else if(sol == 'okay') {
      $('#question').text('This is an okay answer I guess.');
      $('#question').css({'text-align' : 'center'});
      $('footer').prepend('<img src="assets/images/shrug.png">')
      addHalfScore();
    } else {
      $('#question').text('That was literally the worst answer you could have chosen.');
      $('#question').css({'text-align' : 'center'});
      $('footer').prepend('<img src="assets/images/bad-move.png">')
      subtractScore();
    }
  }

  function switchPlayer() {
    if(clicked.length != 12) {
      var name;
      if(curPlayer == player1) {name = 'player1';}
      else {name = 'player2';}
      $('#'+name).parent().css({'background-color': '#FF9800'});
      if(curPlayer == player1) {curPlayer=player2;}
      else {curPlayer = player1;}
      if(curPlayer == player1) {name = 'player1';}
      else {name = 'player2';}
      $('#' + name).parent().css({'background-color': '#FFECB3'});
    }
  }

  function endGame() {
    if(clicked.length == 12) {
      setTimeout(function() {
        var winner;
        if(player1Score > player2Score) {winner = player1 + '! You have proven yourself the better wingman!!';}
        else if(player1Score == player2Score) {winner = 'you bros tied, you are equivalent wingmen!!'}
        else {winner = player2 + '! You have proven yourself the better wingman!!';}
        $('.wrapper').prepend('<div class="row end"> <div class="col-xs-12"><section><h1>Congratulations ' + winner + '</h1> <h3>'+player1 + '\'s score: ' + player1Score + '</h3> <h3>' + player2 + '\'s score: ' + player2Score + '</h3></section><img src="assets/images/ending.gif"></div><div class="col-xs-12"><button id="reset" class="btn btn-primary">Reset</button></div></div>');
        $('.main').css({display : 'none'});
        $('.end').fadeIn(2000);
      },2000);
    }
  }

  $(document).on('click','.question',function() {
    var num = ind(this);
    curIndex = num;
    var cur = array[num];
    disableGraph(num);
    $('#question').text(cur.question);
    initAnswers(cur);
    $('#timer').text('Timer: ' + secondsLeft);
    timer = setInterval(function() {
      $('#timer').text('Timer: ' + secondsLeft);
      if(secondsLeft == 0) {
        enableGraph();
        secondsLeft = 16;
        updateScore('bad');
        $('#question').text('Guess you couldn\'t choose in time, too bad! Next Players turn...');
        switchPlayer();
        endGame();
        clearInterval(timer);
      }
      secondsLeft --;
    },1000);
  });

  $(document).on('click','.answer',function() {
    clearInterval(timer);
    var sol = getSolution(this);
    updateScore(sol);
    enableGraph();
    secondsLeft = 15;
    $('#timer').text('Timer: 0');
    switchPlayer();
    endGame();
  });

  $(document).on('click','#reset',function() {
    $('.end').fadeOut(800, function() {
      $('.enter').fadeIn(1000);
      $('.end').remove();
    });
    $('input')[0].value = '';
    $('input')[1].value = '';
    clicked = [];
    curIndex = -1;
    switchPlayer();
    player1Score = 0;
    player2Score = 0;
    secondsLeft = 15;
    enableGraph();
    $('#question').text('The number indicates the number of points you will receive upon a correct answer, once you choose a question you will have 10 seconds to answer.');
    $('footer img').remove();
  });

  //single player
  var singleIndex = 0;
  var singleScore = 0;
  var singleArray = [{q : 'Where do you prefer to party?', a1 : 'I don\'t party', a2 : 'House party', a3 : 'club'},
  {q : 'What do you drink?', a1 : 'Only Mike\'s Hard Lemonade', a2 : 'Beer', a3 : 'Hard alcohol'},
  {q : 'What do you do for fun?', a1 : 'Knit', a2 : 'Pong', a3 : 'Skydive'},
  {q : 'How often do you say Bro?', a1 : 'Never', a2 : 'A lot', a3 : 'Every sentence bro'},
  {q : 'What did you think of The Hangover?', a1 : 'What\'s that', a2 : 'Loved it', a3 : 'That movie is my life'},
  {q : 'What do you think of frats?', a1 : 'Who cares', a2 : 'I like them', a3 : 'I am frat'},
  {q : 'Where do you prefer to party?', a1 : 'I don\'t party', a2 : 'House party', a3 : 'club'},
  {q : 'Do you day drink?', a1 : 'Never', a2 : 'Sometimes', a3 : 'I brush my teeth with vodka'},
  {q : 'Do you take selfies at the gym?', a1 : 'Never', a2 : 'Yes but not obnoxiously', a3 : 'My people have to know'},
  {q : 'How often do you say YOLO?', a1 : 'Never', a2 : 'Sometimes', a3 : 'Best phrase ever'}];

  function endSingleGame() {
    var endText;
    setTimeout(function() {
      if(singleScore < 15) {endText = 'You don\'t disply qualities evident of a bro, that\'s fine though, it isn\'t for everyone.';}
      else if(singleScore < 25) {endText = 'You are evidently a classic bro, go back to your beer pong bromigo.';}
      else {endText = 'You have actually taken bro to the next level, are you even human?';}
      $('.wrapper').prepend('<div class="row end"><div class="col-xs-12"><section><h1>' + endText + '</h1><section><img src="assets/images/giphy.gif"></div><div class="col-xs-12"><button id="single-reset" class="btn btn-primary">Reset</button></div></div>');
      $('.main').css({display : 'none'});
      $('.end').fadeIn(2000);
    },1000);
  }

  $(document).on('click','#single-start',function() {
    $('.main').fadeIn(1000);
    $('.single').show();
    $('.main-div').hide();
    $('.enter').fadeOut(1000).hide();
  });

  function scorer(x) {
    for(a in singleArray[singleIndex]) {
      if(singleArray[singleIndex][a] == x) {
        y = a.slice(1);
        singleScore += parseInt(y);
      }
    }
  }

  $(document).on('click','.btn-info',function() {
    scorer($(this).text());
    $(this).blur();
    if(singleIndex != 9) {
      singleIndex ++;
      var cur = singleArray[singleIndex];
      $('#single-question').text(cur.q);
      for(var a = 0; a < 3; a++) {
        var str = $('.btn-info')[a];
        var ind = 'a'+(a+1);
        $(str).text(cur[ind]);
      }

    } else {
      for(var a = 0; a < 3; a++) {
        $('.btn-info')[a].disabled = true;
      }
      endSingleGame();
    }
  });

  $(document).on('click','#single-reset',function() {
    $('#single-reset').disabled = true;
    $('.end').fadeOut(800, function() {
      $('.enter').fadeIn(500);
      $('.end').remove();
    });
    singleIndex = 0;
    singleScore = 0;
    for(var a = 0; a < 3; a++) {
        $('.btn-info')[a].disabled = false;
    }
    $('#single-reset').disabled = false;
    $('input')[0].value = '';
    $('input')[1].value = '';
  });

});
