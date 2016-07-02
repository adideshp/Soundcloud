(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('soundcloudutility')
		.controller('DashboardCtrl', Dashboard);

	
	function Dashboard($scope) {
		$scope.generes = ['hip hop', 'rap', 'electronic', 'deep house', 'love', 'chill', 'party', 'r&b', 'pop', 'reggaeton','dubstep','reggea','relax','happy','country','techno','remix','house','dance','workout','indie rock','rock','trap','study','funk','soundtrack','edm','latin','fall','instrumental','winter','electro','motivation','summer','piano','accoustic','sad','trance','sleep','classic rock','club','jazz','heavy metal','live','disco','minimal','morning','triphouse','blues','running','indie pop','metal','lounge','punk rock','indie folk','mellow','ambient','folk','punk','bluegrass','sertanejo','pagode','chillstep','bollywood','dancehill','hardstyle','gospel','bachata','gym','twerk'];
		$scope.SoundCloudObj = SC; 
		var widgetIframe = document.getElementById('sc-widget');
		$scope.currentTrackNumber = 0;
        $scope.widget = SC.Widget(widgetIframe);

        $scope.widget.bind(SC.Widget.Events.READY, function() {
      		$scope.widget.bind(SC.Widget.Events.FINISH, function() {
        		$scope.widget.load($scope.tracks[++$scope.currentTrackNumber].uri, {
          			show_artwork: true
        		});
      		});
    	});

    	$scope.startNewSongList = function(trackId) {
    		$scope.widget.load($scope.tracks[trackId].uri, {
          		show_artwork: true
        	});
        	$scope.widget.play();
    	};

	
		$scope.getSongs = function() {
			$scope.SoundCloudObj.initialize({client_id: '018c586b496d24069867a0b467be943c'});
			$scope.SoundCloudObj.get('/tracks', {
	  			genres: $scope.selectedGenere, bpm: { from: $scope.bpm }
			}).then(function(tracks) {
				$scope.tracks = tracks;
				$scope.$apply();
				$scope.startNewSongList(0);
				console.log("Input BPM:" + $scope.bpm);
				console.log("Input Tag:" + $scope.selectedGenere);
	  			console.log(tracks);
			});
		};
	}
})();
