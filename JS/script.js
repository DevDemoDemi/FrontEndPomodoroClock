$(document).ready(() => {

    $('#start_stop').click(() => {
        $('#start_stop').toggleClass('btn-danger')
        // $('#timer-label').text('Session started')

        if ($('#start_stop').hasClass('btn-danger')) {
            $('#start_stop').text('stop')
            begun = false
        } else {
            $('#start_stop').text('start')
            begun = true
        }

        if (begun) {
            clearInterval(started)
            $('#timer-label').text('Session paused')
        } else {
            started = setInterval(displayTimer, 100)
            $('#timer-label').text('Session started')
        }
    })

    $('#reset').click(() => {
        // if ($('#timer-label').text() == 'Session') {
        clearInterval(started)
        minutes = 25
        secs = 0
        document.getElementById('time-left').innerHTML = minutes + ':0' + secs
        $('#start_stop').text('start').removeClass('btn-danger')
        begun = false
        mins = 5
        // } else {
        //     clearInterval(started)
        //     minutes = 5
        //     secs = 0
        //     document.getElementById('time-left').innerHTML = minutes + ':0' + secs
        // }

        $('#session-length').text(25)
        $('#break-length').text(5)

    })

    $('#session-increment').click(() => {
        minutes = $('#session-length').text()
        $('#session-length').text(parseInt(minutes) + 1)
        $('#time-left').text(parseInt(minutes) + 1 + ':00')
        secs = 0
        minutes = $('#session-length').text()

        if (minutes == 60) {
            $('#session-increment').prop('disabled', true)
            sInc = true
        } else if (sDec) {
            $('#session-decrement').prop('disabled', false)
            sDec = false
        }
    })

    $('#session-decrement').click(() => {
        minutes = $('#session-length').text()
        $('#session-length').text(parseInt(minutes) - 1)
        $('#time-left').text(parseInt(minutes) - 1 + ':00')
        secs = 0
        minutes = $('#session-length').text()

        if (minutes == 1) {
            $('#session-decrement').prop('disabled', true)
            sDec = true
        } else if (sInc) {
            $('#session-increment').prop('disabled', false)
            sInc = false
        }

        if (minutes < 10) {
            document.getElementById('time-left').innerHTML = '0' + minutes + ':0' + secs
        }
    })

    $('#break-increment').click(() => {
        mins = $('#break-length').text()
        $('#break-length').text(parseInt(mins) + 1)
        mins = $('#break-length').text()

        if (mins == 60) {
            $('#break-increment').prop('disabled', true)
            bInc = true
        } else if (bDec) {
            $('#break-decrement').prop('disabled', false)
            bDec = false
        }
    })

    $('#break-decrement').click(() => {
        mins = $('#break-length').text()
        $('#break-length').text(parseInt(mins) - 1)
        mins = $('#break-length').text()



        if (mins == 1) {
            $('#break-decrement').prop('disabled', true)
            bDec = true
        } else if (bInc) {
            $('#break-increment').prop('disabled', false)
            bInc = false
        }
    })


})


let started;
let time;
let minutes = 25;
let secs = 0;
let changed = false
let operated = false
let broken = false
let session = false
let arr = []
let arrOperates = []
let begun = false
let mins = 5

let bDec = false
let bInc = false
let sDec = false
let sInc = false


const displayTimer = () => {
    if (secs == 0) {
        minutes--
        secs = 59
        document.getElementById('time-left').innerHTML = minutes + ':' + secs
    } else {
        secs--
        document.getElementById('time-left').innerHTML = minutes + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = minutes + ':0' + secs
        }
    }

    if (minutes < 10) {
        document.getElementById('time-left').innerHTML = '0' + minutes + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = '0' + minutes + ':0' + secs
        }
    }

    if (minutes == 0 && secs == 0) {
        clearInterval(started)
        document.getElementById('beep').play()

        document.getElementById('time-left').innerHTML = mins + ':0' + secs

        $('#timer-label').text('Break started')

        started = setInterval(breakTime, 1000)

        // if (mins < 10) {
        //     document.getElementById('time-left').innerHTML = '0' + mins + ':0' + secs
        // }

        // if (secs == 0) {
        //     mins--
        //     secs = 59
        //     document.getElementById('time-left').innerHTML = mins + ':' + secs
        // } else {
        //     secs--
        //     document.getElementById('time-left').innerHTML = mins + ':' + secs
        //     if (secs < 10) {
        //         document.getElementById('time-left').innerHTML = mins + ':0' + secs
        //     }
        // }
    }
}

const breakTime = () => {
    if (secs == 0) {
        mins--
        secs = 59
        document.getElementById('time-left').innerHTML = mins + ':' + secs
    } else {
        secs--
        document.getElementById('time-left').innerHTML = mins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = mins + ':0' + secs
        }
    }

    if (mins < 10) {
        document.getElementById('time-left').innerHTML = '0' + mins + ':' + secs
        if (secs < 10) {
            document.getElementById('time-left').innerHTML = '0' + mins + ':0' + secs
        }
    }

}