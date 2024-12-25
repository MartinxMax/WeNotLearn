// ==UserScript==
// @name  WeNotLearn
// @version      0.2
// @description  Welearn
// @author       Maptnh@S-H4CK13
// @match        *://*/*
// @grant        none
// ==/UserScript==
/*
WWWWWWWW                           WWWWWWWW                     NNNNNNNN        NNNNNNNN                          tttt               LLLLLLLLLLL
W::::::W                           W::::::W                     N:::::::N       N::::::N                       ttt:::t               L:::::::::L
W::::::W                           W::::::W                     N::::::::N      N::::::N                       t:::::t               L:::::::::L
W::::::W                           W::::::W                     N:::::::::N     N::::::N                       t:::::t               LL:::::::LL
 W:::::W           WWWWW           W:::::W eeeeeeeeeeee         N::::::::::N    N::::::N   ooooooooooo   ttttttt:::::ttttttt           L:::::L                   eeeeeeeeeeee    aaaaaaaaaaaaa  rrrrr   rrrrrrrrr   nnnn  nnnnnnnn
  W:::::W         W:::::W         W:::::Wee::::::::::::ee       N:::::::::::N   N::::::N oo:::::::::::oo t:::::::::::::::::t           L:::::L                 ee::::::::::::ee  a::::::::::::a r::::rrr:::::::::r  n:::nn::::::::nn
   W:::::W       W:::::::W       W:::::We::::::eeeee:::::ee     N:::::::N::::N  N::::::No:::::::::::::::ot:::::::::::::::::t           L:::::L                e::::::eeeee:::::eeaaaaaaaaa:::::ar:::::::::::::::::r n::::::::::::::nn
    W:::::W     W:::::::::W     W:::::We::::::e     e:::::e     N::::::N N::::N N::::::No:::::ooooo:::::otttttt:::::::tttttt           L:::::L               e::::::e     e:::::e         a::::arr::::::rrrrr::::::rnn:::::::::::::::n
     W:::::W   W:::::W:::::W   W:::::W e:::::::eeeee::::::e     N::::::N  N::::N:::::::No::::o     o::::o      t:::::t                 L:::::L               e:::::::eeeee::::::e  aaaaaaa:::::a r:::::r     r:::::r  n:::::nnnn:::::n
      W:::::W W:::::W W:::::W W:::::W  e:::::::::::::::::e      N::::::N   N:::::::::::No::::o     o::::o      t:::::t                 L:::::L               e:::::::::::::::::e aa::::::::::::a r:::::r     rrrrrrr  n::::n    n::::n
       W:::::W:::::W   W:::::W:::::W   e::::::eeeeeeeeeee       N::::::N    N::::::::::No::::o     o::::o      t:::::t                 L:::::L               e::::::eeeeeeeeeee a::::aaaa::::::a r:::::r              n::::n    n::::n
        W:::::::::W     W:::::::::W    e:::::::e                N::::::N     N:::::::::No::::o     o::::o      t:::::t    tttttt       L:::::L         LLLLLLe:::::::e         a::::a    a:::::a r:::::r              n::::n    n::::n
         W:::::::W       W:::::::W     e::::::::e               N::::::N      N::::::::No:::::ooooo:::::o      t::::::tttt:::::t     LL:::::::LLLLLLLLL:::::Le::::::::e        a::::a    a:::::a r:::::r              n::::n    n::::n
          W:::::W         W:::::W       e::::::::eeeeeeee       N::::::N       N:::::::No:::::::::::::::o      tt::::::::::::::t     L::::::::::::::::::::::L e::::::::eeeeeeeea:::::aaaa::::::a r:::::r              n::::n    n::::n
           W:::W           W:::W         ee:::::::::::::e       N::::::N        N::::::N oo:::::::::::oo         tt:::::::::::tt     L::::::::::::::::::::::L  ee:::::::::::::e a::::::::::aa:::ar:::::r              n::::n    n::::n
            WWW             WWW            eeeeeeeeeeeeee       NNNNNNNN         NNNNNNN   ooooooooooo             ttttttttttt       LLLLLLLLLLLLLLLLLLLLLLLL    eeeeeeeeeeeeee  aaaaaaaaaa  aaaarrrrrrr              nnnnnn    nnnnnn
*/

(function() {
    'use strict';

    const floatWindow = document.createElement('div');
    floatWindow.id = 'floatWindow';
    Object.assign(floatWindow.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '300px',
        backgroundColor: '#2b2b2b',
        color: '#e0e0e0',
        border: '1px solid #555',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
        fontFamily: 'Consolas, Courier New, monospace',
        zIndex: '9999',
        display: 'none',
        borderRadius: '8px'
    });
    document.body.appendChild(floatWindow);

    function findAndDisplaySpanValue() {
        const keySpans = document.querySelectorAll('span.key');
        const blankSpans = document.querySelectorAll('span.blank');

        if (keySpans.length !== blankSpans.length) {
            floatWindow.textContent = 'Error: Key-Blank Mismatch';
            floatWindow.style.display = 'block';
            return;
        }

        let content = '';
        keySpans.forEach((keySpan, index) => {
            const keyText = keySpan.textContent.trim();
            blankSpans[index].textContent = `  ${keyText}  `;
            blankSpans[index].classList.add('ng-not-empty');
            content += `${index + 1}: ${keyText}<br>`;
        });

        if (content) {
            floatWindow.innerHTML = content;
            floatWindow.style.display = 'block';
        } else {
            floatWindow.style.display = 'none';
        }
    }

    function clearAnswers() {
        const blankSpans = document.querySelectorAll('span.blank');
        blankSpans.forEach(blankSpan => {
            blankSpan.textContent = '';
            blankSpan.classList.remove('ng-not-empty');
        });
        floatWindow.style.display = 'block';
        floatWindow.textContent = 'Answers cleared';
    }

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const existingMenu = document.getElementById('custom-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.id = 'custom-context-menu';
        Object.assign(menu.style, {
            position: 'absolute',
            left: `${event.pageX}px`,
            top: `${event.pageY}px`,
            backgroundColor: '#2b2b2b',
            color: '#e0e0e0',
            border: '1px solid #555',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
            fontFamily: 'Consolas, Courier New, monospace',
            zIndex: '10000',
            borderRadius: '8px'
        });
        menu.innerHTML = `
            <div id="fillAnswersOption" style="cursor: pointer; margin-bottom: 5px;">Fill Answers</div>
            <div id="clearAnswersOption" style="cursor: pointer;">Clear Answers</div>
        `;
        document.body.appendChild(menu);

        document.getElementById('fillAnswersOption').addEventListener('click', function() {
            findAndDisplaySpanValue();
            menu.remove();
        });

        document.getElementById('clearAnswersOption').addEventListener('click', function() {
            clearAnswers();
            menu.remove();
        });

        document.addEventListener('click', function hideMenu(event) {
            if (!menu.contains(event.target)) {
                menu.remove();
                document.removeEventListener('click', hideMenu);
            }
        });
    });

    window.findAndDisplaySpanValue = findAndDisplaySpanValue;
    window.clearAnswers = clearAnswers;

})();
