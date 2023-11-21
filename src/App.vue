<template>
  <v-app>
    <!-- Toolbar -->
    <v-app-bar app color="green" dark>
      <!-- Title -->
      <v-toolbar-title>GAS Account Book</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Table Icon Button -->
      <v-btn icon to="/">
        <v-icon>mdi-file-table-outline</v-icon>
      </v-btn>
      <!-- Settings Icon Button -->
      <v-btn icon to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
