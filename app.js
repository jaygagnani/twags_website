var app=angular.module("app", ['ngRoute']);
app.controller('mainController', function($scope,$http){
	$http.get('https://twags.herokuapp.com/getposts?objectId=56e1d7ad68fa1b33b03214c2').then({
		function(response){
			console.log(response)
		}
	})
});

app.controller('chartController', function($scope){

	$(document).ready(function(){

  		var ctx = $('#myChart').get(0).getContext('2d');

  		var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
            label: "My Third dataset",
            fillColor: "rgba(51,87,205,0.5)",
            strokeColor: "rgba(51,87,205,0.8)",
            highlightFill: "rgba(51,87,205,0.75)",
            highlightStroke: "rgba(51,87,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };

  		var myBarChart = new Chart(ctx).Bar(data, Chart.defaults.global);


  	});

});

app.controller('loginController', function($scope){

});

app.config(function($routeProvider){
	$routeProvider
		//route for home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})

		//route for chart page
		.when('/chart', {
			templateUrl : 'pages/chart.html',
			controller : 'chartController'
		})

		.when('/login', {
			templateUrl : 'pages/login_1.html',
			controller : 'loginController'
		});

});
