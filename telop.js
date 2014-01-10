
	var Telop = function(arg){
		if(arg["id"])       this._id      = arg["id"];
		if(arg["class"])    this._class   = arg["class"]; 
		if(arg["interval"]) this.interval = arg["interval"];
	};

	Telop.prototype.count = 0;	
	Telop.prototype.timer;
	Telop.prototype.interval = 100;
	Telop.prototype.stopFlag = false;

	Telop.prototype.setID = function(ID){
		this._id = ID;
	};

	Telop.prototype.setClass = function(Class) {
		this._class = Class;
	};

	Telop.prototype.stringLength;

	Telop.prototype.setText = function(strings){
		this.stopTimer();

		this.insertTag = document.getElementById(this._id);
		this.insertTag.innerHTML = "";
		
		var outputStrings = "";
		this.stringLength = strings.length;

		for(var i = 0; i < this.stringLength; i++){
			if(strings[i] == " "){
				outputStrings += "<div id='_" + this._id + i + "'>&nbsp;</div>";
			}else{
				outputStrings += "<div id='_" + this._id + i + "'>" + strings[i] + "</div>";
			}
		}
		this.insertTag.innerHTML = outputStrings;

		for(var i = 0; i < this.stringLength; i++){
			document.getElementById("_" + this._id + i).style.cssFloat = "left";
		}

		this.stopFlag = true;

		this.start();
	};

	Telop.prototype.start = function(){
		if(this.stringLength) this.showString();
	};

	Telop.prototype.showString = function(){
		if(this.count > this.stringLength-1){
			this.stopFlag = false;
			this.stopTimer();
			this.callback();
			return;
		}

		if(!this._class){
			document.getElementById("_" + this._id + this.count).setAttribute("class", this._id);
		}else{
			document.getElementById("_" + this._id + this.count).setAttribute("class", this._class);
		}
		this.count++;

		var self = this;
		this.timer = setTimeout(function(){self.showString()},this.interval);
	};

	Telop.prototype.stopTimer = function(){
		this.count = 0;
		clearTimeout(this.timer);
	}

	Telop.prototype.stop = function(Class){
		if(this.stopFlag && Class){
			this.stopFlag = false;

			var stopCount = this.count;
			this.stopTimer();
			for(var i = stopCount; i < this.stringLength; i++){
				document.getElementById("_" + this._id + i).setAttribute("class", Class);
			}
			this.callback();
		}
	}

	Telop.prototype.setIntervalTimer = function(time){
		this.interval = time;
	}

	Telop.prototype.callback = function(){}