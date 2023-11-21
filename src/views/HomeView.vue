<template>
  <div>
    <v-card>
      <v-card-title>
        <!-- Select Month -->
        <v-col cols="8">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="yearMonth"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="yearMonth"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                hide-details
              />
            </template>
            <v-date-picker
              v-model="yearMonth"
              type="month"
              color="green"
              locale="ja-jp"
              no-title
              scrollable
            >
              <v-spacer />
              <v-btn text color="grey" @click="menu = false">キャンセル</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(yearMonth)"
                >選択</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer />
        <!-- Add Button -->
        <v-col class="text-right" cols="4">
          <v-btn dark color="green">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <!-- Search Form -->
        <v-col cols="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-col>
      </v-card-title>
      <!-- Tables -->
      <v-data-table
        class="text-no-wrap"
        :headers="tableHeaders"
        :items="tableData"
        :search="search"
        :footer-props="footerProps"
        :loading="loading"
        :sort-by="'date'"
        :sort-desc="true"
        :items-per-page="30"
        mobile-breakpoint="0"
      >
        <template v-slot:item.date="{ item }">
          {{ parseInt(item.date.slice(-2)) + "日" }}
        </template>
        <!-- Tags -->
        <template v-slot:item.tags="{ item }">
          <div v-if="item.tags">
            <v-chip
              class="mr-2"
              v-for="(tag, index) in item.tags.split(',')"
              :key="index"
              >{{ tag }}</v-chip
            >
          </div>
        </template>
        <!-- Income -->
        <template v-slot:item.income="{ item }">
          {{ separate(item.income) }}
        </template>
        <!-- Outgo -->
        <template v-slot:item.outgo="{ item }">
          {{ separate(item.outgo) }}
        </template>
        <!-- Actions -->
        <template v-slot:item.actions="{}">
          <v-icon class="mr-2"> mdi-pencil </v-icon>
          <v-icon> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);

    return {
      /** Login狀態 */
      loading: false,
      /** 月份選擇狀態 */
      menu: false,
      /** 文字框 */
      search: "",
      /** 選擇年月 */
      yearMonth: `${year}-${month}`,
      /** Dummy Data */
      tableData: [
        {
          id: "a34109ed",
          date: "2020-06-01",
          title: "支出TEST",
          category: "購物",
          tags: "tag1",
          income: null,
          outgo: 2000,
          memo: "備註",
        },
        {
          id: "7c8fa764",
          date: "2020-06-02",
          title: "收入TEST",
          category: "薪水",
          tags: "tag1,tag2",
          income: 2000,
          outgo: null,
          memo: "備註",
        },
      ],
    };
  },
  computed: {
    /** 表頭顯示文字 */
    tableHeaders() {
      return [
        { text: "日期", value: "date", align: "end" },
        { text: "標題", value: "title", sortable: false },
        { text: "類別", value: "category", sortable: false },
        { text: "標籤", value: "tags", sortable: false },
        { text: "收日", value: "income", align: "end" },
        { text: "支出", value: "outgo", align: "end" },
        { text: "備註", value: "memo", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ];
    },

    /** 表格底部 */
    footerProps() {
      return { itemsPerPageText: "", itemsPerPageOptions: [] };
    },
  },
  methods: {
    //將3位數的數字拆開並回傳
    //如果回傳數字是空值時回傳null
    separate(num) {
      return num !== null
        ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : null;
    },
  },
};
</script>
