$(document).ready(function() {
	var array = [{question : "Your Bro is super drunk and has thrown up, the girl he likes shows up, do you...", answer1 : 'Grab him and run', answer2 : 'Say it\'s your throw up', answer3 : 'Tell her that she looks beautiful', best : 'answer2', okay : 'answer1', bad : 'answer3'}];
	var clicked = [];
  var timer;
  var curIndex = -1;
  var curPlayer = 'player1'
  var player1Score = 0;
  var player2Score = 0;
  var secondsLeft = 10;

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
    var cont = true;
    for(var a=0;a<=8;a++) {
      var cur = $('.question')[a];
      for(c in clicked) {
        if(c == a) {
          cont = false;
        }
        else {
          cont = true;
        }
      }
      if(cont == true) {
        cur.disabled = false;
      }
    }
    for(var a=0;a<=2;a++) {
      var btn = $('.answer')[a];
      $(btn).css({display : 'none'});
    }
  }

  function getSolution(x) {
    for(var a=0;a<=2;a++) {
      if($('.answer')[a] == x) {
        for(var b=0;b<array.length;b++) {
          for(c in array[b]) {
            var check = 'answer'+(a+1);
            if(check == array[b][c]) {
              return c;
            }
          }
        }
      }
    }
  }

  function initAnswers(cur) {
    for(var a=0;a<=2;a++) {
      var btn = $('.answer')[a];
      var str = 'answer'+(a+1)
      $(btn).text(cur[str]);
      $(btn).css({display : 'initial'});
    }
  }

  function updateScore(sol) {
    if(sol == 'best') {
      $('#question').text('You got this question completely right!');
      if(curIndex<3) {
        if(curPlayer == 'player1') {
          player1Score += 100;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score += 100;
          $('#player2').text('Player2: '+player2Score)
        }
      }
      else if(curIndex<6) {
        if(curPlayer == 'player1') {
          player1Score += 300;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score += 300;
          $('#player2').text('Player2: '+player2Score)
        }
      }
      else {
        if(curPlayer == 'player1') {
          player1Score += 500;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score += 500;
          $('#player2').text('Player2: '+player2Score)
        }
      }
    }
    if(sol == 'okay') {
      $('#question').text('This is an okay answer I guess.');
    }
    if(sol == 'bad') {
      $('#question').text('That was literally the worst answer you could have chosen.');
      if(curIndex<3) {
        if(curPlayer == 'player1') {
          player1Score -= 100;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score -= 100;
          $('#player2').text('Player2: '+player2Score)
        }
      }
      else if(curIndex<6) {
        if(curPlayer == 'player1') {
          player1Score -= 300;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score -= 300;
          $('#player2').text('Player2: '+player2Score)
        }
      }
      else {
        if(curPlayer == 'player1') {
          player1Score -= 500;
          $('#player1').text('Player1: '+player1Score)
        }
        else {
          player2Score -= 500;
          $('#player2').text('Player2: '+player2Score)
        }
      }
    }
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
          $('#question').text('Guess you couldn\'t choose in time, too bad! Next Players turn...');
          enableGraph();
          secondsLeft = 11;
          clearInterval(timer);
        }
        secondsLeft --;
    },1000);
	});

  $(document).on('click','.answer',function() {
    var sol = getSolution(this);
    updateScore(sol);
    enableGraph();
    secondsLeft = 10;
    $('#timer').text('Timer: 00');
    clearInterval(timer);
  })
});