/**
 * Math Quest Portal - Authentication & User Management
 * Uses localStorage for persistence
 */

// User Management
const UserManager = {
    // Get all users
    getUsers() {
        const users = localStorage.getItem('mathquest_users');
        return users ? JSON.parse(users) : {};
    },

    // Save users
    saveUsers(users) {
        localStorage.setItem('mathquest_users', JSON.stringify(users));
    },

    // Get current logged in user
    getCurrentUser() {
        const username = localStorage.getItem('mathquest_current_user');
        if (!username) return null;
        const users = this.getUsers();
        return users[username] || null;
    },

    // Get current username
    getCurrentUsername() {
        return localStorage.getItem('mathquest_current_user');
    },

    // Register new user
    register(username, password, displayName) {
        const users = this.getUsers();
        
        if (users[username]) {
            return { success: false, error: 'Username already exists' };
        }

        if (username.length < 3) {
            return { success: false, error: 'Username must be at least 3 characters' };
        }

        if (password.length < 4) {
            return { success: false, error: 'Password must be at least 4 characters' };
        }

        users[username] = {
            username,
            password: this.hashPassword(password),
            displayName: displayName || username,
            createdAt: new Date().toISOString(),
            history: []
        };

        this.saveUsers(users);
        return { success: true };
    },

    // Login user
    login(username, password) {
        const users = this.getUsers();
        const user = users[username];

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, error: 'Incorrect password' };
        }

        localStorage.setItem('mathquest_current_user', username);
        return { success: true, user };
    },

    // Logout user
    logout() {
        localStorage.removeItem('mathquest_current_user');
    },

    // Simple hash function (not for production use)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    },

    // Add exam result to history
    addToHistory(result) {
        const username = this.getCurrentUsername();
        if (!username) return;

        const users = this.getUsers();
        if (!users[username]) return;

        // Ensure history array exists
        if (!users[username].history) {
            users[username].history = [];
        }

        const historyEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            grade: result.grade,
            score: result.score,
            correct: result.correct,
            incorrect: result.incorrect,
            totalQuestions: result.totalQuestions,
            pointsEarned: result.pointsEarned,
            totalPoints: result.totalPoints,
            timeTaken: result.timeTaken
        };

        users[username].history.unshift(historyEntry);
        
        // Keep only last 50 entries
        if (users[username].history.length > 50) {
            users[username].history = users[username].history.slice(0, 50);
        }

        this.saveUsers(users);
        
        console.log('History saved:', historyEntry);
        console.log('Total history items:', users[username].history.length);
    },

    // Get user history
    getHistory() {
        const user = this.getCurrentUser();
        if (!user) return [];
        // Ensure history exists
        return user.history || [];
    },

    // Get user stats
    getStats() {
        const history = this.getHistory();
        if (history.length === 0) {
            return {
                totalExams: 0,
                averageScore: 0,
                bestScore: 0,
                totalQuestions: 0,
                totalCorrect: 0
            };
        }

        const totalExams = history.length;
        const totalScore = history.reduce((sum, h) => sum + h.score, 0);
        const bestScore = Math.max(...history.map(h => h.score));
        const totalQuestions = history.reduce((sum, h) => sum + h.totalQuestions, 0);
        const totalCorrect = history.reduce((sum, h) => sum + h.correct, 0);

        return {
            totalExams,
            averageScore: Math.round(totalScore / totalExams),
            bestScore,
            totalQuestions,
            totalCorrect
        };
    },

    // Update display name
    updateDisplayName(newName) {
        const username = this.getCurrentUsername();
        if (!username) return false;

        const users = this.getUsers();
        if (users[username]) {
            users[username].displayName = newName;
            this.saveUsers(users);
            return true;
        }
        return false;
    }
};

// UI Functions for Auth
function showAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
    switchAuthMode(mode);
}

function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
    clearAuthForms();
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (mode === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    }
    clearAuthErrors();
}

function clearAuthForms() {
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-displayname').value = '';
    clearAuthErrors();
}

