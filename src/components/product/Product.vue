<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form ref="searchRef" :model="queryInfo">
        <div>
          <el-row :gutter="24">
            <el-col :span="6">
              <div>
                <span class="searchText"> 输入搜索：</span>
                <el-input
                  placeholder="请输入内容"
                  clearable
                  v-model="queryInfo.keyword"
                >
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="searchText">商品货号：</span>
                <el-input
                  placeholder="请输入内容"
                  v-model="queryInfo.productSn"
                  clearable
                >
                </el-input></div
            ></el-col>
            <el-col :span="6">
              <div>
                <span class="searchText"> 商品分类：</span>
                <el-cascader
                  v-model="categoryValue"
                  :options="categoryList"
                  :props="casProps"
                  @change="changeCas()"
                  clearable
                ></el-cascader></div
            ></el-col>
          </el-row>
        </div>

        <div class="search-margin">
          <el-row :gutter="24">
            <el-col :span="6">
              <div>
                <span class="searchText"> 商品品牌：</span>
                <el-select v-model="brandValue" clearable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in brandList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :span="6">
              <div>
                <span class="searchText">上架状态：</span>
                <el-select v-model="UpValue" clearable placeholder="请选择">
                  <el-option
                    v-for="item in UpOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></div
            ></el-col>
            <el-col :span="6">
              <div>
                <span class="searchText"> 审核状态：</span
                ><el-select v-model="StateValue" clearable placeholder="请选择">
                  <el-option
                    v-for="item in StateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></div
            ></el-col>
          </el-row>
        </div>

        <div class="search-margin">
          <el-button type="info" @click="searchReset()">重置</el-button
          ><el-button type="primary" @click="searchProduct()">查询</el-button>
        </div>
      </el-form>

      <!-- 商品列表 -->
      <el-table border :data="productList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="pic" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="product-pic" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"> </el-table-column>
        <el-table-column prop="productSn" label="价格/货号"> </el-table-column>
        <el-table-column prop="address" label="标签"> </el-table-column>
        <el-table-column prop="sort" label="排序"> </el-table-column>
        <el-table-column prop="address" label="SKU库存"> </el-table-column>
        <el-table-column prop="sale" label="销量"> </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            <el-switch
              :inaactive-value="0"
              :active-value="1"
              v-model="scope.row.publishStatus"
              @change="productState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px">
          <template slot-scope="scope">
            <div class="operation-button">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="edit(scope.row.id)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-share"
                size="mini"
              ></el-button>
            </div>

            <div class="operation-button">
              <el-button
                type="primary"
                icon="el-icon-share"
                size="mini"
              ></el-button>
              <el-tooltip
                :enterable="true"
                effect="dark"
                content="Top Center 提示文字"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="page-container">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-select
                v-model="value"
                clearable
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in StateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button class="change-btn" size="small" type="primary"
                >批量修改</el-button
              >
            </div></el-col
          >

          <el-col :span="12">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[queryInfo.pageSize, 10, 20, 30, 40]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination></div
          ></el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<style lang="less" scoped>
.searchText {
  font-size: 13px;
}
.search-margin {
  margin-top: 20px;
}
.el-input {
  width: auto;
}
.product-pic {
  width: 80px;
  height: 80px;
}
.page-container {
  margin-top: 12px;
}
.change-btn {
  margin-left: 5px;
}
.operation-button {
  margin-top: 12px;
  margin-left: 5px;
}
</style>

<script>
export default {
  data() {
    return {
      //审核下拉数据
      StateOptions: [
        {
          value: 1,
          label: "已审核",
        },
        {
          value: 0,
          label: "未审核",
        },
      ],
      value: "",
      categoryValue: "",
      //品牌选择框value
      brandValue: "",
      //上架状态value
      UpValue: "",
      //审核状态value
      StateValue: "",
      //上架下拉数据
      UpOptions: [
        {
          value: 1,
          label: "上架",
        },
        {
          value: 0,
          label: "下架",
        },
      ],
      //品牌列表数据
      brandList: [],

      //分类数据列表
      categoryList: [],
      // 自定义 props
      casProps: { label: "name", value: "id", children: "children" },
      //获取参数对象
      queryInfo: {
        brandId: "",
        keyword: "",
        pageNum: 1,
        pageSize: 5,
        productCategoryId: "",
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
      },
      //商品列表
      productList: [],
      //总共商品数
      total: 0,
    };
  },
  created() {
    this.getProductList();
    this.getBrandList();
    this.getCategoryList();
  },
  methods: {
    async getProductList() {
      const { data: res } = await this.$http.get("product/list", {
        params: this.queryInfo,
      });
      console.log(res);
      this.productList = res.data.list;
      this.total = res.data.total;
    },
    //监听pageSize改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getProductList();
    },
    //监听页码值改变
    handleCurrentChange(pageNum) {
      this.queryInfo.pageNum = pageNum;
      this.getProductList();
    },
    //修改商品信息
    async productState(data) {
      if (data.publishStatus) {
        data.publishStatus = 1;
      } else {
        data.publishStatus = 0;
      }

      const { data: res } = await this.$http({
        method: "post",
        url: `product/update/${data.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      if (res.code !== 200) {
        data.publishStatus = !data.publishStatus;
        return this.$message.error("更新商品状态失败!");
      }
      this.$message.success("更新商品状态成功!");
    },
    //获取品牌列表
    async getBrandList() {
      const { data: res } = await this.$http.get("brand/listAll");

      this.brandList = res.data;
      console.log(this.brandList);
    },
    //获取分类列表
    async getCategoryList() {
      const { data: res } = await this.$http.get(
        "productCategory/list/withChildren"
      );

      this.categoryList = res.data;
      console.log(this.categoryList);
    },
    //按条件查询商品
    searchProduct() {
      this.queryInfo.brandId = this.brandValue;
      this.queryInfo.productCategoryId = this.categoryValue[1];
      this.queryInfo.publishStatus = this.UpValue;
      this.queryInfo.verifyStatus = this.StateValue;
      this.getProductList();
    },
    //重置按钮
    searchReset() {
      this.$refs.searchRef.resetFields();
    },
    changeCas() {
      console.log(this.categoryValue);
    },
  },
};
</script>