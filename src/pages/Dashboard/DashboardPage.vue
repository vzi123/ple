<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden">
   <div class="col-lg-4 timeFilter">
        <div class="col-lg-12">
          <label class="d-block fs-14 text-black mb-2"></label>
          <select class="bg-white border-0 rounded-1 fs-14 text-optional">
            <option value="0">This week</option>
            <option value="1">This month</option>
             <option value="0">This quarter</option>
            <option value="1">This year</option>
          </select>
        </div>
      </div>
    <StatusContent />
    <!--
    <div class="chart-wrapper style-one d-flex">
      <div class="card border-0 rounded-1 mb-20">
        <div class="card-body p-xl-40">
          <h6 class="card-title fw-semiBold fs-18 mb-30">
            Top Selling Products (2023)
          </h6>
          <div class="chart-body">
            <TopSellingProductsChart />
          </div>
        </div>
      </div>
      <div class="card border-0 rounded-1 mb-20">
        <div class="card-body p-xl-40">
          <h6 class="card-title fw-semiBold fs-18 mb-30">
            This Weeks Sales & Purchases
          </h6>
          <ThisWeeksSalesPurchasesChart />
        </div>
      </div>
    </div>
    -->

<!--      <div class="card border-0 rounded-1 mb-40">-->
<!--        <StockAlert />-->
<!--      </div>-->

      <div class="card border-0 rounded-1 mb-40">
        <InventoryLog />
      </div>




      <div class="card border-0 rounded-1 mb-40">
        <payables />
      </div>


      <div class="card border-0 rounded-1 mb-40">
        <receivables />
      </div>

      <!--
      <div class="card border-0 shadow-none rounded-1 mb-20">
        <RecentInvoices />
      </div>
      <div class="chart-wrapper style-three d-flex flex-wrap">
      -->


    <div class="card border-0 shadow-none rounded-1 mb-40">
      <openQuotations />
    </div>
    <div class="card border-0 shadow-none rounded-1 mb-40">
          <stock />
        </div>

    <div class="card border-0 shadow-none rounded-1 mb-40">
              <fulfillment />
         </div>
    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import StatusContent from "../../components/Dashboard/StatusContent.vue";
import StockAlert from "../../components/Dashboard/StockAlert.vue";
import InventoryLog from "../../components/Dashboard/InventoryLog.vue";

import payables from "../../components/Dashboard/payables.vue";

import receivables from "../../components/Dashboard/receivables.vue";

import fulfillment from "../../components/Dashboard/fulfillment.vue";

import stock from "../../components/Dashboard/stock.vue";

import openQuotations from "../../components/Dashboard/openQuotations.vue";
//import TopSellingProductsChart from "../../components/Dashboard/TopSellingProductsChart.vue";
//import ThisWeeksSalesPurchasesChart from "../../components/Dashboard/ThisWeeksSalesPurchasesChart.vue";

//import TopCustomerChart from "../../components/Dashboard/TopCustomerChart.vue";
//import SalesTargetChart from "../../components/Dashboard/SalesTargetChart.vue";
//import PaymentSentReceivedChart from "../../components/Dashboard/PaymentSentReceivedChart.vue";
//import RecentInvoices from "../../components/Dashboard/RecentInvoices.vue";
import RecentSales from "../../components/Dashboard/RecentSales.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";

export default defineComponent({
  name: "DashboardPage",
  components: {
    MainHeader,
    MainSidebar,
    StatusContent,
    //TopSellingProductsChart,
   // ThisWeeksSalesPurchasesChart,
   //  StockAlert,
    InventoryLog,
    payables,
    receivables,
    fulfillment,
    stock,
    openQuotations,
    //TopCustomerChart,
    //SalesTargetChart,
    //PaymentSentReceivedChart,
    //RecentInvoices,
    //RecentSales,
    MainFooter,
  },
});
</script>

<style lang="scss" scoped>
.timeFilter{
  display: flex;
    align-self: flex-end;
    margin-bottom: 10px;
}
.chart-wrapper {
  margin: 0 -10px;
  .card {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>