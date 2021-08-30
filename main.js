const carousel = document.querySelector('.container'),
	sliderM = carousel.querySelector('.main'),
	sliderS = carousel.querySelector('.sidebar'),
	prev = carousel.querySelector('.prev'),
	next = carousel.querySelector('.next');
let slidesM = sliderM.querySelectorAll('.main-item'),
	slidesS = sliderS.querySelectorAll('.sidebar-item'),
	isScroll = false;

prev.addEventListener('click', () => {
	changeSlide('down');
});
next.addEventListener('click', () => {
	changeSlide('up');
});

sliderM.prepend(slidesM[slidesM.length - 1]);
sliderS.prepend(slidesS[slidesS.length - 1]);

function changeSlide(direction) {
	if (isScroll === false) {
		isScroll = true;
		slidesS = sliderS.querySelectorAll('.sidebar-item');
		const currentS = sliderS.querySelector('.activeS');
		currentS.classList.remove('activeS');
		let targetS;

		slidesM = sliderM.querySelectorAll('.main-item');
		const currentM = sliderM.querySelector('.activeM');
		currentM.classList.remove('activeM');
		let targetM;

		if (direction == 'up') {
			targetS = currentS.previousElementSibling;
			sliderS.prepend(slidesS[slidesS.length - 1]);

			targetM = currentM.nextElementSibling;
			sliderM.append(slidesM[0]);
		}
		if (direction == 'down') {
			targetS = currentS.nextElementSibling;
			sliderS.append(slidesS[0]);

			targetM = currentM.previousElementSibling;
			sliderM.prepend(slidesM[slidesM.length - 1]);
		}

		targetS.classList.add('activeS');
		targetM.classList.add('activeM');

		setTimeout(() => (isScroll = false), 600);
	}
}

document.onwheel = function (e) {
	if (e.deltaY > 0) {
		changeSlide('down');
	} else {
		changeSlide('up');
	}
};

function swipedetect(el) {
	let surface = el,
		startX = 0,
		startY = 0,
		distX = 0,
		distY = 0,
		startTime = 0,
		elapsedTime = 0;

	surface.addEventListener('mousedown', function (e) {
		startY = e.pageY;
		startX = e.pageX;
		startTime = new Date().getTime();
		e.preventDefault();
	});

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime <= 300) {
			if (Math.abs(distY) >= 150 && Math.abs(distX) <= 100) {
				if (distY > 0) {
					changeSlide('down');
				} else {
					changeSlide('up');
				}
			}
		}
		e.preventDefault();
	});
}

swipedetect(sliderS);
swipedetect(sliderM);

