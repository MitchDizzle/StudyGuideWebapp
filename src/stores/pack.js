import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as db from '@/db'
import { availablePacks } from '@/data/packs'

export const usePackStore = defineStore('pack', () => {
  const enabledPackIds = ref([]) // Default to no packs enabled

  // Computed properties
  const enabledPacks = computed(() => {
    return availablePacks.filter(pack => enabledPackIds.value.includes(pack.id))
  })

  const allPacks = computed(() => availablePacks)

  // Actions
  async function loadSettings() {
    const settings = await db.getSettings()
    if (settings?.enabledPacks) {
      enabledPackIds.value = settings.enabledPacks
    }
  }

  async function togglePack(packId) {
    if (enabledPackIds.value.includes(packId)) {
      // Allow disabling all packs now
      enabledPackIds.value = enabledPackIds.value.filter(id => id !== packId)
    } else {
      enabledPackIds.value.push(packId)
    }

    await saveSettings()
    return true
  }

  async function enablePack(packId) {
    if (!enabledPackIds.value.includes(packId)) {
      enabledPackIds.value.push(packId)
      await saveSettings()
    }
  }

  async function disablePack(packId) {
    if (enabledPackIds.value.includes(packId)) {
      enabledPackIds.value = enabledPackIds.value.filter(id => id !== packId)
      await saveSettings()
    }
    return true
  }

  async function saveSettings() {
    const settings = await db.getSettings() || {}
    // Create a plain array copy to avoid Proxy serialization issues
    settings.enabledPacks = [...enabledPackIds.value]
    await db.saveSettings(settings)
  }

  function isPackEnabled(packId) {
    return enabledPackIds.value.includes(packId)
  }

  return {
    enabledPackIds,
    enabledPacks,
    allPacks,
    loadSettings,
    togglePack,
    enablePack,
    disablePack,
    isPackEnabled
  }
})
