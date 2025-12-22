<template>
  <div class="card scenario-card">
    <div class="card-header">
      <span class="card-type">Scenario</span>
      <span class="card-domain">{{ card.domain }}</span>
    </div>

    <div class="card-content">
      <div class="scenario">{{ card.scenario }}</div>

      <div class="options">
        <div
          v-for="(option, index) in card.options"
          :key="index"
          class="option"
          :class="{
            'selected': selectedAnswer === index,
            'correct': revealed && index === card.correctAnswer,
            'incorrect': revealed && selectedAnswer === index && index !== card.correctAnswer,
            'disabled': revealed
          }"
          @click="!revealed && selectAnswer(index)"
        >
          <span class="option-letter">{{ getLetter(index) }}</span>
          <span class="option-text">{{ option }}</span>
        </div>
      </div>

      <div v-if="revealed" class="explanation">
        <div class="explanation-header">Explanation</div>
        <div class="explanation-text">{{ card.explanation }}</div>
      </div>

      <div class="card-footer">
        <span class="topic">{{ card.topic }}</span>
        <span class="difficulty" :class="card.difficulty">{{ card.difficulty }}</span>
      </div>
    </div>

    <div v-if="!revealed" class="card-actions">
      <button @click="reveal" class="btn btn-primary" :disabled="selectedAnswer === null">
        Check Answer
      </button>
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
const selectedAnswer = ref(null)

function selectAnswer(index) {
  selectedAnswer.value = index
}

function reveal() {
  if (selectedAnswer.value === null) return
  revealed.value = true
}

function rate(rating) {
  emit('rate', rating)
  revealed.value = false
  selectedAnswer.value = null
}

function getLetter(index) {
  return String.fromCharCode(65 + index)
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
  max-width: 700px;
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
  color: #8b5cf6;
  background: #f5f3ff;
  padding: 4px 12px;
  border-radius: 12px;
}

.card-domain {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.card-content {
  min-height: 250px;
}

.scenario {
  font-size: 16px;
  color: #111827;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #8b5cf6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.option:hover:not(.disabled) {
  border-color: #8b5cf6;
  background: #faf5ff;
}

.option.selected:not(.disabled) {
  border-color: #8b5cf6;
  background: #f5f3ff;
}

.option.correct {
  border-color: #10b981;
  background: #d1fae5;
}

.option.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
}

.option.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #374151;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.option.selected:not(.disabled) .option-letter {
  background: #8b5cf6;
  color: white;
}

.option.correct .option-letter {
  background: #10b981;
  color: white;
}

.option.incorrect .option-letter {
  background: #ef4444;
  color: white;
}

.option-text {
  flex: 1;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.explanation {
  margin-bottom: 16px;
  padding: 16px;
  background: #eff6ff;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.explanation-header {
  font-size: 14px;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 8px;
}

.explanation-text {
  font-size: 14px;
  color: #1e3a8a;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  font-size: 12px;
  border-top: 1px solid #e5e7eb;
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

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #8b5cf6;
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
