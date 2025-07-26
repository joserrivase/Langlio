// Game data - will be loaded from Languages_data.json
let gameData = {};
let allCountries = [];
let countryFlags = {};

// Comprehensive list of top 100+ languages
const allLanguages = [
    "English", "Mandarin Chinese", "Hindi", "Spanish", "French", "Standard Arabic", "Bengali", "Portuguese", "Russian", "Urdu",
    "Indonesian", "German", "Japanese", "Nigerian Pidgin", "Marathi", "Telugu", "Turkish", "Tamil", "Yue Chinese (Cantonese)", "Vietnamese",
    "Korean", "Wu Chinese (Shanghainese)", "Javanese", "Hausa", "Egyptian Arabic", "Swahili", "Italian", "Thai", "Gujarati", "Kannada",
    "Bhojpuri", "Polish", "Pashto", "Xiang Chinese (Hunanese)", "Malayalam", "Dutch", "Persian", "Ukrainian", "Romanian", "Oromo",
    "Igbo", "Amharic", "Yoruba", "Sindhi", "Cebuano", "Malay", "Nepali", "Sinhala", "Khmer", "Zulu",
    "Czech", "Greek", "Hungarian", "Bulgarian", "Slovak", "Catalan", "Hebrew", "Finnish", "Norwegian", "Danish",
    "Swedish", "Lithuanian", "Latvian", "Estonian", "Icelandic", "Albanian", "Macedonian", "Slovenian", "Croatian", "Serbian",
    "Bosnian", "Montenegrin", "Georgian", "Armenian", "Azerbaijani", "Kazakh", "Kyrgyz", "Uzbek", "Turkmen", "Tajik",
    "Mongolian", "Tibetan", "Burmese", "Lao", "Khmer", "Filipino", "Malagasy", "Somali", "Dinka", "Luo",
    "Kikuyu", "Luhya", "Kamba", "Kalenjin", "Maasai", "Tigrinya", "Tigre", "Afar", "Beja", "Nuer",
    "Shilluk", "Anuak", "Acholi", "Lango", "Alur", "Kumam", "Iteso", "Karimojong", "Jie", "Tepeth"
];

