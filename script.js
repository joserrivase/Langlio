// Game data - languages with their sentences and countries
const gameData = {
    "Spanish": {
        sentence: "El sol brilla en el cielo azul",
        translation: "The sun shines in the blue sky",
        countries: ["Spain", "Mexico", "Argentina"],
        hint: "This language uses 'el' and 'la' articles and has rolling 'r' sounds"
    },
    "French": {
        sentence: "Le soleil brille dans le ciel bleu",
        translation: "The sun shines in the blue sky",
        countries: ["France", "Canada", "Belgium"],
        hint: "This language uses 'le' and 'la' articles and has nasal sounds"
    },
    "German": {
        sentence: "Die Sonne scheint am blauen Himmel",
        translation: "The sun shines in the blue sky",
        countries: ["Germany", "Austria", "Switzerland"],
        hint: "This language capitalizes all nouns and uses 'die', 'der', 'das' articles"
    },
    "Italian": {
        sentence: "Il sole splende nel cielo blu",
        translation: "The sun shines in the blue sky",
        countries: ["Italy", "Switzerland", "San Marino"],
        hint: "This language uses 'il' and 'la' articles and has musical intonation"
    },
    "Portuguese": {
        sentence: "O sol brilha no céu azul",
        translation: "The sun shines in the blue sky",
        countries: ["Portugal", "Brazil", "Angola"],
        hint: "This language uses 'o' and 'a' articles and has nasal vowels"
    },
    "Russian": {
        sentence: "Солнце светит в голубом небе",
        translation: "The sun shines in the blue sky",
        countries: ["Russia", "Belarus", "Kazakhstan"],
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
        countries: ["Egypt", "Saudi Arabia", "Iraq"],
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
const attemptsLeftEl = document.getElementById('attemptsLeft');
const currentDateEl = document.getElementById('currentDate');
const languageGuessEl = document.getElementById('languageGuess');
const submitLanguageGuessEl = document.getElementById('submitLanguageGuess');
const submitCountryGuessEl = document.getElementById('submitCountryGuess');
const languagePhaseEl = document.getElementById('languagePhase');
const countryPhaseEl = document.getElementById('countryPhase');
const languageResultEl = document.getElementById('languageResult');
const countryInputsEl = document.getElementById('countryInputs');
const languageGuessesHistoryEl = document.getElementById('languageGuessesHistory');
const countryGuessesHistoryEl = document.getElementById('countryGuessesHistory');
const gameOverEl = document.getElementById('gameOver');
const correctLanguageEl = document.getElementById('correctLanguage');
const correctCountriesEl = document.getElementById('correctCountries');
const correctSentenceEl = document.getElementById('correctSentence');
const newGameBtnEl = document.getElementById('newGameBtn');
const hintBtnEl = document.getElementById('hintBtn');
const hintDisplayEl = document.getElementById('hintDisplay');

// Debug: Check if all DOM elements are found
console.log('DOM elements found:', {
    dailySentenceEl: !!dailySentenceEl,
    attemptsLeftEl: !!attemptsLeftEl,
    currentDateEl: !!currentDateEl,
    languageGuessEl: !!languageGuessEl,
    submitLanguageGuessEl: !!submitLanguageGuessEl,
    submitCountryGuessEl: !!submitCountryGuessEl,
    languagePhaseEl: !!languagePhaseEl,
    countryPhaseEl: !!countryPhaseEl,
    languageResultEl: !!languageResultEl,
    countryInputsEl: !!countryInputsEl,
    languageGuessesHistoryEl: !!languageGuessesHistoryEl,
    countryGuessesHistoryEl: !!countryGuessesHistoryEl,
    gameOverEl: !!gameOverEl,
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
        currentDateEl.textContent = today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Generate random sentence (not date-based for new games)
        const languages = Object.keys(gameData);
        const languageIndex = Math.floor(Math.random() * languages.length);
        const selectedLanguage = languages[languageIndex];
        
        currentGame.correctLanguage = selectedLanguage;
        currentGame.correctCountries = gameData[selectedLanguage].countries;
        currentGame.dailySentence = gameData[selectedLanguage].sentence;
        
        console.log('Selected language:', selectedLanguage);
        console.log('Daily sentence:', currentGame.dailySentence);
        
        // Display the sentence
        dailySentenceEl.textContent = currentGame.dailySentence;
        
        // Populate dropdowns
        populateDropdowns();
        
        // Add event listeners
        addEventListeners();
        
        // Load saved game state (only for daily games, not new games)
        if (!currentGame.isNewGame) {
            loadGameState();
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
    // Populate language dropdown
    const languages = Object.keys(gameData).sort();
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageGuessEl.appendChild(option);
    });
}

// Add event listeners
function addEventListeners() {
    submitLanguageGuessEl.addEventListener('click', submitLanguageGuess);
    submitCountryGuessEl.addEventListener('click', submitCountryGuess);
    newGameBtnEl.addEventListener('click', resetGame);
    hintBtnEl.addEventListener('click', toggleHint);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !currentGame.gameOver) {
            if (currentGame.currentPhase === 'language') {
                submitLanguageGuess();
            } else {
                submitCountryGuess();
            }
        }
    });
    
    // Add search functionality to language dropdown
    languageGuessEl.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const options = Array.from(languageGuessEl.options);
        
        options.forEach(option => {
            if (option.value.toLowerCase().includes(searchTerm)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    });
}

