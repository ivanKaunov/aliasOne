$(document).ready(function(){
	
	// Добавление кол-ва команд
	$('.body').on('click', '.step-1 #addNewTeam', function(){
		var teamsCount = $('.teams .input-group').length;
		if(teamsCount<3) {
			teamsCount++	
		} else {
			teamsCount++
			$('#addNewTeam').hide();
		}
		var html = ''+
					'<div class="input-group">'+
						'<span class="input-group-addon">'+teamsCount+'</span>'+
						'<input type="text" class="form-control team" placeholder="Team Name">'+
						'<span class="input-group-addon del">'+'X'+'</span>'+
					'</div>';	
		$('.teams').append(html)
		$('.input-group').on('click', '.del', function(){
			$(this).parent().remove();
			$('#addNewTeam').show();
		})
	});
	
	// Создание Команд
	$('.body').on('click', '.step-1 #next', function(){
		teams = [];
		var ok = true;
		$('.team').each(function(index, element){
			var team = new Team($(element).val());
			// Валидация
			for (i in teams) {
				if($(element).val() == teams[i].name) {
					$(element).parent().addClass('has-error');
					ok = false;
					return
				}	
			}
			if($(element).val() != '' ) {
				teams.push(team);	
			} else {
				$(element).parent().addClass('has-error');
				ok = false;
			}		
		});
		// Валидация
		if(ok){
			progressUpdate();
			addingWordsCntOptions(teams.length);
			$('.step-1').hide();	
			$('.step-2').show();
		}
	});
	// Валидация
	$('.body').on('change', 'input', function(){
		if($(this).val() != '') {
			$(this).parent().removeClass('has-error');
			$(this).parent().addClass('has-success');
		} else {
			$(this).parent().removeClass('has-success');
			$(this).parent().addClass('has-error');
		}
	});
	
	// Выбор кол-ва слов
	$('.body').on('click', '.step-2 .nav-pills>li>a', function(){
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		$('.alert').removeClass('alert-danger');
	})
	$('.body').on('click','.step-2 #next', function(){
		var ok = true;
		allWordsCnt = parseInt($('#wordsCnt>li.active').attr('data-words'));
		$('#wordsCnt>li').hasClass('active') ? ok = true : ok = false;
		if(ok){
			progressUpdate();
			$('.step-2').hide();	
			$('.step-3').show();
		} else {
			$('.alert').addClass('alert-danger');
			return false
		}
	})
	
	// Выбор времени на ход
	$('.body').on('click', '.step-3 .nav-pills>li>a', function(){
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		$('.alert').removeClass('alert-danger');
	})
	$('.body').on('click','.step-3 #next', function(){
		var ok = true;
		timeForStep = parseInt($('#timeForStep>li.active').attr('data-val'));
		$('#timeForStep>li').hasClass('active') ? ok = true : ok = false;
		if(ok) {
			progressUpdate();
			$('.step-3').hide();
			creatingSteps_WordsByTeams();
			$('.step-4').show();	
		} else {
			$('.alert').addClass('alert-danger');
			return false
		}
		
	})
	
	// Внесение слов командой
	$('.body').on('change', '.words input', function(){
		var val = $(this).val();
		$(this).attr('val',val);
		if(val == '') {
			inputError($(this).closest('div'));
		} else if(val == undefined) {
			inputError($(this).closest('div'));
		} else {
			for(i in words) {
				if(words[i] == val) {
					inputError($(this).closest('div'));
				}
			}
			if($('.words input[val="'+val+'"]').length>1) {
				inputError($(this).closest('div'));
			}
		}
	});
	$('.body').on('click', '.words #next', function(){
		var thisStep = $(this).closest('.step');
		var ok = newWordsValidate(thisStep);
		if(ok) {
			saveNewWords(thisStep);
			progressUpdate();
			$(this).closest('.step').hide();	
		} else {
			return false
		}
		if (thisStep.hasClass('last')) {
			lastBtn();
		} else {
			$(this).closest('.step').next().show();
		}		
	})
	
	// Старт Игры
	$('.body').on('click', '#startNewGame', function(){
		console.log('START NEW GAME');
	})
	
	// Кнопка НАЗАД
	$('.body').on('click', '.back', function(){
		back(this);
	})
});