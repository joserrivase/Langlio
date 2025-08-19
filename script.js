// Development mode - set to true for unlimited random languages, false for daily game
// When dev_mode = false: One language per day, changes at midnight in user's timezone
// When dev_mode = true: Random language every time the page loads
const dev_mode = false;

// Game data - will be loaded from Languages_data.json
let gameData = {};
let allCountries = [];
let countryFlags = {};

// Daily language system
let usedLanguages = []; // Track languages used in daily mode
let currentDailyLanguage = null; // Current daily language

// Map variables
let map = null;
let highlightedCountries = [];

// Comprehensive list of top 100+ languages
const allLanguages = [
"Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Aymara", "Azerbaijani", "Bambara", "Belarusian", "Bislama", "Bosnian", "Bulgarian", "Burmese", "Catalan", "Chamorro", "Mandarin Chinese", "Croatian", "Czech", "Danish", "Dhivehi", "Dutch", "Dzongkha", "English", "Estonian", "Fijian", "Finnish", 
"French", "Georgian", "German", "Greek", "Guarani", "Haitian Creole", "Hausa", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", 
"Malagasy", "Malay", "Maltese", "Marshallese", "Mongolian", "Montenegrin", "Nauruan", "Nepali", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese", "Quechua", "Romanian", "Russian", "Samoan", "Sango", "Serbian", "Sesotho", "Setswana", "Shona", "Sinhala", "Slovak", "Slovene", "Somali", 
"Spanish", "Swahili", "Swedish", "Tajik", "Tamil", "Tetum", "Thai", "Tigrinya", "Tok Pisin", "Tongan", "Turkish", "Turkmen", "Tuvaluan", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Xhosa", "Zulu", "Bengali", "Filipino", "Sinhalese", "Maori", "Berber", "Yoruba", "Cantonese", "Palauan"
];


const allCountriesList = [
"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
"Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
"Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "North Korea", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
"Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
"Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
"Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
"Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
"Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
"Qatar", "South Korea", "Moldova", "Romania", "Russia", "Rwanda",
"Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
"Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
"Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Tanzania", "United States of America", "Uruguay", "Uzbekistan",
"Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Taiwan", "Puerto Rico", "Palestine", "Vatican City", "Macau", "Hong Kong"
];

