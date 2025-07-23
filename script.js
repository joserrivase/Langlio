// Game data - languages with their sentences and countries
const gameData = {
    "Spanish": {
        sentence: "El sol brilla en el cielo azul",
        translation: "The sun shines in the blue sky",
        countries: ["Spain", "Mexico", "Argentina", "Colombia", "Peru", "Venezuela", "Chile", "Ecuador", "Guatemala", "Cuba", "Bolivia", "Dominican Republic", "Honduras", "Paraguay", "El Salvador", "Nicaragua", "Costa Rica", "Panama", "Uruguay", "Equatorial Guinea", "Puerto Rico"],
        hint: "This language uses 'el' and 'la' articles and has rolling 'r' sounds"
    },
    "French": {
        sentence: "Le soleil brille dans le ciel bleu",
        translation: "The sun shines in the blue sky",
        countries: ["France", "Canada", "Belgium", "Switzerland", "Luxembourg", "Monaco", "Haiti", "Senegal", "Mali", "Burkina Faso", "Niger", "Chad", "Central African Republic", "Cameroon", "Gabon", "Congo", "Democratic Republic of the Congo", "Rwanda", "Burundi", "Madagascar", "Comoros", "Seychelles", "Djibouti", "Vanuatu", "New Caledonia", "French Polynesia", "Wallis and Futuna"],
        hint: "This language uses 'le' and 'la' articles and has nasal sounds"
    },
    "German": {
        sentence: "Die Sonne scheint am blauen Himmel",
        translation: "The sun shines in the blue sky",
        countries: ["Germany", "Austria", "Switzerland", "Liechtenstein", "Luxembourg", "Belgium"],
        hint: "This language capitalizes all nouns and uses 'die', 'der', 'das' articles"
    },
    "Italian": {
        sentence: "Il sole splende nel cielo blu",
        translation: "The sun shines in the blue sky",
        countries: ["Italy", "Switzerland", "San Marino", "Vatican City"],
        hint: "This language uses 'il' and 'la' articles and has musical intonation"
    },
    "Portuguese": {
        sentence: "O sol brilha no céu azul",
        translation: "The sun shines in the blue sky",
        countries: ["Portugal", "Brazil", "Angola", "Mozambique", "Guinea-Bissau", "Cape Verde", "São Tomé and Príncipe"],
        hint: "This language uses 'o' and 'a' articles and has nasal vowels"
    },
    "Russian": {
        sentence: "Солнце светит в голубом небе",
        translation: "The sun shines in the blue sky",
        countries: ["Russia", "Belarus", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Uzbekistan", "Turkmenistan", "Azerbaijan", "Georgia", "Armenia", "Moldova", "Ukraine", "Estonia", "Latvia", "Lithuania", "Poland"],
        hint: "This language uses the Cyrillic alphabet and has soft/hard consonants"
    },
    "Japanese": {
        sentence: "太陽が青空で輝いている",
        translation: "The sun shines in the blue sky",
        countries: ["Japan"],
        hint: "This language uses three writing systems: hiragana, katakana, and kanji"
    },
    "Chinese": {
        sentence: "太阳在蓝天中闪耀",
        translation: "The sun shines in the blue sky",
        countries: ["China", "Taiwan", "Singapore"],
        hint: "This language uses logographic characters and is tonal"
    },
    "Korean": {
        sentence: "태양이 푸른 하늘에서 빛나고 있다",
        translation: "The sun shines in the blue sky",
        countries: ["South Korea", "North Korea"],
        hint: "This language uses the Hangul alphabet and has honorific speech levels"
    },
    "Arabic": {
        sentence: "الشمس تشرق في السماء الزرقاء",
        translation: "The sun shines in the blue sky",
        countries: ["Egypt", "Saudi Arabia", "Iraq", "Syria", "Lebanon", "Jordan", "Palestine", "Israel", "Kuwait", "Bahrain", "Qatar", "United Arab Emirates", "Oman", "Yemen", "Sudan", "South Sudan", "Chad", "Libya", "Tunisia", "Algeria", "Morocco", "Mauritania", "Somalia", "Djibouti", "Eritrea", "Comoros"],
        hint: "This language is written right-to-left and has guttural sounds"
    },
    "Hindi": {
        sentence: "सूरज नीले आसमान में चमक रहा है",
        translation: "The sun shines in the blue sky",
        countries: ["India", "Nepal", "Fiji"],
        hint: "This language uses the Devanagari script and has retroflex consonants"
    },
    "Dutch": {
        sentence: "De zon schijnt in de blauwe lucht",
        translation: "The sun shines in the blue sky",
        countries: ["Netherlands", "Belgium", "Suriname"],
        hint: "This language uses 'de' and 'het' articles and has guttural 'g' sounds"
    },
    "Swedish": {
        sentence: "Solen skiner på den blå himlen",
        translation: "The sun shines in the blue sky",
        countries: ["Sweden", "Finland"],
        hint: "This language has pitch accent and uses 'en' and 'ett' articles"
    },
    "Norwegian": {
        sentence: "Solen skiner på den blå himmelen",
        translation: "The sun shines in the blue sky",
        countries: ["Norway"],
        hint: "This language has two written forms and uses 'en' and 'et' articles"
    },
    "Danish": {
        sentence: "Solen skiner på den blå himmel",
        translation: "The sun shines in the blue sky",
        countries: ["Denmark", "Greenland"],
        hint: "This language has a stød sound and uses 'en' and 'et' articles"
    },
    "Polish": {
        sentence: "Słońce świeci na niebieskim niebie",
        translation: "The sun shines in the blue sky",
        countries: ["Poland"],
        hint: "This language has many consonant clusters and uses 'ten' and 'ta' articles"
    },
    "Turkish": {
        sentence: "Güneş mavi gökyüzünde parlıyor",
        translation: "The sun shines in the blue sky",
        countries: ["Turkey", "Cyprus"],
        hint: "This language uses vowel harmony and agglutination"
    },
    "Greek": {
        sentence: "Ο ήλιος λάμπει στον μπλε ουρανό",
        translation: "The sun shines in the blue sky",
        countries: ["Greece", "Cyprus"],
        hint: "This language uses the Greek alphabet and has three genders"
    },
    "Hebrew": {
        sentence: "השמש זורחת בשמיים הכחולים",
        translation: "The sun shines in the blue sky",
        countries: ["Israel"],
        hint: "This language is written right-to-left and uses the Hebrew alphabet"
    },
    "Thai": {
        sentence: "ดวงอาทิตย์ส่องแสงในท้องฟ้าสีฟ้า",
        translation: "The sun shines in the blue sky",
        countries: ["Thailand"],
        hint: "This language is tonal and uses its own unique alphabet"
    },
    "Vietnamese": {
        sentence: "Mặt trời chiếu sáng trên bầu trời xanh",
        translation: "The sun shines in the blue sky",
        countries: ["Vietnam"],
        hint: "This language is tonal and uses Latin alphabet with diacritics"
    },
    "Indonesian": {
        sentence: "Matahari bersinar di langit biru",
        translation: "The sun shines in the blue sky",
        countries: ["Indonesia"],
        hint: "This language uses Latin alphabet and has no grammatical gender"
    },
    "Malay": {
        sentence: "Matahari bersinar di langit biru",
        translation: "The sun shines in the blue sky",
        countries: ["Malaysia", "Brunei", "Singapore"],
        hint: "This language uses Latin alphabet and has simple grammar"
    },
    "Filipino": {
        sentence: "Ang araw ay nagniningning sa asul na kalangitan",
        translation: "The sun shines in the blue sky",
        countries: ["Philippines"],
        hint: "This language uses 'ang' and 'ng' markers and has Austronesian roots"
    },
    "Finnish": {
        sentence: "Aurinko paistaa sinisessä taivaassa",
        translation: "The sun shines in the blue sky",
        countries: ["Finland"],
        hint: "This language has 15 cases and uses vowel harmony"
    },
    "Hungarian": {
        sentence: "A nap süt a kék égen",
        translation: "The sun shines in the blue sky",
        countries: ["Hungary"],
        hint: "This language has 18 cases and uses 'a' and 'az' articles"
    },
    "Czech": {
        sentence: "Slunce svítí na modré obloze",
        translation: "The sun shines in the blue sky",
        countries: ["Czech Republic"],
        hint: "This language has 7 cases and uses 'ten' and 'ta' articles"
    },
    "Slovak": {
        sentence: "Slnko svieti na modrom nebi",
        translation: "The sun shines in the blue sky",
        countries: ["Slovakia"],
        hint: "This language has 6 cases and is closely related to Czech"
    },
    "Romanian": {
        sentence: "Soarele strălucește pe cerul albastru",
        translation: "The sun shines in the blue sky",
        countries: ["Romania", "Moldova"],
        hint: "This language is the only Romance language in Eastern Europe"
    },
    "Bulgarian": {
        sentence: "Слънцето грее в синьото небе",
        translation: "The sun shines in the blue sky",
        countries: ["Bulgaria"],
        hint: "This language uses the Cyrillic alphabet and has no cases"
    },
    "Croatian": {
        sentence: "Sunce sjaji na plavom nebu",
        translation: "The sun shines in the blue sky",
        countries: ["Croatia", "Bosnia and Herzegovina"],
        hint: "This language uses Latin alphabet and has 7 cases"
    },
    "Serbian": {
        sentence: "Сунце сија на плавом небу",
        translation: "The sun shines in the blue sky",
        countries: ["Serbia", "Bosnia and Herzegovina"],
        hint: "This language can use both Cyrillic and Latin alphabets"
    },
    "Slovenian": {
        sentence: "Sonce sije na modrem nebu",
        translation: "The sun shines in the blue sky",
        countries: ["Slovenia"],
        hint: "This language has dual number and 6 cases"
    },
    "Estonian": {
        sentence: "Päike paistab sinises taevas",
        translation: "The sun shines in the blue sky",
        countries: ["Estonia"],
        hint: "This language has 14 cases and uses vowel harmony"
    },
    "Latvian": {
        sentence: "Saule spīd zilajā debesī",
        translation: "The sun shines in the blue sky",
        countries: ["Latvia"],
        hint: "This language has 7 cases and uses pitch accent"
    },
    "Lithuanian": {
        sentence: "Saulė spindi mėlyname danguje",
        translation: "The sun shines in the blue sky",
        countries: ["Lithuania"],
        hint: "This language has 7 cases and is considered very conservative"
    }
};

// All countries for the dropdown
const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
];

