document.getElementById('show-modal').onclick = function (e) {
  document.querySelector('.cover').style.opacity = 0.4
  document.querySelector('.modal').style.top = '20px'

  document.querySelector('.modal-container').style.display = 'block'
  document.querySelector('.cover').style.animation =
    'backgroundAppear 0.2s ease-in'
  document.querySelector('.modal').style.animation = 'modalAppear .2s ease-out'
}

document.forms[0].done.onclick = fadeOut
document.onkeyup = function (e) {
  if (e.keyCode == 27) {
    if (document.querySelector('.modal-container').style.display == 'block') {
      fadeOut()
    }
  }
}

function fadeOut () {
  document.querySelector('.cover').style.animation =
    'backgroundDisappear 0.2s ease-in'
  document.querySelector('.modal').style.animation =
    'modalDisappear .2s ease-out'
  document.querySelector('.cover').style.opacity = 0.1
  document.querySelector('.modal').style.top = '17px'

  setTimeout(function () {
    document.querySelector('.modal-container').style.display = 'none'
  }, 200)
}
