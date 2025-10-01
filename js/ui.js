// ============================================
// UI.JS - Modals + Renderers
// ============================================

// ============================================
// EDIT WORKOUT MODAL
// ============================================
class EditWorkoutModal {
    constructor() {
        this.modal = null;
        this.currentWorkout = null;
        this.currentDate = null;
        this.createModal();
    }

    createModal() {
        const modalHTML = `
            <div class="modal-overlay" id="editWorkoutModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <div class="modal-title">✏️ Chỉnh sửa buổi tập</div>
                            <div class="modal-date" id="editModalDate">Ngày</div>
                        </div>
                        <button class="modal-close" id="editModalClose">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="editWorkoutForm">
                            <div class="edit-form-group">
                                <label class="edit-label">Loại bài tập</label>
                                <select id="editWorkoutType" class="edit-input" required>
                                    <option value="Easy">Easy Run</option>
                                    <option value="Tempo">Tempo Run</option>
                                    <option value="Interval">Interval Training</option>
                                    <option value="Hill">Hill Repeats</option>
                                    <option value="Long run">Long Run</option>
                                    <option value="Pace Run">Pace Run</option>
                                    <option value="Strength">Strength Training</option>
                                    <option value="Rest">Rest Day</option>
                                    <option value="Rest or Easy">Rest or Easy</option>
                                    <option value="Shakeout">Shakeout Run</option>
                                </select>
                            </div>
                            
                            <div class="edit-form-group">
                                <label class="edit-label">Khoảng cách (km)</label>
                                <input type="number" id="editDistance" class="edit-input" step="0.1" min="0" required>
                            </div>
                            
                            <div class="edit-form-group">
                                <label class="edit-label">Chi tiết bài tập</label>
                                <textarea id="editDescription" class="edit-input edit-textarea" rows="3" required></textarea>
                            </div>
                            
                            <div class="edit-form-group">
                                <label class="edit-label">Ghi chú (tùy chọn)</label>
                                <textarea id="editNotes" class="edit-input edit-textarea" rows="2"></textarea>
                            </div>
                            
                            <div class="edit-form-actions">
                                <button type="button" class="edit-btn edit-btn-cancel" id="editCancelBtn">Hủy</button>
                                <button type="submit" class="edit-btn edit-btn-save">💾 Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        document.body.appendChild(div.firstElementChild);

        this.modal = document.getElementById('editWorkoutModal');

        document.getElementById('editModalClose').addEventListener('click', () => this.close());
        document.getElementById('editCancelBtn').addEventListener('click', () => this.close());
        document.getElementById('editWorkoutForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(workout, date) {
        this.currentWorkout = workout;
        this.currentDate = date;

        const formatted = TrainingUtils.formatDate(date);
        document.getElementById('editModalDate').textContent = `${formatted.dayName}, ${formatted.dateStr}`;

        document.getElementById('editWorkoutType').value = workout.workout;
        document.getElementById('editDistance').value = workout.distance;
        document.getElementById('editDescription').value = workout.description;
        document.getElementById('editNotes').value = workout.notes || '';

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    handleSubmit(e) {
        e.preventDefault();

        const updatedWorkout = {
            ...this.currentWorkout,
            workout: document.getElementById('editWorkoutType').value,
            distance: parseFloat(document.getElementById('editDistance').value),
            description: document.getElementById('editDescription').value,
            notes: document.getElementById('editNotes').value
        };

        const index = trainingData.findIndex(w => w.date === this.currentWorkout.date);
        if (index !== -1) {
            trainingData[index] = updatedWorkout;
            
            if (saveTrainingData()) {
                this.close();
                
                if (window.app) {
                    if (window.app.currentTab === 'training') {
                        window.app.renderTraining();
                    } else if (window.app.currentTab === 'manage') {
                        window.app.renderManage();
                    }
                    window.app.checkEditedState();
                }
                
                alert('✅ Đã lưu thay đổi!');
            }
        }
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// WORKOUT MODAL (View Details)
// ============================================
class WorkoutModal {
    constructor() {
        this.modal = null;
        this.currentWorkout = null;
        this.currentDate = null;
        this.createModal();
    }

    createModal() {
        const modalHTML = `
            <div class="modal-overlay" id="workoutModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <div class="modal-title" id="modalTitle">Buổi tập</div>
                            <div class="modal-date" id="modalDate">Ngày</div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="modal-edit-btn" id="modalEditBtn" title="Chỉnh sửa">✏️</button>
                            <button class="modal-close" id="modalClose">&times;</button>
                        </div>
                    </div>
                    <div class="modal-body" id="modalBody"></div>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        document.body.appendChild(div.firstElementChild);

        this.modal = document.getElementById('workoutModal');

        document.getElementById('modalClose').addEventListener('click', () => this.close());
        document.getElementById('modalEditBtn').addEventListener('click', () => this.openEditModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    openEditModal() {
        this.close();
        if (window.editModal) {
            window.editModal.open(this.currentWorkout, this.currentDate);
        }
    }

    open(workout, date, weatherData) {
        this.currentWorkout = workout;
        this.currentDate = date;

        const formatted = TrainingUtils.formatDate(date);
        const isToday = TrainingUtils.getToday().getTime() === date.getTime();

        document.getElementById('modalTitle').textContent = workout.workout;
        document.getElementById('modalDate').textContent = `${formatted.dayName}, ${formatted.dateStr}${isToday ? ' (Hôm nay)' : ''}`;

        let bodyHTML = `
            <div class="modal-workout-main">
                <span class="modal-workout-type ${TrainingUtils.getWorkoutClass(workout.workout)}">${workout.workout}</span>
                <div class="modal-workout-distance">${workout.distance} km</div>
                <div class="modal-workout-description">${workout.description}</div>
            </div>
        `;

        if (workout.notes) {
            bodyHTML += `
                <div class="modal-section">
                    <div class="modal-section-title">📝 Lưu ý quan trọng</div>
                    <div class="modal-section-content">${workout.notes}</div>
                </div>
            `;
        }

        document.getElementById('modalBody').innerHTML = bodyHTML;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// UI RENDERER (Training Tab)
// ============================================
class UIRenderer {
    static renderTodayWorkout(workout, weatherData) {
        if (!workout) {
            return `
                <div class="today-section">
                    <div class="today-card">
                        <div class="no-workout">
                            <h2>📅 Không có lịch tập hôm nay</h2>
                            <p>Kiểm tra lịch tuần này bên dưới</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        const date = TrainingUtils.formatDate(TrainingUtils.getToday());
        const isRaceDay = workout.workout.toLowerCase().includes('race');
        
        return `
            <div class="today-section">
                <div class="today-card">
                    <div class="today-header">
                        <span class="today-badge">${isRaceDay ? '🏁 NGÀY THI ĐẤU' : 'HÔM NAY'}</span>
                        <span class="today-date">${date.dayName}, ${date.dateStr}</span>
                    </div>
                    <div class="workout-main">
                        <div class="workout-title">${workout.workout}</div>
                        <div class="workout-distance">${workout.distance} km</div>
                        <span class="workout-type ${TrainingUtils.getWorkoutClass(workout.workout)}">${workout.workout}</span>
                    </div>
                    <div class="workout-details">
                        <div class="detail-row">
                            <span class="detail-label">Chi tiết bài tập</span>
                            <span class="detail-value">${workout.description}</span>
                        </div>
                        ${workout.notes ? `
                        <div class="detail-row">
                            <span class="detail-label">Lưu ý</span>
                            <span class="detail-value">${workout.notes}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    static renderStats(stats) {
        return `
            <div class="stats-section">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value">${stats.totalDistance}</div>
                        <div class="stat-label">Tổng KM</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📅</div>
                        <div class="stat-value">${stats.weekDistance}</div>
                        <div class="stat-label">KM tuần này</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">${stats.daysUntilRace}</div>
                        <div class="stat-label">Ngày đến Race</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-value">${stats.completed}</div>
                        <div class="stat-label">Đã hoàn thành</div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderWeekView(weekWorkouts, weatherData, modal) {
        const weekCards = weekWorkouts.map(day => {
            const formatted = TrainingUtils.formatDate(day.date);
            const workout = day.workout;
            
            const cardId = `day-card-${day.date.getTime()}`;
            
            return `
                <div class="day-card ${day.isToday ? 'is-today' : ''}" id="${cardId}" data-date="${day.date.toISOString()}">
                    <div class="day-name">${formatted.dayName}</div>
                    <div class="day-date">${formatted.dateStr}</div>
                    <div class="day-workout">${workout ? workout.workout : 'Không có'}</div>
                    <div class="day-distance">${workout ? workout.distance + ' km' : '-'}</div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="week-section">
                <h2 class="section-title">🗓️ Lịch tập 7 ngày tới</h2>
                <div class="week-scroll">
                    <div class="week-container">
                        ${weekCards}
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// MANAGE RENDERER (Manage Tab)
// ============================================
class ManageRenderer {
    static renderManageTab(filter = 'all') {
        const today = TrainingUtils.getToday();
        
        let filteredWorkouts = [...trainingData];
        if (filter === 'upcoming') {
            filteredWorkouts = trainingData.filter(w => {
                const date = TrainingUtils.parseDate(w.date);
                return date >= today;
            });
        } else if (filter === 'past') {
            filteredWorkouts = trainingData.filter(w => {
                const date = TrainingUtils.parseDate(w.date);
                return date < today;
            });
        }
        
        const stats = this.calculateFilteredStats(filteredWorkouts, filter);
        
        if (filteredWorkouts.length === 0) {
            return this.renderEmptyState(filter);
        }
        
        let tableHTML = `
            <div class="manage-stats">
                <div class="manage-stat-card">
                    <div class="manage-stat-value">${stats.totalWorkouts}</div>
                    <div class="manage-stat-label">Tổng buổi tập</div>
                </div>
                <div class="manage-stat-card">
                    <div class="manage-stat-value">${stats.totalDistance} km</div>
                    <div class="manage-stat-label">Tổng quãng đường</div>
                </div>
                <div class="manage-stat-card">
                    <div class="manage-stat-value">${stats.avgDistance} km</div>
                    <div class="manage-stat-label">Trung bình/buổi</div>
                </div>
                <div class="manage-stat-card">
                    <div class="manage-stat-value">${stats.completed}</div>
                    <div class="manage-stat-label">Đã hoàn thành</div>
                </div>
            </div>
            
            <div class="manage-table-wrapper">
                <table class="manage-table">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Thứ</th>
                            <th>Loại bài tập</th>
                            <th>Khoảng cách</th>
                            <th>Chi tiết</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        let currentWeek = null;
        filteredWorkouts.forEach(workout => {
            const date = TrainingUtils.parseDate(workout.date);
            const formatted = TrainingUtils.formatDate(date);
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;
            const isRaceDay = workout.workout.toLowerCase().includes('race');
            
            const weekNumber = this.getWeekNumber(workout.date, trainingData);
            if (weekNumber !== currentWeek && filter === 'all') {
                currentWeek = weekNumber;
                const weekInfo = this.getWeekInfo(weekNumber, trainingData);
                tableHTML += `
                    <tr class="week-separator">
                        <td colspan="6">
                            📅 Tuần ${weekNumber} (${weekInfo.dateRange}) - ${weekInfo.totalKm} km
                        </td>
                    </tr>
                `;
            }
            
            const rowClass = isToday ? 'today-row' : (isPast ? 'past-row' : '');
            const workoutClass = TrainingUtils.getWorkoutClass(workout.workout);
            
            tableHTML += `
                <tr class="${rowClass}" data-date="${workout.date}">
                    <td class="manage-date-cell">
                        ${workout.date.split('/')[0]}/${workout.date.split('/')[1]}
                        ${isToday ? '<span class="today-badge">Hôm nay</span>' : ''}
                        ${isRaceDay ? '<span class="race-badge">🏁 Race</span>' : ''}
                    </td>
                    <td class="manage-day-cell">${formatted.dayName}</td>
                    <td class="manage-workout-cell">
                        <span class="manage-workout-type ${workoutClass}">${workout.workout}</span>
                    </td>
                    <td class="manage-distance-cell">${workout.distance} km</td>
                    <td class="manage-description-cell" title="${workout.description}">
                        ${workout.description}
                    </td>
                    <td class="manage-action-cell">
                        <button class="manage-edit-btn" data-date="${workout.date}">
                            ✏️ Sửa
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `</tbody></table></div>`;
        return tableHTML;
    }
    
    static renderEmptyState(filter) {
        let message = 'Không có buổi tập nào';
        if (filter === 'upcoming') message = 'Không có buổi tập sắp tới';
        else if (filter === 'past') message = 'Chưa có buổi tập nào đã qua';
        
        return `
            <div class="manage-empty">
                <div class="manage-empty-icon">📅</div>
                <h3>${message}</h3>
                <p>Thử chọn bộ lọc khác</p>
            </div>
        `;
    }
    
    static getWeekNumber(dateStr, allWorkouts) {
        const index = allWorkouts.findIndex(w => w.date === dateStr);
        if (index === -1) return 1;
        return Math.floor(index / 7) + 1;
    }
    
    static getWeekInfo(weekNumber, allWorkouts) {
        const weekWorkouts = allWorkouts.filter(w => {
            return this.getWeekNumber(w.date, allWorkouts) === weekNumber;
        });
        
        if (weekWorkouts.length === 0) {
            return { dateRange: '', totalKm: 0 };
        }
        
        const firstDate = weekWorkouts[0].date;
        const lastDate = weekWorkouts[weekWorkouts.length - 1].date;
        const totalKm = weekWorkouts.reduce((sum, w) => sum + (w.distance || 0), 0).toFixed(1);
        
        return {
            dateRange: `${firstDate.split('/')[0]}-${lastDate.split('/')[0]}/${lastDate.split('/')[1]}`,
            totalKm: totalKm
        };
    }
    
    static calculateFilteredStats(workouts, filter) {
        const today = TrainingUtils.getToday();
        const totalWorkouts = workouts.length;
        const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
        const avgDistance = totalWorkouts > 0 ? (totalDistance / totalWorkouts).toFixed(1) : 0;
        
        let completed = 0;
        if (filter === 'all' || filter === 'past') {
            completed = workouts.filter(w => {
                const date = TrainingUtils.parseDate(w.date);
                return date < today;
            }).length;
        }
        
        return {
            totalWorkouts,
            totalDistance: totalDistance.toFixed(1),
            avgDistance,
            completed
        };
    }
}