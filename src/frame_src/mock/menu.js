import { param2Obj } from '@/frame_src/utils'
import merge from 'element-ui/src/utils/merge'
const roleMenuList = [
  {
    'id': [1, 31, 912, 913, 92, 93], 'roleId': 26
  },
  {
    'id': [102, 103], 'roleId': 27
  },
  {
    'id': [6, 108, 7, 8, 9], 'roleId': 28
  }
]

const testMenuList = [
  {
    'SYS_CODE': '1',
    'MENU_ID': 'EEE',
    'MENU_NAME': 'EEE',
    'MENU_ID_UPPER': 'EEE',
    'MENU_ICON': 'EEE',
    'MODULE_URL': 'EEE',
    'MODULE_OBJ': 'EE',
    'MENU_PROP': '1',
    'MENU_ORDER': 1
  }
]

 const menuList1 =[{
	"SYS_CODE": "1",
	"id": "69bb15b6-feea-442f-8167-b2796b65ce57",
	"MENU_NAME": "云配置管理",
	"parentId": "",
	"MENU_ICON": "drag",
	"MODULE_URL": "frame_src/views/uidpSynchroConfig",
	"MODULE_ROUTE": "/uidpSynchroConfig",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 1,
	"children": [{
		"SYS_CODE": "1",
		"id": "6bfddf5f-9d42-48ad-8184-f67971fc1e0f",
		"MENU_NAME": "云组织机构",
		"parentId": "69bb15b6-feea-442f-8167-b2796b65ce57",
		"MENU_ICON": "documentation",
		"MODULE_URL": "frame_src/views/uidpSynchroConfig/",
		"MODULE_ROUTE": "Synchro-config",
		"MODULE_OBJ": "SynchroConfig",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "f0986eb1-d281-4d40-859e-619bf82d74d5",
	"MENU_NAME": "组织机构管理",
	"parentId": "",
	"MENU_ICON": "component",
	"MODULE_URL": "frame_src/views/orgViews",
	"MODULE_ROUTE": "/orgViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 2,
	"children": [{
		"SYS_CODE": "1",
		"id": "6faadefc-97a2-4bcf-9916-5ad0d10bf242",
		"MENU_NAME": "组织机构维护",
		"parentId": "f0986eb1-d281-4d40-859e-619bf82d74d5",
		"MENU_ICON": "table",
		"MODULE_URL": "frame_src/views/orgViews/",
		"MODULE_ROUTE": "org-manager",
		"MODULE_OBJ": "orgManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "3376d17f-df6d-438e-9488-805b128151f8",
	"MENU_NAME": "用户管理",
	"parentId": "",
	"MENU_ICON": "peoples",
	"MODULE_URL": "frame_src/views/userinfoViews",
	"MODULE_ROUTE": "/userinfoViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 3,
	"children": [{
		"SYS_CODE": "1",
		"id": "6abe3874-437e-4b74-bc58-87a58e80b7f8",
		"MENU_NAME": "用户维护",
		"parentId": "3376d17f-df6d-438e-9488-805b128151f8",
		"MENU_ICON": "user",
		"MODULE_URL": "frame_src/views/userinfoViews/",
		"MODULE_ROUTE": "user-manager",
		"MODULE_OBJ": "userManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "0fea0012-b259-43b9-9c49-1a993cf3defa",
		"MENU_NAME": "修改密码",
		"parentId": "3376d17f-df6d-438e-9488-805b128151f8",
		"MENU_ICON": "people",
		"MODULE_URL": "frame_src/views/userinfoViews/",
		"MODULE_ROUTE": "user-password-manager",
		"MODULE_OBJ": "userPasswordManager",
		"MENU_PROP": "0",
		"MENU_ORDER": 1,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "35f874b0-0fef-418b-9a5e-526e1136224e",
	"MENU_NAME": "权限管理",
	"parentId": "",
	"MENU_ICON": "documentation",
	"MODULE_URL": "frame_src/views/menu",
	"MODULE_ROUTE": "/menu",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 4,
	"children": [{
		"SYS_CODE": "1",
		"id": "a10b6ea1-2cae-4176-b8c3-17ffe631d417",
		"MENU_NAME": "菜单管理",
		"parentId": "35f874b0-0fef-418b-9a5e-526e1136224e",
		"MENU_ICON": "form",
		"MODULE_URL": "frame_src/views/menu/",
		"MODULE_ROUTE": "menu-manager",
		"MODULE_OBJ": "menuManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "4ed1848c-6cdd-41dc-88ea-216f3a8283a9",
		"MENU_NAME": "角色管理",
		"parentId": "35f874b0-0fef-418b-9a5e-526e1136224e",
		"MENU_ICON": "example",
		"MODULE_URL": "frame_src/views/roleViews/",
		"MODULE_ROUTE": "role-manager",
		"MODULE_OBJ": "roleManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 1,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "63fb321b-73b2-4e90-98f7-09ab908e4e90",
		"MENU_NAME": "角色授权",
		"parentId": "35f874b0-0fef-418b-9a5e-526e1136224e",
		"MENU_ICON": "excel",
		"MODULE_URL": "frame_src/views/menu/",
		"MODULE_ROUTE": "menu-permission-manager",
		"MODULE_OBJ": "menuPermissionManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 2,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "a5daab82-ed7a-4895-bbd2-dcb150e19d54",
		"MENU_NAME": "用户授权",
		"parentId": "35f874b0-0fef-418b-9a5e-526e1136224e",
		"MENU_ICON": "password",
		"MODULE_URL": "frame_src/views/roleViews/",
		"MODULE_ROUTE": "role-user-manager",
		"MODULE_OBJ": "roleUserManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 3,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "7bea31cc-e041-4041-a64f-e74cd2f86e3c",
	"MENU_NAME": "用户日志",
	"parentId": "",
	"MENU_ICON": "documentation",
	"MODULE_URL": "frame_src/views/logInfoViews",
	"MODULE_ROUTE": "/logInfoViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 5,
	"children": [{
		"SYS_CODE": "1",
		"id": "00228ef5-a965-4619-8625-5011eeb392b2",
		"MENU_NAME": "日志查看",
		"parentId": "7bea31cc-e041-4041-a64f-e74cd2f86e3c",
		"MENU_ICON": "zip",
		"MODULE_URL": "frame_src/views/logInfoViews/",
		"MODULE_ROUTE": "log-info-manager",
		"MODULE_OBJ": "logInfoManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "6b773e53-3f3c-4f58-8e89-86a5e223aca5",
	"MENU_NAME": "系统配置",
	"parentId": "",
	"MENU_ICON": "documentation",
	"MODULE_URL": "frame_src/views/uidpConfigViews",
	"MODULE_ROUTE": "/uidpConfigViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 6,
	"children": [{
		"SYS_CODE": "1",
		"id": "dd901286-d7ba-4c3b-b75a-84c0edc42eff",
		"MENU_NAME": "参数配置",
		"parentId": "6b773e53-3f3c-4f58-8e89-86a5e223aca5",
		"MENU_ICON": "documentation",
		"MODULE_URL": "frame_src/views/uidpConfigViews/",
		"MODULE_ROUTE": "uidp-config-manager",
		"MODULE_OBJ": "uidpConfigManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "45edc00b-b19d-42ae-b45a-5cbb62fb43bc",
		"MENU_NAME": "初始化配置",
		"parentId": "6b773e53-3f3c-4f58-8e89-86a5e223aca5",
		"MENU_ICON": "fa fa-cutlery",
		"MODULE_URL": "frame_src/views/uidpConfigViews/",
		"MODULE_ROUTE": "init-config-manager",
		"MODULE_OBJ": "initConfigManager",
		"MENU_PROP": "0",
		"MENU_ORDER": 1,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "69bb15b6-feea-442f-8167-b2796b65ce58",
	"MENU_NAME": "新模块",
	"parentId": "",
	"MENU_ICON": "drag",
	"MODULE_URL": "",
	"MODULE_ROUTE": "/new_table_route",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 7,
	"children": [{
		"SYS_CODE": "1",
		"id": "6bfddf5fw-9d42-48ad-8184-f67971fc1e0f",
		"MENU_NAME": "增加新功能1",
		"parentId": "69bb15b6-feea-442f-8167-b2796b65ce58",
		"MENU_ICON": "documentation",
		"MODULE_URL": "app_src/views/",
		"MODULE_ROUTE": "new_table_route1",
		"MODULE_OBJ": "test1",
		"MENU_PROP": "1",
		"MENU_ORDER": 1,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "94e96e10-14bf-4619-aeb0-d8f42840fbd2",
		"MENU_NAME": "新模块测试1",
		"parentId": "69bb15b6-feea-442f-8167-b2796b65ce58",
		"MENU_ICON": "example",
		"MODULE_URL": "app_src/views/",
		"MODULE_ROUTE": "new_module1",
		"MODULE_OBJ": "test",
		"MENU_PROP": "1",
		"MENU_ORDER": 2,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "dbe12dac-aadd-4c41-a4d2-19244a7da3d2",
	"MENU_NAME": "公告管理",
	"parentId": "",
	"MENU_ICON": "message",
	"MODULE_URL": "frame_src/views/noticeViews",
	"MODULE_ROUTE": "/noticeViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 8,
	"children": [{
		"SYS_CODE": "1",
		"id": "3ae6f64b-1dd5-4b0b-82cf-2e1b305e6604",
		"MENU_NAME": "公告维护",
		"parentId": "dbe12dac-aadd-4c41-a4d2-19244a7da3d2",
		"MENU_ICON": "icon",
		"MODULE_URL": "frame_src/views/noticeViews/",
		"MODULE_ROUTE": "notice-maneger",
		"MODULE_OBJ": "noticeManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "1fedfd1f-3de8-48ea-9092-d52e7c9d7f65",
	"MENU_NAME": "项目管理",
	"parentId": "",
	"MENU_ICON": "excel",
	"MODULE_URL": "frame_src/views/projectViews",
	"MODULE_ROUTE": "/projectViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 9,
	"children": [{
		"SYS_CODE": "1",
		"id": "aaf70f33-0058-4dde-9a46-93cc0e88ec56",
		"MENU_NAME": "项目维护",
		"parentId": "1fedfd1f-3de8-48ea-9092-d52e7c9d7f65",
		"MENU_ICON": "zip",
		"MODULE_URL": "frame_src/views/projectViews/",
		"MODULE_ROUTE": "project-manager",
		"MODULE_OBJ": "projectManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "3428b3c3-540d-4979-be30-b256e7a517b2",
	"MENU_NAME": "开发平台",
	"parentId": "",
	"MENU_ICON": "international",
	"MODULE_URL": "frame_src/views/platformViews",
	"MODULE_ROUTE": "/platformViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 10,
	"children": [{
		"SYS_CODE": "1",
		"id": "9304acc0-a223-4eb1-b682-32fbc2e3227f",
		"MENU_NAME": "C#平台",
		"parentId": "3428b3c3-540d-4979-be30-b256e7a517b2",
		"MENU_ICON": "chart",
		"MODULE_URL": "frame_src/views/platformViews/csharpViews",
		"MODULE_ROUTE": "/platformViews/csharViews",
		"MODULE_OBJ": "",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": [{
			"SYS_CODE": "1",
			"id": "09481bf5-bfff-4567-b794-4520e5234845",
			"MENU_NAME": "平台信息维护",
			"parentId": "9304acc0-a223-4eb1-b682-32fbc2e3227f",
			"MENU_ICON": "language",
			"MODULE_URL": "frame_src/views/platformViews/csharpViews/",
			"MODULE_ROUTE": "platform-manager",
			"MODULE_OBJ": "platformManager",
			"MENU_PROP": "1",
			"MENU_ORDER": 0,
			"children": []
		}, {
			"SYS_CODE": "1",
			"id": "ce999ad9-6baa-46df-aaf5-343b2c24cec2",
			"MENU_NAME": "平台使用审核",
			"parentId": "9304acc0-a223-4eb1-b682-32fbc2e3227f",
			"MENU_ICON": "form",
			"MODULE_URL": "frame_src/views/platformViews/csharpViews/",
			"MODULE_ROUTE": "platfrom-check",
			"MODULE_OBJ": "platformCheck",
			"MENU_PROP": "1",
			"MENU_ORDER": 2,
			"children": []
		}]
	},
	{
		"SYS_CODE": "1",
		"id": "9304acc0-a223-4eb1-b682-32fbc2e3227d",
		"MENU_NAME": "Go平台",
		"parentId": "3428b3c3-540d-4979-be30-b256e7a517b2",
		"MENU_ICON": "chart",
		"MODULE_URL": "frame_src/views/platformViews/goViews",
		"MODULE_ROUTE": "/platformViews/goViews",
		"MODULE_OBJ": "",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": [{
			"SYS_CODE": "1",
			"id": "09481bf5-bfff-4567-b794-4520e523484s",
			"MENU_NAME": "平台信息维护",
			"parentId": "9304acc0-a223-4eb1-b682-32fbc2e3227d",
			"MENU_ICON": "language",
			"MODULE_URL": "frame_src/views/platformViews/goViews/",
			"MODULE_ROUTE": "go-manager",
			"MODULE_OBJ": "goManager",
			"MENU_PROP": "1",
			"MENU_ORDER": 0,
			"children": []
		}, {
			"SYS_CODE": "1",
			"id": "ce999ad9-6baa-46df-aaf5-343b2c24ceca",
			"MENU_NAME": "平台使用审核",
			"parentId": "9304acc0-a223-4eb1-b682-32fbc2e3227d",
			"MENU_ICON": "form",
			"MODULE_URL": "frame_src/views/platformViews/goViews/",
			"MODULE_ROUTE": "go-check",
			"MODULE_OBJ": "goCheck",
			"MENU_PROP": "1",
			"MENU_ORDER": 2,
			"children": []
		}]
	}]
}, {
	"SYS_CODE": "1",
	"id": "88fb3998-07d5-433c-bf05-ad9456779b80",
	"MENU_NAME": "组件目录",
	"parentId": "",
	"MENU_ICON": "table",
	"MODULE_URL": "frame_src/views/componentsViews",
	"MODULE_ROUTE": "/componentsViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 11,
	"children": [{
		"SYS_CODE": "1",
		"id": "17dc09c1-1b6c-4a69-b88a-bf564e61fbe0",
		"MENU_NAME": "组件信息维护",
		"parentId": "88fb3998-07d5-433c-bf05-ad9456779b80",
		"MENU_ICON": "language",
		"MODULE_URL": "frame_src/views/componentsViews/",
		"MODULE_ROUTE": "component-manager",
		"MODULE_OBJ": "componentsManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "2be64509-8ce0-456a-b8ff-614c631d9486",
		"MENU_NAME": "组件使用审核",
		"parentId": "88fb3998-07d5-433c-bf05-ad9456779b80",
		"MENU_ICON": "form",
		"MODULE_URL": "frame_src/views/componentsViews/",
		"MODULE_ROUTE": "components-check",
		"MODULE_OBJ": "componentsCheck",
		"MENU_PROP": "1",
		"MENU_ORDER": 1,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "8bd4b4b9-6df0-49a7-8bde-6541cd14ad32",
	"MENU_NAME": "服务目录",
	"parentId": "",
	"MENU_ICON": "tab",
	"MODULE_URL": "frame_src/views/serviceViews/",
	"MODULE_ROUTE": "/serviceViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 12,
	"children": [{
		"SYS_CODE": "1",
		"id": "9dc94cbf-d24d-408c-b81d-4d8cc3884e87",
		"MENU_NAME": "服务信息维护",
		"parentId": "8bd4b4b9-6df0-49a7-8bde-6541cd14ad32",
		"MENU_ICON": "language",
		"MODULE_URL": "frame_src/views/serviceViews/",
		"MODULE_ROUTE": "service-manager",
		"MODULE_OBJ": "serviceManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}, {
		"SYS_CODE": "1",
		"id": "1b1c3108-34b5-41dc-8e88-1b9fb0094129",
		"MENU_NAME": "服务使用审核",
		"parentId": "8bd4b4b9-6df0-49a7-8bde-6541cd14ad32",
		"MENU_ICON": "form",
		"MODULE_URL": "frame_src/views/serviceViews/",
		"MODULE_ROUTE": "service-check",
		"MODULE_OBJ": "serviceCheck",
		"MENU_PROP": "1",
		"MENU_ORDER": 1,
		"children": []
	}]
}, {
	"SYS_CODE": "1",
	"id": "f15fca45-888a-4547-9746-a039183d2bb8",
	"MENU_NAME": "社区管理",
	"parentId": "",
	"MENU_ICON": "example",
	"MODULE_URL": "frame_src/views/communityViews",
	"MODULE_ROUTE": "/communityViews",
	"MODULE_OBJ": "",
	"MENU_PROP": "1",
	"MENU_ORDER": 14,
	"children": [{
		"SYS_CODE": "1",
		"id": "47570dc9-5548-4e17-9996-1ca8b60143a3",
		"MENU_NAME": "社区信息维护",
		"parentId": "f15fca45-888a-4547-9746-a039183d2bb8",
		"MENU_ICON": "language",
		"MODULE_URL": "frame_src/views/communityViews/",
		"MODULE_ROUTE": "community-manager",
		"MODULE_OBJ": "communityManager",
		"MENU_PROP": "1",
		"MENU_ORDER": 0,
		"children": []
	}]
}]
//   {
//     'id': 1, 'MODULE_ROUTE': '/userinfoViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 0, 'MENU_NAME': '用户管理', 'MODULE_URL': 'frame_src/views/userinfoViews', 'MENU_ICON': 'fa fa-dashboard', 'children': [
//       { 'id': 91, 'MODULE_ROUTE': 'user-login-manager', 'MODULE_OBJ': 'userLoginManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '登陆用户', 'MODULE_URL': 'frame_src/views/userinfoViews/', 'MENU_ICON': 'fa fa-bank', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
//       { 'id': 92, 'MODULE_ROUTE': 'user-manager', 'MODULE_OBJ': 'userManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '注册用户', 'MODULE_URL': 'frame_src/views/userinfoViews/', 'MENU_ICON': 'fa fa-bank', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
//       { 'id': 93, 'MODULE_ROUTE': 'user-password-manager', 'MODULE_OBJ': 'userPasswordManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '修改密码', 'MODULE_URL': 'frame_src/views/userinfoViews/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
//       { 'id': 1000, 'MODULE_ROUTE': 'test1', 'MODULE_OBJ': 'test1', 'parentId': 31, 'sort': 0, 'MENU_NAME': '第三方应用演示', 'MODULE_URL': 'app_src/views/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
//       { 'id': 1001, 'MODULE_ROUTE': 'test2', 'MODULE_OBJ': 'test', 'parentId': 31, 'sort': 0, 'MENU_NAME': '第三方网页演示', 'MODULE_URL': 'app_src/views/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] }
//     ],
//     'MENU_PROP': '1', 'roleId': [26, 27]
//   },
//   {
//     'id': 31, 'MODULE_ROUTE': '/uidpConfigViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 1, 'MENU_NAME': '基础信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews', 'MENU_ICON': 'fa fa-upload', 'children':
//       [
//         { 'id': 93, 'MODULE_ROUTE': 'uidp-config-manager', 'MODULE_OBJ': 'uidpConfigManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '平台信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
//         { 'id': 93, 'MODULE_ROUTE': 'uidp-sys-info-manager', 'MODULE_OBJ': 'uidpSysInfoManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '在建系统信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] }
//       ],
//     'MENU_PROP': '1', 'roleId': [26, 27]
//   },
//   {
//     'id': 102, 'MODULE_ROUTE': '/roleViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 3, 'MENU_NAME': '角色管理', 'MODULE_URL': 'frame_src/views/roleViews', 'MENU_ICON': 'fa fa-download', 'children':
//       [
//         { 'id': 103, 'MODULE_ROUTE': 'role-manager', 'MODULE_OBJ': 'roleManager', 'parentId': 102, 'sort': 0, 'MENU_NAME': '注册角色', 'MODULE_URL': 'frame_src/views/roleViews/', 'MENU_ICON': 'fa fa-image', 'children': [], 'MENU_PROP': '1', 'roleId': [27] },
//         { 'id': 104, 'MODULE_ROUTE': 'role-user-manager', 'MODULE_OBJ': 'roleUserManager', 'parentId': 102, 'sort': 0, 'MENU_NAME': '角色挂载', 'MODULE_URL': 'frame_src/views/roleViews/', 'MENU_ICON': 'fa fa-image', 'children': [], 'MENU_PROP': '1', 'roleId': [27] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27]
//   },
//   {
//     'id': 6, 'MODULE_ROUTE': '/menu', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '菜单权限', 'MODULE_URL': 'frame_src/views/menu', 'MENU_ICON': 'fa fa-cog', 'children':
//       [
//         { 'id': 108, 'MODULE_ROUTE': 'menu-manager', 'MODULE_OBJ': 'menuManager', 'parentId': 6, 'sort': 0, 'MENU_NAME': ' 菜单管理', 'MODULE_URL': 'frame_src/views/menu/', 'MENU_ICON': 'fa fa-database', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] },
//         { 'id': 109, 'MODULE_ROUTE': 'menu-permission-manager', 'MODULE_OBJ': 'menuPermissionManager', 'parentId': 6, 'sort': 1, 'MENU_NAME': '权限分配', 'MODULE_URL': 'frame_src/views/menu/', 'MENU_ICON': 'fa fa-navicon', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27, 28]
//   },
//   {
//     'id': 7, 'MODULE_ROUTE': '/orgViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '组织结构', 'MODULE_URL': 'frame_src/views/orgViews', 'MENU_ICON': 'fa fa-cog', 'children':
//       [
//         { 'id': 110, 'MODULE_ROUTE': 'org-manager', 'MODULE_OBJ': 'orgManager', 'parentId': 7, 'sort': 2, 'MENU_NAME': '组织机构配置', 'MODULE_URL': 'frame_src/views/orgViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] },
//         { 'id': 111, 'MODULE_ROUTE': 'org-user-manager', 'MODULE_OBJ': 'orgUserManager', 'parentId': 7, 'sort': 3, 'MENU_NAME': '组织机构挂载', 'MODULE_URL': 'frame_src/views/orgViews/', 'MENU_ICON': 'fa fa-user-plus', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27, 28]
//   },
//   {
//     'id': 8, 'MODULE_ROUTE': '/logInfoViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '日志管理', 'MODULE_URL': 'frame_src/views/logInfoViews', 'MENU_ICON': 'fa fa-cog', 'children':
//       [
//         { 'id': 112, 'MODULE_ROUTE': 'log-info-manager', 'MODULE_OBJ': 'logInfoManager', 'parentId': 8, 'sort': 2, 'MENU_NAME': '日志查看', 'MODULE_URL': 'frame_src/views/logInfoViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27, 28]
//   },
//   {
//     'id': 9, 'MODULE_ROUTE': '/userinfoViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '用户信息', 'MODULE_URL': 'frame_src/views/logInfoViews', 'MENU_ICON': 'fa fa-cog', 'children':
//       [
//         { 'id': 112, 'MODULE_ROUTE': 'user-manager', 'MODULE_OBJ': 'userManager', 'parentId': 9, 'sort': 2, 'MENU_NAME': '角色管理', 'MODULE_URL': 'frame_src/views/userinfoViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27, 28]
//   },
//   {
//     'id': 10, 'MODULE_ROUTE': '/uidpSynchroConfig', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '云配置', 'MODULE_URL': 'frame_src/views/uidpSynchroConfig', 'MENU_ICON': 'fa fa-cog', 'children':
//       [
//         { 'id': 101, 'MODULE_ROUTE': 'SynchroConfig', 'MODULE_OBJ': 'SynchroConfig', 'parentId': 10, 'sort': 2, 'MENU_NAME': '云配置管理', 'MODULE_URL': 'frame_src/views/uidpSynchroConfig/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
//       ],
//     'MENU_PROP': '1', 'roleId': [27, 28]
//   },
//   {
//     'id': 100, 'MODULE_ROUTE': '/noticeViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 10, 'MENU_NAME': '公告管理', 'MODULE_URL': 'frame_src/views/noticeViews', 'MENU_ICON': 'message', 'children':
//       [
//         { 'id': 1000, 'MODULE_ROUTE': 'notice-manager', 'MODULE_OBJ': 'noticeManager', 'parentId': 100, 'sort': 0, 'MENU_NAME': '公告维护', 'MODULE_URL': 'frame_src/views/noticeViews/', 'MENU_ICON': 'icon', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] }
//       ],
//     'MENU_PROP': '1', 'roleId': [26, 27]
//   },
//   {
//     'id': 101, 'MODULE_ROUTE': '/projectViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 11, 'MENU_NAME': '项目管理', 'MODULE_URL': 'frame_src/views/projectViews', 'MENU_ICON': 'excel', 'children':
//       [
//         { 'id': 1010, 'MODULE_ROUTE': 'project-manager', 'MODULE_OBJ': 'projectManager', 'parentId': 101, 'sort': 0, 'MENU_NAME': '项目维护', 'MODULE_URL': 'frame_src/views/projectViews/', 'MENU_ICON': 'zip', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] }
//       ],
//     'MENU_PROP': '1', 'roleId': [26, 27]
//   }
// ]

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, updateMenu) {
  asyncRouterMap.filter(route => {
    if (route.id === updateMenu.id) {
      route.name = updateMenu.name
      if (updateMenu.icon.indexOf('fa+') >= 0) {
        console.log('success')
        route.icon = updateMenu.icon.replace('fa+', 'fa ')
      } else {
        route.icon = updateMenu.icon
      }
      return true
    }
    if (route.children && route.children.length) {
      filterAsyncRouter(route.children, updateMenu)
    }
    return false
  })
  return asyncRouterMap
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouterDelete(asyncRouterMap, menuId) {
  for (let i = 0; i < asyncRouterMap.length; i++) {
    var route = asyncRouterMap[i]
    if (route.id === menuId) {
      console.log('deleteSuccess')
      asyncRouterMap.splice(i, 1)
      return asyncRouterMap
    }
    if (route.children && route.children.length) {
      filterAsyncRouterDelete(route.children, menuId)
    }
  }
  return asyncRouterMap
}

export default {
  // 创建菜单
  createMenu: (config) => {
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'add') {
      var newMenu = merge({}, JSON.parse(field))
      newMenu.id = 99
      newMenu.path = 'test'
      if (newMenu.icon.indexOf('fa+') >= 0) {
        newMenu.icon = newMenu.icon.replace('fa+', 'fa ')
      }
      newMenu.children = []
      const parentMenu = menuList1.filter((item) => item.id === newMenu.parentId)
      console.log(parentMenu)
      parentMenu[0].children.push(newMenu)
      localStorage.setItem('PERMISSION', JSON.stringify(menuList1))
      return {
        field: field,
        operCode: operCode,
        message: '增加成功',
        result: true
      }
    }
  },

  // 更新菜单
  updateMenu: (config) => {
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'update') {
      var currentRoute
      var localRouteString = localStorage.getItem('PERMISSION')
      var localRouteArray = []
      if (localRouteString) {
        localRouteArray = JSON.parse(localRouteString)
        currentRoute = localRouteArray
      } else {
        currentRoute = menuList1
      }
      var updateMenu = merge({}, JSON.parse(field))
      var accessedRouters = filterAsyncRouter(currentRoute, updateMenu)
      localStorage.setItem('PERMISSION', JSON.stringify(accessedRouters))
      return {
        operCode: operCode,
        field: field,
        message: '修改成功',
        result: true
      }
    }
  },

  // 删除菜单
  deleteMenu: (config) => {
    const { keyCode, operCode } = param2Obj(config.url)
    if (operCode === 'delete') {
      var currentRoute
      var localRouteString = localStorage.getItem('PERMISSION')
      var localRouteArray = []
      if (localRouteString) {
        localRouteArray = JSON.parse(localRouteString)
        currentRoute = localRouteArray
      } else {
        currentRoute = menuList1
      }
      console.log(keyCode)
      console.log(typeof (keyCode))
      var accessedRouters = filterAsyncRouterDelete(currentRoute, Number(keyCode))
      localStorage.setItem('PERMISSION', JSON.stringify(accessedRouters))
      console.log(accessedRouters)

      return {
        operCode: operCode,
        keyCode: keyCode,
        message: '删除成功',
        result: true
      }
    }
  },

  // 设置角色权限
  setRoleMenus: (config) => {
    const { roleId, menuIds } = param2Obj(config.url)
    return {
      roleId: roleId,
      menuIds: menuIds,
      message: '配置成功',
      result: true
    }
  },

  // 获取菜单列表
  getMenuList: config => {
    return {
      items: testMenuList
    }
  },

  // 根据角色获取对应角色下的菜单列表
  getRoleMenuList: config => {
    var { roleId } = param2Obj(config.url)
    roleId = Number(roleId)
    const pageList = roleMenuList.filter((item) => item.roleId === roleId)
    return {
      items: pageList
    }
  },

  // 获取对应角色下的权限菜单列表
  getPermission: config => {
    return {
      items: menuList1
    }
  }
}