// Load game data from JSON file
async function loadGameData() {
    try {
        const response = await fetch('Languages_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Convert JSON data to the format expected by the game
        data.forEach(item => {
            const language = item.Language;
            let countries = [];
            
            try {
                // Handle the countries string which uses single quotes
                const countriesStr = item["Countries that this is a national language"];
                if (countriesStr) {
                    // Clean up the string: remove line breaks and extra spaces
                    const cleanCountriesStr = countriesStr.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
                    // Replace single quotes with double quotes and parse
                    countries = JSON.parse(cleanCountriesStr.replace(/'/g, '"'));
                }
            } catch (parseError) {
                console.error('Error parsing countries for', language, ':', parseError);
                // Fallback: try to extract countries manually
                const countriesStr = item["Countries that this is a national language"];
                if (countriesStr) {
                    countries = countriesStr.match(/'([^']+)'/g)?.map(c => c.slice(1, -1)) || [];
                }
            }
            
            // Only add to gameData if we have valid data
            if (language && item["Example Sentence"]) {
                gameData[language] = {
                    sentence: item["Example Sentence"],
                    translation: item.Translation || "",
                    countries: countries,
                    hint: item.Hint || "",
                    script: item.Script || "",
                    Regions: item.Regions || "" // Add Regions field from JSON data
                };
                
                // Add countries to allCountries array
                countries.forEach(country => {
                    if (!allCountries.includes(country)) {
                        allCountries.push(country);
                    }
                });
            }
        });
        
        // Sort allCountries alphabetically
        allCountries.sort();
        
        // Initialize country flags mapping
        initializeCountryFlags();
        
        console.log('Game data loaded successfully:', Object.keys(gameData).length, 'languages');
        console.log('Available languages:', Object.keys(gameData));
        console.log('Total countries loaded:', allCountries.length);
        console.log('Sample game data entry:', Object.keys(gameData)[0], gameData[Object.keys(gameData)[0]]);
        
    } catch (error) {
        console.error('Error loading game data:', error);
        // Only use fallback if we have no data at all
        if (Object.keys(gameData).length === 0) {
            console.log('No data loaded, using fallback comprehensive lists');
            
            // Create fallback game data with the comprehensive language list
            allLanguages.forEach(language => {
                gameData[language] = {
                    sentence: `Sample sentence in ${language}`,
                    translation: `Translation of sample sentence in ${language}`,
                    countries: ["Sample Country"],
                    hint: `Hint for ${language}`,
                    script: "Various scripts",
                    Regions: `Sample regions for ${language}` // Add Regions field for regions hint
                };
            });
            
            allCountries = [...allCountriesList];
            initializeCountryFlags();
        } else {
            console.log('Some data loaded successfully, using available data');
        }
    }
}

// Initialize country flags mapping
function initializeCountryFlags() {
    countryFlags = {
        "Afghanistan": "🇦🇫", "Albania": "🇦🇱", "Algeria": "🇩🇿", "Andorra": "🇦🇩", "Angola": "🇦🇴", "Antigua and Barbuda": "🇦🇬", "Argentina": "🇦🇷", "Armenia": "🇦🇲", "Australia": "🇦🇺", "Austria": "🇦🇹", "Azerbaijan": "🇦🇿",
        "Bahamas": "🇧🇸", "Bahrain": "🇧🇭", "Bangladesh": "🇧🇩", "Barbados": "🇧🇧", "Belarus": "🇧🇾", "Belgium": "🇧🇪", "Belize": "🇧🇿", "Benin": "🇧🇯", "Bhutan": "🇧🇹", "Bolivia": "🇧🇴", "Bosnia and Herzegovina": "🇧🇦", "Botswana": "🇧🇼", "Brazil": "🇧🇷", "Brunei": "🇧🇳", "Bulgaria": "🇧🇬", "Burkina Faso": "🇧🇫", "Burundi": "🇧🇮",
        "Cabo Verde": "🇨🇻", "Cambodia": "🇰🇭", "Cameroon": "🇨🇲", "Canada": "🇨🇦", "Central African Republic": "🇨🇫", "Chad": "🇹🇩", "Chile": "🇨🇱", "China": "🇨🇳", "Colombia": "🇨🇴", "Comoros": "🇰🇲", "Republic of the Congo": "🇨🇬", "Costa Rica": "🇨🇷", "Croatia": "🇭🇷", "Cuba": "🇨🇺", "Cyprus": "🇨🇾", "Czech Republic": "🇨🇿",
        "North Korea": "🇰🇵", "Democratic Republic of the Congo": "🇨🇩", "Denmark": "🇩🇰", "Djibouti": "🇩🇯", "Dominica": "🇩🇲", "Dominican Republic": "🇩🇴",
        "Ecuador": "🇪🇨", "Egypt": "🇪🇬", "El Salvador": "🇸🇻", "Equatorial Guinea": "🇬🇶", "Eritrea": "🇪🇷", "Estonia": "🇪🇪", "Eswatini": "🇸🇿", "Ethiopia": "🇪🇹",
        "Fiji": "🇫🇯", "Finland": "🇫🇮", "France": "🇫🇷",
        "Gabon": "🇬🇦", "Gambia": "🇬🇲", "Georgia": "🇬🇪", "Germany": "🇩🇪", "Ghana": "🇬🇭", "Greece": "🇬🇷", "Grenada": "🇬🇩", "Guatemala": "🇬🇹", "Guinea": "🇬🇳", "Guinea-Bissau": "🇬🇼", "Guyana": "🇬🇾",
        "Haiti": "🇭🇹", "Honduras": "🇭🇳", "Hungary": "🇭🇺",
        "Iceland": "🇮🇸", "India": "🇮🇳", "Indonesia": "🇮🇩", "Iran": "🇮🇷", "Iraq": "🇮🇶", "Ireland": "🇮🇪", "Israel": "🇮🇱", "Italy": "🇮🇹", "Ivory Coast": "🇨🇮",
        "Jamaica": "🇯🇲", "Japan": "🇯🇵", "Jordan": "🇯🇴",
        "Kazakhstan": "🇰🇿", "Kenya": "🇰🇪", "Kiribati": "🇰🇮", "Kuwait": "🇰🇼", "Kyrgyzstan": "🇰🇬",
        "Laos": "🇱🇦", "Latvia": "🇱🇻", "Lebanon": "🇱🇧", "Lesotho": "🇱🇸", "Liberia": "🇱🇷", "Libya": "🇱🇾", "Liechtenstein": "🇱🇮", "Lithuania": "🇱🇹", "Luxembourg": "🇱🇺",
        "Madagascar": "🇲🇬", "Malawi": "🇲🇼", "Malaysia": "🇲🇾", "Maldives": "🇲🇻", "Mali": "🇲🇱", "Malta": "🇲🇹", "Marshall Islands": "🇲🇭", "Mauritania": "🇲🇷", "Mauritius": "🇲🇺", "Mexico": "🇲🇽", "Micronesia": "🇫🇲", "Moldova": "🇲🇩", "Monaco": "🇲🇨", "Mongolia": "🇲🇳", "Montenegro": "🇲🇪", "Morocco": "🇲🇦", "Mozambique": "🇲🇿", "Myanmar": "🇲🇲",
        "Namibia": "🇳🇦", "Nauru": "🇳🇷", "Nepal": "🇳🇵", "Netherlands": "🇳🇱", "New Zealand": "🇳🇿", "Nicaragua": "🇳🇮", "Niger": "🇳🇪", "Nigeria": "🇳🇬", "North Macedonia": "🇲🇰", "Norway": "🇳🇴",
        "Oman": "🇴🇲",
        "Pakistan": "🇵🇰", "Palau": "🇵🇼", "Panama": "🇵🇦", "Papua New Guinea": "🇵🇬", "Paraguay": "🇵🇾", "Peru": "🇵🇪", "Philippines": "🇵🇭", "Poland": "🇵🇱", "Portugal": "🇵🇹",
        "Qatar": "🇶🇦",
        "South Korea": "🇰🇷", "Moldova": "🇲🇩", "Romania": "🇷🇴", "Russia": "🇷🇺", "Rwanda": "🇷🇼",
        "Saint Kitts and Nevis": "🇰🇳", "Saint Lucia": "🇱🇨", "Saint Vincent and the Grenadines": "🇻🇨", "Samoa": "🇼🇸", "San Marino": "🇸🇲", "Sao Tome and Principe": "🇸🇹", "Saudi Arabia": "🇸🇦", "Senegal": "🇸🇳", "Serbia": "🇷🇸", "Seychelles": "🇸🇨", "Sierra Leone": "🇸🇱", "Singapore": "🇸🇬", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "Solomon Islands": "🇸🇧", "Somalia": "🇸🇴", "South Africa": "🇿🇦", "South Sudan": "🇸🇸", "Spain": "🇪🇸", "Sri Lanka": "🇱🇰", "Sudan": "🇸🇩", "Suriname": "🇸🇷", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Syria": "🇸🇾",
        "Taiwan": "🇹🇼", "Tajikistan": "🇹🇯", "Tanzania": "🇹🇿", "Thailand": "🇹🇭", "Timor-Leste": "🇹🇱", "Togo": "🇹🇬", "Tonga": "🇹🇴", "Trinidad and Tobago": "🇹🇹", "Tunisia": "🇹🇳", "Turkey": "🇹🇷", "Turkmenistan": "🇹🇲", "Tuvalu": "🇹🇻",
        "Uganda": "🇺🇬", "Ukraine": "🇺🇦", "United Arab Emirates": "🇦🇪", "United Kingdom": "🇬🇧", "United States of America": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿",
        "Vanuatu": "🇻🇺", "Venezuela": "🇻🇪", "Vietnam": "🇻🇳",
        "Yemen": "🇾🇪",
        "Zambia": "🇿🇲", "Zimbabwe": "🇿🇼", "Puerto Rico": "🇵🇷", "Palestine": "🇵🇸", "Vatican City": "🇻🇦", "Macau": "🇲🇴", "Hong Kong": "🇭🇰"
    };
}

// Get country flag function
function getCountryFlag(countryName) {
    return countryFlags[countryName] || "🏳️"; // Default flag if not found
}

// Game state
let currentGame = {
    attempts: 6,
    languageAttempts: 6, // Separate counter for language attempts
    guesses: [],
    dailySentence: "",
    correctLanguage: "",
    correctCountries: [],
    gameOver: false,
    currentPhase: 'language', // 'language' or 'countries'
    currentLanguageGuess: null,
    languageGuessed: false, // Track if language has been correctly guessed
    isNewGame: true, // Flag to indicate if it's a new game or a loaded daily game
    hintRevealed: false, // Track if hint has been revealed
    regionsHintRevealed: false, // Track if regions hint has been revealed
    correctlyGuessedCountries: [], // Track countries that have been correctly guessed
    correctCountryPositions: {} // Track which position each correct country was guessed in
};

// Streak functionality
let streakData = {
    currentStreak: 0,
    bestStreak: 0,
    lastPlayedDate: null,
    lastWonDate: null
};

// DOM elements - will be initialized after DOM loads
let dailySentenceEl, languageGuessEl, languageDropdownEl, submitLanguageGuessEl, submitCountryGuessEl;
let languagePhaseEl, countryPhaseEl, countryInputsEl;
let languageGuessesHistoryEl, countryGuessesHistoryEl, correctLanguageEl, correctCountriesEl;
let correctSentenceEl, hintBtnEl, hintBtn2El, hintDisplayEl, hintDisplay2El, mapHintBtnEl, mapHintDisplayEl, instructionsPopupEl, closeInstructionsEl;
let startGameBtnEl, playNextSectionEl, playNextBtnEl, languageInputRowEl;
let languageResultMessageEl, languageResultTextEl, shareBtnLanguageEl;
let translationDisplayEl, detectedLanguageLabelEl;
let countryResultMessageEl, countryResultTextEl, allCountriesInfoEl, allCountriesListEl, allCountriesTitleEl;
let shareBtnEl, countryShareSectionEl, guessPromptEl, confettiCanvasEl, backToLanguageBtnEl, gameBackButtonEl, forwardToCountryBtnEl, gameForwardButtonEl;
let headerStreakEl, streakFlameEl, streakNumberEl, sentenceDisplayEl;

// Initialize DOM elements
function initializeDOMElements() {
    dailySentenceEl = document.getElementById('dailySentence');
    languageGuessEl = document.getElementById('languageGuess');
    languageDropdownEl = document.getElementById('languageDropdown');
    submitLanguageGuessEl = document.getElementById('submitLanguageGuess');
    submitCountryGuessEl = document.getElementById('submitCountryGuess');
    languagePhaseEl = document.getElementById('languagePhase');
    countryPhaseEl = document.getElementById('countryPhase');
    countryInputsEl = document.getElementById('countryInputs');
    languageGuessesHistoryEl = document.getElementById('languageGuessesHistory');
    countryGuessesHistoryEl = document.getElementById('countryGuessesHistory');
    correctLanguageEl = document.getElementById('correctLanguage');
    correctCountriesEl = document.getElementById('correctCountries');
    correctSentenceEl = document.getElementById('correctSentence');
    hintBtnEl = document.getElementById('hintBtn');
    hintBtn2El = document.getElementById('hintBtn2');
    hintDisplayEl = document.getElementById('hintDisplay');
    hintDisplay2El = document.getElementById('hintDisplay2');
    mapHintBtnEl = document.getElementById('mapHintBtn');
    mapHintDisplayEl = document.getElementById('mapHintDisplay');
    console.log('Map hint elements found:', {
        button: !!mapHintBtnEl,
        display: !!mapHintDisplayEl
    });
    instructionsPopupEl = document.getElementById('instructionsPopup');
    closeInstructionsEl = document.getElementById('closeInstructions');
    startGameBtnEl = document.getElementById('startGameBtn');
    playNextSectionEl = document.getElementById('playNextSection');
    playNextBtnEl = document.getElementById('playNextBtn');
    languageInputRowEl = document.getElementById('languageInputRow');
    languageResultMessageEl = document.getElementById('languageResultMessage');
    languageResultTextEl = document.getElementById('languageResultText');
    shareBtnLanguageEl = document.getElementById('shareBtnLanguage');


    translationDisplayEl = document.getElementById('translationDisplay');
    detectedLanguageLabelEl = document.getElementById('detectedLanguageLabel');
    countryResultMessageEl = document.getElementById('countryResultMessage');
    countryResultTextEl = document.getElementById('countryResultText');
    allCountriesInfoEl = document.getElementById('allCountriesInfo');
    allCountriesListEl = document.getElementById('allCountriesList');
    allCountriesTitleEl = document.getElementById('allCountriesTitle');
    shareBtnEl = document.getElementById('shareBtn');
    countryShareSectionEl = document.getElementById('countryShareSection');
    guessPromptEl = document.querySelector('.guess-prompt');
    confettiCanvasEl = document.getElementById('confettiCanvas');
    backToLanguageBtnEl = document.getElementById('backToLanguageBtn');
    gameBackButtonEl = document.getElementById('gameBackButton');
    forwardToCountryBtnEl = document.getElementById('forwardToCountryBtn');
    gameForwardButtonEl = document.getElementById('gameForwardButton');

    headerStreakEl = document.getElementById('headerStreak');
    streakFlameEl = document.getElementById('streakFlame');
    streakNumberEl = document.getElementById('streakNumber');
    sentenceDisplayEl = document.querySelector('.sentence-display');
    

    
    // Debug: Check if all DOM elements are found
    console.log('DOM elements found:', {
        dailySentenceEl: !!dailySentenceEl,
        languageGuessEl: !!languageGuessEl,
        submitLanguageGuessEl: !!submitLanguageGuessEl,
        submitCountryGuessEl: !!submitCountryGuessEl,
        languagePhaseEl: !!languagePhaseEl,
        countryPhaseEl: !!countryPhaseEl,
        countryInputsEl: !!countryInputsEl,
        languageGuessesHistoryEl: !!languageGuessesHistoryEl,
        countryGuessesHistoryEl: !!countryGuessesHistoryEl,
        correctLanguageEl: !!correctLanguageEl,
        correctCountriesEl: !!correctCountriesEl,
        hintBtnEl: !!hintBtnEl,
        hintBtn2El: !!hintBtn2El,
        hintDisplayEl: !!hintDisplayEl,
        hintDisplay2El: !!hintDisplay2El,
        shareBtnEl: !!shareBtnEl,
        shareBtnLanguageEl: !!shareBtnLanguageEl,
        forwardToCountryBtnEl: !!forwardToCountryBtnEl,
        gameForwardButtonEl: !!gameForwardButtonEl,
        gameBackButtonEl: !!gameBackButtonEl,
        backToLanguageBtnEl: !!backToLanguageBtnEl
    });
}

// Initialize the game
async function initGame() {
    try {
        console.log('Initializing game...');
        
        // Load game data from JSON file
        await loadGameData();
        
        // Load streak data
        loadStreakData();
        
        // Update streak display
        updateStreakDisplay();
        
        // Check if there's a saved game state first (only in daily mode)
        if (!dev_mode) {
            const savedState = localStorage.getItem('langlioGameState');
            if (savedState) {
                console.log('Found saved game state, loading...');
                try {
                    loadGameState();
                    return 'loaded';
                } catch (error) {
                    console.error('Error loading saved state:', error);
                    console.log('Clearing corrupted saved state and starting fresh...');
                    localStorage.removeItem('langlio_game_state');
                    // Continue with fresh game initialization
                }
            }
        } else {
            // Dev mode: always start fresh, clear any saved state
            console.log('Dev mode: clearing saved state and starting fresh game');
            localStorage.removeItem('langlioGameState');
        }
        
        // Check and reset used languages for daily mode
        if (!dev_mode) {
            checkAndResetUsedLanguages();
            
            // Always clear old game state for new day detection
            console.log('Daily mode: checking for new day and clearing old game state if needed');
            localStorage.removeItem('langlioGameState');
        }
        
        // Get the language for this game (daily or random based on dev_mode)
        const selectedLanguage = getCurrentGameLanguage();
        
        if (!selectedLanguage) {
            throw new Error('No languages available in game data');
        }
        
        console.log('Game mode:', dev_mode ? 'DEV MODE (random)' : 'DAILY MODE');
        console.log('Selected language:', selectedLanguage);
        
        // Debug: Check what the daily language should be
        if (!dev_mode) {
            const currentDate = getCurrentDateString();
            const expectedDailyLanguage = getDailyLanguage(currentDate);
            console.log('Expected daily language for', currentDate + ':', expectedDailyLanguage);
            console.log('Available languages count:', Object.keys(gameData).length);
        }
        
        currentGame.correctLanguage = selectedLanguage;
        
        // Mark language as used for daily mode (only if this is a truly new game)
        if (!dev_mode) {
            markLanguageAsUsed(selectedLanguage);
        }
        
        // Log daily language info for debugging
        if (!dev_mode) {
            const currentDate = getCurrentDateString();
            console.log('Current date:', currentDate);
            console.log('Used languages today:', usedLanguages);
            console.log('Daily language for today:', getDailyLanguage(currentDate));
        }
        
        // Select random countries from the language's country list (max 3, or all if less than 3)
        const allCountries = gameData[selectedLanguage].countries;
        currentGame.correctCountries = [...allCountries]; // Use all available countries
        currentGame.dailySentence = gameData[selectedLanguage].sentence;
        
        console.log('Daily sentence:', currentGame.dailySentence);
        
        // Display the sentence
        dailySentenceEl.textContent = currentGame.dailySentence;
        dailySentenceEl.style.display = 'block';
        
        // Set initial "Translating..." placeholder
        if (translationDisplayEl) {
            translationDisplayEl.textContent = 'Translating...';
            translationDisplayEl.classList.add('placeholder');
        }
        // Log the language for debugging
        console.log('Debug Language:', currentGame.correctLanguage);
        
        // Populate dropdowns
        populateDropdowns();
        
        // Update UI to show empty slots immediately
        updateUI();
        
        // Ensure hints are hidden at game start
        if (hintDisplayEl) {
            hintDisplayEl.style.display = 'none';
            hintDisplayEl.classList.remove('show');
        }
        if (hintDisplay2El) {
            hintDisplay2El.style.display = 'none';
            hintDisplay2El.classList.remove('show');
        }
        
        // Initialize confetti after DOM elements are ready
        if (confettiCanvasEl) {
            confetti = new Confetti(confettiCanvasEl);
        }
        
        // Save the initial game state so it can be loaded on refresh
        saveGameState();
        
        console.log('Game initialized successfully');
        return 'fresh';
    } catch (error) {
        console.error('Error initializing game:', error);
        alert('Error initializing game: ' + error.message);
    }
}

// Simple hash function for consistent daily generation
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
}

// Get current date string in user's timezone (YYYY-MM-DD format)
function getCurrentDateString() {
    // Check if there's a test date override
    const testDate = localStorage.getItem('langlio_test_date');
    if (testDate) {
        console.log('Using test date:', testDate);
        return testDate;
    }
    
    // Return actual current date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Returns YYYY-MM-DD in local timezone
}

// Set a test date for testing future languages
function setTestDate(dateString) {
    if (dateString) {
        localStorage.setItem('langlio_test_date', dateString);
        console.log('Test date set to:', dateString);
        showPopup(`Test date set to: ${dateString}`, 3000);
    } else {
        localStorage.removeItem('langlio_test_date');
        console.log('Test date cleared');
        showPopup('Test date cleared - using real date', 3000);
    }
}

// Clear test date and use real date
function clearTestDate() {
    localStorage.removeItem('langlio_test_date');
    console.log('Test date cleared');
    showPopup('Test date cleared - using real date', 3000);
}

// Get daily language based on date with perfect rotation
function getDailyLanguage(dateString) {
    const availableLanguages = Object.keys(gameData);
    if (availableLanguages.length === 0) return null;
    
    // Calculate days since a reference date (2025-01-01)
    const referenceDate = new Date('2025-01-01');
    const currentDate = new Date(dateString);
    const daysSinceReference = Math.floor((currentDate - referenceDate) / (1000 * 60 * 60 * 24));
    
    // Calculate which 35-day cycle we're in and which day within that cycle
    const cycleNumber = Math.floor(daysSinceReference / availableLanguages.length);
    const dayInCycle = daysSinceReference % availableLanguages.length;
    
    // Create a shuffled order for this cycle using the cycle number as seed
    const shuffledLanguages = shuffleArrayWithSeed([...availableLanguages], cycleNumber);
    
    // Return the language for this specific day in this cycle
    return shuffledLanguages[dayInCycle];
}

// Shuffle array with a seed for consistent results
function shuffleArrayWithSeed(array, seed) {
    const shuffled = [...array];
    const random = seededRandom(seed);
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

// Seeded random number generator
function seededRandom(seed) {
    let value = seed;
    return function() {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

// Check if we need to reset used languages (new day)
function checkAndResetUsedLanguages() {
    const currentDate = getCurrentDateString();
    const lastPlayedDate = localStorage.getItem('langlio_last_played_date');
    
    console.log('Checking for new day - Current date:', currentDate, 'Last played date:', lastPlayedDate);
    
    if (lastPlayedDate !== currentDate) {
        // New day, reset everything
        usedLanguages = [];
        localStorage.setItem('langlio_last_played_date', currentDate);
        localStorage.setItem('langlio_used_languages', JSON.stringify(usedLanguages));
        localStorage.removeItem('langlioGameState');
        console.log('New day detected, resetting everything for fresh start');
    } else {
        // Same day, load used languages from localStorage
        const savedUsedLanguages = localStorage.getItem('langlio_used_languages');
        if (savedUsedLanguages) {
            usedLanguages = JSON.parse(savedUsedLanguages);
        }
        console.log('Same day, loaded used languages:', usedLanguages);
    }
}



// Get language for current game (daily or random based on dev_mode)
function getCurrentGameLanguage() {
    if (dev_mode) {
        // Dev mode: return random language
        const availableLanguages = Object.keys(gameData);
        if (availableLanguages.length === 0) return null;
        return availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
    } else {
        // Daily mode: return the same language for the entire day
        const currentDate = getCurrentDateString();
        const dailyLanguage = getDailyLanguage(currentDate);
        
        // In daily mode, always return the same language for the day
        // The usedLanguages tracking is for preventing multiple plays per day
        return dailyLanguage;
    }
}

// Mark language as used (for daily mode)
function markLanguageAsUsed(language) {
    if (!dev_mode && language) {
        if (!usedLanguages.includes(language)) {
            usedLanguages.push(language);
            localStorage.setItem('langlio_used_languages', JSON.stringify(usedLanguages));
        }
    }
}

// Populate dropdowns with languages and countries
function populateDropdowns() {
    // Set up searchable language input
    setupSearchableLanguageInput();
}

// Set up searchable language input
function setupSearchableLanguageInput() {
    // Use the comprehensive language list for the dropdown
    const languages = allLanguages.sort();
    console.log('Setting up language dropdown with languages:', languages);
    console.log('Number of languages for dropdown:', languages.length);
    
    // Store languages for filtering
    languageGuessEl.dataset.languages = JSON.stringify(languages);
    
    // Add event listeners for searchable input
    languageGuessEl.addEventListener('input', filterLanguages);
    languageGuessEl.addEventListener('focus', showLanguageDropdown);
    languageGuessEl.addEventListener('blur', () => {
        // Delay hiding dropdown to allow for clicks
        setTimeout(() => {
            languageDropdownEl.style.display = 'none';
        }, 200);
    });
    // Add Enter key handler for language input
    languageGuessEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstOption = languageDropdownEl.querySelector('.dropdown-option:not(.no-results)');
            if (firstOption) {
                languageGuessEl.value = firstOption.textContent;
                languageDropdownEl.style.display = 'none';
            }
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchable-dropdown')) {
            languageDropdownEl.style.display = 'none';
        }
    });
}

// Filter languages based on input
function filterLanguages() {
    const searchTerm = languageGuessEl.value.toLowerCase();
    const languages = JSON.parse(languageGuessEl.dataset.languages || '[]');
    const filteredLanguages = languages.filter(lang => 
        lang.toLowerCase().includes(searchTerm)
    );
    
    displayLanguageOptions(filteredLanguages);
}

// Display language options in dropdown
function displayLanguageOptions(languages) {
    languageDropdownEl.innerHTML = '';
    
    if (languages.length === 0) {
        languageDropdownEl.innerHTML = '<div class="dropdown-option no-results">No languages found</div>';
        languageDropdownEl.style.display = 'block';
        return;
    }
    
    languages.forEach(language => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.textContent = language;
        option.addEventListener('click', () => {
            languageGuessEl.value = language;
            languageDropdownEl.style.display = 'none';
        });
        languageDropdownEl.appendChild(option);
    });
    
    languageDropdownEl.style.display = 'block';
}

