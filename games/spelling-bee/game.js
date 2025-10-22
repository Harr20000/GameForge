// --- Configuration ---
// --- Configuration ---
const WORD_LIST = [
    // Original 40 Words (from earlier request)
    'wombat', 'spatula', 'cucumber', 'zephyr', 
    'moustache',
    'umbrella', 'jubilee', 'tesseract', 'nostril', 'llama', 
    'sardine', 'goblet', 'razzmatazz', 'floccinaucinihilipilification', 'gazebo',
    'talisman', 'vex', 'bicycle', 'kryptonite', 'parapet', 
    'ethereal', 'pumpernickel', 'sloth', 'chandelier', 'zucchini',
    'obfuscate', 'fjord', 'manatee', 'octopus', 'rendezvous', 
    'syzygy', 'vermillion', 'waffle', 'xylophone', 'yacht',

    // New 200 Words (Continued list)
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
    'insolent', 'jejune', 'kismet', 'languid', 'mirth', 
    'nadir', 'ostracize', 'palpable', 'querulous', 'ruminate', 
    'succinct', 'tryst', 'unfurl', 'vacillate', 'wrangle', 
    'yeast', 'zodiac', 'ablution', 'bivouac', 'cacophony', 
    'derelict', 'echelon', 'facetious', 'garrulous', 'halcyon', 
    'inexorable', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'juggernaut', 'knell', 'liminal', 'maelstrom', 
    'nomenclature', 'ominous', 'pernicious', 'quintessential', 'reticent', 
    'salient', 'truncate', 'umbrage', 'vivacious', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist', 'anachronism', 'bucolic', 'capricious', 
    'diaphanous', 'effulgence', 'fugacious', 'garrulous', 'halyard', 
    'invidious', 'jettison', 'kohlrabi', 'lugubrious', 'mellifluous', 
    'nihilism', 'obsequious', 'paucity', 'quorum', 'repudiate', 
    'serpentine', 'tacit', 'unfettered', 'vacillate', 'wallow', 
    'yore', 'zeitgeist'
];
let currentWord = '';
// ... rest of the filelet currentWord = '';
let score = 0;

// --- DOM Elements ---
const speakButton = document.getElementById('speakButton');
const checkButton = document.getElementById('checkButton');
const inputField = document.getElementById('spellingInput');
const resultMessage = document.getElementById('resultMessage');
const scoreDisplay = document.getElementById('scoreDisplay');

// --- Functions ---

/**
 * Selects a random word and stores it globally.
 */
function getNewWord() {
    // If the word list is exhausted, restart or show a message
    if (WORD_LIST.length === 0) {
        resultMessage.textContent = 'You spelled all the words! Restarting...';
        // Simple way to restart the game state if needed
        setTimeout(() => location.reload(), 3000); 
        return;
    }
    
    // Choose a random word
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    currentWord = WORD_LIST.splice(randomIndex, 1)[0]; // Removes word from list to prevent repetition
    
    inputField.value = ''; // Clear input field
    resultMessage.textContent = ''; // Clear result message
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
