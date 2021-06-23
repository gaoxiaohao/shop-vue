<template>
  <div>
    <!-- 搜索区 -->
    <el-card>
      <div>
        <div>
          <span class="searchText"> 输入搜索：</span>
          <el-input v-model="queryInfo.searchAdmin" placeholder="请输入内容" clearable>
          </el-input>
        </div>

        <el-button type="primary" size="small">查询</el-button>
      </div>
    </el-card>
    <!-- 数据添加区 -->
    <el-card id="dataAdd">
      <div>
        <span>数据添加</span>
        <el-button type="primary" size="small" @click="addAdmin"
          >添加用户</el-button
        >
      </div></el-card
    >

    <!-- 用户列表区 -->
    <el-card>
      <!-- 商品列表 -->
      <el-table border :data="adminList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>

        <el-table-column prop="name" label="账号"> </el-table-column>
        <el-table-column prop="nickName" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="createTime" label="添加时间"> </el-table-column>
        <el-table-column prop="loginTime" label="最后登录时间"> </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :inaactive-value="0"
              :active-value="1"
              v-model="scope.row.status"
              @change="State(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <div class="operation-button">
              <el-button
                type="primary"
                size="mini"
                margin-left="0px"
                @click="edit(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="primary"
                
                size="mini"
              >分配角色</el-button>
                <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
              >删除</el-button>
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
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加商品"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 内容主体 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input v-model="addForm.note"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </span>
    </el-dialog>

      <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      @close="editDialogClosed"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 内容主体 -->
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    //自定义邮箱校验
    var checkEmail = (rules, values, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(values)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    //自定义手机号校验
    var checkPhone = (rules, values, callback) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regPhone.test(values)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      value:"",
      //搜索框数据
      queryInfo: {
        searchAdmin: "",
        pageSize:5,
        pageNum:1
      },
      total:0,

      //用户列表数据
      adminList:[],
      addDialogVisible: false,
      editDialogVisible:false,
      addForm: {
        username: "",
        password: "",
        email: "",
        note: "",
      },
      editForm: {
        username: "",
        password: "",
        email: "",
        note: "",
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        note: [
          { required: true, message: "请输入备注", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    //获取用户列表
    async getAdminList() {
      const { data: res } = await this.$http({
        method: "get",
        url: `admin/list/`,
        data: this.queryInfo,
      })
      this.adminList = res.data.list
      this.total = res.data.total
      console.log(res.data.list)
    },
     //监听pageSize改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAdminList();
    },
    //监听页码值改变
    handleCurrentChange(pageNum) {
      this.queryInfo.pageNum = pageNum;
      this.getAdminList();
    },
    //对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //添加用户
    addAdmin() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http({
          method: "post",
          url: `admin/register/`,
          headers: {
            "Content-Type": "application/json",
          },
          data: this.addForm,
        });
        if (res.code !== 200) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        this.addDialogVisible = false;
      });
    },
    edit(id){
      this.editDialogVisible = true
    }
  },
};
</script>


<style lang="less" scoped>
.el-input {
  width: 150px;
}
.el-button {
  margin-top: 15px;
  
}
#dataAdd {
  margin-top: 10px;
  height: 100px;
}
.operation-button{
  
}

</style>