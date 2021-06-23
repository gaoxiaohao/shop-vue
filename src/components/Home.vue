<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>shop后台管理系统</span>
      </div>
      <button type="info" @click="logout">退出</button>
    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menuList"
            :index="item.id + ''"
            :key="item.id"
          >
            <!-- 一级菜单模板区 -->
            <template #title>
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->

              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="subItem in item.children"
              :index="subItem.name"
              :key="subItem.id"
              @click="saveNavState(subItem.name)"
            >
              <!-- 二级菜单模板 -->
              <template #title>
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.title }} </span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.toggle-button {
  background-color: #4a5054;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  background-color: #eaedea;
}
.home-container {
  height: 100%;
}
</style>

<script>
export default {
  //将数据绑定到组件
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: "",
    };
  },
  //初始化时调用菜单列表s数据
  created() {
    this.getMenuList(),
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取用户所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("admin/info");

      if (res.code !== 200) {
        return this.$message.error("获取菜单列表失败");
      }
      this.menuList = this.dataDeal(res.data.menus);
      console.log(this.menuList);
    },
    dataDeal(treedata) {
      //treedata为原数组
      //最顶级数据（没有父节点）
      var parents = treedata.filter((value) => value.parentId == 0);
      //有父节点的数据
      var children = treedata.filter((value) => value.parentId !== 0);

      this.translator(parents, children);
      return parents;
    },
    //实现的方法
    translator(parents, children) {
      //遍历父节点
      parents.forEach((parent) => {
        //遍历子节点
        children.forEach((child, index) => {
          //如父节点有对应的子节点，就在父节点对象中添加children属性，并将子节点作为属性值，然后子节点作为父节点一层一层遍历下去
          if (child.parentId == parent.id) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            this.translator([child], temp);
            typeof parent.children !== "undefined"
              ? parent.children.push(child)
              : (parent.children = [child]);
          }
        });
      });
    },
    //切换菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //save
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      if(activePath === '/welcome'){
        this.activePath =''
      }
      this.activePath =activePath
    }
  },
};
</script>