// Show language dropdown
function showLanguageDropdown() {
    const languages = JSON.parse(languageGuessEl.dataset.languages || '[]');
    displayLanguageOptions(languages);
}

// Add event listeners
function addEventListeners() {
    // Remove any existing event listeners to prevent duplicates
    if (submitLanguageGuessEl) {
        submitLanguageGuessEl.removeEventListener('click', submitLanguageGuess);
        submitLanguageGuessEl.addEventListener('click', submitLanguageGuess);
    }
    if (submitCountryGuessEl) {
        submitCountryGuessEl.removeEventListener('click', submitCountryGuess);
        submitCountryGuessEl.addEventListener('click', submitCountryGuess);
    }
    if (hintBtnEl) {
        hintBtnEl.removeEventListener('click', () => toggleHint('text'));
        hintBtnEl.addEventListener('click', () => toggleHint('text'));
    }
    if (hintBtn2El) {
        console.log('Regions hint button found, adding event listener');
        // Clear all event listeners by replacing the button
        const oldRegionsBtn = hintBtn2El;
        const newRegionsBtn = oldRegionsBtn.cloneNode(true);
        oldRegionsBtn.parentNode.replaceChild(newRegionsBtn, oldRegionsBtn);
        hintBtn2El = newRegionsBtn;
        // Add the correct event listener for regions
        hintBtn2El.addEventListener('click', () => {
            console.log('Regions hint button clicked!');
            console.log('Current game state:', currentGame);
            toggleHint('regions');
        });
    } else {
        console.error('Regions hint button not found!');
    }
    
    if (mapHintBtnEl) {
        console.log('Map hint button found, adding event listener');
        // Clear all event listeners by replacing the button
        const oldMapBtn = mapHintBtnEl;
        const newMapBtn = oldMapBtn.cloneNode(true);
        oldMapBtn.parentNode.replaceChild(newMapBtn, oldMapBtn);
        mapHintBtnEl = newMapBtn;
        // Add the correct event listener for map
        mapHintBtnEl.addEventListener('click', () => toggleHint('map'));
    } else {
        console.error('Map hint button not found!');
    }
    if (playNextBtnEl) {
        playNextBtnEl.removeEventListener('click', startCountryPhase);
        playNextBtnEl.addEventListener('click', startCountryPhase);
    }
    
    // Add event listeners for share buttons if they exist
    if (shareBtnEl) {
        shareBtnEl.addEventListener('click', shareResult);
    }
    if (shareBtnLanguageEl) {
        shareBtnLanguageEl.addEventListener('click', shareResult);
    }
    
    // Add back button event listener
    if (backToLanguageBtnEl) {
        backToLanguageBtnEl.removeEventListener('click', goBackToLanguagePhase);
        backToLanguageBtnEl.addEventListener('click', goBackToLanguagePhase);
    }
    
    // Add forward button event listener
    if (forwardToCountryBtnEl) {
        forwardToCountryBtnEl.removeEventListener('click', startCountryPhase);
        forwardToCountryBtnEl.addEventListener('click', startCountryPhase);
    }
    
    // Instructions popup event listeners
    if (closeInstructionsEl) {
        // Remove existing listener to prevent duplicates
        closeInstructionsEl.removeEventListener('click', closeInstructions);
        closeInstructionsEl.addEventListener('click', closeInstructions);
    }
    
    if (startGameBtnEl) {
        // Remove existing listener to prevent duplicates
        startGameBtnEl.removeEventListener('click', closeInstructions);
        startGameBtnEl.addEventListener('click', closeInstructions);
    }
    
    // Close instructions when clicking outside
    if (instructionsPopupEl) {
        // Remove existing listener to prevent duplicates
        instructionsPopupEl.removeEventListener('click', closeInstructions);
        instructionsPopupEl.addEventListener('click', (e) => {
            if (e.target === instructionsPopupEl) {
                closeInstructions();
            }
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Close instructions with Escape key
        if (e.key === 'Escape' && instructionsPopupEl.style.display !== 'none') {
            closeInstructions();
        }
        
        // Handle Enter key for language guesses
        if (e.key === 'Enter' && !currentGame.gameOver) {
            // Only submit language guesses when Enter is pressed
            // Country guesses should be submitted manually via the submit button
            if (currentGame.currentPhase === 'language') {
                submitLanguageGuess();
            }
        }
    });
}

// Toggle hint display
function toggleHint(hintType) {
    console.log('toggleHint called with type:', hintType);
    console.log('currentGame.hintRevealed before:', currentGame.hintRevealed);
    console.log('currentGame.mapHintRevealed before:', currentGame.mapHintRevealed);
    
    if (hintType === 'text') {
        if (currentGame.hintRevealed) {
            // Text hint is already revealed - do nothing (keep it open)
            console.log('Text hint already revealed, keeping it open');
            return;
        } else {
            // Show text hint (only once)
            console.log('Showing text hint...');
            currentGame.hintRevealed = true;
            updateHintDisplay('text');
            
            // Disable the text hint button after first click and make it red
            hintBtnEl.disabled = true;
            hintBtnEl.classList.add('active');
            console.log('Text hint button disabled and made red');
        }
    } else if (hintType === 'regions') {
        console.log('Regions hint requested');
        console.log('Current game state for regions hint:', {
            correctLanguage: currentGame.correctLanguage,
            gameDataAvailable: !!gameData,
            gameDataKeys: gameData ? Object.keys(gameData) : 'No gameData'
        });
        
        if (currentGame.regionsHintRevealed) {
            // Regions hint is already revealed - do nothing (keep it open)
            console.log('Regions hint already revealed, keeping it open');
            return;
        } else {
            // Show regions hint (only once)
            console.log('Showing regions hint...');
            currentGame.regionsHintRevealed = true;
            updateHintDisplay('regions');
            
            // Disable the regions hint button after first click and make it red
            hintBtn2El.disabled = true;
            hintBtn2El.classList.add('active');
            console.log('Regions hint button disabled and made red');
        }
    } else if (hintType === 'map') {
        console.log('Map hint requested');
        if (currentGame.mapHintRevealed) {
            // Map hint is already revealed - do nothing (keep it open)
            return;
        } else {
            // Show map hint (only once)
            console.log('Showing map hint...');
            currentGame.mapHintRevealed = true;
            updateHintDisplay('map');
            
            // Disable the map hint button after first click and make it red
            if (mapHintBtnEl) {
                mapHintBtnEl.disabled = true;
                mapHintBtnEl.classList.add('active');
            }
            if (currentGame.countryMapHintBtn) {
                currentGame.countryMapHintBtn.disabled = true;
                currentGame.countryMapHintBtn.classList.add('active');
            }
            console.log('Map hint button disabled and made red');
        }
    }
    
    console.log('currentGame.hintRevealed after:', currentGame.hintRevealed);
    console.log('currentGame.mapHintRevealed after:', currentGame.mapHintRevealed);
    
    // Save game state
    saveGameState();
}

// Update hint display
function updateHintDisplay(hintType) {
    console.log('updateHintDisplay called with type:', hintType);
    console.log('currentGame.hintRevealed:', currentGame.hintRevealed);
    console.log('currentGame.mapHintRevealed:', currentGame.mapHintRevealed);
    console.log('currentGame.correctLanguage:', currentGame.correctLanguage);
    console.log('gameData available:', !!gameData);
    console.log('hintDisplayEl:', hintDisplayEl);
    console.log('hintDisplay2El:', hintDisplay2El);
    
    const languageData = gameData[currentGame.correctLanguage];
    console.log('languageData:', languageData);
    
    if (hintType === 'text') {
        // Handle text hint in first display
        if (!currentGame.hintRevealed) {
            hintDisplayEl.style.display = 'none';
            hintDisplayEl.classList.remove('show');
            return;
        }
        
        if (languageData && languageData.hint) {
            hintDisplayEl.textContent = languageData.hint;
            hintDisplayEl.style.display = 'flex';
            hintDisplayEl.classList.add('show');
            console.log('Text hint displayed successfully in hintDisplayEl');
        } else {
            hintDisplayEl.style.display = 'none';
            hintDisplayEl.classList.remove('show');
            console.log('Language data or hint missing');
        }
    } else if (hintType === 'regions') {
        console.log('Handling regions hint display');
        console.log('currentGame.correctLanguage:', currentGame.correctLanguage);
        console.log('languageData:', languageData);
        console.log('languageData.Regions:', languageData?.Regions);
        
        // Check if a language has been selected
        if (!currentGame.correctLanguage) {
            console.log('No language selected yet, cannot show regions hint');
            hintDisplay2El.style.display = 'none';
            hintDisplay2El.classList.remove('show');
            return;
        }
        
        // Handle regions hint in second display
        if (!currentGame.regionsHintRevealed) {
            console.log('Regions hint not revealed, hiding display');
            hintDisplay2El.style.display = 'none';
            hintDisplay2El.classList.remove('show');
            return;
        }
        
        if (languageData && languageData.Regions) {
            console.log('Showing regions hint:', languageData.Regions);
            hintDisplay2El.textContent = languageData.Regions;
            hintDisplay2El.style.display = 'flex';
            hintDisplay2El.classList.add('show');
            console.log('Regions hint displayed successfully in hintDisplay2El');
        } else if (languageData && languageData.regions) {
            // Fallback for lowercase regions
            console.log('Showing regions hint (lowercase):', languageData.regions);
            hintDisplay2El.textContent = languageData.regions;
            hintDisplay2El.style.display = 'flex';
            hintDisplay2El.classList.add('show');
            console.log('Regions hint displayed successfully in hintDisplay2El');
        } else {
            console.log('Language data or regions missing');
            console.log('languageData exists:', !!languageData);
            if (languageData) {
                console.log('Available keys in languageData:', Object.keys(languageData));
                console.log('Full languageData object:', languageData);
            }
            hintDisplay2El.style.display = 'none';
            hintDisplay2El.classList.remove('show');
        }
    } else if (hintType === 'map') {
        console.log('Handling map hint display');
        // Handle map hint in map display
        if (!currentGame.mapHintRevealed) {
            console.log('Map hint not revealed, hiding display');
            // Hide both the original map hint display and the country phase one
            if (mapHintDisplayEl) {
                mapHintDisplayEl.style.display = 'none';
                mapHintDisplayEl.classList.remove('show');
            }
            if (currentGame.countryMapHintDisplay) {
                currentGame.countryMapHintDisplay.style.display = 'none';
                currentGame.countryMapHintDisplay.classList.remove('show');
            }
            return;
        }
        
        if (languageData) {
            console.log('Creating map hint for language:', currentGame.correctLanguage);
            // Create map hint container
            const mapContainer = document.createElement('div');
            mapContainer.className = 'map-hint-container';
            mapContainer.style.setProperty('width', '100%', 'important');
            mapContainer.style.setProperty('height', '300px', 'important');
            console.log('Created map container:', mapContainer);
            
            // Determine which display to use based on current phase
            let targetDisplay;
            if (currentGame.currentPhase === 'countries' && currentGame.countryMapHintDisplay) {
                targetDisplay = currentGame.countryMapHintDisplay;
                console.log('Using country phase map hint display');
            } else if (mapHintDisplayEl) {
                targetDisplay = mapHintDisplayEl;
                console.log('Using original map hint display');
            } else {
                console.error('No map hint display found');
                return;
            }
            
            // Clear existing content and add map container
            targetDisplay.innerHTML = '';
            targetDisplay.appendChild(mapContainer);
            console.log('Added map container to target display');
            
            // Show the hint display
            targetDisplay.classList.add('show');
            targetDisplay.style.setProperty('display', 'flex', 'important');
            targetDisplay.style.setProperty('min-height', '350px', 'important'); // Ensure it has height for the map
            targetDisplay.style.setProperty('width', '100%', 'important'); // Ensure it takes full width
            console.log('Added show class to target display');
            
            // Debug hint display visibility
            setTimeout(() => {
                const rect = hintDisplay2El.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(hintDisplay2El);
                console.log('Hint display 2 dimensions:', {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    opacity: computedStyle.opacity,
                    position: computedStyle.position,
                    zIndex: computedStyle.zIndex
                });
                
                const mapContainerRect = mapContainer.getBoundingClientRect();
                console.log('Map container dimensions:', {
                    width: mapContainerRect.width,
                    height: mapContainerRect.height,
                    top: mapContainerRect.top,
                    left: mapContainerRect.left
                });
                
                // Check if hint display is actually visible
                if (rect.width === 0 || rect.height === 0) {
                    console.error('Hint display 2 has zero dimensions!');
                    console.log('Hint display 2 element:', hintDisplay2El);
                    console.log('Hint display 2 parent:', hintDisplay2El.parentElement);
                }
            }, 100);
            
            // Initialize map and highlight countries with longer delay to ensure Leaflet is loaded
            setTimeout(() => {
                console.log('Timeout callback - initializing map...');
                
                // Ensure map container has proper dimensions
                const mapContainer = document.querySelector('.map-hint-container');
                if (mapContainer) {
                    const rect = mapContainer.getBoundingClientRect();
                    console.log('Map container before initialization:', {
                        width: rect.width,
                        height: rect.height
                    });
                    
                    // Force a minimum height if needed
                    if (rect.height < 100) {
                        mapContainer.style.height = '300px';
                        console.log('Forced map container height to 300px');
                    }
                }
                
                initializeMap();
                if (map) {
                    console.log('Map initialized successfully, highlighting countries...');
                    highlightCountriesForLanguage(currentGame.correctLanguage);
                } else {
                    console.log('Map initialization failed');
                }
            }, 500);
            
            console.log('Map hint displayed successfully in hintDisplay2El');
        } else {
            hintDisplay2El.style.display = 'none';
            hintDisplay2El.classList.remove('show');
            console.log('Language data missing');
        }
    }
}


// Evaluate a guess
function evaluateGuess(guess) {
    const languageCorrect = guess.language === currentGame.correctLanguage;
    const guessedCountries = new Set(guess.countries);
    
    // Get all countries that speak this language
    const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
    
    // Check if user has guessed any countries from the complete list
    const correctMatches = guessedCountries.size > 0 ? 
        Array.from(guessedCountries).filter(country => 
            allCountriesForLanguage.includes(country)
        ).length : 0;
    
    // User wins if they guess the required number of correct countries (any from the full list)
    const requiredCorrect = Math.min(3, allCountriesForLanguage.length);
    const countriesCorrect = correctMatches >= requiredCorrect;
    
    return {
        languageCorrect,
        countriesCorrect,
        correctMatches,
        totalCorrect: requiredCorrect
    };
}



// Submit language guess
function submitLanguageGuess() {
    if (currentGame.gameOver || currentGame.languageAttempts <= 0) return;
    
    const languageGuess = languageGuessEl.value;
    
    // Validate input
    if (!languageGuess) {
        alert('Please select a language.');
        return;
    }
    
    // Check if the guessed language exists in the dropdown options
    const languages = JSON.parse(languageGuessEl.dataset.languages || '[]');
    if (!languages.includes(languageGuess)) {
        alert('Please select a valid language from the dropdown.');
        return;
    }
    
    // Check if this language has already been guessed
    const previouslyGuessed = currentGame.guesses.some(guess => guess.language === languageGuess);
    if (previouslyGuessed) {
        alert('You have already guessed this language. Please try a different one.');
        return;
    }
    
    // Check if language is correct
    const isCorrect = languageGuess === currentGame.correctLanguage;
    
    // Add to guesses history
    const languageGuessObj = {
        language: languageGuess,
        countries: [],
        attempt: 7 - currentGame.languageAttempts,
        results: {
            languageCorrect: isCorrect,
            countriesCorrect: false,
            correctMatches: 0,
            totalCorrect: 0
        }
    };
    currentGame.guesses.push(languageGuessObj);
    
    // Decrease language attempts
    currentGame.languageAttempts--;
    
    // Update UI
    updateUI();
    
    if (isCorrect) {
        // Trigger confetti for correct language guess
        triggerConfetti();
        
        // Update streak for win
        updateStreak(true);
        
        // Language is correct - show success message and correct language info
        currentGame.languageGuessed = true;
        currentGame.currentLanguageGuess = languageGuess;
        
        // Hide input section
        languageInputRowEl.style.display = 'none';
        
        // Hide hint buttons
        hintBtnEl.style.display = 'none';
        hintBtn2El.style.display = 'none';
        
        // Hide hint displays
        hintDisplayEl.style.display = 'none';
        hintDisplay2El.style.display = 'none';
        
        // Show success message
        languageResultMessageEl.style.display = 'block';
        languageResultTextEl.textContent = 'You guessed the language!';
        languageResultTextEl.className = 'result-text success';
        
        // Show streak display
        updateStreakDisplay();
        
        // Show correct language and translation
        if (detectedLanguageLabelEl) {
            detectedLanguageLabelEl.textContent = currentGame.correctLanguage;
        }
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.translation) {
            translationDisplayEl.textContent = languageData.translation;
            translationDisplayEl.classList.remove('placeholder');
            translationDisplayEl.style.display = 'block';
            currentGame.translationRevealed = true;
        }
        
        // Show "Play Next" button
        playNextSectionEl.style.display = 'flex';
        
        // Show forward button to go to country phase
        gameForwardButtonEl.style.display = 'block';
        
        // Mark today as completed for language guessing round
        const currentDate = getCurrentDateString();
        localStorage.setItem(`langlioCompleted_${currentDate}`, 'true');
        console.log('Marked today as completed (win):', currentDate);
        
        // Update streak flame to red since language phase is completed
        updateStreakFlameState();
        
        // Clear language input
        languageGuessEl.value = '';
    } else {
        // Language is incorrect - check if game is over
        if (currentGame.languageAttempts <= 0) {
            // Update streak for loss
            updateStreak(false);
            
            // No more language attempts - show failure message
            languageInputRowEl.style.display = 'none';
            
            // Hide hint buttons
            hintBtnEl.style.display = 'none';
            hintBtn2El.style.display = 'none';
            
            // Hide hint displays
            hintDisplayEl.style.display = 'none';
            hintDisplay2El.style.display = 'none';
            
            languageResultMessageEl.style.display = 'block';
            languageResultTextEl.textContent = `The language is ${currentGame.correctLanguage}, better luck next time!`;
            languageResultTextEl.className = 'result-text failure';
            
            // Show streak display
            updateStreakDisplay();
            
            // Show correct language and translation
            if (detectedLanguageLabelEl) {
                detectedLanguageLabelEl.textContent = currentGame.correctLanguage;
            }
            const languageData = gameData[currentGame.correctLanguage];
            if (languageData && languageData.translation) {
                translationDisplayEl.textContent = languageData.translation;
                translationDisplayEl.classList.remove('placeholder');
                translationDisplayEl.style.display = 'block';
                currentGame.translationRevealed = true;
            }
            
            // Show "Play Next" button even on loss
            playNextSectionEl.style.display = 'flex';
            
            // Show forward button to go to country phase
            gameForwardButtonEl.style.display = 'block';
            
            // Mark today as completed for language guessing round
            const currentDate = getCurrentDateString();
            localStorage.setItem(`langlioCompleted_${currentDate}`, 'true');
            console.log('Marked today as completed (loss):', currentDate);
            
            // Update streak flame to red since language phase is completed
            updateStreakFlameState();
        } else {
            // Clear language input for next attempt
            languageGuessEl.value = '';
        }
    }
    
    // Mark that user has played today when language phase ends (for daily mode)
    if (!dev_mode && (currentGame.languageGuessed || currentGame.languageAttempts <= 0)) {
        markLanguageAsUsed(currentGame.correctLanguage);
    }
    
    // Save game state
    saveGameState();
}

