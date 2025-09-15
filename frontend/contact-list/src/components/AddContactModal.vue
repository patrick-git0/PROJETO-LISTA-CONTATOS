<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>Adicionar Contato</h2>
        <form @submit.prevent="submitForm" class="form">
          <input v-model="name" placeholder="Nome" required />
          <input v-model="phone" placeholder="Telefone" required />
          <input  v-model="email" placeholder="Email" required />
          <div class="modal-actions">
            <button type="submit" class="btn-submit">Adicionar</button>
            <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  isOpen: Boolean
})
const emits = defineEmits(['update:isOpen', 'refresh'])

const name = ref('')
const phone = ref('')
const email = ref('')

const submitForm = async () => {
  try {
    await axios.post('/contacts', {
      name: name.value,
      phone: phone.value,
      email: email.value
    })
    name.value = ''
    phone.value = ''
    email.value = ''
    emits('refresh')
    emits('update:isOpen', false) // fecha modal
  } catch (error) {
    console.error('Erro ao adicionar contato:', error)
  }
}

const closeModal = () => {
  emits('update:isOpen', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h2 {
    margin-top: -20px;
    margin-right: 20px;
    text-align: center;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1rem;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.btn-submit {
  font-size: small;
  background: #4b6cb7;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background: #3b5998;
}

.btn-cancel {
  font-size: small;
  background: #ccc;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #999;
}

.modal-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
</style>
