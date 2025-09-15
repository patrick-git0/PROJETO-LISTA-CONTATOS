<template>
  <div class="contact-list">
    <ul>
      <li v-for="contact in contacts" :key="contact.id" class="contact-item">
        <div class="contact-info">
          <p class="name">{{ contact.name }}</p>
          <p class="phone">📞 {{ contact.phone }}</p>
          <p class="email">✉️ {{ contact.email }}</p>
        </div>
        <div class="contact-actions">
          <button type="button" @click="openEdit(contact)" class="btn-edit">✏️ Editar</button>
          <button type="button" @click="deleteContact(contact.id)" class="btn-delete">🗑️ Deletar</button>
        </div>
      </li>
    </ul>

    <EditContactModal
      v-if="editingContact"
      :contact="editingContact"
      @close="editingContact = null"
      @refresh="refreshContacts"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios'
import EditContactModal from './EditContactModal.vue'

const props = defineProps({ contacts: Array })
const emits = defineEmits(['refresh'])

const editingContact = ref(null)

const deleteContact = async (id) => {
  await axios.delete(`/contacts/${id}`)
  emits('refresh')
}

const openEdit = (contact) => {
  editingContact.value = { ...contact }
}

const refreshContacts = () => {
  emits('refresh')
  editingContact.value = null
}
</script>

<style scoped>
.contact-list {
  width: 92%;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.8rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: 0.2s ease;
}

.contact-item:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.contact-info {
  flex: 1;
}

.name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.phone,
.email {
  font-size: 0.9rem;
  color: #555;
  margin: 2px 0;
}

.contact-actions {
  display: flex;
  gap: 0.5rem;
}

.contact-actions button {
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s ease;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background: #2563eb;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}
</style>
