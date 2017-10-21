var nextLevel;
var helpVisible=false;
window.onload = function () {
	//nextLevel+=1;
	//nextLevel=4;
	
    
   document.addEventListener('keydown', function(e) {	   
    	switch(e.keyCode){    	
    	case TvKeyCode.KEY_BACK:
    		if(confirm("ARE YOU SURE TO QUIT ?")) window.location = 'index.html';    		
    		break;
    	case TvKeyCode.KEY_NEXT:
    		window.location = 'level'+sessionStorage.getItem("level")+'.html';
    		break;
    	case TvKeyCode.KEY_ENTER:
    		window.location = 'level'+sessionStorage.getItem("level")+'.html';    		
    		break;
    	case TvKeyCode.KEY_0:
    		if(confirm("ARE YOU SURE TO PLAY AGAIN ?")) location.reload();
    		break;
    	case TvKeyCode.KEY_1:
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
    	case TvKeyCode.KEY_INFO:
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
    	case TvKeyCode.KEY_2:
    		if(confirm("ARE YOU SURE TO QUIT ?")) window.location = 'index.html';    		
    		break;
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    	} 	
    });
	
        
};
