// Initialize all systems when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeStreak();
  initializeAchievements();
  initializeProgress();
  
  // Check for achievements based on current state
  checkAchievements();
  
  // Record activity when user interacts with the app
  document.querySelectorAll('nav button, .nav-button, .lesson-card h3, .story-card h3').forEach(el => {
    el.addEventListener('click', recordActivity);
  });
  
  // Specific activity tracking
  document.querySelectorAll('.lesson-card h3').forEach(el => {
    el.addEventListener('click', function() {
      const level = this.closest('.tab-content').id.replace('-lessons', '');
      completeLesson(level);
    });
  });
  
  document.querySelectorAll('.story-card h3').forEach(el => {
    el.addEventListener('click', readStory);
  });
  
  document.querySelectorAll('.record-button').forEach(el => {
    el.addEventListener('click', practicePhrase);
  });
});