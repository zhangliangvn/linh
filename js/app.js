// ============================================
// APP.JS - Main Application
// ============================================

class MarathonTrainingApp {
    constructor() {
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.currentTab = 'training';
        this.currentFilter = 'all';
        this.modal = null;
        this.editModal = null;
        this.initModals();
        this.initEventListeners();
    }

    initModals() {
        this.modal = new WorkoutModal();
        this.editModal = new EditWorkoutModal();
        window.workoutModal = this.modal;
        window.editModal = this.editModal;
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        this.currentTab = tabName;

        if (tabName === 'training') {
            this.renderTraining();
        } else if (tabName === 'manage') {
            this.renderManage();
        } else if (tabName === 'swimming') {
            this.renderSwimming();
        }
    }

    async renderTraining() {
        const todayWorkout = TrainingUtils.getTodayWorkout();
        const weekWorkouts = TrainingUtils.getWeekWorkouts();
        const stats = TrainingUtils.calculateStats();
        
        const html = `
            ${UIRenderer.renderTodayWorkout(todayWorkout, null)}
            ${UIRenderer.renderStats(stats)}
            ${UIRenderer.renderWeekView(weekWorkouts, null, this.modal)}
        `;
        
        document.getElementById('mainContent').innerHTML = html;
        
        this.attachDayCardHandlers(weekWorkouts);
        
        WeatherService.loadWeatherData().then(weatherData => {
            if (weatherData) {
                const htmlWithWeather = `
                    ${UIRenderer.renderTodayWorkout(todayWorkout, weatherData)}
                    ${UIRenderer.renderStats(stats)}
                    ${UIRenderer.renderWeekView(weekWorkouts, weatherData, this.modal)}
                `;
                document.getElementById('mainContent').innerHTML = htmlWithWeather;
                this.attachDayCardHandlers(weekWorkouts, weatherData);
            }
        });
    }

    attachDayCardHandlers(weekWorkouts, weatherData = null) {
        weekWorkouts.forEach(day => {
            if (!day.workout) return;
            
            const cardId = `day-card-${day.date.getTime()}`;
            const card = document.getElementById(cardId);
            
            if (card) {
                card.addEventListener('click', () => {
                    this.modal.open(day.workout, day.date, weatherData);
                });
            }
        });
    }

    async renderManage() {
        const html = ManageRenderer.renderManageTab(this.currentFilter);
        document.getElementById('manageTable').innerHTML = html;
        
        document.querySelectorAll('.manage-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const date = e.target.dataset.date;
                const workout = trainingData.find(w => w.date === date);
                if (workout && this.editModal) {
                    const parsedDate = TrainingUtils.parseDate(date);
                    this.editModal.open(workout, parsedDate);
                }
            });
        });
        
        document.querySelectorAll('.manage-table tbody tr:not(.week-separator)').forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.classList.contains('manage-edit-btn')) return;
                
                const date = row.dataset.date;
                const workout = trainingData.find(w => w.date === date);
                if (workout && this.modal) {
                    const parsedDate = TrainingUtils.parseDate(date);
                    this.modal.open(workout, parsedDate, weatherCache);
                }
            });
        });
    }

    async renderSwimming() {
        document.getElementById('swimmingContent').innerHTML = `
            <div class="swimming-section">
                <div class="swimming-card">
                    <div class="swimming-header">
                        <span class="swimming-title">🌊 Điều kiện bơi</span>
                        <span class="swimming-time">Đang tải...</span>
                    </div>
                    <div class="swimming-recommendation">
                        <div class="recommendation-text">
                            Tính năng Swimming đang được phát triển. 
                            Vui lòng quay lại sau!
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initEventListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                if (this.currentTab === 'manage') {
                    this.renderManage();
                }
            }
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            resetTrainingData();
        });

        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                if (this.currentTab === 'training') {
                    this.renderTraining();
                } else if (this.currentTab === 'manage') {
                    this.renderManage();
                }
            }
        });
    }

    handleSwipe() {
        const swipeDistance = this.touchStartY - this.touchEndY;
        if (swipeDistance < -100 && window.scrollY === 0) {
            this.refreshData();
        }
    }

    refreshData() {
        weatherCache = {
            current: null,
            forecast: null,
            lastUpdate: null,
            location: null
        };
        
        const locationInfo = document.getElementById('locationInfo');
        locationInfo.innerHTML = `
            <span class="mini-spinner"></span>
            <span>Đang làm mới...</span>
        `;
        
        setTimeout(() => {
            if (this.currentTab === 'training') {
                this.renderTraining();
            } else if (this.currentTab === 'manage') {
                this.renderManage();
            }
        }, 300);
    }

    checkEditedState() {
        const savedData = localStorage.getItem('trainingData');
        const editIndicator = document.getElementById('editIndicator');
        const resetBtn = document.getElementById('resetBtn');
        
        if (savedData) {
            editIndicator.style.display = 'inline-flex';
            resetBtn.style.display = 'inline-block';
        } else {
            editIndicator.style.display = 'none';
            resetBtn.style.display = 'none';
        }
    }

    scheduleUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            weatherCache = {
                current: null,
                forecast: null,
                lastUpdate: null,
                location: null
            };
            
            if (this.currentTab === 'training') {
                this.renderTraining();
            } else if (this.currentTab === 'manage') {
                this.renderManage();
            }
            this.scheduleUpdate();
        }, msUntilMidnight);
    }

    init() {
        loadTrainingData().then(() => {
            this.checkEditedState();
            this.renderTraining();
        }).catch((error) => {
            console.error('Failed to load training data:', error);
            this.renderTraining();
        });

        this.scheduleUpdate();
    }
}

// ============================================
// APPLICATION INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MarathonTrainingApp();
    window.app.init();
});