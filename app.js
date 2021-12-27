const screen = document.getElementById('screen')
const context = screen.getContext('2d')
const event_listener = document.addEventListener('keydown', keydown)
var player_1_points = 0
var player_2_points = 0

const screen_color = 'black'
const screen_width = screen.width
const screen_height = screen.height

const ball_width = 30
const ball_height = 30
var ball_x = (screen_width/2)-ball_width
var ball_y = (screen_height/2)-ball_height
var ball_speed_x = 1
var ball_speed_y = 1
var ball_color = 'yellow'

const players_width = 10
const players_height = 100
const players_speed = 7

const player_1_x = 0
var player_1_y = (screen_height/2)-players_height
const player_1_color = 'red'

const player_2_x = screen_width-players_width
var player_2_y = (screen_height/2)-players_height
const player_2_color = 'blue'

function draw(){
    context.fillStyle = ball_color
    context.fillRect(ball_x, ball_y, ball_width, ball_height)
    
    context.fillStyle = player_1_color
    context.fillRect(player_1_x, player_1_y, players_width, players_height)

    context.fillStyle = player_2_color
    context.fillRect(player_2_x, player_2_y, players_width, players_height)

    context.fillStyle = 'white'
    context.font = '30px Arial'
    context.fillText(player_1_points, screen_width/4, 50)

    context.fillStyle = 'white'
    context.font = '30px Arial'
    context.fillText(player_2_points, screen_width/1.5, 50)
}

function clear(){
    context.fillStyle = screen_color
    context.fillRect(0, 0, screen_width, screen_height)
}

function keydown(information){
    if (information.key == 'w'){
        if (player_1_y >= 0){
            player_1_y -= players_speed
        }
    }

    if (information.key == 's'){
        if (player_1_y <= screen_height-players_height){
            player_1_y += players_speed
        }
    }

    if (information.key == 'ArrowUp'){
        if (player_2_y >= 0){
            player_2_y -= players_speed
        }
    }

    if (information.key == 'ArrowDown'){
        if (player_2_y <= screen_height-players_height){
            player_2_y += players_speed
        }
    }
}

setInterval(game_loop, 7)

function game_loop(){
    clear()

    ball_x += ball_speed_x
    ball_y -= ball_speed_y

    if (ball_y <= 0 || ball_y >= screen_height-ball_height){
        ball_speed_y *= -1
    }

    if (ball_x+ball_width == player_2_x && ((ball_y+ball_height >= player_2_y && ball_y+ball_height <= player_2_y+players_height) || (ball_y <= player_2_y+players_height && ball_y >= player_2_y))){
        ball_speed_x *= -1
    }

    if (ball_x == player_1_x+players_width && ((ball_y+ball_height >= player_1_y && ball_y+ball_height <= player_1_y+players_height) || (ball_y <= player_1_y+players_height && ball_y >= player_1_y))){
        ball_speed_x *= -1
    }

    if (ball_x ==0){
        player_1_y = (screen_height/2)-players_height
        player_2_y = (screen_height/2)-players_height
        ball_x = (screen_width/2)-ball_width
        ball_y = (screen_height/2)-ball_height

	player_2_points += 1
    }

    if (ball_x+ball_width == screen_width){
        player_1_y = (screen_height/2)-players_height
        player_2_y = (screen_height/2)-players_height
        ball_x = (screen_width/2)-ball_width
        ball_y = (screen_height/2)-ball_height

        player_1_points += 1
    }

    draw()
}