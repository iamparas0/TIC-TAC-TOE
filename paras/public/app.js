// Data Store
const store = {
    features: JSON.parse(localStorage.getItem('ttt_features')) || {
        aiDifficulty: {
            votes: 0,
            voted: false,
            description: 'Multiple AI difficulty levels (Easy, Medium, Hard)',
            category: 'gameplay'
        },
        customMarkers: {
            votes: 0,
            voted: false,
            description: 'Customize your X and O markers with different symbols',
            category: 'customization'
        },
        timeLimit: {
            votes: 0,
            voted: false,
            description: 'Add optional time limit for each move',
            category: 'gameplay'
        },
        animations: {
            votes: 0,
            voted: false,
            description: 'Smooth animations for moves and wins',
            category: 'customization'
        }
    },
    themes: JSON.parse(localStorage.getItem('ttt_themes')) || {
        classic: {
            votes: 0,
            voted: false,
            colors: {
                board: '#2c3e50',
                cells: '#ffffff',
                markers: '#34495e'
            }
        },
        neon: {
            votes: 0,
            voted: false,
            colors: {
                board: '#000000',
                cells: '#1a1a1a',
                markers: '#ff00ff'
            }
        },
        nature: {
            votes: 0,
            voted: false,
            colors: {
                board: '#2ecc71',
                cells: '#f1f8e9',
                markers: '#27ae60'
            }
        }
    },
    gameModes: JSON.parse(localStorage.getItem('ttt_modes')) || {
        tournament: {
            votes: 0,
            voted: false,
            description: 'Play a series of games to crown a champion'
        },
        blitz: {
            votes: 0,
            voted: false,
            description: '3-minute games with quick moves'
        },
        bestOf: {
            votes: 0,
            voted: false,
            description: 'Best of 3/5/7 series against AI or friends'
        }
    },
    feedback: JSON.parse(localStorage.getItem('ttt_feedback')) || []
};
// Page Templates
const templates = {
    home: () => `
        <div class="card">
            <h2>Welcome to Tic Tac Toe Community Voting!</h2>
            <p>Help us improve the game by voting on new features, themes, and game modes.</p>
            <div class="progress-bar">
                <div class="progress" style="width: 75%"></div>
            </div>
            <p>Current voting round ends in 5 days</p>
        </div>
        <div class="card">
            <h3>Most Popular Features</h3>
            <div class="feature-grid">
                ${getTopFeatures(3)}
            </div>
        </div>
    `,

    features: () => `
        <div class="card">
            <h2>Vote on New Features</h2>
            <div class="feature-grid">
                ${Object.entries(store.features).map(([id, feature]) => `
                    <div class="feature-card">
                        <h3>${formatTitle(id)}</h3>
                        <p>${feature.description}</p>
                        <div class="vote-section">
                            <button class="vote-btn" 
                                    onclick="voteFeature('${id}')"
                                    ${feature.voted ? 'disabled' : ''}>
                                ${feature.voted ? 'Voted' : 'Vote'}
                            </button>
                            <span class="vote-count">${feature.votes} votes</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    themes: () => `
        <div class="card">
            <h2>Vote on Game Themes</h2>
            <div class="feature-grid">
                ${Object.entries(store.themes).map(([id, theme]) => `
                    <div class="feature-card">
                        <h3>${formatTitle(id)} Theme</h3>
                        <div class="theme-preview" style="background-color: ${theme.colors.board}">
                            ${Array(9).fill('').map((_, i) => `
                                <div class="theme-cell" style="background-color: ${theme.colors.cells}; color: ${theme.colors.markers}">
                                    ${i % 2 === 0 ? 'X' : 'O'}
                                </div>
                            `).join('')}
                        </div>
                        <div class="vote-section">
                            <button class="vote-btn" 
                                    onclick="voteTheme('${id}')"
                                    ${theme.voted ? 'disabled' : ''}>
                                ${theme.voted ? 'Voted' : 'Vote'}
                            </button>
                            <span class="vote-count">${theme.votes} votes</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    modes: () => `
        <div class="card">
            <h2>Vote on Game Modes</h2>
            <div class="feature-grid">
                ${Object.entries(store.gameModes).map(([id, mode]) => `
                    <div class="feature-card">
                        <h3>${formatTitle(id)} Mode</h3>
                        <p>${mode.description}</p>
                        <div class="vote-section">
                            <button class="vote-btn" 
                                    onclick="voteGameMode('${id}')"
                                    ${mode.voted ? 'disabled' : ''}>
                                ${mode.voted ? 'Voted' : 'Vote'}
                            </button>
                            <span class="vote-count">${mode.votes} votes</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    feedback: () => `
        <div class="card">
            <h2>Share Your Feedback</h2>
            <form class="feedback-form" id="feedbackForm">
                <h3>How would you rate the current game?</h3>
                <div class="rating-buttons">
                    ${[1, 2, 3, 4, 5].map(num => `
                        <button type="button" class="rating-btn" data-rating="${num}">${num}</button>
                    `).join('')}
                </div>
                <textarea name="feedback" placeholder="What would make the game better?" required></textarea>
                <button type="submit" class="vote-btn">Submit Feedback</button>
            </form>
        </div>
    `
};

