<template>
  <div class="card definition-card">
    <div class="card-header">
      <span class="card-type">Definition</span>
      <span class="card-domain">{{ card.domain }}</span>
    </div>

    <div class="card-content">
      <div v-if="!revealed" class="card-front">
        <div class="question">{{ card.front }}</div>
        <div class="card-footer">
          <span class="topic">{{ card.topic }}</span>
          <span class="difficulty" :class="card.difficulty">{{ card.difficulty }}</span>
        </div>
      </div>

      <div v-else class="card-back">
        <div class="question">{{ card.front }}</div>
        <div class="answer">{{ card.back }}</div>
        <div class="card-footer">
          <span class="topic">{{ card.topic }}</span>
          <span class="difficulty" :class="card.difficulty">{{ card.difficulty }}</span>
        </div>
      </div>
    </div>

    <div v-if="!revealed" class="card-actions">
      <button @click="reveal" class="btn btn-primary">Show Answer</button>
    </div>

    <div v-else class="card-actions rating-buttons">
      <button @click="rate(0)" class="btn btn-again">
        Again
        <span class="interval">{{ getInterval(0) }}</span>
      </button>
      <button @click="rate(1)" class="btn btn-hard">
        Hard
        <span class="interval">{{ getInterval(1) }}</span>
      </button>
      <button @click="rate(2)" class="btn btn-good">
        Good
        <span class="interval">{{ getInterval(2) }}</span>
      </button>
      <button @click="rate(3)" class="btn btn-easy">
        Easy
        <span class="interval">{{ getInterval(3) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateCardSchedule } from '@/utils/spacedRepetition'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['rate'])

const revealed = ref(false)

function reveal() {
  revealed.value = true
}

function rate(rating) {
  emit('rate', rating)
  revealed.value = false
}

function getInterval(rating) {
  const updated = updateCardSchedule(props.card, rating)
  const days = updated.interval

  if (days < 1) {
    return '<1d'
  } else if (days === 1) {
    return '1d'
  } else if (days < 30) {
    return `${days}d`
  } else if (days < 365) {
    const months = Math.round(days / 30)
    return `${months}mo`
  } else {
    const years = Math.round(days / 365)
    return `${years}y`
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.card-type {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6366f1;
  background: #eef2ff;
  padding: 4px 12px;
  border-radius: 12px;
}

.card-domain {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.card-content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.question {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
  line-height: 1.5;
}

.answer {
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #10b981;
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  font-size: 12px;
}

.topic {
  color: #6b7280;
  font-weight: 500;
}

.difficulty {
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: capitalize;
}

.difficulty.easy {
  background: #d1fae5;
  color: #065f46;
}

.difficulty.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty.hard {
  background: #fee2e2;
  color: #991b1b;
}

.card-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #6366f1;
  color: white;
  padding: 12px 48px;
}

.rating-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.rating-buttons .btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 8px;
}

.interval {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.8;
}

.btn-again {
  background: #ef4444;
  color: white;
}

.btn-hard {
  background: #f59e0b;
  color: white;
}

.btn-good {
  background: #10b981;
  color: white;
}

.btn-easy {
  background: #3b82f6;
  color: white;
}
</style>