// Generate country input with new UI layout
function generateCountryInputs(correctLanguage) {
    // Check if country inputs already exist and have a share button
    const existingShareButton = countryInputsEl.querySelector('.country-share-container');
    if (existingShareButton) {
        console.log('Country inputs already exist, skipping recreation');
        return;
    }
    
    countryInputsEl.innerHTML = '';
    
    const languageData = gameData[correctLanguage];
    
    if (!languageData) {
        countryInputsEl.innerHTML = '<p>No language data found.</p>';
        return;
    }
    
    // Set total countries for this language
    currentGame.totalCountriesForLanguage = languageData.countries.length;
    
    // Create the new UI layout
    const countryUI = document.createElement('div');
    countryUI.className = 'country-ui-layout';
    
    // 1. Sentence about number of countries
    const countrySentence = document.createElement('div');
    countrySentence.className = 'country-sentence';
    countrySentence.textContent = `There are ${currentGame.totalCountriesForLanguage} countries that speak ${currentGame.correctLanguage}.`;
    
    // 2. Progress counter (Y/Z)
    const progressCounter = document.createElement('div');
    progressCounter.className = 'progress-counter';
    progressCounter.textContent = `${currentGame.correctlyGuessedCountries.length}/${currentGame.totalCountriesForLanguage}`;
    
    // 3. Strikes display (3 red X's)
    const strikesDisplay = document.createElement('div');
    strikesDisplay.className = 'strikes-display-new';
    
    // Calculate how many strikes have been used
    const strikesUsed = 3 - currentGame.countryAttempts;
    console.log('Generating strikes display...');
    console.log('countryAttempts:', currentGame.countryAttempts);
    console.log('strikesUsed:', strikesUsed);
    
    // Create 3 X indicators
    for (let i = 0; i < 3; i++) {
        const strike = document.createElement('div');
        strike.className = 'strike-x';
        if (i < strikesUsed) {
            strike.classList.add('used');
            strike.textContent = '❌';
            console.log(`Strike ${i + 1}: created as used (red)`);
        } else {
            strike.classList.add('black');
            strike.textContent = '❌';
            console.log(`Strike ${i + 1}: created as black`);
        }
        strikesDisplay.appendChild(strike);
    }
    
    // 4. Full-width input box
    const countryInput = document.createElement('div');
    countryInput.className = 'country-input-full';
    
    countryInput.innerHTML = `
        <div class="searchable-dropdown">
            <input type="text" id="countryGuess" class="searchable-input full-width" placeholder="Type to search countries...">
            <div id="countryDropdown" class="dropdown-options" style="display: none;"></div>
        </div>
    `;
    
    // Set up searchable country input
    const countryInputEl = countryInput.querySelector('input');
    const countryDropdownEl = countryInput.querySelector('.dropdown-options');
    
    // Store countries for filtering - use comprehensive country list
    countryInputEl.dataset.countries = JSON.stringify(allCountriesList.sort());
    
    // Add event listeners for searchable input
    countryInputEl.addEventListener('input', (e) => filterCountries(e, countryDropdownEl));
    countryInputEl.addEventListener('focus', (e) => showCountryDropdown(e, countryDropdownEl));
    countryInputEl.addEventListener('blur', () => {
        // Delay hiding dropdown to allow for clicks
        setTimeout(() => {
            countryDropdownEl.style.display = 'none';
        }, 200);
    });
    
    // Add Enter key handler for country input
    countryInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstOption = countryDropdownEl.querySelector('.dropdown-option:not(.no-results)');
            if (firstOption) {
                countryInputEl.value = firstOption.textContent;
                countryDropdownEl.style.display = 'none';
            }
        }
    });
    
    // Assemble the UI
    countryUI.appendChild(countrySentence);
    
    // Add map hint button above progress counter
    const mapHintContainer = document.createElement('div');
    mapHintContainer.className = 'country-hint-row';
    mapHintContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;';
    
    // Create new map hint button and display
    const mapHintBtn = document.createElement('button');
    mapHintBtn.className = 'hint-btn';
    mapHintBtn.textContent = 'Map Hint';
    mapHintBtn.id = 'mapHintBtnCountry';
    
    const mapHintDisplay = document.createElement('div');
    mapHintDisplay.className = 'hint-display';
    mapHintDisplay.style.cssText = 'display: none; margin: 0;';
    mapHintDisplay.id = 'mapHintDisplayCountry';
    
    // Add event listener to the new button
    mapHintBtn.addEventListener('click', () => {
        console.log('Map hint button clicked in country phase');
        toggleHint('map');
    });
    
    mapHintContainer.appendChild(mapHintBtn);
    mapHintContainer.appendChild(mapHintDisplay);
    
    countryUI.appendChild(mapHintContainer);
    
    // Store references for later use
    currentGame.countryMapHintBtn = mapHintBtn;
    currentGame.countryMapHintDisplay = mapHintDisplay;
    
    // If map hint was already revealed, restore it
    if (currentGame.mapHintRevealed) {
        console.log('Restoring map hint state in country phase');
        mapHintBtn.disabled = true;
        mapHintBtn.classList.add('active');
        updateHintDisplay('map');
    }
    
    // Add share button above progress counter (initially hidden)
    const shareButtonContainer = document.createElement('div');
    shareButtonContainer.className = 'country-share-container';
    shareButtonContainer.style.cssText = 'display: none; justify-content: center; margin: 1rem 0;';
    
    const shareButton = document.createElement('button');
    shareButton.className = 'play-next-btn';
    shareButton.textContent = 'Share Result';
    shareButton.id = 'shareBtnCountry';
    
    // Add event listener for sharing
    shareButton.addEventListener('click', () => {
        shareResult();
    });
    
    shareButtonContainer.appendChild(shareButton);
    countryUI.appendChild(shareButtonContainer);
    
    // Store reference for later use
    currentGame.countryShareButton = shareButton;
    console.log('Created country share button:', shareButton);
    console.log('Stored in currentGame.countryShareButton:', currentGame.countryShareButton);
    
    countryUI.appendChild(progressCounter);
    countryUI.appendChild(strikesDisplay);
    countryUI.appendChild(countryInput);
    
    countryInputsEl.appendChild(countryUI);
}

