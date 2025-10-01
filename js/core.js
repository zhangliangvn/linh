// ============================================
// CORE.JS - Config, Storage, Utils, Weather
// ============================================

// ============================================
// CONFIG & STATE
// ============================================
const CONFIG = {
    WEATHER_API_KEY: 'a081a048aa37ae4fd7766c934e6ea158',
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    MARINE_API_URL: 'https://marine-api.open-meteo.com/v1/marine',
    FORECAST_API_URL: 'https://api.open-meteo.com/v1/forecast',
    CACHE_DURATION: 30 * 60 * 1000,
    DEFAULT_LOCATION: {
        lat: 16.0738,
        lon: 108.1477,
        name: 'Liên Chiểu, Đà Nẵng, VN'
    }
};

let weatherCache = {
    current: null,
    forecast: null,
    lastUpdate: null,
    location: null
};

let swimmingCache = {
    marine: null,
    weather: null,
    lastUpdate: null,
    location: null
};

// ============================================
// STORAGE - Quản lý training data
// ============================================
let trainingData = [];
let programInfo = {};

function loadTrainingData() {
    try {
        const savedData = localStorage.getItem('trainingData');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            trainingData = parsed.workouts;
            programInfo = parsed.program;
            console.log('✅ Loaded edited training data from localStorage');
            return Promise.resolve(true);
        }
        
        if (typeof TRAINING_CONFIG !== 'undefined') {
            programInfo = TRAINING_CONFIG.program;
            trainingData = TRAINING_CONFIG.workouts;
            console.log(`✅ Loaded ${trainingData.length} workouts`);
            return Promise.resolve(true);
        } else {
            throw new Error('TRAINING_CONFIG not found');
        }
    } catch (error) {
        console.error('Error loading training data:', error);
        trainingData = [];
        programInfo = { name: "Marathon Training", target: "Full Marathon" };
        return Promise.resolve(false);
    }
}

