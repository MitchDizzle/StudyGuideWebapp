<template>
  <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-icon">🎓</div>
        <h2>Welcome to CompTIA Study Guide!</h2>
        <p>Select which study packs you'd like to enable to get started.</p>
      </div>

      <div class="pack-selection">
        <div
          v-for="pack in availablePacks"
          :key="pack.id"
          class="pack-option"
          :class="{ selected: selectedPacks.includes(pack.id) }"
          @click="togglePack(pack.id)"
        >
          <div class="pack-option-header">
            <div class="pack-checkbox">
              <div v-if="selectedPacks.includes(pack.id)" class="checkmark">✓</div>
            </div>
            <div class="pack-option-info">
              <div class="pack-option-name">{{ pack.name }}</div>
              <div class="pack-option-description">{{ pack.description }}</div>
              <div class="pack-option-count">{{ pack.cardCount }} cards</div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button
          @click="handleContinue"
          class="btn btn-primary btn-large"
          :disabled="selectedPacks.length === 0 || isSubmitting"
        >
          <span v-if="!isSubmitting">
            Continue with {{ selectedPacks.length }} pack{{ selectedPacks.length !== 1 ? 's' : '' }}
          </span>
          <span v-else>
            Loading...
          </span>
        </button>
        <p class="footer-note">You can change this later in Settings</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  availablePacks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'select'])

const selectedPacks = ref([])
const isSubmitting = ref(false)

// Reset selected packs when modal visibility changes
watch(() => props.show, (newShow) => {
  if (!newShow) {
    selectedPacks.value = []
    isSubmitting.value = false
  }
})

function togglePack(packId) {
  if (isSubmitting.value) return // Prevent changes while submitting

  if (selectedPacks.value.includes(packId)) {
    selectedPacks.value = selectedPacks.value.filter(id => id !== packId)
  } else {
    selectedPacks.value.push(packId)
  }
}

function handleContinue() {
  if (selectedPacks.value.length > 0 && !isSubmitting.value) {
    isSubmitting.value = true
    emit('select', selectedPacks.value)
  }
}

function handleOverlayClick() {
  // Prevent closing modal by clicking overlay on first visit
  // User must select at least one pack
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 40px 32px 24px;
  text-align: center;
  border-bottom: 2px solid #e5e7eb;
}

.modal-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 28px;
  color: #111827;
  margin-bottom: 12px;
}

.modal-header p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.pack-selection {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pack-option {
  border: 3px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.pack-option:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pack-option.selected {
  border-color: #6366f1;
  background: #f5f3ff;
}

.pack-option-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.pack-checkbox {
  width: 28px;
  height: 28px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
  transition: all 0.2s;
}

.pack-option.selected .pack-checkbox {
  border-color: #6366f1;
  background: #6366f1;
}

.checkmark {
  color: white;
  font-size: 18px;
  font-weight: 700;
}

.pack-option-info {
  flex: 1;
}

.pack-option-name {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
}

.pack-option-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.pack-option-count {
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
}

.modal-footer {
  padding: 24px 32px 40px;
  text-align: center;
  border-top: 2px solid #e5e7eb;
}

.btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: #6366f1;
  color: white;
}

.btn-large {
  padding: 14px 40px;
  font-size: 16px;
  width: 100%;
}

.footer-note {
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #9ca3af;
}
</style>