// Comprehensive list of all recognized countries
const allCountriesList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
        "Democratic Republic of the Congo": "🇨🇩", "Denmark": "🇩🇰", "Djibouti": "🇩🇯", "Dominica": "🇩🇲", "Dominican Republic": "🇩🇴",
        "East Timor": "🇹🇱", "Ecuador": "🇪🇨", "Egypt": "🇪🇬", "El Salvador": "🇸🇻", "Equatorial Guinea": "🇬🇶", "Eritrea": "🇪🇷", "Estonia": "🇪🇪", "Eswatini": "🇸🇿", "Ethiopia": "🇪🇹",
        "Fiji": "🇫🇯", "Finland": "🇫🇮", "France": "🇫🇷",
        "Gabon": "🇬🇦", "Gambia": "🇬🇲", "Georgia": "🇬🇪", "Germany": "🇩🇪", "Ghana": "🇬🇭", "Greece": "🇬🇷", "Grenada": "🇬🇩", "Guatemala": "🇬🇹", "Guinea": "🇬🇳", "Guinea-Bissau": "🇬🇼", "Guyana": "🇬🇾",
        "Haiti": "🇭🇹", "Honduras": "🇭🇳", "Hungary": "🇭🇺",
        "Iceland": "🇮🇸", "India": "🇮🇳", "Indonesia": "🇮🇩", "Iran": "🇮🇷", "Iraq": "🇮🇶", "Ireland": "🇮🇪", "Israel": "🇮🇱", "Italy": "🇮🇹", "Ivory Coast": "🇨🇮",
        "Jamaica": "🇯🇲", "Japan": "🇯🇵", "Jordan": "🇯🇴",
        "Kazakhstan": "🇰🇿", "Kenya": "🇰🇪", "Kiribati": "🇰🇮", "Kuwait": "🇰🇼", "Kyrgyzstan": "🇰🇬",
        "Laos": "🇱🇦", "Latvia": "🇱🇻", "Lebanon": "🇱🇧", "Lesotho": "🇱🇸", "Liberia": "🇱🇷", "Libya": "🇱🇾", "Liechtenstein": "🇱🇮", "Lithuania": "🇱🇹", "Luxembourg": "🇱🇺",
        "Madagascar": "🇲🇬", "Malawi": "🇲🇼", "Malaysia": "🇲🇾", "Maldives": "🇲🇻", "Mali": "🇲🇱", "Malta": "🇲🇹", "Marshall Islands": "🇲🇭", "Mauritania": "🇲🇷", "Mauritius": "🇲🇺", "Mexico": "🇲🇽", "Micronesia": "🇫🇲", "Moldova": "🇲🇩", "Monaco": "🇲🇨", "Mongolia": "🇲🇳", "Montenegro": "🇲🇪", "Morocco": "🇲🇦", "Mozambique": "🇲🇿", "Myanmar": "🇲🇲",
        "Namibia": "🇳🇦", "Nauru": "🇳🇷", "Nepal": "🇳🇵", "Netherlands": "🇳🇱", "New Zealand": "🇳🇿", "Nicaragua": "🇳🇮", "Niger": "🇳🇪", "Nigeria": "🇳🇬", "North Korea": "🇰🇵", "North Macedonia": "🇲🇰", "Norway": "🇳🇴",
        "Oman": "🇴🇲",
        "Pakistan": "🇵🇰", "Palau": "🇵🇼", "Panama": "🇵🇦", "Papua New Guinea": "🇵🇬", "Paraguay": "🇵🇾", "Peru": "🇵🇪", "Philippines": "🇵🇭", "Poland": "🇵🇱", "Portugal": "🇵🇹",
        "Qatar": "🇶🇦",
        "Romania": "🇷🇴", "Russia": "🇷🇺", "Rwanda": "🇷🇼",
        "Saint Kitts and Nevis": "🇰🇳", "Saint Lucia": "🇱🇨", "Saint Vincent and the Grenadines": "🇻🇨", "Samoa": "🇼🇸", "San Marino": "🇸🇲", "Sao Tome and Principe": "🇸🇹", "Saudi Arabia": "🇸🇦", "Senegal": "🇸🇳", "Serbia": "🇷🇸", "Seychelles": "🇸🇨", "Sierra Leone": "🇸🇱", "Singapore": "🇸🇬", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "Solomon Islands": "🇸🇧", "Somalia": "🇸🇴", "South Africa": "🇿🇦", "South Korea": "🇰🇷", "South Sudan": "🇸🇸", "Spain": "🇪🇸", "Sri Lanka": "🇱🇰", "Sudan": "🇸🇩", "Suriname": "🇸🇷", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Syria": "🇸🇾",
        "Taiwan": "🇹🇼", "Tajikistan": "🇹🇯", "Tanzania": "🇹🇿", "Thailand": "🇹🇭", "Togo": "🇹🇬", "Tonga": "🇹🇴", "Trinidad and Tobago": "🇹🇹", "Tunisia": "🇹🇳", "Turkey": "🇹🇷", "Turkmenistan": "🇹🇲", "Tuvalu": "🇹🇻",
        "Uganda": "🇺🇬", "Ukraine": "🇺🇦", "United Arab Emirates": "🇦🇪", "United Kingdom": "🇬🇧", "United States": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿",
        "Vanuatu": "🇻🇺", "Vatican City": "🇻🇦", "Venezuela": "🇻🇪", "Vietnam": "🇻🇳",
        "Yemen": "🇾🇪",
        "Zambia": "🇿🇲", "Zimbabwe": "🇿🇼"
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
let languagePhaseEl, countryPhaseEl, languageResultEl, countryInputsEl;
let languageGuessesHistoryEl, countryGuessesHistoryEl, correctLanguageEl, correctCountriesEl;
let correctSentenceEl, hintBtnEl, hintDisplayEl, instructionsPopupEl, closeInstructionsEl;
let startGameBtnEl, playNextSectionEl, playNextBtnEl, languageInputRowEl;
let languageResultMessageEl, languageResultTextEl, shareBtnLanguageEl;
let correctLanguageInfoEl, correctLanguageDisplayEl, translationDisplayEl;
let countryResultMessageEl, countryResultTextEl, allCountriesInfoEl, allCountriesListEl, allCountriesTitleEl;
let shareBtnEl, countryShareSectionEl, guessPromptEl, confettiCanvasEl;

