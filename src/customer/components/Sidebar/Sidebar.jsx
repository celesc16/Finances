import { NavLink } from "react-router-dom";
import { BarChart2,Megaphone, DollarSign,FileArchive,Settings,Home, Handshake, LogOut } from "lucide-react";
import { useAuth } from "../../context/authContext";

function Sidebar({ isSidebarOpen }) {

  const { logout } = useAuth(); // Se accede al contexto

  const SIDEBAR_ITEMS = [
    { name: "Inicio", icon: Home, color: "#005187", href: "/" },
    { name: "Transacciones", icon: Handshake, color: "#8B5CF6", href: "/transacciones" },
    { name: "Reportes", icon: Megaphone, color: "#EC4899", href: "/report" },
    { name: "Presupuestos", icon: DollarSign, color: "#10B981", href: "/presupuestos" },
    { name: "Objetivos", icon: FileArchive, color: "#F59E0B", href: "/objectivo" },
    { name: "Analisis", icon:  BarChart2, color: "#6366f1", href: "/analisis" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200
        sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <div className="space-y-2 font-medium">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
              <span className="ml-4 ">{item.name}</span>
            </NavLink>
          ))}

          <div
            onClick={logout}
            className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <LogOut size={20} style={{ color: "#005187", minWidth: "20px" }} />
            <span className="ml-4">Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
