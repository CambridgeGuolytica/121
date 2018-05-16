// GOOGLE CIVIC INFORMATION API : www.googleapis.com/civicinfo/v2/elections?key=AIzaSyADkYE2PdLRu-ABMd763Qbu8YLzB4cRYQ8

let electionArray = [];
let chosenElection = 0;

/**
* checks if the Enter key is pressed
*/
function checkEnter(e) {
	if (e.keyCode == 13) {
		return false;
	}
	else {
		return true;
	}
}

$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
		console.log("Javascript connected!");

		const url = "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyADkYE2PdLRu-ABMd763Qbu8YLzB4cRYQ8";
		const pollURL = "https://www.googleapis.com/civicinfo/v2/voterinfo";

		//gets all upcoming elections
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			success: function(data) {
				console.log(data);
				$.each(data.elections, function(i, election){
					//places a new button with an election onscreen
					const html = '<button class="election-button" id="' + election.id + '">' + election.name + '<br>' + election.id + '<br>' + election.id + '<br>' + election.electionDay + '</button>';
          $(".electionContent").append(html);

					electionArray.push(election.id);
					console.log(electionArray.length);
				});

				//adds click listener to each election button
				console.log(electionArray.length + 'this');
				electionArray.forEach(function(idVal) {
					$('#' + idVal).click(function(e) {
						e.preventDefault();

						chosenElection = idVal;
						console.log(chosenElection);

						electionArray.forEach(function(removeVal) {
							$('#' + removeVal).remove();
						});
						$('.choose_election_title').hide();
						$('.geocoder_title').show();
						$('.search-container').show();
					});
				});
			}
		});

		//used when registered address is entered
		$.ajax({
			type: 'GET',
			url: pollURL,
			data: {
				'address': '4460 Pavlov Ave, San Diego, CA, 92122',
				'electionId': chosenElection
			},
			dataType: 'json',
			success: function(pollData) {

			}
		});

		$('.geocoder_title').hide();
		$('.search-container').hide();


}
