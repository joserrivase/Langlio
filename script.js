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

// Comprehensive list of top 100+ languages
const allLanguages = [
"Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Aymara", "Azerbaijani", "Bambara", "Belarusian", "Bislama", "Bosnian", "Bulgarian", "Burmese", "Catalan", "Chamorro", "Mandarin Chinese", "Croatian", "Czech", "Danish", "Dhivehi", "Dutch", "Dzongkha", "English", "Estonian", "Fijian", "Finnish", 
"French", "Georgian", "German", "Greek", "Guarani", "Haitian Creole", "Hausa", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", 
"Malagasy", "Malay", "Maltese", "Maori", "Marshallese", "Mongolian", "Montenegrin", "Nauruan", "Nepali", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese", "Quechua", "Romanian", "Russian", "Samoan", "Sango", "Serbian", "Sesotho", "Setswana", "Shona", "Sinhala", "Slovak", "Slovene", "Somali", 
"Spanish", "Swahili", "Swedish", "Tajik", "Tamil", "Tetum", "Thai", "Tigrinya", "Tok Pisin", "Tongan", "Turkish", "Turkmen", "Tuvaluan", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Xhosa", "Zulu", "Bengali", "Filipino", "Sinhalese", "Māori"
];


const allCountriesList = [
"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
"Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
"Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "North Korea", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
"Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
"Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
"Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
"Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
"Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
"Qatar", "South Korea", "Moldova", "Romania", "Russia", "Rwanda",
"Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
"Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
"Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Tanzania", "United States of America", "Uruguay", "Uzbekistan",
"Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Taiwan", "Puerto Rico", "Palestine", "Vatican City"
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
                    script: item.Script || ""
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
                    script: "Various scripts"
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
        "Cabo Verde": "🇨🇻", "Cambodia": "🇰🇭", "Cameroon": "🇨🇲", "Canada": "🇨🇦", "Central African Republic": "🇨🇫", "Chad": "🇹🇩", "Chile": "🇨🇱", "China": "🇨🇳", "Colombia": "🇨🇴", "Comoros": "🇰🇲", "Congo": "🇨🇬", "Costa Rica": "🇨🇷", "Croatia": "🇭🇷", "Cuba": "🇨🇺", "Cyprus": "🇨🇾", "Czech Republic": "🇨🇿",
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
        "Zambia": "🇿🇲", "Zimbabwe": "🇿🇼", "Puerto Rico": "🇵🇷", "Palestine": "🇵🇸", "Vatican City": "🇻🇦"
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
    correctlyGuessedCountries: [], // Track countries that have been correctly guessed
    correctCountryPositions: {} // Track which position each correct country was guessed in
};

// DOM elements - will be initialized after DOM loads
let dailySentenceEl, languageGuessEl, languageDropdownEl, submitLanguageGuessEl, submitCountryGuessEl;
let languagePhaseEl, countryPhaseEl, countryInputsEl;
let languageGuessesHistoryEl, countryGuessesHistoryEl, correctLanguageEl, correctCountriesEl;
let correctSentenceEl, hintBtnEl, hintDisplayEl, instructionsPopupEl, closeInstructionsEl;
let startGameBtnEl, playNextSectionEl, playNextBtnEl, languageInputRowEl;
let languageResultMessageEl, languageResultTextEl, shareBtnLanguageEl;
let correctLanguageInfoEl, correctLanguageDisplayEl, translationDisplayEl;
let countryResultMessageEl, countryResultTextEl, allCountriesInfoEl, allCountriesListEl, allCountriesTitleEl;
let shareBtnEl, countryShareSectionEl, guessPromptEl, confettiCanvasEl, backToLanguageBtnEl, gameBackButtonEl, forwardToCountryBtnEl, gameForwardButtonEl;

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
    hintDisplayEl = document.getElementById('hintDisplay');
    instructionsPopupEl = document.getElementById('instructionsPopup');
    closeInstructionsEl = document.getElementById('closeInstructions');
    startGameBtnEl = document.getElementById('startGameBtn');
    playNextSectionEl = document.getElementById('playNextSection');
    playNextBtnEl = document.getElementById('playNextBtn');
    languageInputRowEl = document.getElementById('languageInputRow');
    languageResultMessageEl = document.getElementById('languageResultMessage');
    languageResultTextEl = document.getElementById('languageResultText');
    shareBtnLanguageEl = document.getElementById('shareBtnLanguage');
    correctLanguageInfoEl = document.getElementById('correctLanguageInfo');
    correctLanguageDisplayEl = document.getElementById('correctLanguageDisplay');
    translationDisplayEl = document.getElementById('translationDisplay');
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
        hintDisplayEl: !!hintDisplayEl,
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
        // Log the language for debugging
        console.log('Debug Language:', currentGame.correctLanguage);
        
        // Populate dropdowns
        populateDropdowns();
        
        // Update UI to show empty slots immediately
        updateUI();
        
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
        hintBtnEl.removeEventListener('click', toggleHint);
        hintBtnEl.addEventListener('click', toggleHint);
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
function toggleHint() {
    if (currentGame.hintRevealed) {
        // Hint is already revealed - do nothing (keep it open)
        return;
    } else {
        // Show hint (only once)
        currentGame.hintRevealed = true;
        updateHintDisplay();
        
        // Disable the hint button after first click
        hintBtnEl.disabled = true;
    }
    
    // Save game state
    saveGameState();
}

