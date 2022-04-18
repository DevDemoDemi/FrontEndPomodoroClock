$(document).ready(() => {

    $('#session-increment').click(() => {
        seshMins++
        $('#session-length').text(seshMins)

        if (seshMins < 10) {
            $('#time-left').text('0' + seshMins + ':00')
        } else {
            $('#time-left').text(seshMins + ':00')
        }

        if (seshMins == 60) {
            $('#session-increment').prop('disabled', true)
            sInc = true
        } else if (sDec) {
            $('#session-decrement').prop('disabled', false)
            sDec = false
        }
    })


    $('#session-decrement').click(() => {
        seshMins--
        $('#session-length').text(seshMins)

        if (seshMins < 10) {
            $('#time-left').text('0' + seshMins + ':00')
        } else {
            $('#time-left').text(seshMins + ':00')
        }

        if (seshMins == 1) {
            $('#session-decrement').prop('disabled', true)
            sDec = true
        } else if (sInc) {
            $('#session-increment').prop('disabled', false)
            sInc = false
        }
    })


    $('#break-increment').click(() => {
        breakMins++
        $('#break-length').text(breakMins)

        if (breakMins == 60) {
            $('#break-increment').prop('disabled', true)
            bInc = true
        } else if (bDec) {
            $('#break-decrement').prop('disabled', false)
            bDec = false
        }

    })


    $('#break-decrement').click(() => {
        breakMins--
        $('#break-length').text(breakMins)

        if (breakMins < 1) {
            breakMins = 1
            $('#break-length').text(breakMins)

            $('#break-decrement').prop('disabled', true)
            bDec = true
        } else if (bInc) {
            $('#break-increment').prop('disabled', false)
            bInc = false
        }
    })


    $('#start_stop').click(() => {
        $('#start_stop').toggleClass('btn-danger')

        if ($('#start_stop').hasClass('btn-danger')) {
            $('#start_stop').text('stop')
            begun = false
        } else {
            $('#start_stop').text('start')
            begun = true
        }

        if (begun) {
            clearInterval(started)
            if (isSesh) {
                $('#timer-label').text('Session paused')
            } else {
                $('#timer-label').text('Break paused')
            }
        } else {
            if (isSesh) {
                started = setInterval(seshTimer, 100)
                $('#timer-label').text('Session started')
            } else {
                started = setInterval(breakTimer, 100)
                $('#timer-label').text('Break started')
            }
        }
    })


    $('#reset').click(() => {
        clearInterval(started)
        $('#session-length').text(25)
        $('#break-length').text(5)
        $('#start_stop').text('start').removeClass('btn-danger')
        $('#timer-label').text('Press start to begin your session')
        // $('#time-left').text('25:00')
        $('#break-increment').prop('disabled', false)
        $('#break-decrement').prop('disabled', false)
        $('#session-increment').prop('disabled', false)
        $('#session-decrement').prop('disabled', false)

        seshMins = 25
        breakMins = 5
        secs = 0
        document.getElementById('time-left').innerHTML = seshMins + ':0' + secs

        document.getElementById('beep').pause()
        document.getElementById('beep').load()
    })

})

let secs = 0

let seshMins = document.getElementById('session-length').innerText
let breakMins = document.getElementById('break-length').innerText

document.getElementById('time-left').innerHTML = seshMins + ':0' + secs

let bDec = false
let bInc = false
let sDec = false
let sInc = false

let started;
let begun = false

let isSesh = true
let isBreak = false

const seshTimer = () => {
    isSesh = true
    isBreak = false
    console.log($("#break-length").text(), breakMins);
    
    if (secs == 0) {
        seshMins--
        secs = 59
        document.getElementById('time-left').innerHTML = seshMins + ':' + secs
    } else {
        secs--
        document.getElementById('time-left').innerHTML = seshMins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = seshMins + ':0' + secs
        }
    }
    
    if (seshMins < 10) {
        document.getElementById('time-left').innerHTML = '0' + seshMins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = '0' + seshMins + ':0' + secs
        }
    }
    
    if (seshMins == 0 && secs == 0) {
        clearInterval(started)
        document.getElementById('beep').play()
        $('#timer-label').text('Session ended')
        breakMins = parseInt(document.getElementById('break-length').innerText)
        
        setTimeout(() => {
            console.log($("#break-length").text(), breakMins);

            if (breakMins < 10) {
                document.getElementById('time-left').innerHTML = '0' + breakMins + ':0' + secs
            } else {
                document.getElementById('time-left').innerHTML = breakMins + ':0' + secs
            }

            started = setInterval(breakTimer, 100)
            $('#timer-label').text('Break started')
        }, 2000)
    }
}


const breakTimer = () => {
    isSesh = false
    isBreak = true

    if (secs == 0) {
        breakMins--
        secs = 59
        document.getElementById('time-left').innerHTML = breakMins + ':' + secs
    } else {
        secs--
        document.getElementById('time-left').innerHTML = breakMins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = breakMins + ':0' + secs
        }
    }

    if (breakMins < 10) {
        document.getElementById('time-left').innerHTML = '0' + breakMins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = '0' + breakMins + ':0' + secs
        }
    }

    if (breakMins == 0 && secs == 0) {
        clearInterval(started)
        document.getElementById('beep').play()
        $('#timer-label').text('Break ended')
        
        $('#break-length').text(5)
        
        setTimeout(() => {
            seshMins = document.getElementById('session-length').innerText

            if (seshMins < 10) {
                document.getElementById('time-left').innerHTML = '0' + seshMins + ':0' + secs
            } else {
                document.getElementById('time-left').innerHTML = seshMins + ':0' + secs
            }

            started = setInterval(seshTimer, 100)
            $('#timer-label').text('Session started')
        }, 2000)
    }
}