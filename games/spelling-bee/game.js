// --- Configuration ---
const WORD_LIST = [
    // 240 Absurdly Unrelated Words
    'wombat', 'spatula', 'cucumber', 'zephyr', 'quixotic', 
    'flummox', 'cerulean', 'trombone', 'gherkin', 'moustache',
    'umbrella', 'jubilee', 'tesseract', 'nostril', 'llama', 
    'sardine', 'goblet', 'razzmatazz', 'floccinaucinihilipilification', 'gazebo',
    'talisman', 'vex', 'bicycle', 'kryptonite', 'parapet', 
    'ethereal', 'pumpernickel', 'sloth', 'chandelier', 'zucchini',
    'obfuscate', 'fjord', 'manatee', 'octopus', 'rendezvous', 
    'syzygy', 'vermillion', 'waffle', 'xylophone', 'yacht',
    'alchemy', 'bivouac', 'cadence', 'dichotomy', 'ennui', 
    'fiasco', 'gargoyle', 'haphazard', 'idiosyncrasy', 'jargon', 
    'kinetic', 'labyrinth', 'mellifluous', 'nebulous', 'overture', 
    'periwinkle', 'quandary', 'rhapsody', 'serendipity', 'tenuous', 
    'ubiquitous', 'vicinity', 'wistful', 'yearn', 'zenith', 
    'abscond', 'banal', 'cacophony', 'diatribe', 'elixir', 
    'felicity', 'garrulous', 'hirsute', 'inception', 'jocund', 
    'kiosk', 'languid', 'miasma', 'nefarious', 'opaque', 
    'peculiar', 'quotidian', 'reticent', 'sagacious', 'succinct', 
    'tryst', 'undulate', 'venerable', 'wrangle', 'yeast', 
    'zodiac', 'ablution', 'blasphemy', 'cartography', 'derelict', 
    'echelon', 'facetious', 'halyard', 'innocuous', 'juggernaut', 
    'knell', 'luminous', 'maelstrom', 'nomenclature', 'ominous', 
    'pernicious', 'quintessential', 'repudiate', 'salient', 'truncate', 
    'umbrage', 'vivacious', 'wallow', 'yore', 'zeitgeist', 
    'ancillary', 'brobdingnagian', 'chicanery', 'disparate', 'effulgence', 
    'fugacious', 'garrulous', 'halyard', 'invidious', 'jettison', 
    'kohlrabi', 'lugubrious', 'mellifluous', 'nihilism', 'obsequious', 
    'paucity', 'quorum', 'repudiate', 'salient', 'truncate', 
    'umbral', 'vicariously', 'wistful', 'yttrium', 'zygote', 
    'amalgamate', 'bucolic', 'capricious', 'diaphanous', 'effervescent', 
    'fulsome', 'gregarious', 'hapless', 'impetus', 'jubilant', 
    'kismet', 'languish', 'mirage', 'nonchalant', 'obeisance', 
    'perfunctory', 'quagmire', 'reticent', 'salient', 'succinct', 
    'tantamount', 'unctuous', 'vicarious', 'whimsical', 'xenophobia', 
    'yonder', 'zealous', 'amalgam', 'bungalow', 'crescendo', 
    'delineate', 'emissary', 'furtive', 'gondola', 'hirsute', 
    'insolent', 'jejune', 'mirth', 'nadir', 'ostracize', 
    'palpable', 'querulous', 'ruminate', 'succinct', 'tryst', 
    'unfurl', 'vacillate', 'wrangle', 'yeast', 'zodiac', 
    'ablution', 'bivouac', 'cacophony', 'derelict', 'echelon', 
    'facetious', 'garrulous', 'halcyon', 'inexorable', 'jettison', 
    'kohlrabi', 'lugubrious', 'mellifluous', 'nihilism', 'obsequious', 
    'paucity', 'quorum', 'repudiate', 'serpentine', 'tacit', 
    'unfettered', 'vacillate', 'wallow', 'yore', 'zeitgeist', 
    'anachronism', 'bucolic', 'capricious', 'diaphanous', 'effulgence', 
    'fugacious', 'gregarious', 'hapless', 'impetus', 'jubilant', 
    'kismet', 'languish', 'mirage', 'nonchalant', 'obeisance', 
    'perfunctory', 'quagmire', 'reticent', 'salient', 'succinct', 
    'tantamount', 'unctuous', 'vicarious', 'whimsical', 'xenophobia', 
    'yonder', 'zealous', 'amalgam', 'bungalow', 'crescendo', 
    'delineate', 'emissary', 'furtive', 'gondola', 'hirsute'
];
let currentWord = '';
let score = 0;
let availableVoices = []; // NEW: Variable to hold the browser's voice list

