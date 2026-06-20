/**
 * Math Quest Portal - Authentication & User Management
 * Uses localStorage for persistence
 */

const USER_ROLES = {
    admin: {
        label: 'Admin',
        homeTitle: 'School Admin',
        welcome: 'Manage students, teachers, parent access, and support requests.'
    },
    teacher: {
        label: 'Teacher',
        homeTitle: 'Teacher',
        welcome: 'Create practice routines, review progress, and help students improve.'
    },
    parent: {
        label: 'Parent',
        homeTitle: 'Parent',
        welcome: 'Track practice, review results, and support learning at home.'
    }
};

const DEFAULT_ROLE = 'parent';

function normalizeRole(role) {
    return USER_ROLES[role] ? role : DEFAULT_ROLE;
}

function roleLabel(role) {
    return USER_ROLES[normalizeRole(role)].label;
}

function roleFromForm(fieldName) {
    const selected = document.querySelector(`input[name="${fieldName}"]:checked`);
    return normalizeRole(selected ? selected.value : DEFAULT_ROLE);
}

function normalizePhone(rawValue) {
    return String(rawValue || '').replace(/[^\d+]/g, '').trim();
}

function isValidPhone(rawValue) {
    return /^\+?\d{10,15}$/.test(normalizePhone(rawValue));
}

function googleClientId() {
    const meta = document.querySelector('meta[name="google-signin-client_id"]');
    return (meta && meta.content && meta.content.trim())
        || localStorage.getItem('mathquest_google_client_id')
        || '';
}

function decodeJwtPayload(token) {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(base64).split('').map(char => {
            return `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`;
        }).join(''));
        return JSON.parse(json);
    } catch (error) {
        console.warn('Unable to decode Google credential payload:', error);
        return {};
    }
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

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
        const user = users[username] || null;
        if (user && !user.role) {
            user.role = DEFAULT_ROLE;
        }
        return user;
    },

    // Get current username
    getCurrentUsername() {
        return localStorage.getItem('mathquest_current_user');
    },

    createUserRecord({ username, password, displayName, role, provider, email, phone }) {
        return {
            username,
            password: password ? this.hashPassword(password) : null,
            displayName: displayName || username,
            email: email || '',
            phone: phone || '',
            role: normalizeRole(role),
            provider: provider || 'password',
            createdAt: new Date().toISOString(),
            history: []
        };
    },

    // Register new user
    register(username, password, displayName, role = DEFAULT_ROLE) {
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

        users[username] = this.createUserRecord({
            username,
            password,
            displayName: displayName || username,
            role,
            provider: 'password'
        });

        this.saveUsers(users);
        return { success: true };
    },

    loginWithGoogle(profile, role = DEFAULT_ROLE) {
        const users = this.getUsers();
        const email = String(profile.email || '').trim().toLowerCase();
        if (!email) {
            return { success: false, error: 'Google account email is required' };
        }

        const username = `google:${email}`;
        if (!users[username]) {
            users[username] = this.createUserRecord({
                username,
                displayName: profile.name || email.split('@')[0],
                email,
                role,
                provider: 'google'
            });
        } else {
            users[username].displayName = profile.name || users[username].displayName || email.split('@')[0];
            users[username].email = email;
            users[username].role = normalizeRole(role || users[username].role);
            users[username].provider = 'google';
        }

        this.saveUsers(users);
        localStorage.setItem('mathquest_current_user', username);
        return { success: true, user: users[username] };
    },

    signupWithWhatsapp(displayName, phone, role = DEFAULT_ROLE) {
        const normalizedPhone = normalizePhone(phone);
        if (!displayName || displayName.length < 2) {
            return { success: false, error: 'Name must be at least 2 characters' };
        }
        if (!isValidPhone(normalizedPhone)) {
            return { success: false, error: 'Enter a valid WhatsApp phone number with country code' };
        }

        const users = this.getUsers();
        const username = `whatsapp:${normalizedPhone}`;
        if (users[username]) {
            return { success: false, error: 'A WhatsApp account already exists for this number' };
        }

        users[username] = this.createUserRecord({
            username,
            displayName,
            phone: normalizedPhone,
            role,
            provider: 'whatsapp'
        });

        this.saveUsers(users);
        localStorage.setItem('mathquest_current_user', username);
        return { success: true, user: users[username] };
    },

    // Login user
    login(username, password, role = null) {
        const users = this.getUsers();
        const user = users[username];

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        if (!user.password || user.password !== this.hashPassword(password)) {
            return { success: false, error: 'Incorrect password' };
        }

        const selectedRole = role ? normalizeRole(role) : null;
        const userRole = normalizeRole(user.role);
        if (selectedRole && userRole !== selectedRole) {
            return { success: false, error: `This account is registered as ${roleLabel(userRole)}` };
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
    const whatsappForm = document.getElementById('whatsapp-signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const whatsappTab = document.getElementById('whatsapp-tab');

    if (mode === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        whatsappForm.style.display = 'none';
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        whatsappTab.classList.remove('active');
    } else if (mode === 'signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        whatsappForm.style.display = 'none';
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
        whatsappTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        whatsappForm.style.display = 'block';
        loginTab.classList.remove('active');
        signupTab.classList.remove('active');
        whatsappTab.classList.add('active');
    }
    clearAuthErrors();
}

function clearAuthForms() {
    [
        'login-username',
        'login-password',
        'signup-username',
        'signup-password',
        'signup-displayname',
        'whatsapp-displayname',
        'whatsapp-phone'
    ].forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = '';
    });
    clearAuthErrors();
}

