	$(function(){
		// Global vars
		var todaymid = moment().startOf('day').unix();
		var secsnow = moment().unix();
		var plans = { name: "", owner: "", invader: "", unit: "", contested: 0, terrs:0};
		var plandaystoday = [];
		var plandaysyest = [];
		
		// Aargh date maths
		function returnDay4am() {
			var startofday4am = todaymid+18900; 
			if (secsnow > startofday4am) {
				yesterday=startofday4am;
			}
			else {yesterday=todaymid-43200;}
			return yesterday;
		}

		function returnDay5am() {
			var startofday5am = todaymid+18900;
			if (secsnow > startofday5am) {
				today=startofday5am;
			}
			else {today=todaymid-43200;}
			return today;
		}
		
                var today = returnDay5am();
                var yest = returnDay4am();			
		
		$('#titledate').append(moment((today-86400)*1000).format('ddd Do MMM'));	

		// Now get the data, apply logic, and graph it out
		
		getTodayData();
	
		// Getting all ze data
		// Json calls
		function getTodayData() {
			// Get planet data for current day
			var thisdate = new Date(today * 1000);
			var thisday = addZero(thisdate.getDate());
			var thismonth = addZero(thisdate.getMonth()+1);
			var thishour = addZero(thisdate.getHours());
			var thisminute = addZero(thisdate.getMinutes());
			var thisyear = thisdate.getFullYear()+1035;
			var urltoday = "https://static.mwomercs.com/data/cw/mapdata-"+thisyear+"-" + thismonth + "-" + thisday + "T05-15.json";
			
			$.getJSON(urltoday,  function (data){
				$.each(data, function (id, val) {
					if (id < 2440){ // get an undefined error without this, weird
                                                var longbin = "";
                                                var search1 = "1";
                                                for (var i = 0; i < 7; i++) {
                                                        longbin = longbin + parseInt(val.territories[i], 10).toString(2);
                                                }
                                                for (var i = count = 0; i < longbin.length; count += +(search1 === longbin[i++]));
						plans = { name:val.name, owner:val.owner.name, invader:val.invading.name, unit:val.unit.name, contested:val.contested, terrs:count };
						plandaystoday.push(plans);
					} 
				}); // Done each
			getYestData();
			}); // Done json
		} // Close getData
		
		function getYestData() {
			// Get planet data for yesterday day
			var thisdate = new Date(yest * 1000);
			var thisday = addZero(thisdate.getDate());
			var thismonth = addZero(thisdate.getMonth()+1);
			var thishour = addZero(thisdate.getHours());
			var thisminute = addZero(thisdate.getMinutes());
			var thisyear = thisdate.getFullYear()+1035;
			var urlyest = "https://static.mwomercs.com/data/cw/mapdata-"+thisyear+"-" + thismonth + "-" + thisday + "T04-15.json";
			
			$.getJSON(urlyest,  function (data){
				$.each(data, function (id, val) {
					if (id < 2440){ // get an undefined error without this, weird
						var longbin = "";
						var search1 = "1";
						for (var i = 0; i < 7; i++) {
							longbin = longbin + parseInt(val.territories[i], 10).toString(2);
						}
						for (var i = count = 0; i < longbin.length; count += +(search1 === longbin[i++]));
						plans = { name:val.name, owner:val.owner.name, invader:val.invading.name, unit:val.unit.name, contested:val.contested, terrs:count };
						plandaysyest.push(plans);
					} 
				}); // Done each
			compareDays();
			unwrapDivs();
			}); // Done json
		} // Close getData
						
						
		// Logic on ze data

		// Get data we want - count of unit tags					
		function compareDays() {
			// vars

			// Loop over planet data to get yesterdays and todays owner
			$.each(plandaysyest, function (i, planyest) {
				//$.each(plandaystoday, function (id, plantod) {
				if (planyest.contested==1) {
					if (planyest.terrs==0) { 
						$('#noaction').append("Peaceful on "+planyest.name+". ");
					}
					else {
						if (planyest.owner==plandaystoday[i].owner) {
							// Output defended
							$('#defended').append(planyest.name+ " was defended from "+planyest.invader+" by "+planyest.owner+" ("+planyest.terrs+" territories).&lt;p/&gt;");
							//console.log("Planet "+planyest.name+ " was defended by "+planyest.owner);
						} 
						else {
							$('#taken').append(planyest.name+ " was taken from "+planyest.owner+" by  "+plandaystoday[i].owner+" ("+planyest.terrs+" territories).&lt;p/&gt;");
							//console.log("Planet "+planyest.name+ " was taken from "+planyest.owner+" by "+plandaystoday[i].owner);
						}
					}
				}
			}); // Done yesterday planet list
			//}); // Done todays planet list

		} // Close compareDays		

		// Lil function to add zeros
		function addZero(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}

		function unwrapDivs() {
			$('#noaction').contents().unwrap();
			$('#defended').contents().unwrap();
			$('#taken').contents().unwrap();
			$('#titledate').contents().unwrap();
			$('head').remove();
		}
		
	}); //End dom ready