// Toggle hint display
function toggleHint() {
    if (currentGame.hintRevealed) {
        // Hide hint
        currentGame.hintRevealed = false;
        hintDisplayEl.style.display = 'none';
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
        hintDisplayEl.style.display = 'none';
        return;
    }
    
    const languageData = gameData[currentGame.correctLanguage];
    if (languageData && languageData.hint) {
        hintDisplayEl.textContent = languageData.hint;
        hintDisplayEl.style.display = 'block';
    } else {
        hintDisplayEl.style.display = 'none';
    }
}


// Evaluate a guess
function evaluateGuess(guess) {
    const languageCorrect = guess.language === currentGame.correctLanguage;
    const guessedCountries = new Set(guess.countries);
    const correctCountries = new Set(currentGame.correctCountries);
    
    // Check if all correct countries are guessed
    const countriesCorrect = currentGame.correctCountries.every(country => 
        guessedCountries.has(country)
    ) && guess.countries.length === currentGame.correctCountries.length;
    
    // Calculate partial matches
    const correctMatches = currentGame.correctCountries.filter(country => 
        guessedCountries.has(country)
    ).length;
    
    return {
        languageCorrect,
        countriesCorrect,
        correctMatches,
        totalCorrect: currentGame.correctCountries.length
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
        // Language is correct - move to country phase
        currentGame.languageGuessed = true;
        currentGame.currentLanguageGuess = languageGuess;
        
        // Show language result
        languageResultEl.innerHTML = `
            <div class="language-result-display">
                <span class="result-label">Language:</span>
                <span class="result-value correct">
                    ${languageGuess} ✓
                </span>
            </div>
        `;
        
        // Generate country inputs based on the correct language
        generateCountryInputs(currentGame.correctLanguage);
        
        // Switch to country phase
        currentGame.currentPhase = 'countries';
        languagePhaseEl.style.display = 'none';
        countryPhaseEl.style.display = 'block';
        
        // Clear language input
        languageGuessEl.value = '';
    } else {
        // Language is incorrect - stay in language phase
        if (currentGame.languageAttempts <= 0) {
            // No more language attempts - end game
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
    const numCountries = languageData ? languageData.countries.length : 0;
    
    if (numCountries === 0) {
        countryInputsEl.innerHTML = '<p>No countries found for this language.</p>';
        return;
    }
    
    // Create country input fields
    for (let i = 0; i < numCountries; i++) {
        const countryInput = document.createElement('div');
        countryInput.className = 'guess-input';
        
        // Check if this country has been correctly guessed
        const isCorrectlyGuessed = currentGame.correctlyGuessedCountries.includes(currentGame.correctCountries[i]);
        
        countryInput.innerHTML = `
            <label for="countryGuess${i}">Country ${i + 1}:</label>
            <select id="countryGuess${i}" class="dropdown" ${isCorrectlyGuessed ? 'disabled' : ''}>
                <option value="">Select country...</option>
            </select>
        `;
        
        // Populate country dropdown
        const dropdown = countryInput.querySelector('select');
        const sortedCountries = allCountries.sort();
        sortedCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            dropdown.appendChild(option);
        });
        
        // Pre-select correctly guessed countries
        if (isCorrectlyGuessed) {
            dropdown.value = currentGame.correctCountries[i];
        }
        
        countryInputsEl.appendChild(countryInput);
    }
}