// Initialize DOM elements
function initializeDOMElements() {
    dailySentenceEl = document.getElementById('dailySentence');
    languageGuessEl = document.getElementById('languageGuess');
    languageDropdownEl = document.getElementById('languageDropdown');
    submitLanguageGuessEl = document.getElementById('submitLanguageGuess');
    submitCountryGuessEl = document.getElementById('submitCountryGuess');
    languagePhaseEl = document.getElementById('languagePhase');
    countryPhaseEl = document.getElementById('countryPhase');
    languageResultEl = document.getElementById('languageResult');
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
    
    // Debug: Check if all DOM elements are found
    console.log('DOM elements found:', {
        dailySentenceEl: !!dailySentenceEl,
        languageGuessEl: !!languageGuessEl,
        submitLanguageGuessEl: !!submitLanguageGuessEl,
        submitCountryGuessEl: !!submitCountryGuessEl,
        languagePhaseEl: !!languagePhaseEl,
        countryPhaseEl: !!countryPhaseEl,
        languageResultEl: !!languageResultEl,
        countryInputsEl: !!countryInputsEl,
        languageGuessesHistoryEl: !!languageGuessesHistoryEl,
        countryGuessesHistoryEl: !!countryGuessesHistoryEl,
        correctLanguageEl: !!correctLanguageEl,
        correctCountriesEl: !!correctCountriesEl,
        hintBtnEl: !!hintBtnEl,
        hintDisplayEl: !!hintDisplayEl,
        shareBtnEl: !!shareBtnEl,
        shareBtnLanguageEl: !!shareBtnLanguageEl
    });
}

