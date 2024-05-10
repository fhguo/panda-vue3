<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="header card">
      <el-form :inline="true" :model="formInline" ref="searchFormRef" class="form-inline">
        <div>
          <el-form-item label-width="80px" prop="user">
            <template #label>
              <div class="label-title">
                <div>名称</div>
                <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
                  <QuestionFilled width="16px" color="#999" class="title-name"></QuestionFilled>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="formInline.user" placeholder="请输入名称" clearable />
          </el-form-item>
          <el-form-item label="类别" prop="region">
            <el-select v-model="formInline.region" placeholder="请选择类别" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker v-model="formInline.date" type="date" placeholder="请选择日期" clearable />
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
        <el-button type="primary" icon="CirclePlus" @click="addApply">新增角色</el-button>
        <!-- <el-button icon="Download" @click="exportData">导出数据</el-button> -->
        <el-button type="danger" icon="Delete" @click="allDelete" :disabled="allDelDisabled">批量删除</el-button>
      </div>
      <el-table id="my-table" :data="tableData" style="width: 100%" border stripe
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column property="code" label="编号" width="80" />
        <el-table-column property="name" label="名称" width="120" show-overflow-tooltip />
        <el-table-column property="number" label="人员数" width="180" />
        <el-table-column property="desc" label="描述" show-overflow-tooltip />
        <el-table-column property="status" label="是否启用" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" v-if="exportFlag">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content-footer">
        <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]" :disabled="false" layout="total, sizes, prev, pager, next, jumper" :total="100"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 新增对话框 -->
    <el-dialog v-model="addFormVisible" title="新增角色" draggable inline="true">
      <el-form ref="addFormRef" :model="addForm" label-width="120px" class="add-ruleForm" status-icon>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="描述" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入描述" />
        </el-form-item>
        <!-- <el-form-item label="是否启用" prop="name">
          <el-switch v-model="addForm.name" />
        </el-form-item> -->
        <el-form-item label="菜单权限" prop="name">
          <el-tree :data="addForm.treeData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]" :props="menuProps" />
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
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
let exportFlag = ref(true);

let searchFormRef = ref();
// 提交新增表单
const submitAddForm = () => {
  ElMessage({
    type: 'success',
    message: '操作成功！',
  })
  addFormVisible.value = false
}

// 新增请购
const addApply = () => {
  // $router.push({ path: '/procure/temp' })
  addFormVisible.value = true;
}

// 新增对话框
let addFormVisible = ref(false);
const menuProps = {
  children: 'children',
  label: 'label',
}
let addForm = reactive({
  name: '',
  region: '',
  treeData: [
    {
      id: 1,
      label: '请购模块',
      children: [
        {
          id: 1 - 1,
          label: '请购管理',
        },
        {
          id: 1 - 1,
          label: '采购审批',
        },
        {
          id: 1 - 1,
          label: '采购列表',
        },
      ],
    },
    {
      id: 2,
      label: '主数据模块',
      children: [
        {
          id: 1 - 1,
          label: '请购管理',
        },
        {
          id: 1 - 1,
          label: '物料审批',
        },
        {
          id: 1 - 1,
          label: '仓库管理',
        },
      ],
    },
  ]
});

const addSubmit = () => {
  // 提交表单
  // 成功操作
  ElMessage({
    type: 'success',
    message: '操作成功！',
  })
  addFormVisible.value = false
}
// 表单
let formInline = reactive({
  user: '',
  region: '',
  date: '',
})

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

// 表格
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
        }), '物料表.xlsx')//自定义文件名
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

const handleClick = () => {
  console.log('click')
}

// 院内码，物料名称，简称，品牌，规格，单位
const tableData: reagentList[] = [
  {
    code: '10001',
    name: '超级管理员',
    number: '1',
    desc: '这是一段角色描述',
    status: true,
  },
  {
    code: '10002',
    name: '财务总监',
    number: '3',
    desc: '这是一段角色描述',
    status: false,
  },
  {
    code: '10003',
    name: '采购经理',
    number: '2',
    desc: '这是一段角色描述',
    status: true,
  },
  {
    code: '10004',
    name: '仓库经理',
    number: '5',
    desc: '这是一段角色描述',
    status: false,
  },
  {
    code: '10005',
    name: '仓库专员',
    number: '15',
    desc: '这是一段角色描述',
    status: false,
  },

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
</script>

<style scoped lang="scss">
.container {
  .header {
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
</style>