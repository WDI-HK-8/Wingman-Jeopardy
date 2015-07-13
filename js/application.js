$(document).ready(function() {
	var array = [{question : "Your Bro is super drunk and has thrown up, the girl he likes shows up, do you...", answer1 : 'Grab him and run.', answer2 : 'Say it\'s your throw up.', answer3 : 'Tell her that she looks beautiful.', best : 'answer2', okay : 'answer1', bad : 'answer3'}];
  	var timer;
  	var ind;

  	ind = function(x) {
  		x = $(x);
  		var num = 0;
  		var other = 0;
  		for(var a=1;a<=3;a++) {
  			if($('table tr')[a] == $(x.parent().parent())[0]) {
  				other = (a);
  				num += (a-1)*3;
  			}
  		}
  		for(var a=0;a<=2;a++) {
  			var y = $('table tr')[other];
  			if($(y).children()[a] == x.parent()[0]) {
  				num += a;
  			}
  		}
  		return num;
  	}

  	$(document).on('click','.question',function() {
  		console.log(ind(this));
  	})
})