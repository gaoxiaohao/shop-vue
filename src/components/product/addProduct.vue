<template>
  <el-card>
    <!-- 步骤条 -->
    <el-steps :active="stepActive" align-center >
      <el-step
        title="填写商品信息"
       
      ></el-step>
      <el-step
        title="填写商品属性"
       
      ></el-step>
      <el-step
        title="填写商品促销"
       
      ></el-step>
      <el-step
        title="选择商品关联"
        
      ></el-step>
    </el-steps>
    <el-form ref="form" :model="form" label-width="70px">
      <!-- 表单第一页 -->
      <div :class="first">
        <el-form-item label="商品分类">
           <el-cascader
                  v-model="categoryValue"
                  :options="categoryList"
                  :props="casProps"
                  @change="changeCas()"
                  clearable
                ></el-cascader>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="副标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品品牌">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品货号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品售价">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="next()">下一步填写商品属性</el-button>
      </div>

      <!--第二页 -->

      <div :class="second">
        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第二页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="prev()">上一步填写商品信息</el-button>
        <el-button type="primary" @click="next()">下一步填写商品属性</el-button>
      </div>

      <!--第三页 -->

      <div :class="three">
        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第三页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="prev()">上一步填写商品属性</el-button>
        <el-button type="primary" @click="next()">下一步填写商品促销</el-button>
      </div>

      <!--第四页名称 -->

      <div :class="four">
        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="第四页名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="prev()">上一步填写商品促销</el-button>
        <el-button type="primary" @click="next()">完成提交</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
.show {
  display: "";
  width: 80%;
  margin: auto;
}
.el-card{
    width: 90%;
    margin: auto;
}

.hidden {
  display: none;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      stepActive: 0,
      first: "show",
      second: "hidden",
      three: "hidden",
      four: "hidden",
    };
  },
  methods: {
    prev() {
      if (this.stepActive-- < 0)
      {
           this.stepActive = 0;
      }
       if (this.stepActive === 0) {
        this.first = "show";
        this.second = "hidden";
        this.three = "hidden";
        this.four = "hidden";
      } else if (this.stepActive === 1) {
        this.first = "hidden";
        this.second = "show";
        this.three = "hidden";
        this.four = "hidden";
      } else if (this.stepActive === 2) {
        this.first = "hidden";
        this.second = "hidden";
        this.three = "show";
        this.four = "hidden";
      }
    },
    next() {
      if (this.stepActive++ > 3) {
        this.stepActive = 0;
      }
      if (this.stepActive === 1) {
        this.first = "hidden";
        this.second = "show";
        this.three = "hidden";
        this.four = "hidden";
      } else if (this.stepActive === 2) {
        this.first = "hidden";
        this.second = "hidden";
        this.three = "show";
        this.four = "hidden";
      } else if (this.stepActive === 3) {
        this.first = "hidden";
        this.second = "hidden";
        this.three = "hidden";
        this.four = "show";
      }
      console.log(this.stepActive);
    },
  },
};
</script>