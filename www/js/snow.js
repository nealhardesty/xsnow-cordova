function Snow(container) {
	this.container = container ? container : document.getElementsByTagName("body")[0];

	var snowself=this;

	var canvas = document.createElement('canvas');
	var width = container.offsetWidth;
	var height = container.offsetHeight;
	canvas.width = width;
	canvas.height = height;
	container.appendChild(canvas);

	var conf = { num_trees: 20, num_snowflakes: 100 },
			trees = [],
			flakes = [];

	var treeImg, snowImgs;


	function Tree() {
		this.init();
		return this;
	}
	Tree.prototype.init = function() {
		this.x = width * Math.random();
		this.y = height * Math.random();
		this.img = treeImg;
	}

	function Flake(isFirstInit) {
		this.init(isFirstInit);
		return this;
	}
	Flake.prototype.init = function(isFirstInit) {
		this.x = width * Math.random();
		if(isFirstInit) {
			this.y = height * Math.random();
		} else {
			this.y = 0;
		}
		this.vertSpeed = 3.0 + (Math.random() * 2);
		this.horzSpeed = 0.5 - Math.random();
		var i = Math.floor(Math.random() * 7.0);
		this.img = snowImgs[i];
	}

	Snow.prototype.init = function() {
		treeImg = document.createElement("img");
		treeImg.src = "img/tannenbaum.gif";

		snowImgs = [];
		for(var i=0;i<7;i++) {
			snowImgs[i] = document.createElement("img");
			snowImgs[i].src = "img/snow" + i + ".gif";
		}

		width = container.offsetWidth;
		height = container.offsetHeight;

		for(var i=0;i<conf.num_trees;i++) {
			trees[i] = new Tree();
		}
		for(var i=0;i<conf.num_snowflakes;i++) {
			flakes[i] = new Flake(true);
		}

	}

	function update() {
		for(var i=0;i<flakes.length;i++) {
			flakes[i].y += flakes[i].vertSpeed;
			flakes[i].x += flakes[i].horzSpeed;
			if(flakes[i].x < -5 || flakes[i].x > width + 5 || flakes[i].y > height + 5) {
				flakes[i].init();
			}
		}
	}

	function draw() {
		var ctx = canvas.getContext("2d");

		ctx.fillStyle = '#000000';
		ctx.fillRect(0,0,width,height);

		for(var i=0;i<trees.length;i++) {
			var tree = trees[i];
			ctx.drawImage(tree.img, tree.x, tree.y);
		}

		for(var i=0;i<flakes.length;i++) {
			var flake = flakes[i];
			ctx.drawImage(flake.img, flake.x, flake.y);
		}
	}

	Snow.prototype.start = function() {
		this.intervalId = setInterval(function() {
			update();
			draw();
		}, 20);
	}

	Snow.prototype.stop = function() {
		if(this.intervalId) {
			clearInterval(this.intervalId)
		}
	}

	window.addEventListener('resize', function(event) {
		snowself.init();
	});

	this.init();

	return this;
}
