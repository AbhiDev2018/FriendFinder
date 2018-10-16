// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData		= require('../data/friends.js');
var path 			= require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});

	// API POST Requests
	// Below code handles the POST listener on the server there is a POST request sent on filing up the survey.
	// ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        
        var newfriend = req.body;
		console.log(newfriend);
	
	
		var ff_d = [];
		
	
		for (var i = 0;i<friendsData.length;i++){
	
			var total_diff = 0;
			for (var j=0;j<newfriend["scores[]"].length;j++){
	
			    console.log("score " +j+" from FORM: "+newfriend["scores[]"][j]);	
			 
				console.log("Score "+ j+" from dataset for user "+i+" :"+friendsData[i]["scores[]"][j]);
				
				console.log("For question/score "+j+" for user "+i+", score difference: "+Math.abs(newfriend["scores[]"][j] - friendsData[i]["scores[]"][j]))
				
				total_diff=total_diff+Math.abs(newfriend["scores[]"][j] - friendsData[i]["scores[]"][j]);
			}	
			console.log("*************");
			. 
			console.log("differences with user******"+i+" :"+total_diff);
				
			ff_d.push({
				user: i,
				score_diff:total_diff
			});
		}
		console.log("loop ended");
		console.log(ff_d);
		
		var lowest = Number.POSITIVE_INFINITY;
		var highest = Number.NEGATIVE_INFINITY;
		var tmp;
		var associated_user;
		for (var i=0;i<ff_d.length;i++) {
			tmp = ff_d[i].score_diff;
			if (tmp < lowest) lowest = tmp;
			if (tmp > highest) highest = tmp;
		}
	//	console.log("****hi***");
		console.log(highest, lowest);

		
			if(lowest==ff_d[i].score_diff){
				associated_user = ff_d[i].user;
			}
		}	

		console.log("user index with lowest difference: "+associated_user)


		friendsData.push(newfriend);


        res.json(friendsData[associated_user]);

    })

}