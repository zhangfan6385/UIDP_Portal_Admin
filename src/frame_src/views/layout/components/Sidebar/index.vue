<template>
  <!-- #304156 -->
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu class="theme themeBlue"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return false //!this.sidebar.opened
    }
  }
}
</script>
<style>
#app .sidebar-container .svg-icon {
  margin-right:8px;
}
</style>