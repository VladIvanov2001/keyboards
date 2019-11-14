const englButtons = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '&#92;', 'Delete'], ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '&#8242;', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', 'ArrowUp', 'Shift'], ['Control', 'Meta', 'Alt', 'Space', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control']];
const special = ['Meta', 'Control', 'Shift', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Alt', '', 'Win', 'Tab', 'CapsLock', 'RCtrl', 'LCtrl', 'LAlt', 'RAlt', 'Space', 'Up', 'Down', 'Left', 'Backspace', 'Enter', 'Right', 'RShift', 'LShift'];
const shiftRU = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete'],
    ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'ArrowUp', 'Shift'],
    ['Control', 'Meta', 'Alt', 'Space', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control']];
const shiftEU = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift'],
    ['Control', 'Meta', 'Alt', 'Space', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control']];
const buttonsRU = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '&#92;', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift'],
    ['Control', 'Meta', 'Alt', 'Space', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control']];
function isSpecial(elem) {
    return special.indexOf(elem) + 1;
}

function replaceKeyboard(arr) {
    let i = 0;
    let j = 0;
    Array.from(document.getElementsByClassName('btn')).forEach((btn) => {
        const butt = btn;
        butt.innerHTML = arr[i][j];
        j += 1;
        if (j === arr[i].length) {
            j = 0;
            i += 1;
        }
    });
}
function keyboardBlock(arr) {
    const container = document.createElement('div');
    container.classList.add('container');

    arr.forEach((row) => {
        const rowBlock = document.createElement('div');
        rowBlock.classList.add('container__row');
        row.forEach((elem) => {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerHTML = elem;
            rowBlock.appendChild(btn);
        });
        container.appendChild(rowBlock);
    });

    return container;
}


window.onload = () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'input');
    document.body.appendChild(textarea);
    if (localStorage.getItem('lang') !== null) {
        const color = localStorage.getItem('lang');
        if (color === 'eu') {
            document.body.appendChild(keyboardBlock(englButtons));
        } else {
            document.body.appendChild(keyboardBlock(buttonsRU));
        }
    }
    Array.from(document.getElementsByClassName('btn')).forEach((elem) => {
        elem.addEventListener('click', () => {
            document.getElementById('input').value += isSpecial(elem.innerHTML) ? '' : elem.innerHTML;
        });

        elem.addEventListener('mousedown', () => {
            const element = elem;
            element.style.background = '#B0E0E6';
            element.style.color = '#fff';
            element.style.borderRadius = '20px';
            if (elem.innerHTML === 'Backspace') {
                const area = document.getElementById('input');
                const txt = area.value;
                const delPos = area.selectionStart;
                if (delPos) {
                    area.value = txt.slice(0, delPos - 1) + txt.slice(delPos);
                    area.focus();
                    area.selectionStart = delPos;
                } else {
                    area.focus();
                }
            }
            if (elem.innerHTML === 'Delete') {
                const textArea = document.getElementById('input');
                const position = textArea.selectionStart;
                textArea.value = textArea.value.substr(0, textArea.selectionStart)
                    + textArea.value.substr(textArea.selectionStart + 1, textArea.value.length);
                textArea.focus();
                textArea.selectionStart = position;
                textArea.selectionEnd = textArea.selectionStart;
            }
            if (elem.innerHTML === 'Tab') {
                document.getElementById('input').value += '   ';
            }
            if (elem.innerHTML === 'Enter') {
                document.getElementById('input').value += '\n';
            }
            if (elem.innerHTML === 'Shift') {
                replaceKeyboard(localStorage.getItem('lang') === 'eu' ? shiftRU : shiftEU);
            }
        });

        elem.addEventListener('mouseup', () => {
            const element = elem;
            element.style.color = '#000';
            element.style.background = '#fff';
            element.style.borderRadius = '0px';
            if (element.innerHTML === 'CapsLock') {
                Array.from(document.getElementsByClassName('btn')).forEach((butEl) => {
                    const elements = butEl;
                    if (element.innerHTML.length === 1
                        && element.innerHTML.toUpperCase() === element.innerHTML) {
                        elements.innerHTML = element.innerHTML.toLowerCase();
                    } else if (elem.innerHTML.length === 1) {
                        elements.innerHTML = elem.innerHTML.toUpperCase();
                    }
                });
            }
            if (elem.innerHTML === 'Shift') {
                replaceKeyboard(localStorage.getItem('lang') === 'eu' ? buttonsRU : englButtons);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        event.preventDefault();
        Array.from(document.getElementsByClassName('btn')).forEach((elem) => {
            if (elem.innerHTML === event.key || elem.innerHTML === event.code) {
                const element = elem;
                element.style.background = '#000';
                element.style.color = '#fff';
                element.style.borderRadius = '20px';
            }
        });

        if (event.ctrlKey && event.shiftKey) {
            replaceKeyboard(localStorage.getItem('lang') === 'eu' ? buttonsRU : englButtons);
            localStorage.setItem('lang', localStorage.getItem('lang') === 'eu' ? 'ru' : 'eu');
        }
        if (event.key === 'Shift') {
            replaceKeyboard(localStorage.getItem('lang') === 'eu' ? shiftEU : shiftRU);
        }
        if (event.key === 'Delete') {
            const textArea = document.getElementById('input');
            const position = textArea.selectionStart;
            textArea.value = textArea.value.substr(0, textArea.selectionStart)
                + textArea.value.substr(textArea.selectionStart + 1, textArea.value.length);
            textArea.focus();
            textArea.selectionStart = position;
            textArea.selectionEnd = textArea.selectionStart;
        }
        if (event.key === 'Backspace') {
            const area = document.getElementById('input');
            const txt = area.value;
            const delPos = area.selectionStart;
            if (delPos) {
                area.value = txt.slice(0, delPos - 1) + txt.slice(delPos);
                area.focus();
                area.selectionStart = delPos;
            } else {
                area.focus();
            }
        }
        if (event.key === 'CapsLock') {
            Array.from(document.getElementsByClassName('btn')).forEach((elem) => {
                const element = elem;
                if (elem.innerHTML.length === 1
                    && elem.innerHTML.toUpperCase() === elem.innerHTML) {
                    element.innerHTML = elem.innerHTML.toLowerCase();
                } else if (elem.innerHTML.length === 1) {
                    element.innerHTML = elem.innerHTML.toUpperCase();
                }
            });
        }
        if (event.key === 'Tab') {
            document.getElementById('input').value += '   ';
        }
        if (event.key === 'Enter') {
            document.getElementById('input').value += '\n';
        }

        document.getElementById('input').value += isSpecial(event.key) ? '' : event.key;
    });

    document.addEventListener('keyup', (event) => {
        Array.from(document.getElementsByClassName('btn')).forEach((elem) => {
            const element = elem;
            if (elem.innerHTML === event.key || elem.innerHTML === event.code) {
                element.style.background = '#fff';
                element.style.color = '#000';
                element.style.borderRadius = '0px';
            }
        });
        if (event.key === 'Shift') {
            replaceKeyboard(localStorage.getItem('lang') === 'eu' ? englButtons : buttonsRU);
        }
    });
};
