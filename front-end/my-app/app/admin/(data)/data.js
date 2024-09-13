const { ShoppingCart, ChartBarStacked, ListOrderedIcon, ShoppingCartIcon, User, Settings, Bell } = require("lucide-react");

 const sidebarData = [
    {
        name:"Products",
        icon: <ShoppingCart />,
        key:1

    },
    {
        name:"Categories",
        icon: <ChartBarStacked />,
        key:2
    },
    {
        name:"Orders",
        icon:  <ListOrderedIcon/>,
        key:3
    },
    {
        name:"Products",
        icon: <ShoppingCartIcon />,
        key:4
    },
    {
        name:"Users",
        icon:<User/>,
        key:5
    },
    {
        name:"Notifications",
        icon:<Bell />,
        key:6
    },
    {
        name:"Settings",
        icon:<Settings/>,
        key:7
    },
]

export default sidebarData

