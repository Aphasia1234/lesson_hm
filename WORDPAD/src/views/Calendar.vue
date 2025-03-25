<template>
  <div class="calendar-container">
    <h1>日历</h1>
    
    <div class="calendar-content-wrapper">
      <!-- 左侧日历部分 -->
      <div class="calendar-section">
        <!-- 日历导航 -->
        <div class="calendar-nav">
          <button @click="prevMonth">&lt;</button>
          <h2>{{ currentYearMonth }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        
        <!-- 星期标题 -->
        <div class="weekdays">
          <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>
        
        <!-- 日历网格 -->
        <div class="calendar-grid">
          <div 
            v-for="day in calendarDays" 
            :key="day.date" 
            class="calendar-day" 
            :class="{ 
              'other-month': !day.isCurrentMonth, 
              'today': day.isToday,
              'has-schedule': hasSchedule(day.date)
            }"
            @click="selectDate(day.date)"
          >
            <span class="day-number">{{ day.dayNumber }}</span>
            <div v-if="hasSchedule(day.date)" class="schedule-indicator"></div>
          </div>
        </div>
      </div>
      
      <!-- 右侧行程部分 -->
      <div class="schedule-section" v-if="selectedDate">
        <div class="schedule-form">
          <h3>{{ formatSelectedDate }} 的行程</h3>
          
          <div class="schedules-list">
            <div v-if="currentDateSchedules.length === 0" class="empty-schedule">
              暂无行程
            </div>
            <div 
              v-for="(schedule, index) in currentDateSchedules" 
              :key="index"
              class="schedule-item"
            >
              <div class="schedule-time">{{ schedule.time }}</div>
              <div class="schedule-content">{{ schedule.content }}</div>
              <button class="delete-btn" @click="deleteSchedule(index)">删除</button>
            </div>
          </div>
          
          <div class="add-schedule">
            <h4>添加新行程</h4>
            <div class="form-group">
              <label for="scheduleTime">时间:</label>
              <input 
                type="time" 
                id="scheduleTime" 
                v-model="newSchedule.time"
              >
            </div>
            <div class="form-group">
              <label for="scheduleContent">内容:</label>
              <input 
                type="text" 
                id="scheduleContent" 
                v-model="newSchedule.content"
                placeholder="请输入行程内容"
              >
            </div>
            <button 
              class="add-btn" 
              @click="addSchedule"
              :disabled="!newSchedule.content || !newSchedule.time"
            >
              添加行程
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 星期标题
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 当前显示的年月
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

// 选中的日期
const selectedDate = ref(null);

// 新行程
const newSchedule = ref({
  time: '',
  content: ''
});

// 所有行程数据
const schedules = ref({});

// 从localStorage加载行程数据
onMounted(() => {
  const savedSchedules = localStorage.getItem('calendar-schedules');
  if (savedSchedules) {
    schedules.value = JSON.parse(savedSchedules);
  }
  
  // 默认选中今天
  const today = new Date();
  selectedDate.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
});

// 当前年月显示
const currentYearMonth = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`;
});

// 计算当前月的日历数据
const calendarDays = computed(() => {
  const days = [];
  
  // 获取当月第一天
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  // 获取当月最后一天
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  
  // 获取当月第一天是星期几
  const firstDayOfWeek = firstDay.getDay();
  
  // 添加上个月的日期
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(currentYear.value, currentMonth.value - 1, day);
    days.push({
      date: formatDate(date),
      dayNumber: day,
      isCurrentMonth: false,
      isToday: isToday(date)
    });
  }
  
  // 添加当月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({
      date: formatDate(date),
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isToday(date)
    });
  }
  
  // 添加下个月的日期，补齐6行7列
  const daysNeeded = 42 - days.length;
  for (let i = 1; i <= daysNeeded; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i);
    days.push({
      date: formatDate(date),
      dayNumber: i,
      isCurrentMonth: false,
      isToday: isToday(date)
    });
  }
  
  return days;
});

// 格式化日期为YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 判断是否是今天
function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
}

// 上个月
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

// 下个月
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

// 选择日期
function selectDate(date) {
  selectedDate.value = date;
  // 重置新行程表单
  newSchedule.value = {
    time: '',
    content: ''
  };
}

// 格式化选中的日期显示
const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return '';
  
  const [year, month, day] = selectedDate.value.split('-');
  return `${year}年${parseInt(month)}月${parseInt(day)}日`;
});

// 获取当前选中日期的行程
const currentDateSchedules = computed(() => {
  if (!selectedDate.value || !schedules.value[selectedDate.value]) {
    return [];
  }
  return schedules.value[selectedDate.value].sort((a, b) => a.time.localeCompare(b.time));
});

// 添加行程
function addSchedule() {
  if (!newSchedule.value.content || !newSchedule.value.time) return;
  
  if (!schedules.value[selectedDate.value]) {
    schedules.value[selectedDate.value] = [];
  }
  
  schedules.value[selectedDate.value].push({
    time: newSchedule.value.time,
    content: newSchedule.value.content
  });
  
  // 保存到localStorage
  saveSchedules();
  
  // 重置表单
  newSchedule.value = {
    time: '',
    content: ''
  };
}

// 删除行程
function deleteSchedule(index) {
  if (schedules.value[selectedDate.value]) {
    schedules.value[selectedDate.value].splice(index, 1);
    
    // 如果没有行程了，删除该日期的键
    if (schedules.value[selectedDate.value].length === 0) {
      delete schedules.value[selectedDate.value];
    }
    
    // 保存到localStorage
    saveSchedules();
  }
}

// 保存行程到localStorage
function saveSchedules() {
  localStorage.setItem('calendar-schedules', JSON.stringify(schedules.value));
}

// 检查日期是否有行程
function hasSchedule(date) {
  return schedules.value[date] && schedules.value[date].length > 0;
}
</script>

<style scoped>
.calendar-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: #FFDEE9;
background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);

  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.calendar-content-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 1;
}

.calendar-section {
  flex: 1;
  min-width: 0;
}

.schedule-section {
  flex: 1;
  min-width: 0;
  border-left: 1px solid #e0e0e0;
  padding-left: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-nav button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
}

.calendar-nav button:hover {
  background-color: #e0e0e0;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.weekday {
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 20px;
}

.calendar-day {
  position: relative;
  height: 80px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: #f0f0f0;
}

.day-number {
  font-size: 14px;
  font-weight: bold;
}

.other-month {
  color: #aaa;
  background-color: #f8f8f8;
}

.today {
  background-color: #e6f7ff;
  border: 1px solid #1890ff;
}

.has-schedule .schedule-indicator {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: #1890ff;
  border-radius: 50%;
}

.schedule-form {
  padding: 15px;
}

.schedules-list {
  margin-bottom: 20px;
}

.empty-schedule {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 10px 0;
}

.schedule-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.schedule-time {
  font-weight: bold;
  margin-right: 15px;
  min-width: 60px;
}

.schedule-content {
  flex: 1;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}

.add-schedule {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.add-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
}

.add-btn:hover {
  background-color: #40a9ff;
}

.add-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}
</style>