$(document).ready(function() {
	var array = [{question : "Your Bro is super drunk and has thrown up, the girl he likes shows up, do you...", answer1 : 'Grab him and run', answer2 : 'Say it\'s your throw up', answer3 : 'Tell her that she looks beautiful', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro is partying hard when his mom calls and says that she wants him home, do you...", answer1 : 'Tell your Bro to leave', answer2 : 'Tell her to f*** off', answer3 : 'Pretend like you\'re an answering machine', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "You go to the gym with your Bro and his girl, she lifts more than him, do you...", answer1 : 'Tell your Bro he has to break up with her', answer2 : 'Start looking for a new Bro', answer3 : 'Start giving your Bro steriods', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "Your Bro wants to go watch \"A Fault In Our Stars\", do you...", answer1 : 'Punch him in the face', answer2 : 'Punch him in the balls to see if he has any', answer3 : 'Go see the movie with him', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro\'s side chick asks you who he is seeing besides her, do you...", answer1 : 'Tell her it\'s an ugly girl', answer2 : 'Tell her that your Bro wishes he was cool enough to see multiple women', answer3 : 'Tell her the truth', best : 'answer1', okay : 'answer2', bad : 'answer3'},
  {question : "There\'s a huge party going down, but your Bro is grounded, do you...", answer1 : 'Break him out', answer2 : 'Move the party to your Bro\'s house', answer3 : 'Ditch him and go to the party', best : 'answer2', okay : 'answer1', bad : 'answer3'},
  {question : "Your Bro is looking to score but needs a condom, but you only have one and want to score as well, do you...", answer1 : 'Give your Bro your condom', answer2 : 'Rip your condom in half and each keep a half', answer3 : 'Tell him you don\'t have one either', best : 'answer1', okay : 'answer2', bad : 'answer3'},
  {question : "You\'re at dinner with your Bro and his crush when your Bro lets out a loud fart, do you...", answer1 : 'Claim it as your own', answer2 : 'Exclaim loudly that your Bro\'s farts smell awful', answer3 : 'Blame it on his crush', best : 'answer3', okay : 'answer1', bad : 'answer2'},
  {question : "You\'re out with your Bro when you see three girls: one attractive, one alright, and one unnattractive, do you...", answer1 : 'Go for the attractive one', answer2 : 'Go for the alright one', answer3 : 'Go for the ugly one', best : 'answer3', okay : 'answer2', bad : 'answer1'}];
	var clicked = [];
  var player1;
  var player2;
  var timer;
  var curIndex = -1;
  var curPlayer;
  var player1Score = 0;
  var player2Score = 0;
  var secondsLeft = 15;

  $(document).on('click','#start',function() {
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
    $('.main').show();
    $('.container').remove();
  })

	function ind(x) {
    for(var a=0;a<=8;a++) {
      if($('.question')[a] == x) {
        return a;
      }
    }
	}

  function disableGraph(x) {
    clicked.push(x);
    for(var a=0;a<=8;a++) {
      var cur = $('.question')[a];
      cur.disabled = true;
    }
  }

  function enableGraph() {
    for(var a=0;a<=8;a++) {
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
    $('footer .col-xs-8').remove();
    $('footer>section').removeClass('col-xs-4').addClass('col-xs-12');
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
    $('footer>section').removeClass('col-xs-12').addClass('col-xs-4');
    $('footer').append('<section class="col-xs-8"> <button class="btn btn-success answer"></button> <button class="btn btn-success answer"></button> <button class="btn btn-success answer"></button> </section>')
    for(var a=0;a<=2;a++) {
      var btn = $('.answer')[a];
      var str = 'answer'+(a+1)
      $(btn).text(cur[str]);
    }
  }

  function updateScore(sol) {
    if(sol == 'best') {
      $('#question').text('You got this question completely right!');
      $('footer').prepend('<img src="assets/images/bro-fist.png">');
      if(curIndex<3) {
        if(curPlayer == player1) {
          player1Score += 100;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score += 100;
          $('#player2').text(player2+': '+player2Score);
        }
      }
      else if(curIndex<6) {
        if(curPlayer == player1) {
          player1Score += 300;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score += 300;
          $('#player2').text(player2+': '+player2Score);
        }
      }
      else {
        if(curPlayer == player1) {
          player1Score += 500;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score += 500;
          $('#player2').text(player2+': '+player2Score);
        }
      }
    }
    if(sol == 'okay') {
      $('#question').text('This is an okay answer I guess.');
      $('footer').prepend('<img src="assets/images/shrug.png">')
    }
    if(sol == 'bad') {
      $('#question').text('That was literally the worst answer you could have chosen.');
      $('footer').prepend('<img src="assets/images/bad-move.png">')
      if(curIndex<3) {
        if(curPlayer == player1) {
          player1Score -= 100;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score -= 100;
          $('#player2').text(player2+': '+player2Score);
        }
      }
      else if(curIndex<6) {
        if(curPlayer == player1) {
          player1Score -= 300;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score -= 300;
          $('#player2').text(player2+': '+player2Score);
        }
      }
      else {
        if(curPlayer == player1) {
          player1Score -= 500;
          $('#player1').text(player1+': '+player1Score);
        }
        else {
          player2Score -= 500;
          $('#player2').text(player2+': '+player2Score);
        }
      }
    }
  }

  function switchPlayer() {
    var name;
    if(curPlayer == player1) {
      name = 'player1';
    }
    else {
      name = 'player2';
    }
    $('#'+name).parent().css({'background-color' : '#660033'});
    $('#'+name).css({'background-color' : '#660033'});
    if(curPlayer == player1) {curPlayer=player2;}
    else {curPlayer=player1;}
    if(curPlayer == player1) {
      name = 'player1';
    }
    else {
      name = 'player2';
    }
    $('#'+name).parent().css({'background-color' : '#006666'});
    $('#'+name).css({'background-color' : '#006666'});
  }

  function endGame() {
    // if(clicked.length == 9) {
      var winner;
      if(player1Score>player2Score) {winner = player1+'! You have proven yourself the better wingman!!';}
      else if(player1Score == player2Score) {winner = 'you bros tied, you are equivalent wingmen!!'}
      else {winner = player2+'! You have proven yourself the better wingman!!';}
      $('.main').css({display : 'none'});
      $('.wrapper').prepend('<div class="row end"> <div class="col-xs-12"><section><h1>Congratulations '+winner+'</h1> <h3>'+player1+'\'s score: '+player1Score+'</h3> <h3>'+player2+'\'s score: '+player2Score+'</h3></section><img src="assets/images/ending.gif"></div></div>');
    // }
  }

	$(document).on('click','.question',function() {
		var num = ind(this);
    curIndex = num;
		var cur = array[num];
    disableGraph(num);
		$('#question').text(cur.question);
		initAnswers(cur);
    $('#timer').text('Timer: '+secondsLeft);
    timer = setInterval(function() {
        $('#timer').text('Timer: '+secondsLeft);
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
  })
});