// Filter countries based on input
function filterCountries(event, dropdownEl) {
    const searchTerm = event.target.value.toLowerCase();
    const countries = JSON.parse(event.target.dataset.countries || '[]');
    const filteredCountries = countries.filter(country => 
        country.toLowerCase().includes(searchTerm)
    );
    
    displayCountryOptions(filteredCountries, dropdownEl);
}

// Display country options in dropdown
function displayCountryOptions(countries, dropdownEl) {
    dropdownEl.innerHTML = '';
    
    if (countries.length === 0) {
        dropdownEl.innerHTML = '<div class="dropdown-option no-results">No countries found</div>';
        dropdownEl.style.display = 'block';
        return;
    }
    
    countries.forEach(country => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.textContent = country;
        option.addEventListener('click', () => {
            const inputEl = dropdownEl.previousElementSibling;
            inputEl.value = country;
            dropdownEl.style.display = 'none';
        });
        dropdownEl.appendChild(option);
    });
    
    dropdownEl.style.display = 'block';
}

// Show country dropdown
function showCountryDropdown(event, dropdownEl) {
    const countries = JSON.parse(event.target.dataset.countries || '[]');
    displayCountryOptions(countries, dropdownEl);
}

// Submit country guess
function submitCountryGuess() {
    if (currentGame.gameOver || currentGame.countryAttempts <= 0) return;
    
    // Get the single country input
    const countryInput = countryInputsEl.querySelector('input[type="text"]');
    const countryGuess = countryInput.value.trim();
    
    // Validate input
    if (!countryGuess) {
        alert('Please select a country.');
        return;
    }
    
    // Check if the guessed country exists in the dropdown options
    const allCountries = JSON.parse(countryInput.dataset.countries || '[]');
    if (!allCountries.includes(countryGuess)) {
        alert(`Please select a valid country from the dropdown: ${countryGuess}`);
        return;
    }
    
    // Check if this country has already been guessed
    if (currentGame.correctlyGuessedCountries.includes(countryGuess)) {
        alert('You have already correctly guessed this country. Please try a different one.');
        return;
    }
    
    // Check if this country has already been guessed (either correctly or incorrectly)
    const previouslyGuessedCountries = currentGame.guesses
        .filter(guess => guess.countries && guess.countries.length > 0)
        .flatMap(guess => guess.countries);
    
    if (previouslyGuessedCountries.includes(countryGuess)) {
        alert('You have already guessed this country. Please try a different one.');
        return;
    }
    
    // Create complete guess object
    const guess = {
        language: currentGame.currentLanguageGuess,
        countries: [countryGuess],
        attempt: 4 - currentGame.countryAttempts
    };
    
    // Add to guesses
    currentGame.guesses.push(guess);
    
    // Get all countries that speak this language
    const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
    
    console.log('Checking country guess:', countryGuess);
    console.log('All countries for language:', allCountriesForLanguage);
    console.log('Current correct language:', currentGame.correctLanguage);
    console.log('Game data available:', !!gameData);
    console.log('Game data keys:', Object.keys(gameData));
    
    // Check if the guess is correct (case-insensitive comparison)
    const isCorrect = allCountriesForLanguage.some(country => {
        const match = country.toLowerCase() === countryGuess.toLowerCase();
        console.log(`Comparing "${country}" with "${countryGuess}": ${match}`);
        return match;
    });
    
    console.log('Final result - Is correct:', isCorrect);
    
    if (isCorrect) {
        // Correct guess - add to correctly guessed countries
        currentGame.correctlyGuessedCountries.push(countryGuess);
        console.log(`Correct guess: ${countryGuess}`);
        console.log('Updated correctly guessed countries:', currentGame.correctlyGuessedCountries);
        
        // Check if user has found all countries
        if (currentGame.correctlyGuessedCountries.length >= currentGame.totalCountriesForLanguage) {
            console.log('All countries found! Ending game with win.');
            endGame(true);
            return;
        }
    } else {
        // Incorrect guess - lose a strike
        console.log(`Before strike deduction - countryAttempts: ${currentGame.countryAttempts}`);
        currentGame.countryAttempts--;
        console.log(`After strike deduction - countryAttempts: ${currentGame.countryAttempts}`);
        console.log(`Incorrect guess: ${countryGuess}. Strikes remaining: ${currentGame.countryAttempts}`);
        
        // Check if out of strikes
        if (currentGame.countryAttempts <= 0) {
            console.log('Out of strikes! Ending game with loss.');
            endGame(false);
            return;
        }
    }
    
    // Clear the input
    countryInput.value = '';
    
    // Update UI
    updateUI();
    
    // Update the country UI elements
    updateCountryUI();
    
    // Save game state
    saveGameState();
}

// Update UI
function updateUI() {
    // Update guesses history
    updateGuessesHistory();
    
    // Clear inputs
    languageGuessEl.value = '';
}

// Update country UI elements (progress counter and strikes)
function updateCountryUI() {
    if (currentGame.currentPhase !== 'countries') return;
    
    console.log('Updating country UI...');
    console.log('Current countryAttempts:', currentGame.countryAttempts);
    console.log('Correctly guessed countries:', currentGame.correctlyGuessedCountries);
    console.log('Total countries for language:', currentGame.totalCountriesForLanguage);
    
    // Update progress counter
    const progressCounter = countryInputsEl.querySelector('.progress-counter');
    if (progressCounter) {
        progressCounter.textContent = `${currentGame.correctlyGuessedCountries.length}/${currentGame.totalCountriesForLanguage}`;
        console.log('Updated progress counter to:', progressCounter.textContent);
    }
    
    // Update strikes display
    const strikesDisplay = countryInputsEl.querySelector('.strikes-display-new');
    if (strikesDisplay) {
        const strikesUsed = 3 - currentGame.countryAttempts;
        console.log('Strikes used:', strikesUsed);
        const strikeElements = strikesDisplay.querySelectorAll('.strike-x');
        console.log('Found strike elements:', strikeElements.length);
        
        strikeElements.forEach((strike, index) => {
            strike.classList.remove('used', 'black');
            if (index < strikesUsed) {
                strike.classList.add('used');
                console.log(`Strike ${index + 1}: marked as used (red)`);
            } else {
                strike.classList.add('black');
                console.log(`Strike ${index + 1}: marked as black`);
            }
        });
    } else {
        console.log('Strikes display not found!');
    }
}

// Update guesses history with separate sections for language and country guesses
function updateGuessesHistory() {
    // Show all guesses for each
    const languageGuesses = currentGame.guesses.filter(g => g.countries.length === 0);
    const countryGuesses = currentGame.guesses.filter(g => g.countries.length > 0);
    languageGuessesHistoryEl.innerHTML = '';
    countryGuessesHistoryEl.innerHTML = '';

    // Fill up to 6 slots for language guesses
    for (let i = 0; i < 6; i++) {
        const guess = languageGuesses[i];
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        const guessResults = document.createElement('div');
        guessResults.className = 'guess-results';
        if (guess) {
            const languageResult = document.createElement('div');
            languageResult.className = 'result-item';
            languageResult.innerHTML = `
                <div class="result-value ${guess.results.languageCorrect ? 'correct' : 'incorrect'}">
                    ${guess.language}
                </div>
            `;
            guessResults.appendChild(languageResult);
        } else {
            // Empty slot
            const emptyResult = document.createElement('div');
            emptyResult.className = 'result-item';
            emptyResult.innerHTML = `<div class="result-value">&nbsp;</div>`;
            guessResults.appendChild(emptyResult);
        }
        guessItem.appendChild(guessResults);
        languageGuessesHistoryEl.appendChild(guessItem);
    }

    // For country guesses, show individual countries in a compact grid layout
    const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
    
    // Create a container for country guesses with grid layout
    const countryGuessesContainer = document.createElement('div');
    countryGuessesContainer.className = 'country-guesses-grid';
    
    countryGuesses.forEach(guess => {
        guess.countries.forEach(country => {
            const isCorrect = allCountriesForLanguage.includes(country);
            const countryResult = document.createElement('div');
            countryResult.className = 'country-guess-item';
            countryResult.innerHTML = `
                <div class="result-value ${isCorrect ? 'correct' : 'incorrect'}">
                    ${country}
                </div>
            `;
            countryGuessesContainer.appendChild(countryResult);
        });
    });
    
    countryGuessesHistoryEl.appendChild(countryGuessesContainer);
}

// End game
function endGame(won) {
    currentGame.gameOver = true;
    currentGame.gameWon = won;
    
    if (currentGame.currentPhase === 'countries') {
        console.log('Country phase ending, game won:', won);
        console.log('currentGame.countryShareButton exists:', !!currentGame.countryShareButton);
        
        // Trigger confetti for winning the country phase
        if (won) {
            triggerConfetti();
        }
        
        // Hide only the input elements, keep progress counter and strikes visible
        const countryInput = countryInputsEl.querySelector('.country-input-full');
        if (countryInput) {
            countryInput.style.display = 'none';
        }
        submitCountryGuessEl.style.display = 'none';
        
        // Hide the sentence about number of countries
        const countrySentence = countryInputsEl.querySelector('.country-sentence');
        if (countrySentence) {
            countrySentence.style.display = 'none';
        }
        
        // Country phase ended - show country result message
        countryResultMessageEl.style.display = 'block';
        
        if (won) {
            countryResultTextEl.textContent = 'Congratulations! You found all the countries!';
            countryResultTextEl.className = 'result-text success';
        } else {
            countryResultTextEl.textContent = `Well, that's one way to do it... You found ${currentGame.correctlyGuessedCountries.length} out of ${currentGame.totalCountriesForLanguage} countries. Maybe next time?`;
            countryResultTextEl.className = 'result-text failure';
        }
        
        // Show all countries that speak this language
        allCountriesInfoEl.style.display = 'block';
        
        // Update the title with the actual language name
        allCountriesTitleEl.textContent = `Every country that speak ${currentGame.correctLanguage}:`;
        
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.countries) {
            allCountriesListEl.innerHTML = '';
            languageData.countries.forEach(country => {
                const countrySpan = document.createElement('span');
                const flag = getCountryFlag(country);
                countrySpan.innerHTML = `${flag} ${country}`;
                allCountriesListEl.appendChild(countrySpan);
            });
        }
        
        // Disable country inputs
        submitCountryGuessEl.disabled = true;
        const countryInputs = countryInputsEl.querySelectorAll('input[type="text"]');
        countryInputs.forEach(input => input.disabled = true);
        
        // Hide guess history when country phase ends
        countryGuessesHistoryEl.style.display = 'none';
        
        // Hide map hint when country phase ends
        if (currentGame.countryMapHintDisplay) {
            currentGame.countryMapHintDisplay.style.display = 'none';
            currentGame.countryMapHintDisplay.classList.remove('show');
        }
        
        // Hide map hint button when country phase ends
        if (currentGame.countryMapHintBtn) {
            currentGame.countryMapHintBtn.style.display = 'none';
        }
        
        // Update the progress counter one final time to ensure correct display
        const progressCounter = countryInputsEl.querySelector('.progress-counter');
        if (progressCounter) {
            progressCounter.textContent = `${currentGame.correctlyGuessedCountries.length}/${currentGame.totalCountriesForLanguage}`;
            console.log('Final progress counter update:', progressCounter.textContent);
        }
        
        // Update strikes display one final time to show all 3 strikes if used
        const strikesDisplay = countryInputsEl.querySelector('.strikes-display-new');
        if (strikesDisplay) {
            const strikesUsed = 3 - currentGame.countryAttempts;
            console.log('Final strikes update - strikes used:', strikesUsed);
            const strikeElements = strikesDisplay.querySelectorAll('.strike-x');
            
            strikeElements.forEach((strike, index) => {
                strike.classList.remove('used', 'black');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                    console.log(`Final strike ${index + 1}: marked as used (red)`);
                } else {
                    strike.classList.add('black');
                    console.log(`Final strike ${index + 1}: marked as black`);
                }
            });
        }
        
        // Show dynamically created share button
        if (currentGame.countryShareButton) {
            console.log('Showing country share button');
            const container = currentGame.countryShareButton.parentElement;
            container.style.setProperty('display', 'flex', 'important');
            console.log('Share button container display style set to:', container.style.display);
            console.log('Share button container computed display:', window.getComputedStyle(container).display);
        } else {
            console.log('Country share button not found in endGame');
        }
        
        // Update UI to show final guess history
        updateUI();
    }
    
    // Mark that user has played today (for daily mode)
    if (!dev_mode) {
        markLanguageAsUsed(currentGame.correctLanguage);
    }
    
    // Save game state
    saveGameState();
}

