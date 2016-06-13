'use-strict';

// Cria o objeto que vai conter todo o jogo
var mainState = {

	// preload dos itens
	preload : function() {
		// cria um controle
		game.load.image('paddle', 'assets/paddle.png');

		//cria os blocos
		game.load.image('brick', 'assets/brick.png'); 

		// cria a bola
		game.load.image('ball', 'assets/ball.png');
	},

	// onde cria o jogo
	create : function(){
		//define o bg
		game.stage.backgroundColor = '#3598db';

		// definie a fisica de arcade
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//habilita a fisica para todos os objetos
		game.world.enableBody = true;

    	//coloca o controle, em baixo
    	this.paddle = game.add.sprite(200, 400, 'paddle');

    	// habilita o mouse
    	this.paddle.inputEnabled = true;

    	//habilita o drag do mouse
    	this.paddle.input.enableDrag();

    	// desabilita o movimento vertical
    	this.paddle.input.allowVerticalDrag = false;

    	// quando a bola bater no controle, ele fica parado
    	this.paddle.body.immovable = true;

    	//cria um grupo, onde vao estar todos os blocos
    	this.bricks = game.add.group();

    	// coloca 25 blocos no jogo
	    for (var i = 0; i < 5; i++) {
	        for (var j = 0; j < 5; j++) {
	            // Coloca os blocos no lugar certo
	            var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');

	            // Não vai mover os blocos, quando a bola bater
	            brick.body.immovable = true;

	            // adicona o bloco, no jogo
	            this.bricks.add(brick);
	        }
	    }

	    //adiciona a bola
	    this.ball = game.add.sprite(200, 300, 'ball'); 

	    // coloca velocidade da bola
    	this.ball.body.velocity.x = 200;
    	this.ball.body.velocity.y = 200;

    	// faz com que a bola rebata, quando bater em algo
    	this.ball.body.bounce.setTo(1); 
    	this.ball.body.collideWorldBounds = true;

	},

	// atualizar o jogo
	update : function() {
    	// cria colisao entre o controle e a bola
    	game.physics.arcade.collide(this.paddle, this.ball);

    	// chama o metodo hit, quando a bola bater num bloco
		game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

		//se a bola cair, reseta o jogo
	    if (this.ball.y > this.paddle.y)
	        game.state.start('main'); 
	},

	// metodo pra retirar o bloco do jogo
	hit: function(ball, brick) {  
	    brick.kill();
	},

};

// inicia o jogo
var game = new Phaser.Game(400,450,Phaser.AUTO);
game.state.add('main',mainState);
game.state.start('main');