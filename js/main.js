var current_item = 1;
var total_item = 5;
var urS;
var urll;
var currentLevel;
var changingName=false;
var bestScore;
var score1;
var score2;
var score3;
var score4;
var ScoresQuery;
var playerScore;
var tableRow;
var scoreTableVisible=false;
var helpVisible=false;

window.onload = function () {
	
	/*document.getElementById('nameText').addEventListener('change',
			function () {
			document.getElementById("log").innerHTML="zzzz";
			changingName=true;
			}, false);*/

	//Backendless script
    var APPLICATION_ID = '6BB81294-7BEA-ED25-FF30-124C49DEF400';
    var SECRET_KEY = '5ABE1B94-8D24-1CFA-FF7E-FD5981BACB00';
    var VERSION = 'v1';
    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);   

    function score(args) {
    	args = args || {};
    	this.name = args.name || null;
    	this.score = args.score || null;
    	this.___class = "score";
    	}
    
    // Retrive table score from backendless
    var dataQuery = {   	
    		//options: {sortBy: name},
    		//sortBy: ["name DESC"],
    		//pageSize: "5"
    		
	}
    var query = new Backendless.DataQuery();
    query.options = {sortBy: ["score DESC"],pageSize: "6"};
	ScoresQuery =Backendless.Persistence.of( score ).find(query);
    ScoresQuery.options = { sortBy:"name desc" };
    
	for (var i = 0; i < ScoresQuery.data.length; i++) {
		playerScore=ScoresQuery.data[i].score+'';
		tableRow="<tr><td>"+ScoresQuery.data[i].name+"</td><td>"+playerScore+"</td></tr>";
		document.getElementById("tableScore").innerHTML+=tableRow;
		};
    //end Retrieve 
		
		function ajout(Name,Score) {
	    	var myScore = new score({
	    	name : Name,
	    	score : Score
	    	});
	    	var persistedDataObject=Backendless.Persistence.of( score ).save( myScore );
	        var objectId = persistedDataObject["objectId"];
	        localStorage.setItem("BackendlessOBjectId",objectId);
	    }	
		
	    function update(Name,Score,objId) {
	    	var myScore = new score({
	    		objectId : objId,
	    		name : Name,
	    		score : bestScore
	    	});
	    	Backendless.Data.of( score ).save( myScore );
	    }	
	    
	
    //Fin Backendless script
    
    if(sessionStorage.getItem("level")===undefined || sessionStorage.getItem("level")=== null){
        sessionStorage.setItem("level",1);        
	}

    if(sessionStorage.getItem("score1")===undefined || sessionStorage.getItem("score1")=== null){
        sessionStorage.setItem("score1",0);        
	}
    if(sessionStorage.getItem("score2")===undefined || sessionStorage.getItem("score2")=== null){
        sessionStorage.setItem("score2",0);        
	}
    if(sessionStorage.getItem("score3")===undefined || sessionStorage.getItem("score3")=== null){
        sessionStorage.setItem("score3",0);        
	}
    if(sessionStorage.getItem("score4")===undefined || sessionStorage.getItem("score4")=== null){
        sessionStorage.setItem("score4",0);        
	}
    score1=parseInt(sessionStorage.getItem("score1"));
    score2=parseInt(sessionStorage.getItem("score2"));
    score3=parseInt(sessionStorage.getItem("score3"));
    score4=parseInt(sessionStorage.getItem("score4"));
    
    bestScore=score1+score2+score3+score4;
    
    if(sessionStorage.getItem("name")===undefined || sessionStorage.getItem("name")=== null){
        sessionStorage.setItem("name","Player");        
	}else if(sessionStorage.getItem("name")!=="Player"){update(sessionStorage.getItem("name"),bestScore,localStorage.getItem("BackendlessOBjectId"));}
    

    
	$("#divselected").addClass("divselected1");
	
   document.addEventListener('keydown', function(e) {
	   $("#divselected").removeClass("divselected"+current_item);
	   
    	switch(e.keyCode){
    	case TvKeyCode.KEY_LEFT:
    		document.getElementById("nameDiv").style.display = "none";	
    		document.getElementById("scoreDiv").style.display = "none";	
    		document.getElementById("helpDiv").style.display = "none";	
    		changingName=false;
    		scoreTableVisible=false;
    		helpVisible=false;
    		current_item--;
    		break;
    	case TvKeyCode.KEY_RIGHT :
    		document.getElementById("nameDiv").style.display = "none";	 
    		document.getElementById("scoreDiv").style.display = "none";	
    		document.getElementById("helpDiv").style.display = "none";
    		hangingName=false;
    		scoreTableVisible=false;
    		helpVisible=false;
    		current_item++; 
    		break;
    	case TvKeyCode.KEY_0:
    		window.location = 'level4.html';
    		break;
    	case TvKeyCode.KEY_ENTER: 
    		switch(current_item){
    		case 1: 
    			if(sessionStorage.getItem("name")!==null && sessionStorage.getItem("name")!=="Player")
    				{window.location = 'level1.html';}
    			else if(!changingName)
	    			{document.getElementById("nameDiv").style.display = "block";
	    			document.getElementById("nameText").focus();
	    			changingName=true;}
	    		else{
	    			var name=document.getElementById("nameText").value;
	    			if(name!=="")
	    				{
			    			sessionStorage.setItem("name",name);	    			
			    			ajout(name,bestScore);
			    			document.getElementById("nameText").blur();	    			
			    			document.getElementById("nameDiv").style.display = "none";	    			
			    			window.location = 'level1.html';			    			
	    				}
	    			else{document.getElementById("nameDiv").style.display = "none";}
	    			changingName=false;
	    		}
    			
        		break;
    		case 2:
    			window.location = 'level'+sessionStorage.getItem("level")+'.html';
        		break;
        	case 3: 
        		if(!scoreTableVisible)
    			{
        			document.getElementById("scoreDiv").style.display = "block";    			
        			scoreTableVisible=true;
        		}
        		else
        		{
        			document.getElementById("scoreDiv").style.display = "none";
    				scoreTableVisible=false;
    			}
        		break;
        	case 4 :
        		if(!helpVisible)
    			{
        			document.getElementById("helpDiv").style.display = "block";    			
        			helpVisible=true;
        		}
        		else
        		{
        			document.getElementById("helpDiv").style.display = "none";
        			helpVisible=false;
    			}
        		break;
        	case 5: 
        		window.close();
        		break;
        	default:
        		console.log("Key code : " + current_item);
        		break;
        	}
    		break;
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    	}
    	
    	if(current_item>total_item){current_item=1;}
    	else if (current_item<1){current_item=5;}
    	if(current_item===2){document.getElementById("level").innerText = sessionStorage.getItem("level");document.getElementById("level").style.fontSize="1200%";}
    	else if(current_item===3){document.getElementById("level").innerText = bestScore+'';document.getElementById("level").style.fontSize="900%";}
    	else {document.getElementById("level").innerText ="";}
    	
    	$("#divselected").addClass("divselected"+current_item);    	
    });
        
};