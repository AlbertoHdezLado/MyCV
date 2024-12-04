/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('#nav a, .scrolly').scrolly({
		speed: 1000,
		offset: function () { return $nav.height(); }
	});

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
	const paragraphs = document.querySelectorAll(".slide-effect");
	let lastScrollTop = 0;

	function checkVisibility() {
		const viewportHeight = window.innerHeight;
		const currentScrollTop = window.scrollY;
		const isScrollingDown = currentScrollTop > lastScrollTop;

		paragraphs.forEach(p => {
			const rect = p.getBoundingClientRect();
			const isInViewport = rect.top <= viewportHeight - 100 && rect.bottom >= 0;

			// Si el elemento está en el viewport y se hace scroll hacia abajo, aplica la animación
			if (isInViewport && isScrollingDown) {
				p.classList.add("visible");
			}
			// Si el elemento está en el viewport pero el scroll es hacia arriba, muéstralo sin animación
			else if (isInViewport && !isScrollingDown && !p.classList.contains("visible")) {
				p.classList.add("visible", "no-animation");
			}
		});

		lastScrollTop = currentScrollTop;
	}

	window.addEventListener("scroll", checkVisibility);
	checkVisibility();
});


async function loadLanguage(lang) {
	
}

// Función para mostrar la bandera correcta según el idioma
function updateFlags() {
	const lang = document.documentElement.lang; // Obtiene el idioma actual
	document.getElementById('uk-flag').classList.toggle('active', lang !== 'en');
	document.getElementById('es-flag').classList.toggle('active', lang !== 'es');
	document.getElementById('floating-uk-flag').classList.toggle('active', lang !== 'en');
	document.getElementById('floating-es-flag').classList.toggle('active', lang !== 'es');
}

async function getParamLang() {
	const urlParams = new URLSearchParams(window.location.search);
	lang = urlParams.get('lang') || 'en';

	document.documentElement.lang = lang;

	const response = await fetch('assets/i18n/' + lang + '.json');
	const translations = await response.json();

	// Actualizar los textos en la página
	document.querySelectorAll("[data-key]").forEach((element) => {
		const key = element.getAttribute("data-key");
		if (translations[key]) {
			element.innerHTML = translations[key];
		}
	});

	document.body.classList.remove("hidden");

	updateFlags();
}

function loadLanguage(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
}

getParamLang()