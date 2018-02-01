var express = require('express');
var app = express();


var data = {
	"questions": [
		{"id":0, "question": "What are good places to eat?", "answers":[
			{"id":1,"answer":"Chipotle"},
			{"id":2,"answer":"Subways"}	
		]},
		{"id":1, "question": "What is the meaning of life?", "answers":[
			{"id":1,"answer":"Cats"},
			{"id":2,"answer":"Pizza"}
		]}
	]
	// data.questions[0].question -> What are good places to eat?
	// data.questions[0].answers[0].answer -> Chipotle
}

var server = app.listen(3000, () =>{
	console.log('Listening on port: 3000');
})

app.use(express.static('public'));

// Get the questions.
app.get('/questions', getQuestions);
function getQuestions(req, res){
	var questions = data.questions.map(item => item.question);
	res.send(questions);
}

// Get answers to question
// @Param: ID of the question to get answers to.
app.get('/questions/:id/', getAnswers); 
function getAnswers(req, res){
	var questionID = req.params.id;
	var questionAnswers = data.questions[questionID].answers.map(item=> item.answer);
	res.send(questionAnswers);
}

// Add a question
// @param: question to be asked.
app.get('/add/question/:id', addQuestion);
function addQuestion(req, res){
	var question = req.params.id;
	var array = [];
	console.log(data.questions.length);
	data.questions.push(
		{
			id: (data.questions.length),
			question: question,
			answers: array
		});
	res.send("thanks for your question.");
}



