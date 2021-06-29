document.addEventListener('DOMContentLoaded', () => {

    const mascot = document.querySelector('.mascot')
    const container = document.querySelector('.gameContainer')
    const alert = document.querySelector('.alert')
    const pointsSpan = document.querySelector('.points')
    let gravity = 0.9 
    let isGameOver = false
    let isJumping = false
    let points = 0
    let obstacles = ["corona.png","psd.png","meet.png"]
    let prevPos = 3
    let pos = 4



    function control(e) {
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping = true
                if(!isGameOver){
                    jump()
                }
            }
        }
    }

    document.addEventListener('keyup', control)


    function walk(){
        if( !isGameOver && !isJumping){
            console.log(prevPos)
                if(prevPos === 3 && pos === 4){
                    mascot.style.backgroundImage = "url('./images/mascots/1.png')"
                    prevPos = 1
                    pos = 1
                }
                else if(prevPos === 3 && pos === 1){
                    mascot.style.backgroundImage = "url('./images/mascots/4.png')"
                    pos = 4
                    prevPos = 4
                }
                else if(prevPos === 1 || prevPos === 4){
                    mascot.style.backgroundImage = "url('./images/mascots/3.png')"
                    prevPos = 3
                }
        }
        else if(isJumping){
            console.log("jumping")
            mascot.style.backgroundImage = "url('./images/mascots/2.png')"
        }
    }


    let position = 0
    function jump(){
        let count = 0
        let timerId = setInterval(function(){
            if(count === 20 ){
                clearInterval(timerId)
                let downTimerId = setInterval(function (){
                    if(count === 0){
                        clearInterval(downTimerId)
                        mascot.style.bottom = '0px'
                        isJumping = false
                        points += 80
                        pointsSpan.innerHTML = "Points:" + points
                    }
                    else{
                        position = -5 
                        count --
                        position = position * gravity
                        mascot.style.bottom = position + 'px' 
                    }


                }, 20)
            }
            position += 20 
            count ++
            position = position * gravity
            mascot.style.bottom = position + 'px'
        },20)
    }

    function RandomizeObstacles() {
        let randomIndex = Math.floor(Math.random() * 3);
        return obstacles[randomIndex]
    }

    function generateObstacles() {
        let randomTime = (Math.random() * 4000) + 1000
        let obstaclePosition = 800
        const obstacle = document.createElement('div')
        
        if(!isGameOver) obstacle.classList.add('obstacle')
        container.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'
        obstacle.style.backgroundImage = `url("./images/Obstacles/${RandomizeObstacles()}")`
        let timerId = setInterval(function(){
            if(obstaclePosition > 200 && obstaclePosition < 260 && position < 90){
                clearInterval(timerId)
                isGameOver = true
                mascot.style.backgroundImage = "url('./images/mascots/5.png')"
                alert.style.display = "flex"
            }
            obstaclePosition -= 10  
            if(!isGameOver){
                points += 5
                pointsSpan.innerHTML = "Points:" + points   
            }
            obstacle.style.left = obstaclePosition + 'px'
        },20)
        if(!isGameOver)setTimeout(generateObstacles, randomTime)
        setInterval(walk,300)
    }
    generateObstacles()
})