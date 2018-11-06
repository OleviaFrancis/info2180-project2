//Code done by Olevia Francis
//Extra features: end of game notification, game time
var timing = document.createElement("time");
var h_2= document.createElement("h2");
	var node = document.createTextNode("00:00:00");
var hx = h_2[0]
	var  seconds = 0, minutes = 0, hours = 0,t;
var b_ground;
	var timer;
	var restartbutton = document.createElement("input")
		restartbutton.type ="submit"
		restartbutton.value ="Restart Game"	
window.onload =() =>
{

	

	timing.appendChild(node);
	h_2.appendChild(timing);
	document.body.appendChild(h_2);

	
	let p_area = document.getElementById("puzzlearea");
	let children = document.querySelectorAll("#puzzlearea div")
	let shufflebutton = document.getElementById("shufflebutton")
	console.log(children)
	let x=0;
	let y =0;
	let count =0;
	let space1= '300px';
	let space2= '300px';
	

		document.body.appendChild(restartbutton);

		for (let i=0; i< children.length; i++)
		{

			children[i].classList.add("puzzlepiece");

			children[i].style.left = x+"px";  
			children[i].style.top = y+"px";
			children[i].style.backgroundPosition = `${-x}px ${-y}px`;
			x +=100;
			count +=1;

			if (count%4==0){

				y+=100;
				x=0;
			}
			children[i].addEventListener("mouseover",red);
			children[i].addEventListener("mouseout",black);
			children[i].addEventListener("click",slide);

		  }
		 //shuffle();

	shufflebutton.addEventListener("click",shuffle);
	shufflebutton.addEventListener("click",tim);
	restartbutton.addEventListener("click",restart);

	function slide ()
			{
				if(move(parseInt(this.innerHTML)))
				{
					swap(this.innerHTML-1);
					if(finish())
					{
						Gamewin();
					}
					return;
				}
			};
	function red ()
			{
				if(move(parseInt(this.innerHTML)))
				{
					this.style.border = "2px solid red";
					this.style.color = "#006600";
					this.style.textDecoration = "underline";
				}
			};
	function black ()
			{
				this.style.border = "2px solid black";
				this.style.color = "#000000";
				this.style.textDecoration = "none";
			};
	function shuffle()
	{
		for (var i=0; i<250; i++)
        {
            let rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                let mve = moveup(space1,space2);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }
            if (rand == 1)
            {
                let mve = movedown(space1,space2);
                if ( mve != -1) 
                {
                    swap(mve);
                }
            }

            if (rand == 2)
            {
                let mve = LEFT(space1,space2);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }

            if (rand == 3)
            {
                let mve = RIGHT(space1,space2);
                if (mve != -1)
                {
                    swap(mve);
                }
            }
        }
	}

	function change()
	{
    	let text = document.getElementsByClassName("explanation");
   	 	b_ground --;
   		if (b_ground == 0)
	    {
	        var body = document.getElementsByTagName('body');
	        body[0].style.backgroundColor = "#FFFFFF";
	        text[0].innerHTML = "CONGRATULATION YOU WIN!!!";
	        text[0].style.fontWeight = "bold";
	        text[1].innerHTML = "CONGRATULATION YOU WIN!!!";
	        text[1].style.fontWeight = "bold";
	        stoptime();
	        return;
	    }
	    if (b_ground % 2)
	    {
	        var body = document.getElementsByTagName('body');
	        body[0].style.backgroundColor = "#1302fc";    
	    }
	    else
	    {
        	var body = document.getElementsByTagName('body');
        	body[0].style.backgroundColor = "#02fcfc";
    	}
    	timer = setTimeout(change, 100);
	}

	function Gamewin()
	{
		let body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000";
		b_ground = 10;
		timer = setTimeout(change,100);
		

	}

	function restart()
	{
		location.reload();
	}


	function finish()
	{
		let flag = true;
		for (let i = 0; i<children.length; i++)
		{
			let a = parseInt(children[i].style.top);
			let b = parseInt(children[i].style.left);

			if (b !=(i%4*100) || a != parseInt(i/4)*100)
			{
				flag=false;
				break;
			}
		}
		return flag;
	}


	function swap (pos){
		let temp = children[pos].style.top;
		children[pos].style.top= space2;
		space2 = temp;

		temp=children[pos].style.left;
		children[pos].style.left = space1;
		space1 = temp;
	}


	function move(pos)
	{
		if (LEFT(space1,space2) == (pos-1))
		{
			return true;
		}

		if(movedown(space1,space2) == (pos-1))
		{
			return true;
		}

		if(moveup(space1,space2) == (pos-1))
		{
			return true;
		}

		if(RIGHT(space1,space2) == (pos-1))
		{
			return true;
		}
	}


	function RIGHT (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (xx < 300)
	    {
	        for (var i =0; i<children.length; i++){
	            if (parseInt(children[i].style.left) - 100 == xx && parseInt(children[i].style.top) == yy) 
	            {
	                return i;
	            }
	        }
	    }
	    else
	    {
	        return -1;
	    } 
	}


	function LEFT(x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);

	    if (xx > 0)
	    {
	        for (var i = 0; i < children.length; i++) 
	        {
	            if (parseInt(children[i].style.left) + 100 == xx && parseInt(children[i].style.top) == yy)
	            {
	                return i;
	            } 
	        }
	    }
	    else 
	    {
	        return -1;
	    }
	}


	function movedown (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (yy < 300)
	    {
	        for (var i=0; i<children.length; i++)
	        {
	            if (parseInt(children[i].style.top) - 100 == yy && parseInt(children[i].style.left) == xx) 
	            {
	                return i;
	            }
	        }
	    } 
	    else
	    {
	        return -1;
	    } 
	}

	function moveup (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (yy > 0)
	    {
	        for (var i=0; i<children.length; i++)
	        {
	            if (parseInt(children[i].style.top) + 100 == yy && parseInt(children[i].style.left) == xx) 
	            {
	                return i;
	            }
	        } 
	    }
	    else 
	    {
	        return -1;
	    }
	}

	function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    	h_2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    	tim();
	}
	function tim() {
    	t = setTimeout(add, 1000);
	}

	function stoptime(){
		clearTimeout(t);
	}
}