// Reset game
function resetGame() {
    currentGame = {
        attempts: 6,
        languageAttempts: 6,
        countryAttempts: 3, // New: 3 strikes for country guessing
        guesses: [],
        dailySentence: "",
        correctLanguage: "",
        correctCountries: [],
        gameOver: false,
        gameWon: false,
        currentPhase: 'language',
        currentLanguageGuess: null,
        languageGuessed: false,
        isNewGame: true, // Flag to indicate if it's a new game or a loaded daily game
        hintRevealed: false, // Reset hint state
        regionsHintRevealed: false, // Reset regions hint state
        mapHintRevealed: false, // Reset map hint state
        correctlyGuessedCountries: [], // Reset correctly guessed countries
        correctCountryPositions: {}, // Reset correct country positions
        totalCountriesForLanguage: 0 // New: total number of countries that speak the language
    };
    
    // Clear UI
    languageGuessesHistoryEl.innerHTML = '';
    countryGuessesHistoryEl.innerHTML = '';
    countryResultMessageEl.style.display = 'none';
    allCountriesInfoEl.style.display = 'none';
    allCountriesTitleEl.textContent = 'All countries that speak this language:';
    submitLanguageGuessEl.disabled = false;
    submitCountryGuessEl.disabled = false;
    hintBtnEl.disabled = false; // Re-enable hint button
    hintBtn2El.disabled = false; // Re-enable regions hint button
    if (mapHintBtnEl) mapHintBtnEl.disabled = false; // Re-enable map hint button
    
    // Reset hint state
    hintDisplayEl.classList.remove('show');
    hintDisplayEl.textContent = '';
    hintDisplay2El.classList.remove('show');
    hintDisplay2El.textContent = '';
    if (mapHintDisplayEl) {
        mapHintDisplayEl.classList.remove('show');
        mapHintDisplayEl.textContent = '';
    }
    
            // Reset translation placeholder
        if (translationDisplayEl) {
            translationDisplayEl.textContent = 'Translating...';
            translationDisplayEl.classList.add('placeholder');
        }
    
    // Reset phases
    languagePhaseEl.style.display = 'block';
    countryPhaseEl.style.display = 'none';
    countryShareSectionEl.style.display = 'none';
    
    // Reset country share button
    if (currentGame.countryShareButton) {
        currentGame.countryShareButton.parentElement.style.display = 'none';
    }
    
    // Reset language input section
    languageInputRowEl.style.display = 'grid';
    languageResultMessageEl.style.display = 'none';
    playNextSectionEl.style.display = 'none';
    
    // Hide streak display

    
    // Reset guess prompt
    guessPromptEl.textContent = 'Guess the language';
    guessPromptEl.style.color = '#87CEEB'; // Sky blue color to match CSS default
    
    // Re-enable language input and show hint buttons
    languageGuessEl.disabled = false;
    hintBtnEl.style.display = 'block';
    hintBtn2El.style.display = 'block';
    
    // Reinitialize with new language (daily or random based on dev_mode)
    initGame().catch(error => {
        console.error('Error reinitializing game:', error);
    });
}

// Save game state to localStorage
function saveGameState() {
    console.log('Saving game state...');
    const gameState = {
        ...currentGame,
        date: getCurrentDateString()
    };
    localStorage.setItem('langlioGameState', JSON.stringify(gameState));
    console.log('Game state saved successfully');
}



// Load game state from localStorage
function loadGameState() {
    console.log('loadGameState called');
    const savedState = localStorage.getItem('langlioGameState');
    console.log('Saved state found:', !!savedState);
    if (savedState) {
        const gameState = JSON.parse(savedState);
        const currentDate = getCurrentDateString();
        
        // Only load if it's from today (or if in dev mode, allow loading)
        if (dev_mode || gameState.date === currentDate) {
            console.log('Loading game state for date:', gameState.date);
            currentGame = gameState;
            currentGame.isNewGame = false; // Mark as loaded game, not new game
            
            // Ensure correctlyGuessedCountries exists (for backward compatibility)
            if (!currentGame.correctlyGuessedCountries) {
                currentGame.correctlyGuessedCountries = [];
            }
            
            // Ensure correctCountryPositions exists (for backward compatibility)
            if (!currentGame.correctCountryPositions) {
                currentGame.correctCountryPositions = {};
            }
            
                    // Ensure mapHintRevealed exists (for backward compatibility)
        if (currentGame.mapHintRevealed === undefined) {
            currentGame.mapHintRevealed = false;
        }
        
        // Ensure regionsHintRevealed exists (for backward compatibility)
        if (currentGame.regionsHintRevealed === undefined) {
            currentGame.regionsHintRevealed = false;
        }
            
            // Ensure countryAttempts exists (for backward compatibility)
            if (!currentGame.countryAttempts) {
                currentGame.countryAttempts = 3;
            }
            
            // Ensure totalCountriesForLanguage exists (for backward compatibility)
            if (!currentGame.totalCountriesForLanguage) {
                const languageData = gameData[currentGame.correctLanguage];
                currentGame.totalCountriesForLanguage = languageData ? languageData.countries.length : 0;
            }
            
            // Debug: Log the saved state for country positions
            console.log('Loading saved game state - correctlyGuessedCountries:', currentGame.correctlyGuessedCountries);
            console.log('Loading saved game state - correctCountryPositions:', currentGame.correctCountryPositions);
            
            // Populate dropdowns for the loaded game
            populateDropdowns();
            
            // Display the sentence for the loaded game
            if (currentGame.dailySentence) {
                dailySentenceEl.textContent = currentGame.dailySentence;
                dailySentenceEl.style.display = 'block';
            }
            
            // Set translation placeholder if translation hasn't been revealed yet
            if (!currentGame.translationRevealed) {
                translationDisplayEl.textContent = 'Translating...';
                translationDisplayEl.classList.add('placeholder');
                translationDisplayEl.style.display = 'block';
            }
            
            updateUI();
            
            // Restore hint state
            if (currentGame.hintRevealed) {
                updateHintDisplay('text');
            } else {
                hintDisplayEl.classList.remove('show');
                hintDisplayEl.style.display = 'none';
            }
            
            if (currentGame.regionsHintRevealed) {
                updateHintDisplay('regions');
            } else {
                hintDisplay2El.classList.remove('show');
                hintDisplay2El.style.display = 'none';
            }
            
            // Restore phase state
            if (currentGame.currentPhase === 'countries' && currentGame.currentLanguageGuess) {
                languagePhaseEl.style.display = 'none';
                countryPhaseEl.style.display = 'block';
                
                // Show back button when in country phase
                if (gameBackButtonEl) {
                    gameBackButtonEl.style.display = 'block';
                    console.log('Back button shown in loadGameState');
                } else {
                    console.error('gameBackButtonEl is null in loadGameState');
                }
                
                // Hide forward button when in country phase
                if (gameForwardButtonEl) {
                    gameForwardButtonEl.style.display = 'none';
                } else {
                    console.error('gameForwardButtonEl is null in loadGameState');
                }
                
                // Update the guess prompt for country phase
                guessPromptEl.innerHTML = `Guess what countries speak <span style="color: #D2B48C;">${currentGame.correctLanguage}</span>`;
                guessPromptEl.style.color = '00beed'; // Light blue color for the main text
                
                // Hide hint buttons in country phase
                hintBtnEl.style.display = 'none';
                hintBtn2El.style.display = 'none';
                
                // Hide hint displays in country phase
                hintDisplayEl.style.display = 'none';
                hintDisplay2El.style.display = 'none';
                
                // Show map hint if it was revealed (will be handled by generateCountryInputs)
                // The map hint button is now created dynamically in the country phase
                
                // Hide sentence and translation during country guessing round
                dailySentenceEl.style.display = 'none';
                translationDisplayEl.style.display = 'none';
                
                // Show language result in the country phase
                const isCorrect = currentGame.currentLanguageGuess === currentGame.currentLanguageGuess;
                // Note: The language result is already shown in the language phase, 
                // so we don't need to recreate it here in the country phase
            } else if (currentGame.languageGuessed || currentGame.languageAttempts <= 0) {
                // Language phase is complete but user hasn't moved to country phase yet
                // Hide input section
                languageInputRowEl.style.display = 'none';
                
                // Hide hint buttons
                hintBtnEl.style.display = 'none';
                hintBtn2El.style.display = 'none';
                
                // Hide hint displays
                hintDisplayEl.style.display = 'none';
                hintDisplay2El.style.display = 'none';
                
                // Show success/failure message
                languageResultMessageEl.style.display = 'block';
                if (currentGame.languageGuessed) {
                    languageResultTextEl.textContent = 'You guessed the language!';
                    languageResultTextEl.className = 'result-text success';
                } else {
                    languageResultTextEl.textContent = `The language is ${currentGame.correctLanguage}, better luck next time!`;
                    languageResultTextEl.className = 'result-text failure';
                }
                
                // Show correct language and translation
                if (detectedLanguageLabelEl) {
                    detectedLanguageLabelEl.textContent = currentGame.correctLanguage;
                }
                const languageData = gameData[currentGame.correctLanguage];
                if (languageData && languageData.translation) {
                    translationDisplayEl.textContent = languageData.translation;
                    translationDisplayEl.classList.remove('placeholder');
                    translationDisplayEl.style.display = 'block';
                }
                
                // Show "Play Next" button and share button
                playNextSectionEl.style.display = 'flex';
                
                // Show forward button when language phase is complete
                if (gameForwardButtonEl) {
                    gameForwardButtonEl.style.display = 'block';
                } else {
                    console.error('gameForwardButtonEl is null in loadGameState (language phase)');
                }
                
                // Show share button for language phase if it exists
                if (shareBtnLanguageEl) {
                    shareBtnLanguageEl.style.display = 'inline-block';
                }
                
                // Show streak display when language phase is complete
                updateStreakDisplay();
            }
            
            if (currentGame.gameOver) {
                // Game is over - restore the completed state without calling endGame()
                restoreCompletedGameState();
            } else if (currentGame.currentPhase === 'countries') {
                // If we're in country phase but game isn't over, regenerate country inputs
                generateCountryInputs(currentGame.correctLanguage);
            }
            
            // Initialize confetti for loaded game
            if (confettiCanvasEl && !confetti) {
                confetti = new Confetti(confettiCanvasEl);
            }
            
            // Ensure hint buttons are properly styled after all data is loaded
            if (currentGame.hintRevealed) {
                // Make the hint button red and disabled
                if (hintBtnEl) {
                    hintBtnEl.disabled = true;
                    hintBtnEl.classList.add('active');
                }
                
                // Retry text hint restoration if needed
                setTimeout(() => {
                    if (currentGame.hintRevealed && hintDisplayEl.style.display !== 'flex') {
                        console.log('Retrying text hint restoration...');
                        updateHintDisplay('text');
                    }
                }, 200);
            }
            
            if (currentGame.mapHintRevealed) {
                // Make the map hint button red and disabled
                if (hintBtn2El) {
                    hintBtn2El.disabled = true;
                    hintBtn2El.classList.add('active');
                }
                
                // Retry map hint restoration if needed
                setTimeout(() => {
                    if (currentGame.mapHintRevealed && hintDisplay2El.style.display !== 'flex') {
                        console.log('Retrying map hint restoration...');
                        updateHintDisplay('map');
                    }
                }, 200);
            } else {
                // Ensure map hint is hidden if not revealed
                if (hintDisplay2El) {
                    hintDisplay2El.style.display = 'none';
                    hintDisplay2El.classList.remove('show');
                }
            }
            
            // Update country UI if in country phase
            if (currentGame.currentPhase === 'countries') {
                // Ensure the entire sentence-display container is hidden in country phase
                if (sentenceDisplayEl) {
                    sentenceDisplayEl.style.display = 'none';
                }
                
                setTimeout(() => {
                    updateCountryUI();
                }, 100);
            }
        } else {
            console.log('Game state date mismatch or dev mode issue');
            console.log('Game state date:', gameState.date);
            console.log('Current date:', currentDate);
            console.log('Dev mode:', dev_mode);
            // User has already played today but no saved state (edge case)
            showAlreadyPlayedMessage();
        }
    } else {
        // No saved state - this means we should start a fresh game
        // The hasPlayedToday() check is handled in initGame() before calling loadGameState()
        console.log('No saved game state found, starting fresh game');
        console.log('This should return to initGame() to start a new game');
    }
}

