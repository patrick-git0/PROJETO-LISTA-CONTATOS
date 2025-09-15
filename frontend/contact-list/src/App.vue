<template>
  <div class="app">

    <header class="header">
      <span >Lista de Contatos </span>
    </header>

    <AddContactModal v-model:isOpen="showModal" @refresh="fetchContacts" />

    <div class="search-container">
      <input v-model="search" placeholder="Buscar contato" class="search" />
      <button class="btn-add" @click="showModal = true">+</button>
    </div>

    <ContactList :contacts="filteredContacts" @refresh="fetchContacts" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ContactList from './components/ContactList.vue'
import AddContactModal from './components/AddContactModal.vue'

const contacts = ref([])
const search = ref('')
const showModal = ref(false) 

const fetchContacts = async () => {
  const res = await axios.get('/contacts')
  contacts.value = res.data
}

onMounted(fetchContacts)

const filteredContacts = computed(() =>
  contacts.value.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.header {
  background: #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin: -30px -50vw 0 -50vw;
  padding: 6rem 20px 2rem 20px;
  box-sizing: border-box;

  span{
    margin: -20px 70px 30px 0;
    font-size: larger;
    font-weight:500;
  }
}


.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 15px 0;
}

.search {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}


.btn-add {
  background: #4b6cb7;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.2s ease;
  margin-bottom: 15px;
}

.btn-add:hover {
  background: #3b5998;
}
</style>
