$(document).ready(function() {
	var array = [{question : "Your Bro is super drunk and has thrown up, the girl he likes shows up, do you...", answer1 : 'Grab him and run', answer2 : 'Say it\'s your throw up', answer3 : 'Tell her that she looks beautiful', best : 'answer2', okay : 'answer1', bad : 'answer3'}];
	var clicked = [];
  var timer;
	var ind;
  var secondsLeft = 10;

	ind = function(x) {
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

	$(document).on('click','.question',function() {
		var num = ind(this);
		var cur = array[num];
    disableGraph(num);
		$('#question').text(cur.question);
		for(var a=0;a<=2;a++) {
			var btn = $('.answer')[a];
			var str = 'answer'+(a+1)
			$(btn).text(cur[str]);
			$(btn).css({display : 'initial'});
		}
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
    $('#question').text('You got this question: '+sol);
    enableGraph();
    secondsLeft = 11;
    clearInterval(timer);
  })
});