function clearAuthErrors() {
    ['login-error', 'signup-error', 'whatsapp-error'].forEach(id => {
        const error = document.getElementById(id);
        if (error) error.textContent = '';
    });
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const role = roleFromForm('login-role');

    const result = UserManager.login(username, password, role);
    
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
    const role = roleFromForm('signup-role');

    const result = UserManager.register(username, password, displayName, role);
    
    if (result.success) {
        // Auto login after signup
        UserManager.login(username, password, role);
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('signup-error').textContent = result.error;
    }
}

function handleWhatsappSignup(event) {
    event.preventDefault();
    const displayName = document.getElementById('whatsapp-displayname').value.trim();
    const phone = document.getElementById('whatsapp-phone').value.trim();
    const role = roleFromForm('whatsapp-role');

    const result = UserManager.signupWithWhatsapp(displayName, phone, role);

    if (result.success) {
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('whatsapp-error').textContent = result.error;
    }
}

function handleGoogleCredentialResponse(response) {
    const role = roleFromForm('login-role');
    const profile = decodeJwtPayload(response.credential || '');
    const result = UserManager.loginWithGoogle(profile, role);
    if (result.success) {
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('login-error').textContent = result.error;
    }
}

function handleGoogleLogin() {
    const role = roleFromForm('login-role');
    const clientId = googleClientId();

    if (window.google && window.google.accounts && window.google.accounts.id && clientId) {
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse
        });
        window.google.accounts.id.prompt(notification => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                showGoogleFallback(role);
            }
        });
        return;
    }

    showGoogleFallback(role);
}

function showGoogleFallback(role) {
    const email = window.prompt('Enter your Google email to continue in local preview mode:');
    if (!email) return;
    const name = window.prompt('Name to show in Math Quest:', email.split('@')[0]) || email.split('@')[0];
    const result = UserManager.loginWithGoogle({ email, name }, role);
    if (result.success) {
        hideAuthModal();
        updateAuthUI();
    } else {
        document.getElementById('login-error').textContent = result.error;
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
    const dropdownRole = document.getElementById('dropdown-role');
    const roleWelcome = document.getElementById('role-welcome');

    if (user) {
        // Show logged in state
        if (userIconGuest) userIconGuest.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (avatarLetter) avatarLetter.textContent = user.displayName.charAt(0).toUpperCase();
        if (dropdownName) dropdownName.textContent = user.displayName;
        if (dropdownRole) dropdownRole.textContent = `${roleLabel(user.role)} login`;
        if (historyLink) historyLink.style.display = 'inline';
        if (roleWelcome) {
            const role = USER_ROLES[normalizeRole(user.role)];
            roleWelcome.innerHTML = `<strong>${role.homeTitle}:</strong> ${role.welcome}`;
            roleWelcome.style.display = 'block';
        }
        
        // Update stats in dropdown
        const stats = UserManager.getStats();
        if (dropdownStats) dropdownStats.textContent = `${stats.totalExams} exams • ${stats.averageScore}% avg`;
    } else {
        // Show guest state
        if (userIconGuest) userIconGuest.style.display = 'flex';
        if (userDropdown) userDropdown.style.display = 'none';
        if (historyLink) historyLink.style.display = 'none';
        if (roleWelcome) roleWelcome.style.display = 'none';
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

const SupportChat = {
    getMessages() {
        const messages = localStorage.getItem('mathquest_support_messages');
        return messages ? JSON.parse(messages) : [
            {
                from: 'bot',
                text: 'Hi! I can help with account access, teacher setup, parent progress, and WhatsApp signup.'
            }
        ];
    },

    saveMessages(messages) {
        localStorage.setItem('mathquest_support_messages', JSON.stringify(messages.slice(-30)));
    },

    addMessage(from, text) {
        const messages = this.getMessages();
        messages.push({
            from,
            text,
            at: new Date().toISOString()
        });
        this.saveMessages(messages);
        renderSupportMessages();
    },

    replyTo(message) {
        const lower = message.toLowerCase();
        if (lower.includes('whatsapp')) {
            return 'WhatsApp signup is available now. Open Login, choose WhatsApp, select Admin, Teacher, or Parent, then enter your number.';
        }
        if (lower.includes('google')) {
            return 'Use Continue with Google from the Login tab. Add a Google client ID in the page meta tag before production launch.';
        }
        if (lower.includes('teacher')) {
            return 'Teacher accounts can view history and are ready for classroom tools in the next backend phase.';
        }
        if (lower.includes('admin')) {
            return 'Admin login is available as a role now. Full school management can be connected when backend APIs are added.';
        }
        if (lower.includes('parent')) {
            return 'Parent accounts can save progress locally and are ready for child-linking once the backend is connected.';
        }
        return 'Thanks. I saved this support question locally. A WhatsApp handoff can use this same message queue later.';
    }
};

function toggleSupportChat() {
    const panel = document.getElementById('support-chat-panel');
    if (!panel) return;
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
        renderSupportMessages();
        const input = document.getElementById('support-chat-input');
        if (input) input.focus();
    }
}

function renderSupportMessages() {
    const container = document.getElementById('support-chat-messages');
    if (!container) return;
    container.innerHTML = SupportChat.getMessages().map(message => `
        <div class="support-message ${message.from === 'user' ? 'user' : 'bot'}">
            ${escapeHtml(message.text)}
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

function handleSupportMessage(event) {
    event.preventDefault();
    const input = document.getElementById('support-chat-input');
    const text = input ? input.value.trim() : '';
    if (!text) return;
    SupportChat.addMessage('user', text);
    if (input) input.value = '';
    window.setTimeout(() => {
        SupportChat.addMessage('bot', SupportChat.replyTo(text));
    }, 200);
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    renderSupportMessages();
});
