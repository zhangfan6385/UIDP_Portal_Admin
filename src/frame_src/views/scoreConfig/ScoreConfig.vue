<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="操作类型" v-model="listQuery.OPER_TYPE_NAME"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('commonTable.add')}}</el-button>
    </div>
    <el-card class="box-card">

    <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column width="140px" align="center" label="操作编码" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.OPER_TYPE}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="操作类型" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.OPER_TYPE_NAME}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" label="分值" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.SCORE}}</span>
        </template>
      </el-table-column>
     
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('commonTable.edit')}}</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('commonTable.delete')}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    </el-card>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 400px; margin-left:20px;'>
        
    <el-form-item v-if="dialogStatus=='create'"  label="操作编码" prop="OPER_TYPE">
       <el-input v-model="temp.OPER_TYPE"></el-input>
    </el-form-item>
    <el-form-item v-else  label="操作编码"  prop="OPER_TYPE">
     <span>{{temp.OPER_TYPE}}</span>
    </el-form-item>
            <el-form-item label="操作描述" prop="OPER_TYPE_NAME">
            <el-input v-model="temp.OPER_TYPE_NAME"></el-input>
        </el-form-item>
        <el-form-item  label="分值" prop="SCORE">
            <el-input v-model="temp.SCORE"></el-input>
        </el-form-item>

         
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('commonTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('commonTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('commonTable.confirm')}}</el-button>
      </div>
    </el-dialog>
 
    </div>
</template>
<script>
import {
  fetchScoreConfigList,
  createScoreConfigArticle,
  updateScoreConfigData,
  updateScoreConfigArticle
} from '@/frame_src/api/scoreConfig'
import { getToken } from '@/frame_src/utils/auth'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
export default {
  name: 'scoreConfig',
  directives: {
    waves
  },
  data() {
    return {
      together:false,
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        OPER_TYPE_NAME: ""
      },
      temp: {
        OPER_TYPE:'',
        OPER_TYPE_NAME:'',
        SCORE:'',
        CREATER:''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改积分配置',
        create: '创建积分配置'
      },

      rules: {
        OPER_TYPE_NAME: [
          { required: true, message: '操作类型不能为空', trigger: 'change' }
        ],
        SCORE: [
          { required: true, message: '积分设置不能为空', trigger: 'change' }
        ]
      },
    }
  },
  methods: {
    getList() {
      this.listLoading = false;
      fetchScoreConfigList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$notify({   
            position: 'bottom-right',
            title: '失败',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        OPER_TYPE_NAME:'',
        OPER_TYPE:'',
        SCORE:''
      }
    },

    handleUpdate(row) { // 修改数据弹出修改表单
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() { // 创建弹出表单
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp) // 这样就不会共用同一个对象
          updateScoreConfigData(tempData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              this.getList()
              title = '成功'
              type = 'success'
            }
            this.dialogFormVisible = false
            this.$notify({   
              position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      const query = { SCORE_CONF_ID: row.SCORE_CONF_ID }
      updateScoreConfigArticle(query).then(response => {
        this.message = response.data.message
        this.title = '失败'
        this.type = 'error'
        if (response.data.code === 2000) {
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.getList()
          this.title = '成功'
          this.type = 'success'
        }
        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        })
      })
  }).catch(() => {
        });
      
    },
    createData() { // 创建配置
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = "ppp" //当前登陆人
          this.temp.CREATER=this.$store.state.user.name
          createScoreConfigArticle(this.temp).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              this.getList()
              title = '成功'
              type = 'success'
              // this.list.unshift(this.temp)
            }
            this.dialogFormVisible = false
            this.$notify({   
              position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
  
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, 
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }
  },

  created() {
    // var token = this.$store.state.user.name; 获取登陆信息的 俩种方式
    // var status = this.$store.getters.name;
    // alert(token+"ddd"+status);
    this.getList()
  },
  computed: {
    headers() {
      return {
        'X-Token': getToken()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>