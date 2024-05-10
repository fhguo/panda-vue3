<template>
  <div class="contaniner">
    <div class="user-left card">
      <div class="left-title">
        <span>部门列表</span>
      </div>
      <div class="left-search">
        <el-input v-model="departValue" placeholder="请输入部门名" clearable />
      </div>
      <el-tree class="depart-tree" :data="treeData" :props="treeProps" @node-click="handleNodeClick" default-expand-all />
    </div>
    <div class="user-right">
      <div class="search card">
        <el-form :inline="true" :model="formInline" ref="searchFormRef" class="form-inline">
          <div>
            <el-form-item label-width="80px" prop="user">
              <template #label>
                <div class="label-title">
                  <div>姓名</div>
                  <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
                    <QuestionFilled width="16px" color="#999" class="title-name"></QuestionFilled>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="formInline.user" placeholder="请输入姓名" clearable />
            </el-form-item>
            <el-form-item label="类别" prop="region">
              <el-select v-model="formInline.region" placeholder="请选择类别" clearable>
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="onSubmit">搜索</el-button>
            <el-button icon="Refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 内容区域 -->
      <div class="content card card-1">
        <div class="content-header">
          <el-button type="primary" icon="CirclePlus" @click="addUser">新增用户</el-button>
          <!-- <el-button icon="Download" @click="exportData">导出数据</el-button> -->
          <el-button type="danger" icon="Delete" @click="allDelete" :disabled="allDelDisabled">批量删除</el-button>
        </div>
        <el-table id="my-table" :data="tableData" style="width: 100%" border stripe
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" v-if="exportFlag" />
          <el-table-column label="序号" fixed type="index" width="80" />
          <el-table-column prop="username" label="用户名" width="120" />
          <el-table-column prop="gender" label="性别" width="80">
            <template #default="scope">
              <span v-if="scope.row.gender == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号码" width="220" />
          <el-table-column prop="email" label="邮箱" width="220" />
          <el-table-column prop="address" label="居住地址" width="220" />
          <el-table-column prop="status" label="状态" width="80">
            <template v-slot="scope">
              <el-tag class="ml-2" type="success" v-if="scope.row.status == '1'">启用</el-tag>
              <el-tag class="ml-2" type="danger" v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120" v-if="exportFlag">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="editItem(scope.row)">编辑</el-button>
              <el-button link type="danger" size="small" @click="delItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="content-footer">
          <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" :disabled="false" layout="total, sizes, prev, pager, next, jumper" :total="100"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <!-- 新增对话框 -->
    <el-dialog v-model="addFormVisible" title="新增用户">
      <el-form ref="addFormRef" :inline="true" :model="addForm" label-width="120px" class="add-ruleForm" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <!-- <el-input v-model="addForm.gender" placeholder="请输入性别" /> -->
          <el-radio-group v-model="addForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addForm.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addForm.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAddForm">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
let exportFlag = ref(true);
const searchFormRef = ref();
const departValue = ref();
// 定义Tree类型
interface Tree {
  id: string
  name: string
  children?: Tree[]
}
const treeProps = {
  children: 'children',
  label: 'name',
}
const treeData: Tree[] = [
  {
    "id": "1",
    "name": "华东分部",
    "children": [
      {
        "id": "11",
        "name": "研发部"
      },
      {
        "id": "12",
        "name": "市场部"
      },
      {
        "id": "13",
        "name": "商务部"
      },
      {
        "id": "14",
        "name": "财务部"
      }
    ]
  },
  {
    "id": "2",
    "name": "华南分部",
    "children": [
      {
        "id": "21",
        "name": "研发部"
      },
      {
        "id": "22",
        "name": "市场部"
      },
      {
        "id": "23",
        "name": "商务部"
      },
      {
        "id": "24",
        "name": "财务部"
      }
    ]
  },
  {
    "id": "3",
    "name": "西北分部",
    "children": [
      {
        "id": "31",
        "name": "研发部"
      },
      {
        "id": "32",
        "name": "市场部"
      },
      {
        "id": "33",
        "name": "商务部"
      },
      {
        "id": "34",
        "name": "财务部"
      }
    ]
  }
]
// 右侧表单
let formInline = reactive({
  user: '',
  region: '',
})
// 新增用户
let addForm = reactive({
  "id": "",
  "username": "",
  "gender": 1,
  "idCard": "",
  "email": "",
  "address": "",
  "createTime": "",
  "status": 0,
  "avatar": ""
});
// 提交新增表单
const submitAddForm = () => {
  ElMessage({
    type: 'success',
    message: '操作成功！',
  })
  addFormVisible.value = false
}

// 新增
let addFormRef = ref();
const addUser = () => {
  // $router.push({ path: '/procure/temp' })
  addFormVisible.value = true;
  addForm = {
    "id": "",
    "username": "",
    "gender": 1,
    "idCard": "",
    "email": "",
    "address": "",
    "createTime": "",
    "status": 0,
    "avatar": ""
  }
  // DOM更新完毕
  // nextTick(() => {
  //   addFormRef.value.resetFields();
  // })
}