// Close instructions popup
function closeInstructions() {
    if (instructionsPopupEl) {
        instructionsPopupEl.style.display = 'none';
    }
    
    // Save that user has seen instructions
    if (dev_mode) {
        // Dev mode: save that user has seen instructions (forever)
        localStorage.setItem('langlioInstructionsSeen', 'true');
    } else {
        // Daily mode: save that user has seen instructions for today
        const currentDate = getCurrentDateString();
        localStorage.setItem(`langlioInstructionsSeen_${currentDate}`, 'true');
    }
}

// Show instructions popup
function showInstructions() {
    instructionsPopupEl.style.display = 'flex';
}

// Restore completed game state without triggering endGame logic
function restoreCompletedGameState() {
    console.log('Restoring completed game state...');
    
    if (currentGame.currentPhase === 'countries') {
        // Restore country phase completion state
        const countryInput = countryInputsEl.querySelector('.country-input-full');
        if (countryInput) {
            countryInput.style.display = 'none';
        }
        submitCountryGuessEl.style.display = 'none';
        
        // Hide the sentence about number of countries
        const countrySentence = countryInputsEl.querySelector('.country-sentence');
        if (countrySentence) {
            countrySentence.style.display = 'none';
        }
        
        // Show country result message
        countryResultMessageEl.style.display = 'block';
        
        if (currentGame.gameWon) {
            countryResultTextEl.textContent = 'Congratulations! You found all the countries!';
            countryResultTextEl.className = 'result-text success';
        } else {
            countryResultTextEl.textContent = `Well, that's one way to do it... You found ${currentGame.correctlyGuessedCountries.length} out of ${currentGame.totalCountriesForLanguage} countries. Maybe next time?`;
            countryResultTextEl.className = 'result-text failure';
        }
        
        // Show all countries that speak this language
        allCountriesInfoEl.style.display = 'block';
        
        // Update the title with the actual language name
        allCountriesTitleEl.textContent = `Every country that speak ${currentGame.correctLanguage}:`;
        
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.countries) {
            allCountriesListEl.innerHTML = '';
            languageData.countries.forEach(country => {
                const countrySpan = document.createElement('span');
                const flag = getCountryFlag(country);
                countrySpan.innerHTML = `${flag} ${country}`;
                allCountriesListEl.appendChild(countrySpan);
            });
        }
        
        // Show dynamically created share button
        if (currentGame.countryShareButton) {
            currentGame.countryShareButton.parentElement.style.display = 'flex';
        }
        
        // Update the progress counter to show final state
        const progressCounter = countryInputsEl.querySelector('.progress-counter');
        if (progressCounter) {
            progressCounter.textContent = `${currentGame.correctlyGuessedCountries.length}/${currentGame.totalCountriesForLanguage}`;
        }
        
        // Update strikes display to show final state
        const strikesDisplay = countryInputsEl.querySelector('.strikes-display-new');
        if (strikesDisplay) {
            const strikesUsed = 3 - currentGame.countryAttempts;
            const strikeElements = strikesDisplay.querySelectorAll('.strike-x');
            
            strikeElements.forEach((strike, index) => {
                strike.classList.remove('used', 'black');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                } else {
                    strike.classList.add('black');
                }
            });
        }
    }
    
    // Update UI to show final state
    updateUI();
}

// Mark all country inputs as correct/incorrect when game ends
function markCountryInputsAsFinal() {
    const countryInputs = countryInputsEl.querySelectorAll('input[type="text"]');
    
    // Get all countries that speak this language
    const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
    
    countryInputs.forEach((input, index) => {
        const countryValue = input.value;
        const isCorrect = allCountriesForLanguage.includes(countryValue);
        
        // Disable the input
        input.disabled = true;
        
        // Add visual styling based on correctness
        if (isCorrect) {
            input.classList.add('correct-final');
            input.classList.remove('incorrect-final');
        } else {
            input.classList.add('incorrect-final');
            input.classList.remove('correct-final');
        }
        
        // If input is empty, show it as incorrect
        if (!countryValue) {
            input.classList.add('incorrect-final');
            input.classList.remove('correct-final');
        }
    });
    
    // Don't show the correct countries display
}

// Start country phase
function startCountryPhase() {
    console.log('Starting country phase...');
    console.log('Current game state:', currentGame);
    
    // Check if country phase is already completed
    const isCountryPhaseCompleted = currentGame.gameOver || 
                                   currentGame.countryAttempts <= 0 || 
                                   (currentGame.correctlyGuessedCountries && 
                                    currentGame.correctlyGuessedCountries.length >= currentGame.totalCountriesForLanguage);
    
    if (!isCountryPhaseCompleted) {
        // Generate country inputs based on the correct language
        generateCountryInputs(currentGame.correctLanguage);
    }
    
    // Update the guess prompt for country phase
    guessPromptEl.innerHTML = `Guess what countries speak <span style="color: #D2B48C;">${currentGame.correctLanguage}</span>`;
    guessPromptEl.style.color = '00beed'; // Light blue color for the main text
    
    // Switch to country phase
    currentGame.currentPhase = 'countries';
    
    // Ensure countryAttempts is properly initialized
    if (!currentGame.countryAttempts) {
        currentGame.countryAttempts = 3;
    }
    
    languagePhaseEl.style.display = 'none';
    countryPhaseEl.style.display = 'block';
    
    // Show back button for country phase
    gameBackButtonEl.style.display = 'block';
    
    // Hide forward button when entering country phase
    gameForwardButtonEl.style.display = 'none';
    
            // Hide hint buttons and displays in country phase
        hintBtnEl.style.display = 'none';
        hintBtn2El.style.display = 'none';
        hintDisplayEl.style.display = 'none';
        hintDisplay2El.style.display = 'none';
        
        // Show map hint button in country phase
        if (mapHintBtnEl) mapHintBtnEl.style.display = 'block';
    
    // Hide "Play Next" button
    playNextSectionEl.style.display = 'none';
    
    // Hide the old share section when starting country phase
    countryShareSectionEl.style.display = 'none';
    
    // Hide the entire sentence-display container during country guessing round
    if (sentenceDisplayEl) {
        sentenceDisplayEl.style.display = 'none';
    }
    
    // If country phase is completed, hide inputs and show results
    if (isCountryPhaseCompleted) {
        // Hide input elements
        const countryInputs = countryInputsEl.querySelector('.country-input-full');
        if (countryInputs) {
            countryInputs.style.display = 'none';
        }
        submitCountryGuessEl.style.display = 'none';
        
        // Hide the sentence about number of countries
        const countrySentence = countryInputsEl.querySelector('.country-sentence');
        if (countrySentence) {
            countrySentence.style.display = 'none';
        }
        
        // Show country result message
        countryResultMessageEl.style.display = 'block';
        
        if (currentGame.gameWon) {
            countryResultTextEl.textContent = 'Congratulations! You found all the countries!';
            countryResultTextEl.className = 'result-text success';
        } else {
            countryResultTextEl.textContent = `Well, that's one way to do it... You found ${currentGame.correctlyGuessedCountries.length} out of ${currentGame.totalCountriesForLanguage} countries. Maybe next time?`;
            countryResultTextEl.className = 'result-text failure';
        }
        
        // Show all countries that speak this language
        allCountriesInfoEl.style.display = 'block';
        
        // Update the title with the actual language name
        allCountriesTitleEl.textContent = `Every country that speak ${currentGame.correctLanguage}:`;
        
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.countries) {
            allCountriesListEl.innerHTML = '';
            languageData.countries.forEach(country => {
                const countrySpan = document.createElement('span');
                const flag = getCountryFlag(country);
                countrySpan.innerHTML = `${flag} ${country}`;
                allCountriesListEl.appendChild(countrySpan);
            });
        }
        
        // Show dynamically created share button
        if (currentGame.countryShareButton) {
            currentGame.countryShareButton.parentElement.style.display = 'flex';
        }
        
        // Update the progress counter to show final state
        const progressCounter = countryInputsEl.querySelector('.progress-counter');
        if (progressCounter) {
            progressCounter.textContent = `${currentGame.correctlyGuessedCountries.length}/${currentGame.totalCountriesForLanguage}`;
        }
        
        // Update strikes display to show final state
        const strikesDisplay = countryInputsEl.querySelector('.strikes-display-new');
        if (strikesDisplay) {
            const strikesUsed = 3 - currentGame.countryAttempts;
            const strikeElements = strikesDisplay.querySelectorAll('.strike-x');
            
            strikeElements.forEach((strike, index) => {
                strike.classList.remove('used', 'black');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                } else {
                    strike.classList.add('black');
                }
            });
        }
    }
    
    // Update UI to ensure everything is properly displayed
    updateUI();
    
    // Save game state
    saveGameState();
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go back to language phase
function goBackToLanguagePhase() {
    console.log('Going back to language phase...');
    
    // Switch back to language phase
    currentGame.currentPhase = 'language';
    
    // Show language phase, hide country phase
    languagePhaseEl.style.display = 'block';
    countryPhaseEl.style.display = 'none';
    
    // Hide back button when returning to language phase
    gameBackButtonEl.style.display = 'none';
    
    // Show forward button if language phase is complete
    if (currentGame.languageGuessed || currentGame.languageAttempts <= 0) {
        gameForwardButtonEl.style.display = 'block';
    } else {
        gameForwardButtonEl.style.display = 'none';
    }
    
    // Show the entire sentence-display container during language guessing round
    if (sentenceDisplayEl) {
        sentenceDisplayEl.style.display = 'block';
    }
    
    // Hide country share button when returning to language phase
    if (currentGame.countryShareButton) {
        currentGame.countryShareButton.parentElement.style.display = 'none';
    }
    
    // Show "Play Next" button and correct language info if language phase is complete
    if (currentGame.languageGuessed || currentGame.languageAttempts <= 0) {
        // Hide input section when language phase is complete
        languageInputRowEl.style.display = 'none';
        
        // Hide hint buttons and displays when language phase is complete
        hintBtnEl.style.display = 'none';
        hintBtn2El.style.display = 'none';
        hintDisplayEl.style.display = 'none';
        hintDisplay2El.style.display = 'none';
        
        // Hide map hint button when returning to language phase
        if (mapHintBtnEl) mapHintBtnEl.style.display = 'none';
        
        // Show language result message
        languageResultMessageEl.style.display = 'block';
        if (currentGame.languageGuessed) {
            languageResultTextEl.textContent = 'You guessed the language!';
            languageResultTextEl.className = 'result-text success';
        } else {
            languageResultTextEl.textContent = `The language is ${currentGame.correctLanguage}, better luck next time!`;
            languageResultTextEl.className = 'result-text failure';
        }
        
        // Show streak display
        updateStreakDisplay();
        
        // Show correct language and translation
        if (detectedLanguageLabelEl) {
            detectedLanguageLabelEl.textContent = currentGame.correctLanguage;
        }
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.translation) {
            translationDisplayEl.textContent = languageData.translation;
            translationDisplayEl.classList.remove('placeholder');
            translationDisplayEl.style.display = 'block';
        }
        
        // Show "Play Next" button and share button
        playNextSectionEl.style.display = 'flex';
        
        // Show share button for language phase if it exists
        if (shareBtnLanguageEl) {
            shareBtnLanguageEl.style.display = 'inline-block';
        }
    } else {
        // Language phase is not complete - show input and hint elements
        languageInputRowEl.style.display = 'block';
        hintBtnEl.style.display = 'block';
        hintBtn2El.style.display = 'block';
        if (currentGame.hintRevealed) {
            hintDisplayEl.style.display = 'flex';
            // Make the hint button red and disabled
            if (hintBtnEl) {
                hintBtnEl.disabled = true;
                hintBtnEl.classList.add('active');
            }
        }
        if (currentGame.regionsHintRevealed) {
            hintDisplay2El.style.display = 'flex';
            // Make the regions hint button red and disabled
            if (hintBtn2El) {
                hintBtn2El.disabled = true;
                hintBtn2El.classList.add('active');
            }
        }
        
        // Hide result elements when language phase is not complete
        languageResultMessageEl.style.display = 'none';
        playNextSectionEl.style.display = 'none';
        if (shareBtnLanguageEl) {
            shareBtnLanguageEl.style.display = 'none';
        }
        
        // Hide streak display when language phase is not complete
        
    }
    
    // Update the guess prompt back to language guessing
    guessPromptEl.innerHTML = 'Guess the language';
    guessPromptEl.style.color = '#87CEEB'; // Sky blue color to match CSS default
    
    // Save game state
    saveGameState();
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Confetti animation
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];
        this.isActive = false;
    }

    start() {
        this.isActive = true;
        this.canvas.style.display = 'block';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create particles shooting from the center of the screen
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: centerX + (Math.random() - 0.5) * 20, // Small spread around center
                y: centerY + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 12, // Spread out horizontally
                vy: (Math.random() - 0.5) * 12, // Spread out vertically
                size: Math.random() * 8 + 4,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8
            });
        }
        
        this.animate();
    }

    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Add gravity (slowing down upward movement)
            particle.vy += 0.3;
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            this.ctx.restore();
            
            // Remove particles that are off screen (above or below)
            if (particle.y < -20 || particle.y > this.canvas.height + 20) {
                this.particles.splice(i, 1);
            }
        }
        
        // Stop animation when all particles are gone
        if (this.particles.length === 0) {
            this.stop();
            return;
        }
        
        requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.isActive = false;
        this.canvas.style.display = 'none';
    }
}

// Confetti instance - will be initialized after DOM loads
let confetti;

