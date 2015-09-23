function Team(name) {
	this.name = name;
	this.score = 0;	
}
Team.prototype.getScore = function(){
	return this.score
}
var teams = [];
var stepsInNewGameCreating = 5;
var allWordsCnt;
var timeForStep; //ms
var words = []