// 新增对话框
let addFormVisible = ref(false);

// 右侧表格
// 新增用户
// 数据导出
const exportData = () => {
  exportFlag.value = false;
  ElMessageBox.confirm(
    '确认导出数据?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info',
    }
  )
    .then(() => {

      // 确认导出
      var wb = XLSX.utils.table_to_book(document.querySelector('#my-table'));//关联dom节点
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), '请购表.xlsx')//自定义文件名
        exportFlag.value = true;
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
        exportFlag.value = true;
      }
      return wbout;
    }).catch(() => {
      exportFlag.value = true;
    })
}
let allDelDisabled = ref(true);
// 选择项发生变化
const handleSelectionChange = (val: any) => {
  console.log(val);
  if (val.length > 0) {
    allDelDisabled.value = false;
  } else {
    allDelDisabled.value = true;
  }
}
// 批量删除
const allDelete = () => {
  ElMessageBox.confirm(
    '此操作将删除选中数据，是否确认?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
    })
}
// 编辑
const editItem = (row) => {
  console.log('click', row)
  addFormVisible.value = true;
  addForm = row;
}

const delItem = (row) => {
  ElMessageBox.confirm(
    '是否确认删除?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
    })
}

const tableData = [
  {
    "id": "948714124251251821",
    "username": "顾桂英",
    "gender": 2,
    "user": {
      "detail": {
        "age": 22
      }
    },
    "idCard": "948714124251251821",
    "email": "q.agbj@syjnmxfp.org",
    "address": "天津 天津市",
    "createTime": "1982-11-16 09:43:52",
    "status": 1,
    "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
  },
  {
    "id": "188025139664591334",
    "username": "邵秀兰",
    "gender": 1,
    "user": {
      "detail": {
        "age": 20
      }
    },
    "idCard": "188025139664591334",
    "email": "l.sqlfmim@bbiqx.nf",
    "address": "安徽省 阜阳市",
    "createTime": "1993-06-07 08:35:54",
    "status": 1,
    "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
  },
  {
    "id": "006420136630746166",
    "username": "邱娜",
    "gender": 2,
    "user": {
      "detail": {
        "age": 26
      }
    },
    "idCard": "006420136630746166",
    "email": "c.ybuno@pvyruxr.gov.cn",
    "address": "西藏自治区 阿里地区",
    "createTime": "2016-09-24 00:36:54",
    "status": 0,
    "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
  },
  {
    "id": "230873221726608246",
    "username": "胡军",
    "gender": 1,
    "user": {
      "detail": {
        "age": 24
      }
    },
    "idCard": "230873221726608246",
    "email": "s.nexje@oxwvxxp.pt",
    "address": "宁夏回族自治区 石嘴山市",
    "createTime": "1979-06-15 04:14:59",
    "status": 0,
    "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
  },
  {
    "id": "647743544892554753",
    "username": "傅涛",
    "gender": 2,
    "user": {
      "detail": {
        "age": 18
      }
    },
    "idCard": "647743544892554753",
    "email": "f.caese@rsym.af",
    "address": "陕西省 安康市",
    "createTime": "1975-06-11 08:51:43",
    "status": 1,
    "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
  },
  {
    "id": "646545660441570149",
    "username": "崔敏",
    "gender": 1,
    "user": {
      "detail": {
        "age": 13
      }
    },
    "idCard": "646545660441570149",
    "email": "s.lbfegj@zimf.uy",
    "address": "新疆维吾尔自治区 巴音郭楞蒙古自治州",
    "createTime": "2019-04-14 20:29:33",
    "status": 0,
    "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
  }
]

// 分页
let currentPage = ref(1);
let pageSize = ref(10);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

// 点击部门
const handleNodeClick = (data: Tree) => {
  console.log(data)
  ElMessage.success(data.name)
}
// 搜索提交
const onSubmit = () => {
  console.log('submit!')
}
// 重置搜索
const onReset = () => {
  console.log('onReset!')
  console.log(searchFormRef.value);

  searchFormRef.value.resetFields()
}

</script>

<style scoped lang="scss">
.contaniner {
  display: flex;

  .user-left {
    width: 20%;
    margin-right: 2%;
    color: #666;
    // min-height: 670px;

    .left-title {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }

    .left-search {
      margin-bottom: 20px;
    }
  }

  .user-right {
    width: 75%;
    min-height: 500px;

    .search {
      padding-top: 18px;
      margin-bottom: 15px;

      .label-title {
        display: flex;
        align-items: center;

        .title-name {
          margin-left: 5px;
          cursor: pointer;
        }
      }

      .form-inline {
        display: flex;
        justify-content: space-between;
      }

    }

    .content {

      // max-height: 300px;
      .content-header {
        margin-bottom: 20px;
      }

      .el-table {
        margin-bottom: 20px;
      }

      .content-footer {
        display: flex;
        // justify-content: flex-end;
      }
    }
  }
}
</style>