// Country flag mapping
const countryFlags = {
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
    correctlyGuessedCountries: [] // Track countries that have been correctly guessed
};

// DOM elements
const dailySentenceEl = document.getElementById('dailySentence');
const debugLanguageEl = document.getElementById('debugLanguage');
const languageGuessEl = document.getElementById('languageGuess');
const languageDropdownEl = document.getElementById('languageDropdown');
const submitLanguageGuessEl = document.getElementById('submitLanguageGuess');
const submitCountryGuessEl = document.getElementById('submitCountryGuess');
const languagePhaseEl = document.getElementById('languagePhase');
const countryPhaseEl = document.getElementById('countryPhase');
const languageResultEl = document.getElementById('languageResult');
const countryInputsEl = document.getElementById('countryInputs');
const languageGuessesHistoryEl = document.getElementById('languageGuessesHistory');
const countryGuessesHistoryEl = document.getElementById('countryGuessesHistory');
const correctLanguageEl = document.getElementById('correctLanguage');
const correctCountriesEl = document.getElementById('correctCountries');
const correctSentenceEl = document.getElementById('correctSentence');
const newGameBtnEl = document.getElementById('newGameBtn');
const hintBtnEl = document.getElementById('hintBtn');
const hintDisplayEl = document.getElementById('hintDisplay');
const instructionsPopupEl = document.getElementById('instructionsPopup');
const closeInstructionsEl = document.getElementById('closeInstructions');
const startGameBtnEl = document.getElementById('startGameBtn');
const playNextSectionEl = document.getElementById('playNextSection');
const playNextBtnEl = document.getElementById('playNextBtn');
const languageInputRowEl = document.getElementById('languageInputRow');
const languageResultMessageEl = document.getElementById('languageResultMessage');
const languageResultTextEl = document.getElementById('languageResultText');
const correctLanguageInfoEl = document.getElementById('correctLanguageInfo');
const correctLanguageDisplayEl = document.getElementById('correctLanguageDisplay');
const translationDisplayEl = document.getElementById('translationDisplay');
const countryResultMessageEl = document.getElementById('countryResultMessage');
const countryResultTextEl = document.getElementById('countryResultText');
const allCountriesInfoEl = document.getElementById('allCountriesInfo');
const allCountriesListEl = document.getElementById('allCountriesList');
const guessPromptEl = document.querySelector('.guess-prompt');
const confettiCanvasEl = document.getElementById('confettiCanvas');

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
    newGameBtnEl: !!newGameBtnEl,
    hintBtnEl: !!hintBtnEl,
    hintDisplayEl: !!hintDisplayEl
});

