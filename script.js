const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const video = document.querySelector('.flex');
const progress = document.querySelector('.progress');
const progressbar = document.querySelector('.progress__filled');

function handleProgress(){
    const percentage = (video.currentTime/ video.duration) * 100;
	progressbar.style.width = `${percentage}%`;
}

video.addEventListener('timeupdate', handleProgress);

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', (e)=> mousedown = true);
progress.addEventListener('mouseup', (e)=> mousedown = false);

const toggle = document.querySelector('.player__button.toggle');

function togglePlay(){
  if(video.paused){
     video.play();
  }
  else{
    video.pause();
  }
}

function updateButton(){
   const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);

const skipButtons = document.querySelectorAll('[data-skip]');
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click',skip));

const volumeInput = document.querySelector('.volume');
const volumeDisplay = document.querySelector('.volume-display');

function handleVolumeUpdate(){
	video.volume = this.value;
	volumeDisplay.textContent = Math.round(this.value * 100) + "%";
}

volumeInput.addEventListener('input', handleVolumeUpdate);
volumeDisplay.textContent ='100%';

const speedInput = document.querySelector('.playbackSpeed');
const speedDisplay =document.querySelector('.speed-display');

function handleSpeedUpdate() {
	video.playbackRate = this.value;
	speedDisplay.textContent = parseFloat(this.value).toFixed(1) + 'x';
}

speedInput.addEventListner('input',  handleSpeedUpdate);
speedDisplay.textContent = '1.0x';
