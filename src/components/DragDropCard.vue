<template>
  <div class="card dragdrop-card">
    <div class="card-header">
      <span class="card-type">Drag & Drop</span>
      <span class="card-domain">{{ card.domain }}</span>
    </div>

    <div class="card-content">
      <div class="instructions">{{ card.instructions }}</div>

      <div class="drag-drop-container">
        <div class="targets">
          <div
            v-for="(target, index) in targets"
            :key="index"
            class="target-zone"
            @drop="onDrop($event, index)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="target-label">{{ target.label }}</div>
            <div
              v-if="placements[index]"
              class="placed-item"
              :class="{
                'correct': revealed && placements[index] === target.correctItem,
                'incorrect': revealed && placements[index] !== target.correctItem
              }"
              draggable="true"
              @dragstart="onDragStart($event, placements[index], index)"
            >
              {{ placements[index] }}
            </div>
            <div v-else class="empty-slot">Drop here</div>
          </div>
        </div>

        <div class="items-bank">
          <div class="bank-label">Drag items from here:</div>
          <div class="items">
            <div
              v-for="item in availableItems"
              :key="item"
              class="draggable-item"
              draggable="true"
              @dragstart="onDragStart($event, item, null)"
            >
              {{ item }}
            </div>
          </div>
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
      <button @click="checkAnswer" class="btn btn-primary" :disabled="!allPlaced">
        Check Answer
      </button>
    </div>

    <div v-else class="card-actions rating-buttons">
      <button @click="rate(0)" class="btn btn-again">
        Again
        <span class="interval">Now</span>
      </button>
      <button @click="rate(1)" class="btn btn-hard">
        Later Today
        <span class="interval">{{ getInterval(1) }}</span>
      </button>
      <button @click="rate(2)" class="btn btn-good">
        Next Day
        <span class="interval">{{ getInterval(2) }}</span>
      </button>
      <button @click="rate(3)" class="btn btn-easy">
        Know It
        <span class="interval">{{ getInterval(3) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { updateCardSchedule } from '@/utils/spacedRepetition'

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['rate'])

const revealed = ref(false)
const placements = ref({})
const draggedItem = ref(null)
const draggedFromIndex = ref(null)
const shuffledItems = ref([])

const targets = computed(() => props.card.targets || [])
const allItems = computed(() => props.card.items || [])

const availableItems = computed(() => {
  const placed = Object.values(placements.value)
  return shuffledItems.value.filter(item => !placed.includes(item))
})

const allPlaced = computed(() => {
  return targets.value.every((_, index) => placements.value[index])
})

onMounted(() => {
  // Initialize placements and shuffle items
  placements.value = {}
  shuffleItems()
})

function shuffleItems() {
  // Fisher-Yates shuffle algorithm
  const items = [...allItems.value]
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  shuffledItems.value = items
}

function onDragStart(event, item, fromIndex) {
  draggedItem.value = item
  draggedFromIndex.value = fromIndex
  event.dataTransfer.effectAllowed = 'move'
}

function onDrop(event, targetIndex) {
  event.preventDefault()

  // Remove item from previous placement if it was placed
  if (draggedFromIndex.value !== null) {
    delete placements.value[draggedFromIndex.value]
  }

  // Place item in new target
  placements.value[targetIndex] = draggedItem.value

  // Trigger reactivity
  placements.value = { ...placements.value }

  draggedItem.value = null
  draggedFromIndex.value = null
}

function checkAnswer() {
  revealed.value = true
}

function rate(rating) {
  emit('rate', rating)
  revealed.value = false
  placements.value = {}
  shuffleItems() // Reshuffle for next time card appears
}

function getInterval(rating) {
  const updated = updateCardSchedule(props.card, rating)
  const days = updated.interval

  // For "Later Today" (rating 1), show hours
  if (rating === 1) {
    const hours = Math.round(days * 24)
    return `${hours}h`
  }

  // For "Next Day" (rating 2), show <1d since it's midnight (variable time)
  if (rating === 2) {
    return '<1d'
  }

  const roundedDays = Math.round(days)

  if (roundedDays < 1) {
    return '<1d'
  } else if (roundedDays === 1) {
    return '1d'
  } else if (roundedDays < 30) {
    return `${roundedDays}d`
  } else if (roundedDays < 365) {
    const months = Math.round(roundedDays / 30)
    return `${months}mo`
  } else {
    const years = Math.round(roundedDays / 365)
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
  max-width: 800px;
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
  color: #059669;
  background: #d1fae5;
  padding: 4px 12px;
  border-radius: 12px;
}

.card-domain {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.card-content {
  min-height: 300px;
}

.instructions {
  font-size: 16px;
  color: #111827;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #059669;
  font-weight: 600;
}

.drag-drop-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 20px;
}

.targets {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.target-zone {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
  min-height: 60px;
}

.target-label {
  flex: 0 0 200px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.empty-slot {
  flex: 1;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 12px;
}

.placed-item {
  flex: 1;
  padding: 12px 16px;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 6px;
  font-weight: 500;
  cursor: grab;
  transition: all 0.2s;
}

.placed-item:active {
  cursor: grabbing;
}

.placed-item.correct {
  background: #d1fae5;
  color: #065f46;
  border: 2px solid #10b981;
}

.placed-item.incorrect {
  background: #fee2e2;
  color: #991b1b;
  border: 2px solid #ef4444;
}

.items-bank {
  padding: 16px;
  background: #fffbeb;
  border-radius: 8px;
  border: 2px solid #fbbf24;
}

.bank-label {
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 12px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.draggable-item {
  padding: 12px 16px;
  background: white;
  border: 2px solid #fbbf24;
  border-radius: 6px;
  font-weight: 500;
  color: #92400e;
  cursor: grab;
  transition: all 0.2s;
}

.draggable-item:hover {
  background: #fef3c7;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.draggable-item:active {
  cursor: grabbing;
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
  background: #059669;
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
