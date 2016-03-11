var app=angular.module("app", ['ngRoute','ng-fusioncharts']);
app.controller('mainController', function($scope,$http){
	$http.get('https://twags.herokuapp.com/getposts?objectId=56e1d7ad68fa1b33b03214c2').then(function(response){
			$scope.tweets = response["data"]
		})
});

app.controller('chartController', function($scope){

	$scope.myDataSource = {
		chart : {
			caption : "Sentimental Analysis",
			subcaption : "Latest 50 posts",
			theme : 'ocean'
		},
		data: [{
        	label: "Positive",
        	value: "880000"
    	},
    	{
	        label: "Neutral",
        	value: "730000"
    	},
    	{
	        label: "Negative",
        	value: "590000"
    	}]
	};

});

app.controller('loginController', function($scope,$http){

	// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {

    if (response.status === 'connected') {
    	fetchData();
    } else if (response.status === 'not_authorized') {
    	alert('Please log into this app.');
    } else {
    	alert('Please log into Facebook.');
    }
  }

  $scope.checklogin = function() {
    FB.login(function(response){

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    },{scope: 'public_profile,email,user_likes'});
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '756962984405203',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function fetchData() {
    FB.api('/me?fields=id,name,email,likes', function(response) {
      console.log(JSON.stringify(response));

      var likes_arr = new Array();
      var jsonObj = {};

      jsonObj.name = response.name;
      jsonObj.email = response.email;

      for(i=0; i< response.likes.data.length; i++){
        likes_arr[i] = response.likes.data[i].name;
      }

      jsonObj.interests = likes_arr;

        console.log(JSON.stringify(jsonObj));
        console.log(JSON.stringify(jsonObj.name));
        console.log(JSON.stringify(jsonObj.email));
        console.log(JSON.stringify(jsonObj.name));
        console.log(JSON.stringify(jsonObj.interests));
        $http.get('https://twags.herokuapp.com/signup').then(function(response){
        	console.log(JSON.stringify(response))
        })

      console.log('Successful login for: ' + response.name);
    });
  }

  function logout(){
    FB.logout(function(response) {
      // Person is now logged out
    });
  }

  $(document).ready(function(){
      $('nav').hide();
  });


});

app.config(function($routeProvider,$httpProvider){
	 $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$routeProvider
		//route for home page
		.when('/', {
			templateUrl : 'pages/login_1.html',
			controller : 'mainController'
		})

		//route for chart page
		.when('/chart', {
			templateUrl : 'pages/chart.html',
			controller : 'chartController'
		})

		.when('/home', {
			templateUrl : 'pages/home.html',
			controller : 'loginController'
		});


});





// $(document).ready(function(){

//   		var ctx = $('#myChart').get(0).getContext('2d');

//   		var data = {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [
//           {
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.5)",
//             strokeColor: "rgba(220,220,220,0.8)",
//             highlightFill: "rgba(220,220,220,0.75)",
//             highlightStroke: "rgba(220,220,220,1)",
//             data: [65, 59, 80, 81, 56, 55, 40]
//           },
//           {
//             label: "My Second dataset",
//             fillColor: "rgba(151,187,205,0.5)",
//             strokeColor: "rgba(151,187,205,0.8)",
//             highlightFill: "rgba(151,187,205,0.75)",
//             highlightStroke: "rgba(151,187,205,1)",
//             data: [28, 48, 40, 19, 86, 27, 90]
//           },
//           {
//             label: "My Third dataset",
//             fillColor: "rgba(51,87,205,0.5)",
//             strokeColor: "rgba(51,87,205,0.8)",
//             highlightFill: "rgba(51,87,205,0.75)",
//             highlightStroke: "rgba(51,87,205,1)",
//             data: [28, 48, 40, 19, 86, 27, 90]
//           }
//         ]
//       };

//   		var myBarChart = new Chart(ctx).Bar(data, Chart.defaults.global);  	});