© 2024 Wania Gondal

class Keyboard {
    constructor() {
        this.keys = document.querySelectorAll('.keys');
        this.spaceKey = document.querySelector('.space_key');
        this.backspaceKey = document.querySelector('.backspace_key'); 
        this.toggleCircle = document.querySelector('.toggle_circle');
        this.nightMode = document.querySelector('.night_mode');
        this.body = document.querySelector('body');
        this.textInput = document.querySelector('.text');
        this.changeColor = document.querySelector('.change_light_color');
        this.colorsInput = document.querySelector('.colors_input');
        this.keyboardLights = document.querySelector('.keyboard_lights');
        this.keyboardWrap = document.querySelector('.keyboard_wrap');

        this.currentKeyIndex = 0;
        this.lastHighlightedKey = null;
        this.keysTyped = new Array(this.keys.length).fill(false);
        this.highlightDuration = 1000; 

        this.audio = new Audio('click_sound.mp3'); // NEWWWWW
        this.socket = new WebSocket('ws://localhost:8765');
        this.initializeWebSocket();
        this.initializeKeys();
        this.highlightKeys();
        
    }

    initializeWebSocket() {
        this.socket.onopen = () => console.log('Connected to the WebSocket server');
        this.socket.onclose = () => console.log('Disconnected from the WebSocket server');
        this.socket.onmessage = (event) => this.handleWebSocketMessage(event);
    }

    handleWebSocketMessage(event) {
        const data = JSON.parse(event.data);
        if (data.blink_detected && this.lastHighlightedKey) {
            const keyIndex = Array.from(this.keys).findIndex(key => key.getAttribute('keyname') === this.lastHighlightedKey);
            if (!this.keysTyped[keyIndex]) {
                this.handleKeyInput(this.lastHighlightedKey);
                console.log(`Typed: ${this.lastHighlightedKey}`);
                this.keysTyped[keyIndex] = true;
            }
        }
    }

    highlightKeys() {
        this.keys.forEach(key => key.classList.remove('active'));
        
        this.keys[this.currentKeyIndex].classList.add('active');
        this.lastHighlightedKey = this.keys[this.currentKeyIndex].getAttribute('keyname');

        if (this.currentKeyIndex === 0 && this.keysTyped.some(typed => typed)) {
            this.keysTyped.fill(false);
        }

        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
        setTimeout(() => this.highlightKeys(), this.highlightDuration);
    }

    initializeKeys() {
        this.keys.forEach(key => {
            key.setAttribute('keyname', key.innerText);
            key.setAttribute('lowerCaseName', key.innerText.toLowerCase());
            key.addEventListener('click', () => {
                this.handleKeyInput(key.getAttribute('keyname'));
                this.activateKey(key);
            });
        });

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        this.nightMode.addEventListener('click', () => this.toggleNightMode());
        this.colorsInput.addEventListener('input', () => this.changeKeyColors());
    }

    handleKeyInput(keyName) {
        if (keyName === 'Backspace') {
            this.textInput.value = this.textInput.value.slice(0, -1);
        } else if (keyName === 'SPACE') {
            this.textInput.value += ' ';
        } else if (keyName === 'Enter') {
            this.speakText(this.textInput.value); // NEW_____________
            this.textInput.value = '';
        } else {
            this.textInput.value += keyName; 
        }
    }
 
    activateKey(key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 200);
    }

    handleKeyDown(e) {
        this.keys.forEach(key => {
            if (e.key === key.getAttribute('keyname') || e.key === key.getAttribute('lowerCaseName')) {
                this.activateKey(key);
                this.handleKeyInput(key.getAttribute('keyname'));
            }
        });

        if (e.code === 'Space') {
            this.activateKey(this.spaceKey);
            this.handleKeyInput('SPACE');
        }

        if (e.code === 'Backspace') {
            this.activateKey(this.backspaceKey);
        }
    }

    handleKeyUp(e) {
        this.keys.forEach(key => {
            if (e.key === key.getAttribute('keyname') || e.key === key.getAttribute('lowerCaseName')) {
                key.classList.remove('active');
            }
        });

        if (e.code === 'SPACE') {
            this.spaceKey.classList.remove('active');
        }
        
        if (e.code === 'Backspace') {
            this.backspaceKey.classList.remove('active');
        }
    }

    toggleNightMode() {
        this.toggleCircle.classList.toggle('active');
        this.body.classList.toggle('active');
        this.nightMode.classList.toggle('active');
        this.keyboardWrap.classList.toggle('active');
        this.textInput.classList.toggle('active');
        this.changeColor.classList.toggle('active');
        this.keys.forEach(key => key.classList.toggle('keys_night'));
    }

    changeKeyColors() {
        this.keys.forEach(key => key.style.color = this.colorsInput.value);
        this.keyboardLights.style.background = this.colorsInput.value;
    }

    // NEWWWWW
    speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
    
}

new Keyboard();
