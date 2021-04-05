ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [59.95662339971533, 30.466851919885755],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [59.949154651207884, 30.475174224164906],
        [59.9491552703686, 30.473694137689012],

        [59.95492770371282, 30.467998403749036],
        [59.95874275059978, 30.46408049841007],
        [59.962229588781504, 30.460518078118564],
        [59.96242292772388, 30.461633877107108],
        [59.96197180176995, 30.462063030564238],
        [59.962057730996655, 30.46371527137419]
    ], {}, {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 4000
    });
    var secondAnimatedLine = new ymaps.AnimatedLine([
        [55.761223661714205, 37.57854299428123],
        [55.76129474190374, 37.57836060406823],
        [55.76149285834102, 37.57855640532632],
        [55.76173267134118, 37.57864573959325],
        [55.761782872763874, 37.578559582240004],
        [55.7622647306412, 37.57857741008619],
        [55.76247342821094, 37.57840038429122],
        [55.762818964832924, 37.57765342764373],
        [55.76292179998886, 37.57748713068481],
        [55.762890042102114, 37.577167947812036],
        [55.76292179998886, 37.576878269238435],
        [55.763076052212064, 37.57669587902541],
        [59.96204934054127, 30.46413310778078]
    ], {}, {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
    });
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    // myMap.geoObjects.add(secondAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([55.7602953585417, 37.57705113964169], {}, {
        preset: 'islands#redRapidTransitCircleIcon'
    });
    var secondPoint = new ymaps.Placemark([55.76127880650197, 37.57839413202077], {}, {
        preset: 'islands#blueMoneyCircleIcon'
    });
    var thirdPoint = new ymaps.Placemark([55.763105418792314, 37.57724573612205], {}, {
        preset: 'islands#blackZooIcon'
    });
    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        secondAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            .then(function() {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })
            // После окончания анимации второй линии добавляем третью метку на карту.
            .then(function() {
                myMap.geoObjects.add(thirdPoint);
                // Добавляем паузу после анимации.
                return ymaps.vow.delay(null, 2000);
            })
            // После паузы перезапускаем анимацию.
            .then(function() {
                // Удаляем метки с карты.
                myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                myMap.geoObjects.remove(thirdPoint);
                // Убираем вторую линию.
                secondAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });
    }
    // Запускаем анимацию пути.
    playAnimation();
}