// Initialize the game
function initGame() {
    try {
        console.log('Initializing game...');
        
        // Set current date
        const today = new Date();
        
        // Generate random sentence (not date-based for new games)
        const languages = Object.keys(gameData);
        const languageIndex = Math.floor(Math.random() * languages.length);
        const selectedLanguage = languages[languageIndex];
        
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
    const languages = Object.keys(gameData).sort();
    
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
    newGameBtnEl.addEventListener('click', resetGame);
    hintBtnEl.addEventListener('click', toggleHint);
    playNextBtnEl.addEventListener('click', startCountryPhase);
    
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
            if (currentGame.currentPhase === 'language') {
                submitLanguageGuess();
            } else {
                submitCountryGuess();
            }
        }
        // Close instructions with Escape key
        if (e.key === 'Escape' && instructionsPopupEl.style.display !== 'none') {
            closeInstructions();
        }
    });
}

// Toggle hint display
function toggleHint() {
    if (currentGame.hintRevealed) {
        // Hide hint
        currentGame.hintRevealed = false;
        hintDisplayEl.classList.remove('show');
        hintBtnEl.textContent = '💡 Show Hint';
    } else {
        // Show hint
        currentGame.hintRevealed = true;
        updateHintDisplay();
        hintBtnEl.textContent = '🙈 Hide Hint';
    }
    
    // Save game state
    saveGameState();
}

