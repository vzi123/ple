<template>
  <div id="sidebar-wrap" class="sidebar-area position-fixed bg_primary transition">
    <div id="sidebar_menu_wrap" class="sidebar-menu-wrap">
      <ul class="sidebar-menu list-style">
        <li v-for="(tab, tabIndex) in tabData" :key="tabIndex" class="nav-item">

          <template v-if="tab.name !== 'Expenses'">
            <router-link v-if="!tab.subMenu" :to="tab.link" class="nav-link">

              <img :src="require(`../../assets/img/icons/${tab.icon}`)" alt="Image"
                onerror="this.onerror=null; this.src='../../assets/img/icons/dashboard.svg';" />
              <span class="nav-text d-block fs-14 fw-light">{{ tab.name }}</span>
            </router-link>
            <a v-else href="javascript:void(0)" class="nav-link">

              <img :src="require(`../../assets/img/icons/${tab.icon}`)" alt="Image"
                onerror="this.onerror=null; this.src='../../assets/img/icons/dashboard.svg';" />
              <span class="nav-text d-block fs-14">{{ tab.name }}</span>
            </a>
          </template>


          <template v-if="tab.name === 'Expenses' && showExpensesTab">
            <router-link v-if="!tab.subMenu" :to="tab.link" class="nav-link">
              <img :src="require(`../../assets/img/icons/${tab.icon}`)" alt="Image"
                onerror="this.onerror=null; this.src='../../assets/img/icons/dashboard.svg';" />
              <!-- <img :src="tab.icon" alt="Image" /> -->
              <span class="nav-text d-block fs-14 fw-light">{{ tab.name }}</span>
            </router-link>
            <a v-else href="javascript:void(0)" class="nav-link">

              <img :src="require(`../../assets/img/icons/${tab.icon}`)" alt="Image"
                onerror="this.onerror=null; this.src='../../assets/img/icons/dashboard.svg';" /> <span
                class="nav-text d-block fs-14">{{ tab.name }}</span>
            </a>
          </template>


          <ul v-if="tab.subMenu" class="sidebar-secondary-menu list-style bg-white">
            <li v-for="(subItem, subIndex) in tab.subMenu" :key="subIndex" class="nav-item">
              <router-link :to="subItem.link">

                <img :src="require(`../../assets/img/icons/${subItem.icon}`)" alt="Image"
                  onerror="this.onerror=null; this.src='../../assets/img/icons/dashboard.svg';" />

                {{ subItem.name }}
              </router-link>
              <ul v-if="subItem.subMenu" class="sidebar-tertiary-menu list-style bg-white">
                <li v-for="(thirdItem, thirdIndex) in subItem.subMenu" :key="thirdIndex" class="nav-item">
                  <router-link :to="thirdItem.link">
                    {{ thirdItem.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<style lang="scss" scoped>
/* Your original CSS goes here */
</style>


<script>
export default {
  name: "MainSidebar",
  data() {
    return {
      showExpensesTab: true, // Set this to false to hide the Expenses tab
      tabData: [
        {
          name: "Dashboard",
          icon: "dashboard.svg",
          link: "/"
        },
        {
          name: "Stock",
          icon: "products.svg",
          subMenu: [
            // { name: "Create Product", icon: "create-item.svg", link: "/create-product" },
            { name: "Stock Details", icon: "item-list.svg", link: "/product-list" },
            { name: "Inward Entry", icon: "item-list.svg", link: "/in" },
            { name: "Outward Entry", icon: "item-list.svg", link: "/out" },
            { name: "Inventory Log", icon: "quantity-alert.svg", link: "/inventory-log" },
          ]
        },
        {
          name: "Products",
          icon: "products.svg",
          subMenu: [
            { name: "Create Product", icon: "create-item.svg", link: "/create-product" },
            { name: "Product Details", icon: "item-list.svg", link: "/stock-list" },
          ]
        },
        {
          name: "Customers",
          icon: "people.svg",
          subMenu: [
            { name: "Purchase Orders", icon: "item-list.svg", link: "/customer-purchase-list" },
            { name: "Create Purchases", icon: "create-item.svg", link: "/customer-create-purchase" }
          ]
        },
        {
          name: "Suppliers",
          icon: "people.svg",
          subMenu: [
            { name: "Purchase Orders", icon: "item-list.svg", link: "/supplier-purchase-list" },
            { name: "Create Purchases", icon: "create-item.svg", link: "/create-purchase" }
          ]
        },
        {
          name: "Quotations",
          icon: "quotation.svg",
          subMenu: [
            { name: "Create Quotation", icon: "create-item.svg", link: "/create-quotation" },
            { name: "Quotation List", icon: "item-list.svg", link: "/quotation-list" }
          ]
        },
        {
          name: "People",
          icon: "adjustments.svg",
          subMenu: [
            { name: "Customer List", icon: "user-square.svg", link: "/customer-list" },
            { name: "Supplier List", icon: "item-list.svg", link: "/supplier-list" },
            // { name: "Contractor List", icon: "profile-circle.svg", link: "/user-list" }
          ]
        },
        {
          name: "Settings",
          icon: "setting-2.svg",
          subMenu: [
            { name: "Branch", icon: "warehouse.svg", link: "/warehouse-list" },
            { name: "Category", icon: "category.svg", link: "/category-list" },
            { name: "Unit", icon: "unit.svg", link: "/unit-list" },

            
                                        // No need to show the products on settings 
            // {
            //   name: "Products", icon: "setting-3.svg", link: "/_", subMenu: [
            //     { name: "Create Product", icon: "brand.svg", link: "/create-product" },
            //     { name: "Product List", icon: "currency.svg", link: "/product-list" },
            //   ]
            // },
          ]
        },
        {
          name: "Reports",
          icon: "reports.svg",
          subMenu: [
            { name: "Purchase Report", icon: "purchase-2.svg", link: "/purchase-report" },
            { name: "Purchase Payment Report", icon: "purchase-payment.svg", link: "/purchase-payment-report" },
            { name: "Purchase Return Report", icon: "purchase-return-2.svg", link: "/purchase-return-report" },
            { name: "Sales Report", icon: "money-3.svg", link: "/sales-report" },
            { name: "Sales Payment Report", icon: "money-3.svg", link: "/sales-payment-report" },
            { name: "Sales Return Report", icon: "sales-return-2.svg", link: "/sales-return-report" },
            { name: "Product Quantity Alert", icon: "quantity-alert.svg", link: "/product-quantity-alert" },
            { name: "Profit & Loss", icon: "dollar-circle.svg", link: "/profit-loss" },
            { name: "Product Report", icon: "create-item.svg", link: "/product-report" },
            { name: "Stock Report", icon: "category.svg", link: "/stock-report" },
            { name: "Warehouse Report", icon: "warehouse-report.svg", link: "/warehouse-report" },
            { name: "Customer Report", icon: "customer-report.svg", link: "/customer-report" },
            { name: "Supplier Report", icon: "supplier-report.svg", link: "/supplier-report" },
            { name: "User Report", icon: "user-square.svg", link: "/user-report" }
          ]
        }
      ]
    };
  },

};
</script>

<style lang="scss" scoped>
.sidebar-area {
  top: 100px;
  left: 0;
  height: 100%;
  z-index: 2;
  transition: var(--transition);

  .sidebar-menu-wrap {
    padding: 40px;
    z-index: 2;

    .sidebar-menu {
      position: relative;
      z-index: 2;

      &>.nav-item {
        margin-bottom: 25px;
        display: block;

        &:last-child {
          margin-bottom: 0;
        }

        &>.nav-link {
          position: relative;
          background-color: #2c3a52;
          text-align: center;
          display: inline-block;
          width: 128px;
          height: 100px;
          border-radius: 4px;
          padding: 19px 5px 18px;
          transition: var(--transition);
          z-index: 1;

          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            width: 100%;
            height: 0;
            border-radius: 4px;
            background: var(--Purple-Gradient,
                linear-gradient(132deg, #4f46e5 4.27%, #6366f1 100%));
            visibility: hidden;
            opacity: 0;
            transition: var(--transition);
            z-index: -1;
          }

          img {
            display: block;
            margin: 0 auto;
          }

          .nav-text {
            color: #c6c7d3;
            margin-top: 5px;
          }

          &.active {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }

        &.active,
        &:hover {
          &>.nav-link {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }

        &:has(ul.sidebar-secondary-menu li a.active) {
          &>.nav-link {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }

        .sidebar-secondary-menu {
          position: fixed;
          top: 100px;
          left: 208px;
          width: 280px;
          height: calc(100vh - 100px);
          visibility: hidden;
          opacity: 0;
          transition: var(--transition);
          z-index: 0;
          overflow-y: auto;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.06);

          li {
            a {
              font-size: 14px;
              color: var(--primaryColor);
              transition: var(--transition);
              padding: 14px 25px;
              display: block;
              width: 100%;

              img {
                position: relative;
                margin-right: 8px;
                top: -1.5px;
              }

              &.active,
              &:hover {
                background-color: #f3f8ff;
              }
            }

          }
        }

        &:hover {
          .sidebar-secondary-menu {
            visibility: visible;
            opacity: 1;
          }
        }

      }
    }
  }
}

#sidebar_menu_wrap {
  position: relative;
  z-index: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: var(--primaryColor);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }

  &::-webkit-scrollbar-corner {
    background: #000;
  }
}


@media only screen and (max-width: 575px) {
  .sidebar-area {
    top: 116px;

    .sidebar-menu-wrap {
      padding: 25px 15px;

      .sidebar-menu {
        &>.nav-item {
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }

          &>.nav-link {
            width: 55px;
            height: 55px;
            padding: 14px 5px 12px;

            img {
              max-width: 27px;
            }

            .nav-text {
              display: none !important;
            }
          }

          .sidebar-secondary-menu {
            top: 116px;
            left: 80px;
            width: 250px;
            height: 100vh;

            li {
              a {
                font-size: 14px;
                padding: 14px 20px;
              }
            }
          }
        }
      }
    }
  }

  #sidebar_menu_wrap {
    height: calc(100vh - 116px);
  }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .sidebar-area {
    top: 80px;

    .sidebar-menu-wrap {
      .sidebar-menu {
        &>.nav-item {
          .sidebar-secondary-menu {
            top: 79px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1199px) {}
</style>