var scope = {
	progress: 0
}

function progressUpdate(){
	scope.progress++;
	stepsInNewGameCreating += teams.length-2;
	var progress = scope.progress*100/stepsInNewGameCreating;
	progress = ''+progress+'%';
	$('.progress-bar').css('width',progress)
}

function addingWordsCntOptions(q){
	var wordsCnt = findOptionsOfMultipules(q);
	var html = '';
	for(var i in wordsCnt) {
		var time = Math.round(wordsCnt[i]*40/30);
		var perTeam = wordsCnt[i]/teams.length;
		html += '<li data-words="'+wordsCnt[i]+'"><a>'+wordsCnt[i]+' слов '+'<span class="badge pull-left">'+perTeam+' слов для 1 команды </span>'+'<span class="badge pull-right">&asymp; '+time+' минут </span>'+'</a></li>'
	}
	$('#wordsCnt').html(html);
}

function findOptionsOfMultipules(q) {
	var options = [];
	// 136
	for (var i=12,l=12;i<=l;i++) {
		if(i%q == 0) {
			options.push(i)
		}
	}
	return options;
}
function creatingSteps_WordsByTeams(){
	var step = 4;
	for (i in teams){
		var wodrsPerTeam = allWordsCnt/teams.length;
		var wordsInputs = createWordsInputs(teams.length,allWordsCnt);
		step += parseInt(i);
		var html = ''+
				'<div class="step words step-'+step+'" style="display: none;">'+
					'<h3>Команда <span class="teamName">'+teams[i].name+' </span> должна внести слова</h3>'+
					'<small>Каждая комманда должна внести '+wodrsPerTeam+' слов</small>'+
					wordsInputs +
					'<div class="center">'+
						'<button type="button" class="btn btn-primary btn-block" id="next">Дальше</button>'+	
					'</div>'+
				'</div> <!--step-'+step+'-end-->'; 
		$('.body .steps').append(html)
	}
	$('.step').last().addClass('last');
}
function createWordsInputs(teams, words) {
	var wodrsPerTeam = words/teams;
	var html = '';
	for(var i = 1; i<=wodrsPerTeam; i++) {
		html += ''+
				'<div class="input-group">'+
					'<span class="input-group-addon">'+i+'</span>'+
					'<input type="text" class="form-control" placeholder="Слово...">'+
				'</div>';
	}
	return html;
}
function inputError(el) {
	$(el).removeClass('has-success');
	$(el).addClass('has-error');
}
function inputSuccess(el) {
	$(el).addClass('has-success');
	$(el).removeClass('has-error');
}
function newWordsValidate(el) {
	var ok = true;
	var thisWords = [];
	$(el).children('div.input-group').each(function(indx,elem){
		var word =$(elem).children('input').val();
		if (word == '' ) {
			inputError(elem);
			ok = false;
		} else if(word == undefined) {
			inputError(elem);
			ok = false;
		} else {
			for(i in words) {
				if(words[i] == word) {
					inputError(elem);
					ok = false
				} 
			}
			for(i in thisWords) {
				if(thisWords[i] == word) {
					inputError(elem);
					ok = false
				}
			}	
		}
		if(ok) {thisWords.push(word);};
		
	})
	return ok
}
function saveNewWords(el) {
	console.log('saveNewWords ');
	$(el).children('div.input-group').each(function(indx,elem){
		words.push($(elem).children('input').val());
	})
}
function startGame() {
	console.log('start Game');
}
function showSettings(){
	console.log('Settings:');
	var teamsNow = 'Teams: ';
	for(i in teams){teamsNow+=teams[i].name+'; '}
	console.log(teamsNow);
	console.log('Words: '+words);
	console.log('timeForStep: '+ timeForStep);
}
function lastBtn() {
	var html = '<div>'+
					'<h3>Настройки установлены - можно начинать игру</h3>'+
					'<button class="btn btn-success" id="startNewGame">Начать Игру</button>'+
				'</div>';
	$('.newGame').append(html);
}
function back(btn){

}