// Update hint display
function updateHintDisplay() {
    if (!currentGame.hintRevealed) {
        hintDisplayEl.classList.remove('show');
        return;
    }
    
    const languageData = gameData[currentGame.correctLanguage];
    if (languageData && languageData.hint) {
        hintDisplayEl.textContent = languageData.hint;
        hintDisplayEl.classList.add('show');
    } else {
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
            
            languageResultMessageEl.style.display = 'block';
            languageResultTextEl.textContent = 'Better luck next time!';
            languageResultTextEl.className = 'result-text failure';
            
            // Show correct language and translation
            correctLanguageInfoEl.style.display = 'block';
            correctLanguageDisplayEl.textContent = currentGame.correctLanguage;
            const languageData = gameData[currentGame.correctLanguage];
            if (languageData && languageData.translation) {
                translationDisplayEl.textContent = languageData.translation;
            }
            
            // End game
            endGame(false);
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
    
    // Get correctly guessed countries that are in the game's correct countries list
    const correctlyGuessedFromGame = currentGame.correctlyGuessedCountries.filter(country => 
        currentGame.correctCountries.includes(country)
    );
    
    console.log('Correctly guessed from game countries:', correctlyGuessedFromGame);
    console.log('Game correct countries:', currentGame.correctCountries);
    console.log('All correctly guessed countries:', currentGame.correctlyGuessedCountries);
    
    // Note: Input fields are disabled based on how many countries from the 3 randomly selected
    // game countries have been correctly guessed. Countries guessed correctly but not in the
    // 3 selected ones will be shown as correct in the guess history but won't disable input fields.
    
    // Create all 3 input fields (or however many are required)
    for (let i = 0; i < numCountries; i++) {
        const countryInput = document.createElement('div');
        countryInput.className = 'guess-input';
        
        // Check if this position should be disabled (if we have a correct country for this position)
        // We need to disable fields based on how many countries from the game's correct countries have been guessed
        // But we also need to account for the fact that users might guess countries not in the 3 selected ones
        const isCorrectlyGuessed = i < correctlyGuessedFromGame.length;
        console.log(`Country ${i + 1}: position ${i}, isCorrectlyGuessed: ${isCorrectlyGuessed}, correctlyGuessedFromGame: ${correctlyGuessedFromGame.length}`);
        
        countryInput.innerHTML = `
            <label for="countryGuess${i}">Country ${i + 1}:</label>
            <div class="searchable-dropdown">
                <input type="text" id="countryGuess${i}" class="searchable-input" placeholder="Type to search countries..." ${isCorrectlyGuessed ? 'disabled' : ''}>
                <div id="countryDropdown${i}" class="dropdown-options" style="display: none;"></div>
            </div>
        `;
        
        // Set up searchable country input
        const countryInputEl = countryInput.querySelector('input');
        const countryDropdownEl = countryInput.querySelector('.dropdown-options');
        
        // Store countries for filtering
        countryInputEl.dataset.countries = JSON.stringify(allCountries.sort());
        
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
        
        // Pre-select correctly guessed countries
        if (isCorrectlyGuessed && i < correctlyGuessedFromGame.length) {
            const correctCountry = correctlyGuessedFromGame[i];
            countryInputEl.value = correctCountry;
            countryInputEl.classList.add('correct-final');
            console.log(`Setting country ${i + 1} to: ${correctCountry}`);
        } else if (isCorrectlyGuessed) {
            // This shouldn't happen, but just in case
            console.log(`Position ${i} marked as correctly guessed but no country assigned`);
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
    
    countryGuesses.forEach((country) => {
        console.log(`Checking ${country} against all countries list`);
        if (allCountriesForLanguage.includes(country) && 
            !currentGame.correctlyGuessedCountries.includes(country)) {
            currentGame.correctlyGuessedCountries.push(country);
            newCorrectGuesses++;
            console.log(`New correct guess: ${country}`);
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
        correctlyGuessedCountries: [] // Reset correctly guessed countries
    };
    
    // Clear UI
    languageGuessesHistoryEl.innerHTML = '';
    countryGuessesHistoryEl.innerHTML = '';
    countryResultMessageEl.style.display = 'none';
    allCountriesInfoEl.style.display = 'none';
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
    
    // Reset language input section
    languageInputRowEl.style.display = 'grid';
    languageResultMessageEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    playNextSectionEl.style.display = 'none';
    
    // Reset guess prompt
    guessPromptEl.textContent = 'Guess the language';
    guessPromptEl.style.color = '#87CEEB'; // Light blue color to match country phase
    
    // Re-enable language input and show hint button
    languageGuessEl.disabled = false;
    hintBtnEl.style.display = 'block';
    
    // Reinitialize with new random language
    initGame();
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
                hintBtnEl.textContent = '🙈 Hide Hint';
                updateHintDisplay();
            } else {
                hintBtnEl.textContent = '💡 Show Hint';
                hintDisplayEl.classList.remove('show');
            }
            
            // Restore phase state
            if (currentGame.currentPhase === 'countries' && currentGame.currentLanguageGuess) {
                languagePhaseEl.style.display = 'none';
                countryPhaseEl.style.display = 'block';
                generateCountryInputs(currentGame.correctLanguage);
                
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
    guessPromptEl.style.color = '#87CEEB'; // Light blue color for the main text
    
    // Switch to country phase
    currentGame.currentPhase = 'countries';
    languagePhaseEl.style.display = 'none';
    countryPhaseEl.style.display = 'block';
    
    // Hide "Play Next" button and correct language info
    playNextSectionEl.style.display = 'none';
    correctLanguageInfoEl.style.display = 'none';
    
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

// Initialize confetti
const confetti = new Confetti(confettiCanvasEl);

// Trigger confetti function
function triggerConfetti() {
    confetti.start();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM loaded, starting initialization...');
        initGame();
        
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