function clearAuthErrors() {
    document.getElementById('login-error').textContent = '';
    document.getElementById('signup-error').textContent = '';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const result = UserManager.login(username, password);
    
    if (result.success) {
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('login-error').textContent = result.error;
    }
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    const displayName = document.getElementById('signup-displayname').value.trim();

    const result = UserManager.register(username, password, displayName);
    
    if (result.success) {
        // Auto login after signup
        UserManager.login(username, password);
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('signup-error').textContent = result.error;
    }
}

function handleLogout() {
    UserManager.logout();
    updateAuthUI();
    // If on history page, go home
    if (document.getElementById('history-page').classList.contains('active')) {
        showPage('landing-page');
    }
}

function updateAuthUI() {
    const user = UserManager.getCurrentUser();
    const historyLink = document.getElementById('history-link');
    
    // Header user area elements
    const userIconGuest = document.getElementById('user-icon-guest');
    const userDropdown = document.getElementById('user-dropdown');
    const avatarLetter = document.getElementById('avatar-letter');
    const dropdownName = document.getElementById('dropdown-name');
    const dropdownStats = document.getElementById('dropdown-stats');

    if (user) {
        // Show logged in state
        if (userIconGuest) userIconGuest.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (avatarLetter) avatarLetter.textContent = user.displayName.charAt(0).toUpperCase();
        if (dropdownName) dropdownName.textContent = user.displayName;
        if (historyLink) historyLink.style.display = 'inline';
        
        // Update stats in dropdown
        const stats = UserManager.getStats();
        if (dropdownStats) dropdownStats.textContent = `${stats.totalExams} exams • ${stats.averageScore}% avg`;
    } else {
        // Show guest state
        if (userIconGuest) userIconGuest.style.display = 'flex';
        if (userDropdown) userDropdown.style.display = 'none';
        if (historyLink) historyLink.style.display = 'none';
    }
}

// Toggle user dropdown menu
function toggleUserMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const userDropdown = document.getElementById('user-dropdown');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (userDropdown && dropdownMenu && !userDropdown.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

function showHistoryPage() {
    const user = UserManager.getCurrentUser();
    if (!user) {
        showAuthModal('login');
        return;
    }

    renderHistory();
    showPage('history-page');
}

function renderHistory() {
    const history = UserManager.getHistory();
    const stats = UserManager.getStats();
    const historyList = document.getElementById('history-list');
    const user = UserManager.getCurrentUser();

    console.log('Rendering history:', history);
    console.log('Stats:', stats);

    // Update stats - with null checks
    const statTotalExams = document.getElementById('stat-total-exams');
    const statAvgScore = document.getElementById('stat-avg-score');
    const statBestScore = document.getElementById('stat-best-score');
    const statTotalCorrect = document.getElementById('stat-total-correct');
    const historyUserName = document.getElementById('history-user-name');

    if (statTotalExams) statTotalExams.textContent = stats.totalExams;
    if (statAvgScore) statAvgScore.textContent = stats.averageScore + '%';
    if (statBestScore) statBestScore.textContent = stats.bestScore + '%';
    if (statTotalCorrect) statTotalCorrect.textContent = stats.totalCorrect;
    if (historyUserName) historyUserName.textContent = user ? user.displayName : '';

    if (!historyList) {
        console.error('History list element not found');
        return;
    }

    // Render history list
    if (!history || history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <span class="empty-icon">📝</span>
                <p>No exam history yet. Take your first exam!</p>
                <button class="action-btn retry-btn" onclick="goHome()">Start Practicing</button>
            </div>
        `;
        return;
    }

    historyList.innerHTML = history.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const scoreClass = entry.score >= 70 ? 'good' : entry.score >= 50 ? 'ok' : 'poor';

        return `
            <div class="history-item">
                <div class="history-grade">
                    <span class="grade-badge">Grades ${entry.grade}</span>
                    <span class="history-date">${formattedDate}</span>
                </div>
                <div class="history-stats">
                    <div class="history-score ${scoreClass}">${entry.score}%</div>
                    <div class="history-details">
                        <span>✓ ${entry.correct}/${entry.totalQuestions}</span>
                        <span>⏱ ${entry.timeTaken}</span>
                        <span>🎯 ${entry.pointsEarned}/${entry.totalPoints} pts</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