// Submit country guess
function submitCountryGuess() {
    if (currentGame.gameOver || currentGame.attempts <= 0) return;
    
    const countryInputs = countryInputsEl.querySelectorAll('select');
    const countryGuesses = Array.from(countryInputs).map(input => input.value).filter(c => c);
    
    // Validate inputs
    if (countryGuesses.length === 0) {
        alert('Please select at least one country.');
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
    
    // Update correctly guessed countries
    countryGuesses.forEach(country => {
        if (currentGame.correctCountries.includes(country) && 
            !currentGame.correctlyGuessedCountries.includes(country)) {
            currentGame.correctlyGuessedCountries.push(country);
        }
    });
    
    // Update UI
    updateUI();
    
    // Check if game is over
    if (results.countriesCorrect) {
        endGame(true);
    } else if (currentGame.attempts <= 0) {
        endGame(false);
    } else {
        // Regenerate country inputs to show correctly guessed countries as disabled
        generateCountryInputs(currentGame.correctLanguage);
    }
    
    // Save game state
    saveGameState();
}

// Update UI
function updateUI() {
    // Update attempts based on current phase
    if (currentGame.currentPhase === 'language') {
        attemptsLeftEl.textContent = currentGame.languageAttempts;
    } else {
        attemptsLeftEl.textContent = currentGame.attempts;
    }
    
    // Update guesses history
    updateGuessesHistory();
    
    // Clear inputs
    languageGuessEl.value = '';
}

// Update guesses history with separate sections for language and country guesses
function updateGuessesHistory() {
    // Clear both sections
    languageGuessesHistoryEl.innerHTML = '';
    countryGuessesHistoryEl.innerHTML = '';
    
    currentGame.guesses.forEach(guess => {
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        
        const guessHeader = document.createElement('div');
        guessHeader.className = 'guess-header';
        
        if (guess.countries.length === 0) {
            // Language-only guess - no header needed since result shows the language
            guessHeader.style.display = 'none';
        } else {
            // Complete guess with countries - no header needed since results show the countries
            guessHeader.style.display = 'none';
        }
        
        const guessResults = document.createElement('div');
        guessResults.className = 'guess-results';
        
        if (guess.countries.length === 0) {
            // Language result only - add to language section
            const languageResult = document.createElement('div');
            languageResult.className = 'result-item';
            languageResult.innerHTML = `
                <div class="result-value ${guess.results.languageCorrect ? 'correct' : 'incorrect'}">
                    ${guess.language} ${guess.results.languageCorrect ? '✓' : '✗'}
                </div>
            `;
            guessResults.appendChild(languageResult);
            
            guessItem.appendChild(guessHeader);
            guessItem.appendChild(guessResults);
            languageGuessesHistoryEl.appendChild(guessItem);
        } else {
            // Individual country results - add to country section
            const correctCountries = currentGame.correctCountries;
            guess.countries.forEach((country, index) => {
                const isCorrect = correctCountries.includes(country);
                const countryResult = document.createElement('div');
                countryResult.className = 'result-item';
                countryResult.innerHTML = `
                    <div class="result-label">Country ${index + 1}</div>
                    <div class="result-value ${isCorrect ? 'correct' : 'incorrect'}">
                        ${country} ${isCorrect ? '✓' : '✗'}
                    </div>
                `;
                guessResults.appendChild(countryResult);
            });
            
            guessItem.appendChild(guessHeader);
            guessItem.appendChild(guessResults);
            countryGuessesHistoryEl.appendChild(guessItem);
        }
    });
}

// End game
function endGame(won) {
    currentGame.gameOver = true;
    
    correctLanguageEl.textContent = currentGame.correctLanguage;
    correctCountriesEl.textContent = currentGame.correctCountries.join(', ');
    // Show the English translation instead of the original sentence
    const lang = currentGame.correctLanguage;
    correctSentenceEl.textContent = gameData[lang] && gameData[lang].translation ? gameData[lang].translation : currentGame.dailySentence;
    
    gameOverEl.style.display = 'block';
    submitLanguageGuessEl.disabled = true;
    submitCountryGuessEl.disabled = true;
    hintBtnEl.disabled = true;
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
    gameOverEl.style.display = 'none';
    submitLanguageGuessEl.disabled = false;
    submitCountryGuessEl.disabled = false;
    hintBtnEl.disabled = false; // Re-enable hint button
    
    // Reset hint state
    hintDisplayEl.style.display = 'none';
    hintBtnEl.textContent = '💡 Show Hint';
    
    // Reset phases
    languagePhaseEl.style.display = 'block';
    countryPhaseEl.style.display = 'none';
    languageResultEl.innerHTML = '';
    
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
                hintDisplayEl.style.display = 'none';
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
            }
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM loaded, starting initialization...');
        initGame();
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
        alert('Error loading game: ' + error.message);
    }
});