import { platform } from "os";

export default {
  route: {
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createForm: '创建表单',
    editForm: '编辑表单',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    userManager: '注册用户',
    userPasswordManager: '修改密码',
    roleManager: '注册角色',
    roleUserManager: '角色挂载',
    userinfoViews: '用户管理',
    roleViews: '角色管理',
    uidpConfigManager: '基础信息管理',
    uidpConfigViews: '平台信息管理',
    uidpSysInfoManager: '在建系统信息管理',
    menu: '菜单权限',
    menuManager: '菜单管理',
    menuPermissionManager: '权限分配',
    orgViews: '组织机构管理',
    orgManager: '组织机构配置',
    orgUserManager: '组织机构挂载',
    logInfoViews: '日志管理',
    logInfoManager: '日志查看'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
    loginToDepartCode: '请选择单位！',
    loginToUserCode: '请选择用户！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/frame_src/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  userTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    USER_ID: '用户ID',
    REG_TIME: '登记时间',
    USER_CODE: '员工编号',
    USER_NAME: '员工姓名',
    USER_ERP: 'ERP用户编号',
    ORG_NAME: '组织机构',
    USER_ALIAS: '用户别名',
    USER_PASS: '用户密码',
    PHONE_MOBILE: '手机',
    PHONE_OFFICE: '办公电话',
    PHONE_ORG: '电话-分机号',
    USER_EMAIL: '电子邮箱',
    EMAIL_OFFICE: '电子邮箱-办公',
    USER_IP: '访问IP',
    USER_SEX: '性别',
    FLAG: '账号状态',
    USER_DOMAIN: '账号',
    REMARK: '备注',
    importance: '重要性',
    type: '类型',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '激活',
    draft: '禁用',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    AUTHENTICATION_TYPE: '账号类型',
    ASSOCIATED_ACCOUNT: '关联账号',
    editUser: '关联用户',
    groupName: '角色名称',
    orgName: '组织机构名称',
    orgCode: '组织机构代码',
    LOGIN_REMARK: '关联用户',
    deleteRole: '清空登陆权限',
    toUser: '模拟登陆'
  },
  userLoginTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    LOGIN_ID: '登陆账号ID',
    LOGIN_CODE: '登陆账号',
    LOGIN_PASS: '登陆密码',
    LOGIN_REMARK: '账号名称',
    type: '类型',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '激活',
    draft: '取消',
    delete: '删除',
    cancel: '取 消',
    editUser: '关联用户',
    confirm: '确 定',
    author: '操作人',
    USER_NAME: '关联用户',
    groupName: '角色名称',
    orgName: '组织机构名称',
    orgCode: '组织机构代码'
  },
  roleTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    id: '角色ID',
    regTime: '登记时间',
    groupCode: '角色编号',
    groupName: '角色名称',
    parentId: '上级权限组代码',
    remark: '备注',
    deleteRole: '清空角色权限',
    sysCode: '系统代码',
    parent: '父级',
    importance: '重要性',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '保存',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    mount: '分配'
  },
  configTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    CONF_CODE: '配置项',
    CONF_NAME: '配置项说明',
    CONF_VALUE: '配置值',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '修改',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    mount: '分配'
  },
  orgTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    id: '组织机构ID',
    orgCode: '组织机构代码',
    orgName: '组织机构名称',
    parentId: '上级组织机构代码',
    orgNameFull: '组织结构全称',
    phone: '电话',
    phoneS: '服务电话',
    phoneFax: '传真',
    orgAddr: '所在地址',
    remark: '备注',
    parent: '父级',
    importance: '重要性',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '保存',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    mount: '分配'
  },
  logInfoTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    ACCESS_TIME: '访问时间',
    USER_ID: '用户ID',
    USER_NAME: '用户名称',
    IP_ADDR: 'IP地址',
    LOG_TYPE: '操作类型',
    LOG_CONTENT: '操作内容',
    REMARK: '备注',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '保存',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    mount: '分配'
  },
  sysInfoTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    sysCode: '系统代码',
    sysName: '系统名称',
    sysStyle: '系统主题风格',
    sysLogo: 'logo图标URL',
    sysUrl: '系统URL',
    sysOrder: '顺序',
    sysAdmin: '管理员ID',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '修改',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    author: '操作人',
    mount: '分配'
  },
  noticeTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    notice_code:'公告编号',
    notice_title:'公告标题',
    notice_content:'公告内容',
    creater:'发布人',
    notice_orgname:'发布单位',
    notice_datetime:'发布时间',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '修改',
    delete: '删除',
    detail:'详情',
    upload:'上传',
    cancel: '取 消',
    confirm: '确 定',
    save:'保 存',
    author: '操作人',
    mount: '分配'
  }
  ,
  projectTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    project_code:'项目编号',
    project_name:'项目名称',
    project_partya:'甲方单位',
    project_partyb:'乙方单位',
    project_amount:'项目金额',
    project_form:'项目形式',
    project_setdate:'立项日期',
    project_contractdate:'合同签订日期',
    project_checkdate:'计划验收日期',
    project_url:'项目地址',
    project_isonline:'是否上线',
    project_partyaperson:'甲方联系人',
    project_partyaphone:'联系电话',
    project_partybperson:'乙方联系人',
    project_partybphone:'联系电话',
    search: '搜索',
    add: '添加',
    status: '状态',
    actions: '操作',
    edit: '修改',
    delete: '删除',
    detail:'详情',
    cancel: '取 消',
    confirm: '确 定',
    save:'保 存',
    author: '操作人',
    mount: '分配'
  },
  commonTable: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    search: '搜索',
    add: '添加',
    export: '导出',
    status: '状态',
    actions: '操作',
    edit: '修改',
    delete: '删除',
    detail:'详情',
    upload:'附件',
    cancel: '取 消',
    confirm: '确 定',
    save:'保 存',
    author: '操作人',
    check: '审核'
  },
  platformTable:{
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    plat_code:'平台编号',
    plat_name:'平台名称',
    plat_version:'平台版本',
    plat_publishdate:'发布日期',
    plat_size:'文件大小',
    software_language:'软件语言',
    suit_plat:'适用平台',
    application_browser:'应用浏览器',
    plat_runrequire:'平台运行要求',
    plat_type:'平台类型',
    manage_org_name:'管理部门',
    manage_tel:'联系电话',
    creater:'创建人',
    create_date:'创建日期'
  },
  componentTable:{
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    component_code:'组件编号',
    component_name:'组件名称',
    component_content:'组件说明',
    download_times:'下载次数',
    manage_org_name:'管理部门名称',
    manage_tel:'管理电话',
    component_size:'组件大小',
    software_language:'组件语言',
    suit_plat:'适用平台',
    application_browser:'应用浏览器',
    component_publishdate:'发布日期',
    creater:'创建人',
    create_date:'创建日期'
  },
  serviceTable:{
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    service_code:'服务编号',
    service_name:'服务名称',
    service_content:'服务说明',
    service_times:'调用次数',
    manage_org_name:'管理部门名称',
    manage_tel:'管理电话',
    service_url:'服务地址',
    data_format:'数据格式',
    suit_plat:'适用平台',
    service_publishdate:'发布日期',
    creater:'创建人',
    create_date:'创建日期'
  }

}
