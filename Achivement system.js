// Achievements System
const achievements = {
  firstLesson: { earned: true, date: null },
  bookworm: { earned: false, progress: 0, required: 5 },
  threeDayStreak: { earned: false },
  speaker: { earned: false, progress: 0, required: 10 },
  alphabetMaster: { earned: false },
  sevenDayStreak: { earned: false }
};

// Initialize from localStorage
function initializeAchievements() {
  const savedAchievements = localStorage.getItem('amharicAchievements');
  if (savedAchievements) {
    Object.assign(achievements, JSON.parse(savedAchievements));
  }
  updateAchievementsDisplay();
}

// Check for new achievements
function checkAchievements() {
  // Check streak achievements
  if (streak.current >= 3 && !achievements.threeDayStreak.earned) {
    achievements.threeDayStreak.earned = true;
    achievements.threeDayStreak.date = new Date().toISOString();
    showAchievementNotification('3-Day Streak', '💪');
  }
  
  if (streak.current >= 7 && !achievements.sevenDayStreak.earned) {
    achievements.sevenDayStreak.earned = true;
    achievements.sevenDayStreak.date = new Date().toISOString();
    showAchievementNotification('7-Day Streak', '🔥');
  }
  
  localStorage.setItem('amharicAchievements', JSON.stringify(achievements));
  updateAchievementsDisplay();
}

// Update the achievements UI
function updateAchievementsDisplay() {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="achievement ${achievements.firstLesson.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.firstLesson.earned ? '🥇' : '🔒'}</div>
      <h4>First Lesson</h4>
      <p>Completed your first Amharic lesson</p>
    </div>
    <div class="achievement ${achievements.bookworm.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.bookworm.earned ? '📚' : '🔒'}</div>
      <h4>Bookworm</h4>
      <p>Read ${achievements.bookworm.progress}/${achievements.bookworm.required} stories</p>
    </div>
    <div class="achievement ${achievements.threeDayStreak.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.threeDayStreak.earned ? '💪' : '🔒'}</div>
      <h4>3-Day Streak</h4>
      <p>Learned for 3 days straight</p>
    </div>
    <div class="achievement ${achievements.speaker.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.speaker.earned ? '🎤' : '🔒'}</div>
      <h4>Speaker</h4>
      <p>Practiced ${achievements.speaker.progress}/${achievements.speaker.required} phrases</p>
    </div>
    <div class="achievement ${achievements.alphabetMaster.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.alphabetMaster.earned ? '🏆' : '🔒'}</div>
      <h4>Alphabet Master</h4>
      <p>Learn all Amharic letters</p>
    </div>
    <div class="achievement ${achievements.sevenDayStreak.earned ? '' : 'locked'}">
      <div class="achievement-badge">${achievements.sevenDayStreak.earned ? '🔥' : '🔒'}</div>
      <h4>7-Day Streak</h4>
      <p>Learn for 7 days straight</p>
    </div>
  `;
}

// Show a notification when achievement is earned
function showAchievementNotification(title, emoji) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#2ecc71';
  notification.style.color = 'white';
  notification.style.padding = '15px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  notification.style.zIndex = '1000';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.innerHTML = `
    <span style="font-size: 24px; margin-right: 10px;">${emoji}</span>
    <div>
      <strong>Achievement Unlocked!</strong><br>
      ${title}
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 1s';
    setTimeout(() => notification.remove(), 1000);
  }, 3000);
}