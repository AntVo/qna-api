var express = require('express');
var fs = require('fs');

var jsonData = fs.readFileSync('questions.json');
var data = JSON.parse(jsonData);
console.log(data);

var app = express();
var server = app.listen(process.env.PORT || 8080, () => console.log('Server is running!'));

app.use(express.static('public'));

//Get all data
app.get('/all', getAll);
function getAll(res, res){
	res.send(data);
}

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
	var newData = JSON.stringify(data, null, 3);
	fs.writeFile('questions.json', newData, function(err){
		console.log('all set');
	});
	res.send("thanks for your question.");
}

// Answer a Question with ID# 
app.get('/add/answer/:questionid/:answer', addAnswer);
function addAnswer(req, res){
	var id = req.params.questionid;
	var answer = req.params.answer;
	var answerObj = {
		id: data.questions[id].answers.length,
		answer: answer
	}
	data.questions[id].answers.push(answerObj);
	var newData = JSON.stringify(data, null, 3);
	fs.writeFile('questions.json', newData, function(err){
		console.log('all set');
	})
	res.send("thanks for your answer.");
}


// Delete Question with ID#
app.get('/delete/:questionid', deleteQuestion);
function deleteQuestion(req, res){
	var id = req.params.questionid;
	if (id < data.questions.length){
		data.questions.splice(id, 1);
	} else {
		res.send("Question doesn't exist!");
		return;
	}
	var newData = JSON.stringify(data, null, 3);
	fs. writeFile('questions.json', newData, function(err){
		console.log('all set');
	})
	res.send("Question deleted");
}