// --- DOM Elements ---
const speakButton = document.getElementById('speakButton');
const checkButton = document.getElementById('checkButton');
const inputField = document.getElementById('spellingInput');
const resultMessage = document.getElementById('resultMessage');
const scoreDisplay = document.getElementById('scoreDisplay');

// --- Voice Loading (CRITICAL for setting a specific accent) ---
function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
    // OPTIONAL: You can uncomment this line to see the voice names in your console:
    // console.log("Available Voices:", availableVoices);
}

// Ensure voices are loaded, as it's an asynchronous process
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial attempt to load voices
}


// --- Functions ---

/**
 * Selects a random word and stores it globally.
 */
function getNewWord() {
    if (WORD_LIST.length === 0) {
        resultMessage.textContent = 'You spelled all 240 words! Restarting...';
        setTimeout(() => location.reload(), 3000); 
        return;
    }
    
    // Choose a random word and remove it from the list
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    currentWord = WORD_LIST.splice(randomIndex, 1)[0]; 
    
    inputField.value = ''; 
    resultMessage.textContent = ''; 
    speakButton.textContent = '📣 Click to Hear Word';
    inputField.focus();
}

/**
 * Uses the browser's Text-to-Speech API to read the current word.
 */
function speakWord() {
    if (!currentWord) {
        getNewWord();
    }
    
    // Check if TTS is supported by the browser
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentWord);
        
        // --- VOICE SELECTION LOGIC (To set American accent) ---
        const americanVoice = availableVoices.find(voice => 
            // Filter for US English and try to find a standard name
            voice.lang.startsWith('en-US') && (voice.name.includes('Google') || voice.default)
        );
        
        if (americanVoice) {
            utterance.voice = americanVoice;
        } else {
            // Fallback: Just set the language code to US English
            utterance.lang = 'en-US'; 
        }
        // --- END VOICE SELECTION LOGIC ---


        // Optional: Set voice properties for a clearer reading
        utterance.rate = 0.8; // Speak a bit slower
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);
        
        speakButton.textContent = '🔊 Word Playing...';
        utterance.onend = () => {
            speakButton.textContent = 'Repeat Word';
        };
        
    } else {
        // Fallback for browsers without TTS
        resultMessage.textContent = "Text-to-Speech not supported. Word is: " + currentWord;
        resultMessage.style.color = '#e67e22'; // Orange
        speakButton.disabled = true;
    }
}

/**
 * Checks the user's spelling against the current word.
 */
function checkSpelling() {
    const userSpelling = inputField.value.trim().toLowerCase();
    const correctSpelling = currentWord.toLowerCase();

    if (!userSpelling) {
        resultMessage.textContent = 'Please type your spelling before checking!';
        resultMessage.style.color = '#e67e22'; 
        return;
    }

    if (userSpelling === correctSpelling) {
        score++;
        resultMessage.textContent = `✅ Correct! The word was '${currentWord}'.`;
        resultMessage.style.color = '#27ae60'; // Green
        updateScore();
        
        // Load the next word after a short delay
        setTimeout(getNewWord, 1500); 

    } else {
        score = Math.max(0, score - 1); // Deduct 1 point, but not below zero
        resultMessage.textContent = `❌ Incorrect. The correct spelling was: '${currentWord}'.`;
        resultMessage.style.color = '#c0392b'; // Red
        updateScore();
        
        // Load the next word after a longer delay to allow user to see the correct word
        setTimeout(getNewWord, 3000); 
    }
}

/**
 * Updates the score display.
 */
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// --- Event Listeners and Initialization ---

speakButton.addEventListener('click', speakWord);
checkButton.addEventListener('click', checkSpelling);

// Allow pressing Enter key to check spelling
inputField.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkSpelling();
    }
});

// Start the game by getting the first word
document.addEventListener('DOMContentLoaded', () => {
    getNewWord();
});
