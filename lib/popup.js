var previous_values = new Array();
var lol_eu_ip = "188.40.93.11";
var current_modified_case = -1;
//used to minimise error (ping precision)
var ping_margin = 50;

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.getSelected(null, function(tab) {
            setInterval(function() {
				p = new Ping();
	            p.ping(lol_eu_ip, function(data) {			
				ping_stabiliser (data);
		        document.getElementById("eu_west_content").innerHTML = data;
		        });
            }, 1000);
    });
}, false);

//second order values memory to stabilise the outputed ping
function ping_stabiliser (data) {
	if (previous_values.length == 0) {
		previous_values[0] = data;
		current_modified_case = 0;
		//console.log("previous_values["+current_modified_case+"]");
	} else if (previous_values.length == 1) {
		previous_values[1] = data;
		current_modified_case = 1;
		//console.log("previous_values["+current_modified_case+"]");
	} else if (previous_values.length == 2) {
		if (current_modified_case == 0) {
			if (data - ping_margin > previous_values[1]){
				console.log("margin surpassed"+data +" + " +previous_values[1]);
				data = Math.ceil((previous_values[0] + previous_values[1])/2);
			}
			previous_values[1] = data;
			current_modified_case = 1;
			//console.log("previous_values["+current_modified_case+"]");
		} else if (current_modified_case == 1) {
			if (data - ping_margin > previous_values[0]){
				console.log("margin surpassed"+data +" + " +previous_values[0]);
				data = Math.ceil((previous_values[0] + previous_values[1])/2);
			}
			previous_values[0] =data;
			current_modified_case = 0;
			//console.log("previous_values["+current_modified_case+"]");
		}
							
	}
	return data;
}