// Trigger confetti function
function triggerConfetti() {
    if (confetti) {
        confetti.start();
    }
}

// Show popup message
function showPopup(message, duration = 2000) {
    // Create popup element
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: popupFadeIn 0.3s ease-out;
        text-align: center;
        max-width: 90vw;
        word-wrap: break-word;
    `;
    popup.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupFadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(popup);
    
    // Remove after duration
    setTimeout(() => {
        popup.style.animation = 'popupFadeOut 0.3s ease-in';
        style.textContent += `
            @keyframes popupFadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        setTimeout(() => {
            document.body.removeChild(popup);
            document.head.removeChild(style);
        }, 300);
    }, duration);
}

// Share result function
function shareResult(event) {
    // Get language guessing performance
    const languageGuesses = currentGame.guesses.filter(g => g.countries.length === 0);
    const languageAttemptsUsed = 6 - currentGame.languageAttempts;
    const languageCorrect = currentGame.languageGuessed;
    
    let shareText;

    const dayNumber = getDayNumber();
    const streakText = getStreakDisplay();
    
    if (languageCorrect) {
        shareText = `LANGLIO #${dayNumber} \nStreak:  🔥 ${streakText} \n🎯 Got today’s language in ${languageAttemptsUsed} tries. Bet you can't beat me.\n\nPlay here: https://play.langlio.io/share`
    } else {
        shareText = `LANGLIO #${dayNumber} \nStreak:  🔥 ${streakText} \n🌍 Today’s Langlio destroyed me. 💀 Think you can do better?\n\nPlay here: https://play.langlio.io/share`;
    }


    // If sharing to clipboard, keep the plain text (as above).
    // If you want to show a clickable link in a popup or UI, use linkHtml for the link.
    
    // Try to copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareText).then(() => {
            // Show popup instead of changing button
            showPopup('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(shareText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(shareText);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showPopup('Copied to clipboard!');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showPopup('Failed to copy to clipboard. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}

// Map functionality
function initializeMap() {
    console.log('initializeMap called');
    
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        showMapFallback();
        return;
    }
    console.log('Leaflet is available');
    
    if (map) {
        console.log('Removing existing map');
        map.remove();
    }
    
    // Find the map container
    const mapContainer = document.querySelector('.map-hint-container');
    console.log('Map container found:', mapContainer);
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    try {
        // Create map div
        const mapDiv = document.createElement('div');
        mapDiv.id = 'map';
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        console.log('Created map div:', mapDiv);
        
        // Clear existing content and add map div
        mapContainer.innerHTML = '';
        mapContainer.appendChild(mapDiv);
        console.log('Added map div to container');
        
        // Initialize the map
        console.log('Initializing Leaflet map...');
        map = L.map('map').setView([20, 0], 2);
        console.log('Map created:', map);
        
        // Add a dark tile layer without labels
        console.log('Adding tile layer...');
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '©OpenStreetMap, ©CartoDB',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        console.log('Tile layer added');
        
        // Remove zoom controls
        if (map.zoomControl) {
            map.zoomControl.remove();
        }
        
        // Disable dragging and zooming with error handling
        if (map.dragging) map.dragging.disable();
        if (map.touchZoom) map.touchZoom.disable();
        if (map.doubleClickZoom) map.doubleClickZoom.disable();
        if (map.scrollWheelZoom) map.scrollWheelZoom.disable();
        if (map.boxZoom) map.boxZoom.disable();
        if (map.keyboard) map.keyboard.disable();
        if (map.tap) map.tap.disable();
        
        console.log('Map initialization completed successfully');
        
    } catch (error) {
        console.error('Error initializing map:', error);
        showMapFallback();
    }
}

function showMapFallback() {
    const mapContainer = document.querySelector('.map-hint-container');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ffffff; font-size: 1.1rem; text-align: center; padding: 1rem;">
                <div>
                    <p>🌍 Map hint unavailable</p>
                    <p style="font-size: 0.9rem; color: #a0a0a0; margin-top: 0.5rem;">Try guessing the language based on the sentence!</p>
                </div>
            </div>
        `;
    }
}

function loadWorldGeoJSON() {
    return fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading world GeoJSON:', error);
            // Fallback: show a simple text hint
            const mapContainer = document.querySelector('.map-hint-container');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ffffff; font-size: 1.1rem; text-align: center; padding: 1rem;">
                        <div>
                            <p>🌍 Map hint unavailable</p>
                            <p style="font-size: 0.9rem; color: #a0a0a0; margin-top: 0.5rem;">Try guessing the language based on the sentence!</p>
                        </div>
                    </div>
                `;
            }
            return null;
        });
}

function highlightCountriesForLanguage(language) {
    if (!map || !gameData[language]) {
        return;
    }
    
    // Clear previous highlights
    highlightedCountries.forEach(layer => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });
    highlightedCountries = [];
    
    const countriesToHighlight = gameData[language].countries;
    
    loadWorldGeoJSON().then(worldData => {
        if (!worldData) return;
        
        // Create a group to hold all highlighted countries
        const highlightedGroup = L.featureGroup();
        
        worldData.features.forEach(feature => {
            const countryName = feature.properties.name;
            
            // Check if this country speaks the target language
            if (countriesToHighlight.includes(countryName)) {
                const layer = L.geoJSON(feature, {
                    style: {
                        fillColor: '#22c55e',
                        weight: 2,
                        opacity: 1,
                        color: '#ffffff',
                        fillOpacity: 0.7
                    },
                    onEachFeature: function(feature, layer) {
                        // Disable tooltips and popups to hide country names
                        layer.bindTooltip('', { permanent: false });
                        layer.bindPopup('', { closeButton: false });
                    }
                });
                
                highlightedCountries.push(layer);
                highlightedGroup.addLayer(layer);
            }
        });
        
        // Add the group to the map
        highlightedGroup.addTo(map);
        
        // Fit the map to show all highlighted countries with some padding
        if (highlightedCountries.length > 0) {
            map.fitBounds(highlightedGroup.getBounds(), {
                padding: [20, 20], // Add 20px padding on all sides
                maxZoom: 6 // Limit zoom to prevent too much detail
            });
        }
    });
}

// Initialize day counter
function initializeDayCounter() {
    // Fixed launch date for everyone: August 3, 2025
    const fixedLaunchDate = '2025-08-03';
    console.log('Game launch date (fixed):', fixedLaunchDate);
}

// Get the current day number since launch
function getDayNumber() {
    // Fixed launch date for everyone: August 3, 2025
    const launchDate = '2025-08-03';
    const today = new Date();
    
    // Reset time to midnight for accurate day calculation
    const launch = new Date(launchDate);
    launch.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = today.getTime() - launch.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Return at least day 1
    return Math.max(1, dayDiff);
}

// Streak management functions
function loadStreakData() {
    const savedStreakData = localStorage.getItem('langlioStreakData');
    if (savedStreakData) {
        streakData = JSON.parse(savedStreakData);
    }
    console.log('Loaded streak data:', streakData);
}

function saveStreakData() {
    localStorage.setItem('langlioStreakData', JSON.stringify(streakData));
    console.log('Saved streak data:', streakData);
}

function checkForStreakBreak() {
    const today = getCurrentDateString();
    
    // If user has never played before, no streak to break
    if (!streakData.lastWonDate) {
        return;
    }
    
    const lastWon = new Date(streakData.lastWonDate);
    const todayDate = new Date(today);
    
    // Reset time to midnight for accurate day calculation
    lastWon.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);
    
    const timeDiff = todayDate.getTime() - lastWon.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // If more than 1 day has passed since last win, break the streak
    if (dayDiff > 1) {
        console.log(`Streak broken: ${dayDiff} days since last win, resetting streak to 0`);
        streakData.currentStreak = 0;
        saveStreakData();
    }
}

function updateStreak(won) {
    const today = getCurrentDateString();
    
    // Check if user has already played today
    if (streakData.lastPlayedDate === today) {
        console.log('User already played today, streak not updated');
        return;
    }
    
    // Mark that user played today
    streakData.lastPlayedDate = today;
    
    if (won) {
        // Check if this is consecutive day win
        if (streakData.lastWonDate) {
            const lastWon = new Date(streakData.lastWonDate);
            const todayDate = new Date(today);
            
            // Reset time to midnight for accurate day calculation
            lastWon.setHours(0, 0, 0, 0);
            todayDate.setHours(0, 0, 0, 0);
            
            const timeDiff = todayDate.getTime() - lastWon.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (dayDiff === 1) {
                // Consecutive day win - increment streak
                streakData.currentStreak++;
                console.log('Consecutive day win! Current streak:', streakData.currentStreak);
            } else {
                // Non-consecutive day win - reset streak to 1
                streakData.currentStreak = 1;
                console.log('Non-consecutive day win. Streak reset to 1');
            }
        } else {
            // First win ever - start streak at 1
            streakData.currentStreak = 1;
            console.log('First win! Starting streak at 1');
        }
        
        // Update best streak if current streak is higher
        if (streakData.currentStreak > streakData.bestStreak) {
            streakData.bestStreak = streakData.currentStreak;
            console.log('New best streak:', streakData.bestStreak);
        }
        
        // Update last won date
        streakData.lastWonDate = today;
    } else {
        // Loss - reset streak to 0
        streakData.currentStreak = 0;
        console.log('Loss - streak reset to 0');
    }
    
    saveStreakData();
    
    // Update the streak display
    updateStreakDisplay();
}

function getStreakDisplay() {
    return streakData.currentStreak.toString();
}

function updateStreakFlameState() {
    if (!streakFlameEl || !streakNumberEl) {
        console.log('Streak elements not found, skipping flame state update');
        return;
    }
    
    const currentDate = getCurrentDateString();
    
    // Check if user has completed today's language guessing round
    const todayCompleted = localStorage.getItem(`langlioCompleted_${currentDate}`);
    
    console.log('Updating flame state:', { currentDate, todayCompleted });
    
    if (todayCompleted) {
        // User has completed today's round - show red flame
        streakFlameEl.src = 'flame_red.png';
        streakNumberEl.classList.remove('gray');
        console.log('Setting flame to red');
    } else {
        // User hasn't completed today's round - show gray flame
        streakFlameEl.src = 'flame_gray.png';
        streakNumberEl.classList.add('gray');
        console.log('Setting flame to gray');
    }
}

function updateStreakDisplay() {
    const streakText = getStreakDisplay();
    
    if (streakNumberEl) {
        streakNumberEl.textContent = streakText;
        console.log('Updated streak number:', streakText);
    }
    
    // Update flame state
    updateStreakFlameState();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM loaded, starting initialization...');
        
        // Initialize day counter if not already set
        initializeDayCounter();
        
        // Load streak data and check for streak breaks
        loadStreakData();
        checkForStreakBreak();
        
        // Initialize DOM elements first (always needed for instructions)
        initializeDOMElements();
        
        // Add event listeners (always needed for instructions)
        addEventListeners();
        
        const gameStarted = await initGame();
        
        // Show instructions logic - check if user has seen instructions for today
        if (dev_mode) {
            // Dev mode: show instructions only if user hasn't seen them before (ever)
            const instructionsSeen = localStorage.getItem('langlioInstructionsSeen');
            if (!instructionsSeen) {
                showInstructions();
            }
        } else {
            // Daily mode: show instructions only if user hasn't seen them today
            const currentDate = getCurrentDateString();
            const instructionsSeenToday = localStorage.getItem(`langlioInstructionsSeen_${currentDate}`);
            if (!instructionsSeenToday) {
                showInstructions();
            }
        }
        // Only clear hints if no saved game state (fresh game)
        const savedState = localStorage.getItem('langlioGameState');
        if (!savedState) {
            // Ensure hints are hidden on fresh game load
            hintDisplayEl.classList.remove('show');
            hintDisplayEl.textContent = '';
            hintDisplay2El.classList.remove('show');
            hintDisplay2El.textContent = '';
        }
        
        // Update streak flame state on initialization
        setTimeout(() => {
            updateStreakFlameState();
        }, 100);
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
        alert('Error loading game: ' + error.message);
    }
});

// ===== TESTING FUNCTIONS =====
// These functions are available in the browser console for testing

// Test a specific date
window.testDate = function(dateString) {
    setTestDate(dateString);
    location.reload(); // Reload the page to apply the new date
};

// Test tomorrow
window.testTomorrow = function() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    testDate(dateString);
};

// Test next week
window.testNextWeek = function() {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const dateString = nextWeek.toISOString().split('T')[0];
    testDate(dateString);
};

// Test next month
window.testNextMonth = function() {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const dateString = nextMonth.toISOString().split('T')[0];
    testDate(dateString);
};

// Clear test date and use real date
window.clearTestDate = function() {
    clearTestDate();
    location.reload(); // Reload the page to apply the real date
};

// Show current test date
window.showTestDate = function() {
    const testDate = localStorage.getItem('langlio_test_date');
    if (testDate) {
        console.log('Current test date:', testDate);
        showPopup(`Current test date: ${testDate}`, 3000);
    } else {
        console.log('No test date set - using real date');
        showPopup('No test date set - using real date', 3000);
    }
};

// Show what language would be for a specific date
window.showLanguageForDate = function(dateString) {
    const language = getDailyLanguage(dateString);
    console.log(`Language for ${dateString}:`, language);
    showPopup(`Language for ${dateString}: ${language}`, 4000);
};