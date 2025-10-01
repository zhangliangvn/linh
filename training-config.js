// ============================================
// TRAINING DATA CONFIGURATION - DQLINK
// Chỉnh sửa file này để thay đổi lịch tập luyện
// ============================================

const TRAINING_CONFIG = {
  program: {
    name: "Marathon Training - DQlink",
    target: "Full Marathon",
    startDate: "15/09/2025",
    raceDate: "30/11/2025",
    totalWeeks: 11,
    description: "Chương trình tập luyện Marathon 11 tuần cho DQlink"
  },
  
  workouts: [
    // Tuần 1 (15-21/9)
    {
      date: "15/09/2025",
      day: "Monday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:15/km",
      notes: "Chạy dễ, giữ nhịp thoải mái"
    },
    {
      date: "16/09/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 9,
      description: "2 km warm @6:30 + 5 km @5:35 + 2 km cool @7:30",
      notes: "Tempo run - giữ pace ổn định ở phần chính"
    },
    {
      date: "17/09/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 8,
      description: "6×800m @5:05/km | Jog 400m @7:30",
      notes: "High intensity - nghỉ đủ giữa các rep"
    },
    {
      date: "18/09/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 20 phút",
      notes: "Tập gym hoặc bodyweight exercises"
    },
    {
      date: "19/09/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 8,
      description: "8 km @6:23/km",
      notes: "Marathon pace practice"
    },
    {
      date: "20/09/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:15/km",
      notes: "Recovery run nhẹ nhàng"
    },
    {
      date: "21/09/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 22,
      description: "22 km @6:50/km (negative split)",
      notes: "Chạy negative split - nửa sau nhanh hơn nửa đầu"
    },

    // Tuần 2 (22-28/9)
    {
      date: "22/09/2025",
      day: "Monday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:15/km",
      notes: "Chạy dễ"
    },
    {
      date: "23/09/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 9,
      description: "2 km warm @6:30 + 5 km @5:35 + 2 km cool @7:30",
      notes: "Tempo run"
    },
    {
      date: "24/09/2025",
      day: "Wednesday",
      workout: "Hill",
      distance: 7,
      description: "6× hill repeats (lên @5:05, jog xuống @7:30)",
      notes: "Hill training - tăng sức mạnh chân"
    },
    {
      date: "25/09/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 20 phút",
      notes: "Tập gym"
    },
    {
      date: "26/09/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 9,
      description: "9 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "27/09/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:15/km",
      notes: "Recovery run"
    },
    {
      date: "28/09/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 24,
      description: "24 km @6:50/km",
      notes: "Long run ổn định"
    },

    // Tuần 3 (29/9-5/10)
    {
      date: "29/09/2025",
      day: "Monday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:10/km",
      notes: "Chạy dễ"
    },
    {
      date: "30/09/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 10,
      description: "3 km warm @6:30 + 4 km @5:30 + 3 km cool @7:25",
      notes: "Tempo run - tăng cường độ"
    },
    {
      date: "01/10/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 9,
      description: "8×800m @5:00/km | Jog 400m @7:25",
      notes: "Speed work"
    },
    {
      date: "02/10/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 25 phút",
      notes: "Tập gym"
    },
    {
      date: "03/10/2025",
      day: "Friday",
      workout: "Rest or Easy",
      distance: 8,
      description: "Nghỉ (nếu mệt) hoặc 8 km @6:23/km",
      notes: "Nghe cơ thể - nghỉ nếu cần"
    },
    {
      date: "04/10/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:10/km",
      notes: "Recovery run"
    },
    {
      date: "05/10/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 25,
      description: "25 km @6:48/km (negative split)",
      notes: "Long run với negative split"
    },

    // Tuần 4 (6-12/10)
    {
      date: "06/10/2025",
      day: "Monday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:10/km",
      notes: "Chạy dễ"
    },
    {
      date: "07/10/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 10,
      description: "3 km warm @6:30 + 4 km @5:30 + 3 km cool @7:25",
      notes: "Tempo run"
    },
    {
      date: "08/10/2025",
      day: "Wednesday",
      workout: "Hill",
      distance: 8,
      description: "7× hill repeats (lên @5:00, jog xuống @7:25)",
      notes: "Hill training"
    },
    {
      date: "09/10/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 25 phút",
      notes: "Tập gym"
    },
    {
      date: "10/10/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 10,
      description: "10 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "11/10/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:10/km",
      notes: "Recovery run"
    },
    {
      date: "12/10/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 26,
      description: "26 km @6:48/km",
      notes: "Long run ổn định"
    },

    // Tuần 5 (13-19/10)
    {
      date: "13/10/2025",
      day: "Monday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:05/km",
      notes: "Chạy dễ"
    },
    {
      date: "14/10/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 11,
      description: "3 km warm @6:30 + 5 km @5:25 + 3 km cool @7:20",
      notes: "Tempo run - tăng cường độ"
    },
    {
      date: "15/10/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 9,
      description: "8×800m @4:55/km | Jog 400m @7:20",
      notes: "Speed work"
    },
    {
      date: "16/10/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 30 phút",
      notes: "Tập gym"
    },
    {
      date: "17/10/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 10,
      description: "10 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "18/10/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:05/km",
      notes: "Recovery run"
    },
    {
      date: "19/10/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 28,
      description: "28 km @6:45/km",
      notes: "Long run ổn định"
    },

    // Tuần 6 (20-26/10)
    {
      date: "20/10/2025",
      day: "Monday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:05/km",
      notes: "Chạy dễ"
    },
    {
      date: "21/10/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 11,
      description: "3 km warm @6:30 + 5 km @5:25 + 3 km cool @7:20",
      notes: "Tempo run"
    },
    {
      date: "22/10/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 10,
      description: "9×800m @4:55/km | Jog 400m @7:20",
      notes: "Speed work"
    },
    {
      date: "23/10/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 30 phút",
      notes: "Tập gym"
    },
    {
      date: "24/10/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 11,
      description: "11 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "25/10/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:05/km",
      notes: "Recovery run"
    },
    {
      date: "26/10/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 30,
      description: "30 km @6:45/km",
      notes: "Long run ổn định"
    },

    // Tuần 7 (27/10-2/11)
    {
      date: "27/10/2025",
      day: "Monday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:00/km",
      notes: "Chạy dễ"
    },
    {
      date: "28/10/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 12,
      description: "3 km warm @6:30 + 6 km @5:20 + 3 km cool @7:15",
      notes: "Tempo run - tăng volume"
    },
    {
      date: "29/10/2025",
      day: "Wednesday",
      workout: "Hill",
      distance: 10,
      description: "9× hill repeats (lên @4:55, jog xuống @7:15)",
      notes: "Hill training"
    },
    {
      date: "30/10/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 30 phút",
      notes: "Tập gym"
    },
    {
      date: "31/10/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 11,
      description: "11 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "01/11/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:00/km",
      notes: "Recovery run"
    },
    {
      date: "02/11/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 32,
      description: "32 km @6:45/km",
      notes: "Long run ổn định"
    },

    // Tuần 8 (3-9/11) - PEAK WEEK
    {
      date: "03/11/2025",
      day: "Monday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:00/km",
      notes: "Chạy dễ"
    },
    {
      date: "04/11/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 12,
      description: "3 km warm @6:30 + 6 km @5:20 + 3 km cool @7:15",
      notes: "Tempo run"
    },
    {
      date: "05/11/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 11,
      description: "10×800m @4:50/km | Jog 400m @7:15",
      notes: "Speed work - tuần peak"
    },
    {
      date: "06/11/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 30 phút",
      notes: "Tập gym"
    },
    {
      date: "07/11/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 12,
      description: "12 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "08/11/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 9,
      description: "9 km @7:00/km",
      notes: "Recovery run"
    },
    {
      date: "09/11/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 36,
      description: "36 km @6:45/km",
      notes: "PEAK long run - thực hành fueling đầy đủ như ngày race"
    },

    // Tuần 9 (10-16/11) - TAPER bắt đầu
    {
      date: "10/11/2025",
      day: "Monday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:05/km",
      notes: "Bắt đầu taper - giảm volume"
    },
    {
      date: "11/11/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 10,
      description: "3 km warm @6:30 + 4 km @5:25 + 3 km cool @7:20",
      notes: "Tempo run - taper"
    },
    {
      date: "12/11/2025",
      day: "Wednesday",
      workout: "Interval",
      distance: 9,
      description: "8×800m @4:55/km | Jog 400m @7:20",
      notes: "Speed work nhẹ"
    },
    {
      date: "13/11/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 25 phút",
      notes: "Tập nhẹ"
    },
    {
      date: "14/11/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 10,
      description: "10 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "15/11/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 8,
      description: "8 km @7:05/km",
      notes: "Recovery run"
    },
    {
      date: "16/11/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 28,
      description: "28 km @6:45/km",
      notes: "Long run taper"
    },

    // Tuần 10 (17-23/11) - TAPER tiếp tục
    {
      date: "17/11/2025",
      day: "Monday",
      workout: "Easy",
      distance: 6,
      description: "6 km @7:10/km",
      notes: "Chạy dễ - taper"
    },
    {
      date: "18/11/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 9,
      description: "2 km warm @6:30 + 5 km @5:30 + 2 km cool @7:25",
      notes: "Tempo run nhẹ"
    },
    {
      date: "19/11/2025",
      day: "Wednesday",
      workout: "Hill",
      distance: 8,
      description: "7× hill repeats (lên @5:00, jog xuống @7:25)",
      notes: "Hill training nhẹ"
    },
    {
      date: "20/11/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength training 20 phút",
      notes: "Tập nhẹ"
    },
    {
      date: "21/11/2025",
      day: "Friday",
      workout: "Pace Run",
      distance: 9,
      description: "9 km @6:23/km",
      notes: "Marathon pace"
    },
    {
      date: "22/11/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 7,
      description: "7 km @7:10/km",
      notes: "Recovery run"
    },
    {
      date: "23/11/2025",
      day: "Sunday",
      workout: "Long run",
      distance: 22,
      description: "22 km @6:48/km",
      notes: "Long run taper"
    },

    // Tuần 11 (24-30/11) - RACE WEEK
    {
      date: "24/11/2025",
      day: "Monday",
      workout: "Easy",
      distance: 5,
      description: "5 km @7:15/km",
      notes: "Race week - chạy rất nhẹ"
    },
    {
      date: "25/11/2025",
      day: "Tuesday",
      workout: "Tempo",
      distance: 7,
      description: "2 km warm @6:30 + 3 km @5:35 + 2 km cool @7:30",
      notes: "Tempo ngắn - giữ cảm giác"
    },
    {
      date: "26/11/2025",
      day: "Wednesday",
      workout: "Rest",
      distance: 0,
      description: "Nghỉ hoàn toàn",
      notes: "Nghỉ ngơi, hydrate tốt"
    },
    {
      date: "27/11/2025",
      day: "Thursday",
      workout: "Strength",
      distance: 0,
      description: "Strength nhẹ 20 phút",
      notes: "Tập rất nhẹ, stretch"
    },
    {
      date: "28/11/2025",
      day: "Friday",
      workout: "Shakeout",
      distance: 6,
      description: "6 km @6:23/km (shakeout)",
      notes: "Shakeout run nhẹ nhàng"
    },
    {
      date: "29/11/2025",
      day: "Saturday",
      workout: "Easy",
      distance: 5,
      description: "5 km @7:15/km",
      notes: "Recovery run cuối cùng trước race"
    },
    {
      date: "30/11/2025",
      day: "Sunday",
      workout: "RACE",
      distance: 42.195,
      description: "FULL MARATHON RACE DAY",
      notes: "Target: Sub 4:30 - Thực hiện fueling plan. Good luck DQlink! 🎉"
    }
  ]
};

// Export cho sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRAINING_CONFIG;
}