// Helper Functions remain the same
function formatTitle(str) {
    return str
        .split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getTopFeatures(count) {
    return Object.entries(store.features)
        .sort((a, b) => b[1].votes - a[1].votes)
        .slice(0, count)
        .map(([id, feature]) => `
            <div class="feature-card">
                <h3>${formatTitle(id)}</h3>
                <p>${feature.description}</p>
                <div class="vote-section">
                    <span class="vote-count">${feature.votes} votes</span>
                </div>
            </div>
        `).join('');
}

// Voting functions remain the same
function voteFeature(featureId) {
    const feature = store.features[featureId];
    if (!feature.voted) {
        feature.votes++;
        feature.voted = true;
        localStorage.setItem('ttt_features', JSON.stringify(store.features));
        loadPage('features');
    }
}

function voteTheme(themeId) {
    const theme = store.themes[themeId];
    if (!theme.voted) {
        theme.votes++;
        theme.voted = true;
        localStorage.setItem('ttt_themes', JSON.stringify(store.themes));
        loadPage('themes');
    }
}

function voteGameMode(modeId) {
    const mode = store.gameModes[modeId];
    if (!mode.voted) {
        mode.votes++;
        mode.voted = true;
        localStorage.setItem('ttt_modes', JSON.stringify(store.gameModes));
        loadPage('modes');
    }
}

function handleFeedbackSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const rating = form.querySelector('.rating-btn.active')?.dataset.rating;
    const feedbackText = form.querySelector('textarea[name="feedback"]').value;

    if (!rating || !feedbackText) {
        alert('Please provide both a rating and feedback text');
        return;
    }

    const feedback = {
        rating: parseInt(rating),
        text: feedbackText,
        timestamp: new Date().toISOString()
    };

    store.feedback.push(feedback);
    localStorage.setItem('ttt_feedback', JSON.stringify(store.feedback));

    form.reset();
    alert('Thank you for your feedback!');
    loadPage('home');
}

// Updated Page Loading and Navigation
function loadPage(pageName) {
    const contentDiv = document.getElementById('content');
    if (contentDiv && templates[pageName]) {
        contentDiv.innerHTML = templates[pageName]();
        
        // Update active nav state
        document.querySelectorAll('nav a').forEach(link => {
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Add event listeners after loading page
        if (pageName === 'feedback') {
            const form = document.getElementById('feedbackForm');
            const ratingButtons = form.querySelectorAll('.rating-btn');
            
            form.addEventListener('submit', handleFeedbackSubmit);
            
            ratingButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    ratingButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            loadPage(page);
        });
    });

    // Load initial page
    loadPage('home');
});