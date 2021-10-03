export default {
  boards: {
    listAll: { task: "get", url: "/boards/list/all" },
    listPagenation: { task: "get", url: "/boards/list/page" },

    listdetail: { task: "get", url: "/boards/list/#id" },
    boardCreate: { task: "post", url: "/boards/register" },
    userBoard: { task: "get", url: "/boards/list/user/board" },
    categorySearch: { task: "get", url: "/boards/category/search/#id" },
    keywordSearch: { task: "get", url: "/boards/keword/search" },
  },
  user: {
    update: { task: "patch", url: "/users/#id" },
    delete: { task: "delete", url: "/users/#id" },
    listdepartment: { task: "get", url: "/users/list/department" },
    login: { task: "post", url: "/users/login" },
    signup: { task: "post", url: "/users/signup" },
    emailCheck: { task: "get", url: "/users/email-check" },
    nicknameCheck: { task: "get", url: "/users/nickname-check" },
    logout: { task: "get", url: "/users/logout" },
    userInfo: { task: "get", url: "/users/profile" },
    userValid: { task: "get", url: "/users/valid" },
    categoryAll: { task: "get", url: "/categories/list/board" },
  },
  like: {
    register: { task: "post", url: "/boards/likes/register" },
  },
  cart: {
    register: { task: "post", url: "/carts/register" },
    list: { task: "get", url: "/carts/list" },
    remove: { task: "delete", url: "/carts/list/delete/#id" },
  },
  // mail: {
  // 	send: { task: 'post', url: '/messages/send' },
  // 	sent: { task: 'get', url: '/messages/list/user/sent' },
  // 	recv: { task: 'get', url: '/messages/list/user/recv' },
  // 	sentid: { task: 'get', url: '/messages/list/user/sent' },
  // 	recvid: { task: 'get', url: '/messages/list/user/recv' },
  // 	count: { task: 'get', url: '/messages//list/user/recv/count' },
  // },
};
