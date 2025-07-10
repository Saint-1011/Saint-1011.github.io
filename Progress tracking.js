// Progress Tracking System
const progress = {
  wordsLearned: 42,
  lessonsCompleted: {
    beginner: 4,
    intermediate: 1,
    advanced: 0
  },
  timeSpent: {
    thisWeek: 126, // in minutes
    weeklyGoal: 180
  }
};

// Initialize from localStorage
function initializeProgress() {
  const savedProgress = localStorage.getItem('amharicProgress');
  if (savedProgress) {
    Object.assign(progress, JSON.parse(savedProgress));
  }
  updateProgressDisplay();
}

// Update progress UI
function updateProgressDisplay() {
  // Words learned progress
  const wordsProgress = (progress.wordsLearned / 50) * 100;
  document.querySelector('#achievements-container + .progress-bar .progress-fill').style.width = `${wordsProgress}%`;
  
  // Lesson completion
  const beginnerProgress = (progress.lessonsCompleted.beginner / 6) * 100;
  const intermediateProgress = (progress.lessonsCompleted.intermediate / 5) * 100;
  const advancedProgress = (progress.lessonsCompleted.advanced / 4) * 100;
  
  document.querySelectorAll('#progress .progress-fill')[0].style.width = `${beginnerProgress}%`;
  document.querySelectorAll('#progress .progress-fill')[1].style.width = `${intermediateProgress}%`;
  document.querySelectorAll('#progress .progress-fill')[2].style.width = `${advancedProgress}%`;
  
  // Time spent
  const timeProgress = (progress.timeSpent.thisWeek / progress.timeSpent.weeklyGoal) * 100;
  document.querySelector('#progress .progress-fill[style*="width: 70%"]').style.width = `${timeProgress}%`;
}

// Call these when user completes activities
function completeLesson(level) {
  progress.lessonsCompleted[level]++;
  localStorage.setItem('amharicProgress', JSON.stringify(progress));
  updateProgressDisplay();
  
  if (level === 'beginner' && progress.lessonsCompleted.beginner === 1) {
    achievements.firstLesson.earned = true;
    achievements.firstLesson.date = new Date().toISOString();
    showAchievementNotification('First Lesson', '🥇');
    localStorage.setItem('amharicAchievements', JSON.stringify(achievements));
    updateAchievementsDisplay();
  }
}

function readStory() {
  achievements.bookworm.progress++;
  if (achievements.bookworm.progress >= achievements.bookworm.required) {
    achievements.bookworm.earned = true;
    achievements.bookworm.date = new Date().toISOString();
    showAchievementNotification('Bookworm', '📚');
  }
  localStorage.setItem('amharicAchievements', JSON.stringify(achievements));
  updateAchievementsDisplay();
}

function practicePhrase() {
  achievements.speaker.progress++;
  if (achievements.speaker.progress >= achievements.speaker.required) {
    achievements.speaker.earned = true;
    achievements.speaker.date = new Date().toISOString();
    showAchievementNotification('Speaker', '🎤');
  }
  localStorage.setItem('amharicAchievements', JSON.stringify(achievements));
  updateAchievementsDisplay();
}