// Update hint display
function updateHintDisplay() {
    console.log('updateHintDisplay called');
    console.log('currentGame.hintRevealed:', currentGame.hintRevealed);
    console.log('currentGame.correctLanguage:', currentGame.correctLanguage);
    console.log('gameData available:', !!gameData);
    
    if (!currentGame.hintRevealed) {
        hintDisplayEl.style.display = 'none';
        hintDisplayEl.classList.remove('show');
        return;
    }
    
    const languageData = gameData[currentGame.correctLanguage];
    console.log('languageData:', languageData);
    console.log('languageData.hint:', languageData ? languageData.hint : 'undefined');
    
    if (languageData && languageData.hint) {
        hintDisplayEl.textContent = languageData.hint;
        hintDisplayEl.style.display = 'flex';
        hintDisplayEl.classList.add('show');
        console.log('Hint displayed successfully');
    } else {
        hintDisplayEl.style.display = 'none';
        hintDisplayEl.classList.remove('show');
        console.log('Hint not available or language data missing');
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
        
        // Language is correct - show success message and correct language info
        currentGame.languageGuessed = true;
        currentGame.currentLanguageGuess = languageGuess;
        
        // Hide input section
        languageInputRowEl.style.display = 'none';
        
        // Hide hint button
        hintBtnEl.style.display = 'none';
        
        // Hide hint display
        hintDisplayEl.style.display = 'none';
        
        // Show success message
        languageResultMessageEl.style.display = 'block';
        languageResultTextEl.textContent = 'You guessed the language!';
        languageResultTextEl.className = 'result-text success';
        
        // Show correct language and translation
        correctLanguageInfoEl.style.display = 'block';
        correctLanguageDisplayEl.textContent = currentGame.correctLanguage;
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.translation) {
            translationDisplayEl.textContent = languageData.translation;
            translationDisplayEl.style.display = 'block';
            currentGame.translationRevealed = true;
        }
        
        // Show "Play Next" button
        playNextSectionEl.style.display = 'block';
        
        // Show forward button to go to country phase
        gameForwardButtonEl.style.display = 'block';
        
        // Clear language input
        languageGuessEl.value = '';
    } else {
        // Language is incorrect - check if game is over
        if (currentGame.languageAttempts <= 0) {
            // No more language attempts - show failure message
            languageInputRowEl.style.display = 'none';
            
            // Hide hint button
            hintBtnEl.style.display = 'none';
            
            // Hide hint display
            hintDisplayEl.style.display = 'none';
            
            languageResultMessageEl.style.display = 'block';
            languageResultTextEl.textContent = 'Better luck next time!';
            languageResultTextEl.className = 'result-text failure';
            
            // Show correct language and translation
            correctLanguageInfoEl.style.display = 'block';
            correctLanguageDisplayEl.textContent = currentGame.correctLanguage;
            const languageData = gameData[currentGame.correctLanguage];
            if (languageData && languageData.translation) {
                translationDisplayEl.textContent = languageData.translation;
                translationDisplayEl.style.display = 'block';
                currentGame.translationRevealed = true;
            }
            
            // Show "Play Next" button even on loss
            playNextSectionEl.style.display = 'block';
            
            // Show forward button to go to country phase
            gameForwardButtonEl.style.display = 'block';
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
            strike.classList.add('gray');
            strike.textContent = '❌';
            console.log(`Strike ${i + 1}: created as gray`);
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
            strike.classList.remove('used', 'gray');
            if (index < strikesUsed) {
                strike.classList.add('used');
                console.log(`Strike ${index + 1}: marked as used (red)`);
            } else {
                strike.classList.add('gray');
                console.log(`Strike ${index + 1}: marked as gray`);
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
                strike.classList.remove('used', 'gray');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                    console.log(`Final strike ${index + 1}: marked as used (red)`);
                } else {
                    strike.classList.add('gray');
                    console.log(`Final strike ${index + 1}: marked as gray`);
                }
            });
        }
        
        // Show share button section
        countryShareSectionEl.style.display = 'block';
        
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
    
    // Reset hint state
    hintDisplayEl.classList.remove('show');
    hintDisplayEl.textContent = '';
    
    // Reset phases
    languagePhaseEl.style.display = 'block';
    countryPhaseEl.style.display = 'none';
    countryShareSectionEl.style.display = 'none';
    
    // Reset language input section
    languageInputRowEl.style.display = 'grid';
    languageResultMessageEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    playNextSectionEl.style.display = 'none';
    
    // Reset guess prompt
    guessPromptEl.textContent = 'Guess the language';
    guessPromptEl.style.color = '#87CEEB'; // Sky blue color to match CSS default
    
    // Re-enable language input and show hint button
    languageGuessEl.disabled = false;
    hintBtnEl.style.display = 'block';
    
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
            
            updateUI();
            
            // Restore hint state
            if (currentGame.hintRevealed) {
                updateHintDisplay();
            } else {
                hintDisplayEl.classList.remove('show');
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
                
                // Hide hint button in country phase
                hintBtnEl.style.display = 'none';
                
                // Hide hint display in country phase
                hintDisplayEl.style.display = 'none';
                
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
                
                // Hide hint button
                hintBtnEl.style.display = 'none';
                
                // Hide hint display
                hintDisplayEl.style.display = 'none';
                
                // Show success/failure message
                languageResultMessageEl.style.display = 'block';
                if (currentGame.languageGuessed) {
                    languageResultTextEl.textContent = 'You guessed the language!';
                    languageResultTextEl.className = 'result-text success';
                } else {
                    languageResultTextEl.textContent = 'Better luck next time!';
                    languageResultTextEl.className = 'result-text failure';
                }
                
                // Show correct language and translation
                correctLanguageInfoEl.style.display = 'block';
                correctLanguageDisplayEl.textContent = currentGame.correctLanguage;
                const languageData = gameData[currentGame.correctLanguage];
                if (languageData && languageData.translation) {
                    translationDisplayEl.textContent = languageData.translation;
                    translationDisplayEl.style.display = 'block';
                }
                
                // Show "Play Next" button and share button
                playNextSectionEl.style.display = 'block';
                
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
            
            // Ensure hint is properly restored after all data is loaded
            if (currentGame.hintRevealed) {
                // Try to restore hint immediately
                updateHintDisplay();
                
                // If hint wasn't restored (game data might not be ready), retry after a short delay
                setTimeout(() => {
                    if (currentGame.hintRevealed && hintDisplayEl.style.display !== 'flex') {
                        console.log('Retrying hint restoration...');
                        updateHintDisplay();
                    }
                }, 200);
            }
            
            // Update country UI if in country phase
            if (currentGame.currentPhase === 'countries') {
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
        
        // Show share button section
        countryShareSectionEl.style.display = 'block';
        
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
                strike.classList.remove('used', 'gray');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                } else {
                    strike.classList.add('gray');
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
    
    // Hide hint button and display in country phase
    hintBtnEl.style.display = 'none';
    hintDisplayEl.style.display = 'none';
    
    // Hide "Play Next" button and correct language info
    playNextSectionEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    
    // Hide sentence and translation during country guessing round
    dailySentenceEl.style.display = 'none';
    translationDisplayEl.style.display = 'none';
    
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
        
        // Show share button section
        countryShareSectionEl.style.display = 'block';
        
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
                strike.classList.remove('used', 'gray');
                if (index < strikesUsed) {
                    strike.classList.add('used');
                } else {
                    strike.classList.add('gray');
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
    
    // Show sentence and translation during language guessing round
    dailySentenceEl.style.display = 'block';
    if (currentGame.translationRevealed) {
        translationDisplayEl.style.display = 'block';
    }
    
    // Show "Play Next" button and correct language info if language phase is complete
    if (currentGame.languageGuessed || currentGame.languageAttempts <= 0) {
        // Hide input section when language phase is complete
        languageInputRowEl.style.display = 'none';
        
        // Hide hint button and display when language phase is complete
        hintBtnEl.style.display = 'none';
        hintDisplayEl.style.display = 'none';
        
        // Show language result message
        languageResultMessageEl.style.display = 'block';
        if (currentGame.languageGuessed) {
            languageResultTextEl.textContent = 'You guessed the language!';
            languageResultTextEl.className = 'result-text success';
        } else {
            languageResultTextEl.textContent = 'Better luck next time!';
            languageResultTextEl.className = 'result-text failure';
        }
        
        // Show correct language and translation
        correctLanguageInfoEl.style.display = 'block';
        correctLanguageDisplayEl.textContent = currentGame.correctLanguage;
        const languageData = gameData[currentGame.correctLanguage];
        if (languageData && languageData.translation) {
            translationDisplayEl.textContent = languageData.translation;
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
        if (currentGame.hintRevealed) {
            hintDisplayEl.style.display = 'flex';
        }
        
        // Hide result elements when language phase is not complete
        languageResultMessageEl.style.display = 'none';
        correctLanguageInfoEl.style.display = 'none';
        playNextSectionEl.style.display = 'none';
        if (shareBtnLanguageEl) {
            shareBtnLanguageEl.style.display = 'none';
        }
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
    // const displayUrl = "https://langlio.io";
    // const actualUrl = "https://www.langlio.io?utm_source=Langlio&utm_medium=share_button&utm_campaign=share_results&utm_id=share_button";
    // const linkHtml = `<a href="${actualUrl}" target="_blank" rel="noopener noreferrer">${displayUrl}</a>`;

    // if (languageCorrect) {
    //     shareText = `🎯 I just played Langlio and guessed the correct language in ${languageAttemptsUsed} attempt${languageAttemptsUsed === 1 ? '' : 's'}! Can you beat my score? 🌍\n\nPlay here: ${displayUrl}`;
    // } else {
    //     shareText = `🌍 I just played Langlio and tried to guess the language but couldn't get it in 6 attempts. Can you do better? 🎯\n\nPlay here: ${displayUrl}`;
    // }

    if (languageCorrect) {
        shareText = `🎯 I just played Langlio and guessed the correct language in ${languageAttemptsUsed} attempt${languageAttemptsUsed === 1 ? '' : 's'}! Can you beat my score? 🌍\n\nPlay here: https://langlio.io`;
    } else {
        shareText = `🌍 I just played Langlio and tried to guess the language but couldn't get it in 6 attempts. Can you do better? 🎯\n\nPlay here: https://langlio.io`;
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

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM loaded, starting initialization...');
        
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
        // Ensure hint is hidden on load
        hintDisplayEl.classList.remove('show');
        hintDisplayEl.textContent = '';
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