function saveTrainingData() {
    try {
        const dataToSave = {
            program: programInfo,
            workouts: trainingData,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('trainingData', JSON.stringify(dataToSave));
        console.log('✅ Training data saved');
        return true;
    } catch (error) {
        console.error('Error saving:', error);
        alert('Không thể lưu dữ liệu. Vui lòng thử lại.');
        return false;
    }
}

function resetTrainingData() {
    if (confirm('Bạn có chắc muốn khôi phục lịch tập về mặc định? Tất cả chỉnh sửa sẽ bị xóa.')) {
        localStorage.removeItem('trainingData');
        if (typeof TRAINING_CONFIG !== 'undefined') {
            programInfo = TRAINING_CONFIG.program;
            trainingData = TRAINING_CONFIG.workouts;
        }
        location.reload();
    }
}

// ============================================
// TRAINING UTILS
// ============================================
class TrainingUtils {
    static parseDate(dateStr) {
        const parts = dateStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    static getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    static formatDate(date) {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return {
            dayName: days[date.getDay()],
            dateStr: `${date.getDate()}/${months[date.getMonth()]}`
        };
    }

    static getWorkoutClass(workout) {
        const type = workout.toLowerCase();
        if (type.includes('easy')) return 'type-easy';
        if (type.includes('interval')) return 'type-interval';
        if (type.includes('tempo')) return 'type-tempo';
        if (type.includes('long')) return 'type-long';
        if (type.includes('hill')) return 'type-interval';
        if (type.includes('pace')) return 'type-tempo';
        if (type.includes('strength')) return 'type-core';
        if (type.includes('rest')) return 'type-rest';
        if (type.includes('race')) return 'type-interval';
        if (type.includes('shakeout')) return 'type-easy';
        return 'type-easy';
    }

    static getTodayWorkout() {
        const today = this.getToday();
        return trainingData.find(workout => {
            const workoutDate = this.parseDate(workout.date);
            workoutDate.setHours(0, 0, 0, 0);
            return workoutDate.getTime() === today.getTime();
        });
    }

    static getWeekWorkouts() {
        const today = this.getToday();
        const weekWorkouts = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            date.setHours(0, 0, 0, 0);
            
            const workout = trainingData.find(w => {
                const workoutDate = this.parseDate(w.date);
                workoutDate.setHours(0, 0, 0, 0);
                return workoutDate.getTime() === date.getTime();
            });
            
            weekWorkouts.push({
                date: date,
                isToday: i === 0,
                workout: workout
            });
        }
        
        return weekWorkouts;
    }

    static calculateStats() {
        const today = this.getToday();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const totalDistance = trainingData.reduce((sum, w) => sum + (w.distance || 0), 0);
        
        const weekDistance = trainingData
            .filter(w => {
                const date = this.parseDate(w.date);
                return date >= weekStart && date <= weekEnd;
            })
            .reduce((sum, w) => sum + (w.distance || 0), 0);
        
        const raceWorkout = trainingData.find(w => w.workout.toLowerCase().includes('race'));
        const raceDay = raceWorkout ? this.parseDate(raceWorkout.date) : this.parseDate('30/11/2025');
        const daysUntilRace = Math.ceil((raceDay - today) / (1000 * 60 * 60 * 24));
        
        const completed = trainingData.filter(w => {
            const date = this.parseDate(w.date);
            return date < today;
        }).length;
        
        return {
            totalDistance: totalDistance.toFixed(1),
            weekDistance: weekDistance.toFixed(1),
            daysUntilRace: daysUntilRace > 0 ? daysUntilRace : 0,
            completed: completed
        };
    }
}

// ============================================
// WEATHER SERVICE
// ============================================
class WeatherService {
    static async getCurrentLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({
                    lat: CONFIG.DEFAULT_LOCATION.lat,
                    lon: CONFIG.DEFAULT_LOCATION.lon,
                    isDefault: true
                });
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    isDefault: false
                }),
                () => resolve({
                    lat: CONFIG.DEFAULT_LOCATION.lat,
                    lon: CONFIG.DEFAULT_LOCATION.lon,
                    isDefault: true
                }),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        });
    }

    static async fetchCurrentWeather(lat, lon) {
        const response = await fetch(
            `${CONFIG.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=vi`
        );
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        return await response.json();
    }

    static async fetchWeatherForecast(lat, lon) {
        const response = await fetch(
            `${CONFIG.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=vi`
        );
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        return await response.json();
    }

    static async getLocationName(lat, lon) {
        try {
            const response = await fetch(
                `${CONFIG.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=vi`
            );
            const data = await response.json();
            return `${data.name}, ${data.sys.country}`;
        } catch (error) {
            return 'Vị trí hiện tại';
        }
    }

    static getTemperatureColor(temp) {
        if (temp >= 30) return 'temp-hot';
        if (temp >= 25) return 'temp-warm';
        if (temp >= 15) return 'temp-cool';
        return 'temp-cold';
    }

    static getWeatherIcon(weatherCode) {
        const icons = {
            '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️', '13d': '🌨️', '13n': '🌨️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return icons[weatherCode] || '🌤️';
    }

    static async loadWeatherData() {
        const locationInfo = document.getElementById('locationInfo');
        
        try {
            const now = Date.now();
            if (weatherCache.current && weatherCache.forecast && 
                weatherCache.lastUpdate && 
                (now - weatherCache.lastUpdate) < CONFIG.CACHE_DURATION) {
                return weatherCache;
            }

            locationInfo.innerHTML = '<span class="mini-spinner"></span><span>Đang xác định vị trí...</span>';
            const location = await this.getCurrentLocation();
            
            locationInfo.innerHTML = '<span class="mini-spinner"></span><span>Đang tải thời tiết...</span>';

            const locationName = location.isDefault ? 
                CONFIG.DEFAULT_LOCATION.name : 
                await this.getLocationName(location.lat, location.lon);

            const [currentWeather, forecast] = await Promise.all([
                this.fetchCurrentWeather(location.lat, location.lon),
                this.fetchWeatherForecast(location.lat, location.lon)
            ]);

            weatherCache = {
                current: currentWeather,
                forecast: forecast,
                lastUpdate: now,
                location: { ...location, name: locationName }
            };

            const locationIcon = location.isDefault ? '📍' : '🎯';
            const locationText = location.isDefault ? 
                `${locationIcon} ${locationName} (mặc định)` : 
                `${locationIcon} ${locationName}`;
            
            locationInfo.innerHTML = locationText;
            return weatherCache;

        } catch (error) {
            console.error('Weather loading error:', error);
            
            try {
                const [currentWeather, forecast] = await Promise.all([
                    this.fetchCurrentWeather(CONFIG.DEFAULT_LOCATION.lat, CONFIG.DEFAULT_LOCATION.lon),
                    this.fetchWeatherForecast(CONFIG.DEFAULT_LOCATION.lat, CONFIG.DEFAULT_LOCATION.lon)
                ]);

                weatherCache = {
                    current: currentWeather,
                    forecast: forecast,
                    lastUpdate: Date.now(),
                    location: { 
                        lat: CONFIG.DEFAULT_LOCATION.lat, 
                        lon: CONFIG.DEFAULT_LOCATION.lon, 
                        name: CONFIG.DEFAULT_LOCATION.name,
                        isDefault: true 
                    }
                };

                locationInfo.innerHTML = `📍 ${CONFIG.DEFAULT_LOCATION.name} (mặc định)`;
                return weatherCache;

            } catch (fallbackError) {
                console.error('Fallback error:', fallbackError);
                locationInfo.innerHTML = `⚠️ Không thể tải thời tiết`;
                return null;
            }
        }
    }

    static getRunningTimeForecasts(forecast, targetDate) {
        if (!forecast || !forecast.list) return null;
        
        const targetDateStr = targetDate.toISOString().split('T')[0];
        const dayForecasts = forecast.list.filter(item => {
            const itemDate = new Date(item.dt * 1000);
            const itemDateStr = itemDate.toISOString().split('T')[0];
            return itemDateStr === targetDateStr;
        });
        
        if (dayForecasts.length === 0) return null;
        
        const morningForecast = dayForecasts.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour === 6;
        }) || dayForecasts.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour >= 3 && hour <= 9;
        });
        
        const eveningForecast = dayForecasts.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour === 18;
        }) || dayForecasts.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour >= 15 && hour <= 21;
        });
        
        return { morning: morningForecast, evening: eveningForecast };
    }

    static getCurrentRunningTimes(currentWeather) {
        if (!currentWeather) return null;
        
        const now = new Date();
        const currentHour = now.getHours();
        const baseTemp = currentWeather.main.temp;
        
        let morningTemp, eveningTemp;
        if (currentHour >= 4 && currentHour <= 8) {
            morningTemp = baseTemp;
            eveningTemp = baseTemp + 4;
        } else if (currentHour >= 16 && currentHour <= 20) {
            morningTemp = baseTemp - 4;
            eveningTemp = baseTemp;
        } else if (currentHour >= 12 && currentHour <= 16) {
            morningTemp = baseTemp - 3;
            eveningTemp = baseTemp + 1;
        } else {
            morningTemp = baseTemp - 2;
            eveningTemp = baseTemp + 2;
        }
        
        return {
            morning: {
                ...currentWeather,
                main: {
                    ...currentWeather.main,
                    temp: morningTemp,
                    feels_like: morningTemp + (currentWeather.main.feels_like - currentWeather.main.temp)
                }
            },
            evening: {
                ...currentWeather,
                main: {
                    ...currentWeather.main,
                    temp: eveningTemp,
                    feels_like: eveningTemp + (currentWeather.main.feels_like - currentWeather.main.temp)
                }
            }
        };
    }
}

// ============================================
// SWIMMING SERVICE (Simplified)
// ============================================
class SwimmingService {
    static async loadSwimmingData() {
        // Simplified version - return basic swimming info
        return {
            condition: 'good',
            recommendation: 'Điều kiện bơi tốt',
            message: 'Tính năng chi tiết đang được cập nhật'
        };
    }
}