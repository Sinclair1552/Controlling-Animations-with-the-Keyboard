var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;

        var circle = function (x, y, radius, fillCircle) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            if (fillCircle) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        };

        // The Ball constructor
        var Ball = function () {
            this.x = width / 2;
            this.y = height / 2;
            this.speed = 5;
            this.size = 10;
            this.xSpeed = 1;
            this.ySpeed = 0;
        };

        // Update the ball's position based on its speed
        Ball.prototype.move = function () {
            this.x += this.xSpeed * this.speed;
            this.y += this.ySpeed * this.speed;

            if (this.x < 0 || this.x > width) {
                this.xSpeed = -this.xSpeed;
            } else if (this.y < 0 || this.y > height) {
                this.ySpeed = -this.ySpeed;
            }
        };

        // Draw the ball at its current position
        Ball.prototype.draw = function () {
            circle(this.x, this.y, this.size, true);
        };

        // Do the specified action (change direction, size, or speed)
        Ball.prototype.doAction = function (action) {
            if (action === "up") {
                this.xSpeed = 0;
                this.ySpeed = -1;
            } else if (action === "down") {
                this.xSpeed = 0;
                this.ySpeed = 1;
            } else if (action === "left") {
                this.xSpeed = -1;
                this.ySpeed = 0;
            } else if (action === "right") {
                this.xSpeed = 1;
                this.ySpeed = 0;
            } else if (action === "stop") {
                this.xSpeed = 0;
                this.ySpeed = 0;
            } else if (action === "faster") {
                this.speed++;
            } else if (action === "slower") {
                if (this.speed > 0) {
                    this.speed--;
                }
            } else if (action === "smaller") {
                if (this.size > 0) {
                    this.size--;
                }
            } else if (action === "larger") {
                this.size++;
            }
        };

        // Create the ball object
        var ball = new Ball();

        // An object to convert keycodes into action names
        var keyActions = {
            32: "stop",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            88: "faster",
            90: "slower",
            67: "smaller",
            86: "larger"
        };

        // The keydown handler that will be called for every keypress
        $("body").keydown(function (event) {
            var action = keyActions[event.keyCode];
            ball.doAction(action);
        });

        // The animation function, called every 30 ms
        setInterval(function () {
            ctx.clearRect(0, 0, width, height);

            ball.draw();
            ball.move();

            ctx.strokeRect(0, 0, width, height);
        }, 30);