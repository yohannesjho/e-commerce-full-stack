const { ShoppingCart, ChartBarStacked, ListOrderedIcon, ShoppingCartIcon, User, Settings, Bell } = require("lucide-react");

 const sidebarData = [
    {
        name:"Products",
        icon: <ShoppingCart />,
        menu1:"Product List",
        menu2:"Add Product",
        dropDownOpen:false,
        key:1

    },
    {
        name:"Categories",
        icon: <ChartBarStacked />,
        menu1:"Category List",
        menu2:"Add Category",
        dropDownOpen:false,
        key:2
    },
    {
        name:"Orders",
        icon:  <ListOrderedIcon/>,
        menu1:"Order list",
        menu2:"Add Order",
        dropDownOpen:false,
        key:3
    },
    {
        name:"Carts",
        icon: <ShoppingCartIcon />,
        menu1:"Cart list",
        menu2:"Add Cart",
        dropDownOpen:false,
        key:4
    },
    {
        name:"Users",
        icon:<User/>,
        menu1:"Users list",
        menu2:"Add Users",
        dropDownOpen:false,
        key:5
    },
   
]

export default sidebarData