// Initialize the game
async function initGame() {
    try {
        console.log('Initializing game...');
        
        // Initialize DOM elements first
        initializeDOMElements();
        
        // Load game data from JSON file
        await loadGameData();
        
        // Set current date
        const today = new Date();
        
        // Generate random sentence (not date-based for new games)
        // Only select from languages that have actual data in the JSON file
        const availableLanguages = Object.keys(gameData);
        console.log('Available languages for selection:', availableLanguages);
        console.log('Number of languages with data:', availableLanguages.length);
        const languageIndex = Math.floor(Math.random() * availableLanguages.length);
        const selectedLanguage = availableLanguages[languageIndex];
        console.log('Selected language index:', languageIndex);
        console.log('Selected language:', selectedLanguage);
        
        currentGame.correctLanguage = selectedLanguage;
        // Select random countries from the language's country list (max 3, or all if less than 3)
        const allCountries = gameData[selectedLanguage].countries;
        currentGame.correctCountries = [...allCountries]; // Use all available countries
        currentGame.dailySentence = gameData[selectedLanguage].sentence;
        
        console.log('Selected language:', selectedLanguage);
        console.log('Daily sentence:', currentGame.dailySentence);
        
        // Display the sentence
        dailySentenceEl.textContent = currentGame.dailySentence;
        // Log the language for debugging
        console.log('Debug Language:', currentGame.correctLanguage);
        
        // Populate dropdowns
        populateDropdowns();
        
        // Add event listeners
        addEventListeners();
        
        // Load saved game state (only for daily games, not new games)
        if (!currentGame.isNewGame) {
            loadGameState();
        }
        
        // Update UI to show empty slots immediately
        updateUI();
        
        // Initialize confetti after DOM elements are ready
        if (confettiCanvasEl) {
            confetti = new Confetti(confettiCanvasEl);
        }
        
        console.log('Game initialized successfully');
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
    submitLanguageGuessEl.addEventListener('click', submitLanguageGuess);
    submitCountryGuessEl.addEventListener('click', submitCountryGuess);
    hintBtnEl.addEventListener('click', toggleHint);
    playNextBtnEl.addEventListener('click', startCountryPhase);
    
    // Add event listeners for share buttons if they exist
    if (shareBtnEl) {
        shareBtnEl.addEventListener('click', shareResult);
    }
    if (shareBtnLanguageEl) {
        shareBtnLanguageEl.addEventListener('click', shareResult);
    }
    
    // Instructions popup event listeners
    closeInstructionsEl.addEventListener('click', closeInstructions);
    startGameBtnEl.addEventListener('click', closeInstructions);
    
    // Close instructions when clicking outside
    instructionsPopupEl.addEventListener('click', (e) => {
        if (e.target === instructionsPopupEl) {
            closeInstructions();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !currentGame.gameOver) {
            // Only submit language guesses when Enter is pressed
            // Country guesses should be submitted manually via the submit button
            if (currentGame.currentPhase === 'language') {
                submitLanguageGuess();
            }
            // Close instructions with Escape key
            if (e.key === 'Escape' && instructionsPopupEl.style.display !== 'none') {
                closeInstructions();
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
    if (!currentGame.hintRevealed) {
        hintDisplayEl.style.display = 'none';
        hintDisplayEl.classList.remove('show');
        return;
    }
    
    const languageData = gameData[currentGame.correctLanguage];
    if (languageData && languageData.hint) {
        hintDisplayEl.textContent = languageData.hint;
        hintDisplayEl.style.display = 'flex';
        hintDisplayEl.classList.add('show');
    } else {
        hintDisplayEl.style.display = 'none';
        hintDisplayEl.classList.remove('show');
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
        }
        
        // Show "Play Next" button
        playNextSectionEl.style.display = 'block';
        
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
            }
            
            // Show "Play Next" button even on loss
            playNextSectionEl.style.display = 'block';
        } else {
            // Clear language input for next attempt
            languageGuessEl.value = '';
        }
    }
    
    // Save game state
    saveGameState();
}

// Generate country inputs based on the correct language
function generateCountryInputs(correctLanguage) {
    countryInputsEl.innerHTML = '';
    
    const languageData = gameData[correctLanguage];
    
    if (!languageData) {
        countryInputsEl.innerHTML = '<p>No language data found.</p>';
        return;
    }
    
    // Determine number of countries to guess (max 3, or total if less than 3)
    const totalCountries = languageData.countries.length;
    const numCountries = Math.min(3, totalCountries);
    
    // Create a mapping of positions to countries based on the original guesses
    const positionToCountry = {};
    const countryToPosition = {};
    
    // Get the most recent country guess to determine positions
    const lastCountryGuess = currentGame.guesses.filter(g => g.countries.length > 0).pop();
    if (lastCountryGuess) {
        lastCountryGuess.countries.forEach((country, index) => {
            if (currentGame.correctlyGuessedCountries.includes(country)) {
                positionToCountry[index] = country;
                countryToPosition[country] = index;
            }
        });
    }
    
    console.log('Position to country mapping:', positionToCountry);
    console.log('Country to position mapping:', countryToPosition);
    
    // Create all 3 input fields (or however many are required)
    for (let i = 0; i < numCountries; i++) {
        const countryInput = document.createElement('div');
        countryInput.className = 'guess-input';
        
        // Check if this position has a correct country
        const correctCountryForPosition = positionToCountry[i];
        const isCorrectlyGuessed = correctCountryForPosition !== undefined;
        
        console.log(`Country ${i + 1}: position ${i}, isCorrectlyGuessed: ${isCorrectlyGuessed}, country: ${correctCountryForPosition}`);
        
        countryInput.innerHTML = `
            <div class="searchable-dropdown">
                <input type="text" id="countryGuess${i}" class="searchable-input" placeholder="Type to search countries..." ${isCorrectlyGuessed ? 'disabled' : ''}>
                <div id="countryDropdown${i}" class="dropdown-options" style="display: none;"></div>
            </div>
        `;
        
        // Set up searchable country input
        const countryInputEl = countryInput.querySelector('input');
        const countryDropdownEl = countryInput.querySelector('.dropdown-options');
        
        // Store countries for filtering - use comprehensive country list
        countryInputEl.dataset.countries = JSON.stringify(allCountriesList.sort());
        
        // Add event listeners for searchable input (only if not disabled)
        if (!isCorrectlyGuessed) {
            countryInputEl.addEventListener('input', (e) => filterCountries(e, countryDropdownEl));
            countryInputEl.addEventListener('focus', (e) => showCountryDropdown(e, countryDropdownEl));
            countryInputEl.addEventListener('blur', () => {
                // Delay hiding dropdown to allow for clicks
                setTimeout(() => {
                    countryDropdownEl.style.display = 'none';
                }, 200);
            });
            // Add Enter key handler for country inputs
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
        }
        
        // Pre-select correctly guessed countries in their original positions
        if (isCorrectlyGuessed) {
            countryInputEl.value = correctCountryForPosition;
            countryInputEl.classList.add('correct-final');
            console.log(`Setting country ${i + 1} to: ${correctCountryForPosition}`);
        }
        
        countryInputsEl.appendChild(countryInput);
    }
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
    if (currentGame.gameOver || currentGame.attempts <= 0) return;
    
    // Get all country inputs (both enabled and disabled)
    const allCountryInputs = countryInputsEl.querySelectorAll('input[type="text"]');
    const countryGuesses = Array.from(allCountryInputs).map(input => input.value).filter(c => c);
    
    // Validate inputs
    if (countryGuesses.length === 0) {
        alert('Please select at least one country.');
        return;
    }
    
    // Check if all guessed countries exist in the dropdown options
    const allCountries = JSON.parse(allCountryInputs[0].dataset.countries || '[]');
    for (const country of countryGuesses) {
        if (!allCountries.includes(country)) {
            alert(`Please select a valid country from the dropdown: ${country}`);
            return;
        }
    }
    
    // Check for duplicate countries within this guess
    const uniqueCountries = new Set(countryGuesses);
    if (uniqueCountries.size !== countryGuesses.length) {
        alert('You cannot guess the same country twice in one attempt. Please select different countries.');
        return;
    }
    
    // Check if any of these countries have already been guessed in previous attempts
    // But exclude countries that are already correctly guessed (they can be resubmitted)
    const previouslyGuessedCountries = currentGame.guesses
        .filter(guess => guess.countries && guess.countries.length > 0)
        .flatMap(guess => guess.countries);
    
    const duplicateCountries = countryGuesses.filter(country => 
        previouslyGuessedCountries.includes(country) && 
        !currentGame.correctlyGuessedCountries.includes(country)
    );
    
    if (duplicateCountries.length > 0) {
        alert(`You have already guessed these countries: ${duplicateCountries.join(', ')}. Please try different countries.`);
        return;
    }
    
    // Create complete guess object
    const guess = {
        language: currentGame.currentLanguageGuess,
        countries: countryGuesses,
        attempt: 7 - currentGame.attempts
    };
    
    // Evaluate guess
    const results = evaluateGuess(guess);
    guess.results = results;
    
    // Add to guesses
    currentGame.guesses.push(guess);
    currentGame.attempts--;
    
    // Get all countries that speak this language
    const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
    
    // Update correctly guessed countries (check against full list)
    let newCorrectGuesses = 0;
    
    // Check each guess against all countries that speak this language (order doesn't matter)
    console.log('Current game correct countries:', currentGame.correctCountries);
    console.log('All countries for language:', allCountriesForLanguage);
    console.log('User guesses:', countryGuesses);
    console.log('Currently correctly guessed:', currentGame.correctlyGuessedCountries);
    
    countryGuesses.forEach((country, index) => {
        console.log(`Checking ${country} against all countries list`);
        if (allCountriesForLanguage.includes(country) && 
            !currentGame.correctlyGuessedCountries.includes(country)) {
            currentGame.correctlyGuessedCountries.push(country);
            // Track the position where this country was guessed
            currentGame.correctCountryPositions[country] = index;
            newCorrectGuesses++;
            console.log(`New correct guess: ${country} at position ${index}`);
        }
    });
    
    console.log('Updated correctly guessed countries:', currentGame.correctlyGuessedCountries);
    
    // If no new correct guesses were found, this might be a duplicate submission
    // In that case, we should still count it as an attempt but not add duplicate guesses
    
    // Check if user has enough correct countries from the 3 randomly selected ones
    const correctlyGuessedFromGame = currentGame.correctlyGuessedCountries.filter(country => 
        currentGame.correctCountries.includes(country)
    );
    const requiredCorrect = Math.min(3, currentGame.correctCountries.length);
    
    console.log('Correctly guessed from game countries:', correctlyGuessedFromGame);
    console.log('Required correct:', requiredCorrect);
    
    if (correctlyGuessedFromGame.length >= requiredCorrect) {
        endGame(true);
        return;
    }
    
    // Update UI
    updateUI();
    
    // Check if game is over
    if (currentGame.attempts <= 0) {
        endGame(false);
    } else {
        // Regenerate country inputs to reflect newly correctly guessed countries
        generateCountryInputs(currentGame.correctLanguage);
    }
    
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

// Update guesses history with separate sections for language and country guesses
function updateGuessesHistory() {
    // Only show the last 6 guesses for each
    const languageGuesses = currentGame.guesses.filter(g => g.countries.length === 0).slice(-6);
    const countryGuesses = currentGame.guesses.filter(g => g.countries.length > 0).slice(-6);
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

    // Fill up to 6 slots for country guesses
    for (let i = 0; i < 6; i++) {
        const guess = countryGuesses[i];
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        const guessResults = document.createElement('div');
        guessResults.className = 'guess-results';
        if (guess) {
            const allCountriesForLanguage = gameData[currentGame.correctLanguage] ? gameData[currentGame.correctLanguage].countries : [];
            guess.countries.forEach(country => {
                const isCorrect = allCountriesForLanguage.includes(country);
                const countryResult = document.createElement('div');
                countryResult.className = 'result-item';
                countryResult.innerHTML = `
                    <div class="result-value ${isCorrect ? 'correct' : 'incorrect'}">
                        ${country}
                    </div>
                `;
                guessResults.appendChild(countryResult);
            });
        } else {
            // Empty slot
            const emptyResult = document.createElement('div');
            emptyResult.className = 'result-item';
            emptyResult.innerHTML = `<div class="result-value">&nbsp;</div>`;
            guessResults.appendChild(emptyResult);
        }
        guessItem.appendChild(guessResults);
        countryGuessesHistoryEl.appendChild(guessItem);
    }
}

// End game
function endGame(won) {
    currentGame.gameOver = true;
    
    if (currentGame.currentPhase === 'countries') {
        // Trigger confetti for winning the country phase
        if (won) {
            triggerConfetti();
        }
        
        // Hide country inputs section
        countryInputsEl.style.display = 'none';
        submitCountryGuessEl.style.display = 'none';
        
        // Country phase ended - show country result message
        countryResultMessageEl.style.display = 'block';
        
        if (won) {
            countryResultTextEl.textContent = 'Congratulations! You guessed all the countries!';
            countryResultTextEl.className = 'result-text success';
        } else {
            countryResultTextEl.textContent = 'Game Over! Better luck next time!';
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
        
        // Show share button section
        countryShareSectionEl.style.display = 'block';
        
        // Update UI to show final guess history
        updateUI();
    }
    
    // Save game state
    saveGameState();
}

// Reset game
function resetGame() {
    currentGame = {
        attempts: 6,
        languageAttempts: 6,
        guesses: [],
        dailySentence: "",
        correctLanguage: "",
        correctCountries: [],
        gameOver: false,
        currentPhase: 'language',
        currentLanguageGuess: null,
        languageGuessed: false,
        isNewGame: true, // Flag to indicate if it's a new game or a loaded daily game
        hintRevealed: false, // Reset hint state
        correctlyGuessedCountries: [], // Reset correctly guessed countries
        correctCountryPositions: {} // Reset correct country positions
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
    languageResultEl.innerHTML = '';
    countryShareSectionEl.style.display = 'none';
    
    // Reset language input section
    languageInputRowEl.style.display = 'grid';
    languageResultMessageEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    playNextSectionEl.style.display = 'none';
    
    // Reset guess prompt
    guessPromptEl.textContent = 'Guess the language';
    guessPromptEl.style.color = '00beed'; // Light blue color to match country phase
    
    // Re-enable language input and show hint button
    languageGuessEl.disabled = false;
    hintBtnEl.style.display = 'block';
    
    // Reinitialize with new random language
    initGame().catch(error => {
        console.error('Error reinitializing game:', error);
    });
}

// Save game state to localStorage
function saveGameState() {
    const gameState = {
        ...currentGame,
        date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('langlioGameState', JSON.stringify(gameState));
}

// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('langlioGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        const today = new Date().toISOString().split('T')[0];
        
        // Only load if it's from today
        if (gameState.date === today) {
            currentGame = gameState;
            currentGame.isNewGame = false; // Mark as loaded game, not new game
            
            // Ensure correctlyGuessedCountries exists (for backward compatibility)
            if (!currentGame.correctlyGuessedCountries) {
                currentGame.correctlyGuessedCountries = [];
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
                generateCountryInputs(currentGame.correctLanguage);
                
                // Hide hint button in country phase
                hintBtnEl.style.display = 'none';
                
                // Hide hint display in country phase
                hintDisplayEl.style.display = 'none';
                
                // Show language result
                const isCorrect = currentGame.currentLanguageGuess === currentGame.correctLanguage;
                languageResultEl.innerHTML = `
                    <div class="language-result-display">
                        <span class="result-label">Language:</span>
                        <span class="result-value ${isCorrect ? 'correct' : 'incorrect'}">
                            ${currentGame.currentLanguageGuess} ${isCorrect ? '✓' : '✗'}
                        </span>
                    </div>
                `;
            }
            
            if (currentGame.gameOver) {
                endGame(false);
            } else if (currentGame.currentPhase === 'countries') {
                // If we're in country phase but game isn't over, regenerate country inputs
                generateCountryInputs(currentGame.correctLanguage);
            }
        }
    }
}

// Close instructions popup
function closeInstructions() {
    instructionsPopupEl.style.display = 'none';
    // Save that user has seen instructions
    localStorage.setItem('langlioInstructionsSeen', 'true');
}

// Show instructions popup
function showInstructions() {
    instructionsPopupEl.style.display = 'flex';
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
    // Generate country inputs based on the correct language
    generateCountryInputs(currentGame.correctLanguage);
    
    // Update the guess prompt for country phase
    guessPromptEl.innerHTML = `Guess what countries speak <span style="color: #D2B48C;">${currentGame.correctLanguage}</span>`;
    guessPromptEl.style.color = '00beed'; // Light blue color for the main text
    
    // Switch to country phase
    currentGame.currentPhase = 'countries';
    languagePhaseEl.style.display = 'none';
    countryPhaseEl.style.display = 'block';
    
    // Hide hint button and display in country phase
    hintBtnEl.style.display = 'none';
    hintDisplayEl.style.display = 'none';
    
    // Hide "Play Next" button and correct language info
    playNextSectionEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    
    // Keep translation visible during country guessing round
    
    // Save game state
    saveGameState();
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
    if (languageCorrect) {
        shareText = `🎯 I just played Langlio and guessed the correct language in ${languageAttemptsUsed} attempt${languageAttemptsUsed === 1 ? '' : 's'}! Can you beat my score? 🌍\n\nPlay here: https://langlio.io`;
    } else {
        shareText = `🌍 I just played Langlio and tried to guess the language but couldn't get it in 6 attempts. Can you do better? 🎯\n\nPlay here: https://langlio.io`;
    }
    
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
        await initGame();
        
        // Show instructions if user hasn't seen them before
        const instructionsSeen = localStorage.getItem('langlioInstructionsSeen');
        if (!instructionsSeen) {
            showInstructions();
        }
        // Ensure hint is hidden on load
        hintDisplayEl.classList.remove('show');
        hintDisplayEl.textContent = '';
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
        alert('Error loading game: ' + error.message);
    }
});