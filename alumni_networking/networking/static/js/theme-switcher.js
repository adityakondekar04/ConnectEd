// Simple theme toggling functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Theme switcher script loaded");
    
    const newThemeToggle = document.getElementById('new-theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default light theme
    const savedTheme = localStorage.getItem('theme');
      // Apply saved theme on page load
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        if (newThemeToggle) newThemeToggle.checked = true;
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        if (newThemeToggle) newThemeToggle.checked = false;
    }
    
    // Direct toggle event handler for the new toggle button
    if (newThemeToggle) {
        console.log("Adding click event listener to new theme toggle");
          newThemeToggle.addEventListener('change', function() {
            console.log("New toggle clicked, checked state:", this.checked);
            if (this.checked) {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                console.log("Dark theme applied");
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                console.log("Light theme applied");
            }
        });
    } else {
        console.error("New theme toggle element not found!");
    }
});
