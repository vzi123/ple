<template>
  <div class="searchable-dropdown">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search customer..."
      class="bg-white border rounded-1 fs-14 text-optional"
    />
    <select v-model="form.customer" class="bg-white border-0 rounded-1 fs-14 text-optional">
      <option v-for="customer in filteredCustomers" :key="customer.value" :value="customer.value">
        {{ customer.label }}
      </option>
      <option v-if="!filteredCustomers.length" disabled>No results found</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      customers: [
        { value: 0, label: 'Jhon Victim' },
        { value: 1, label: 'Tony Stark' },
        // Add more customers here
      ],
    };
  },
  computed: {
    filteredCustomers() {
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.customers.filter((customer) =>
        customer.label.toLowerCase().includes(searchTermLower)
      );
    },
  },
};
</script>

<style scoped>
.searchable-dropdown {
  position: relative; /* Necessary for proper positioning of the dropdown menu */
}

.searchable-dropdown input {
  width: 100%;
  padding: 5px;
}

.searchable-dropdown select {
  position: absolute;
  top: 100%; /* Position the dropdown menu below the input field */
  left: 0;
  width: 100%;
  z-index: 1; /* Ensure the dropdown menu is displayed above other elements */
  border: 1px solid #ccc; /* Add a border for better visibility */
  background-color: #fff; /* Set background color */
  max-height: 200px; /* Limit the height of the dropdown menu */
  overflow-y: auto; /* Enable scrolling if the list of options is long */
}

.searchable-dropdown select option[disabled] {
  color: #ccc; /* Style disabled options */
}
</style>
