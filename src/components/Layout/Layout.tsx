import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  // useLocation
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import {
  Bell,
  // LayoutDashboard,
  // LogOut,
  // Monitor,
  // UserCog
} from "lucide-react";
// import { Button } from "@/components/ui/button";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/LogoCrmPng.png"; // Ajusta tu import
import { useStoreCrm } from "@/Crm/ZustandCrm/ZustandCrmContext";
import { useInvalidateQk } from "@/Crm/CrmHooks/hooks/useInvalidateQk/useInvalidateQk";
// import { useGetNotification } from "@/Crm/CrmHooks/hooks/use-notifications/useNotification";
import { useSocketEvent } from "@/Crm/WEB/SocketProvider";
// import { useCrmQuery } from "@/Crm/hooks/crmApiHooks";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "../mode-toggle";
import NotificationsSheet from "./NotificationsComponents/NotificationsSheet";
import { AdvancedDialogCRM } from "@/Crm/_Utils/components/AdvancedDialogCrm/AdvancedDialogCRM";
import NotificationDetailModal from "./NotificationsComponents/NotificationDetailModal";
import { Robot } from "@/Crm/Icons/Robot";
// import {
//   useGetMyUserProfile,
//   UserExtendedProfile,
// } from "@/Crm/CrmHooks/hooks/useUsuarios/use-usuers";
import { UiNotificacion } from "@/Crm/WEB/notifications/notifications.type";

interface LayoutProps {
  children?: React.ReactNode;
}

function useRequestNotificationPermission() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);
}

export default function LayoutCrm({ children }: LayoutProps) {
  // const location = useLocation();
  // const isCrmLocation = location.pathname.startsWith("/crm");
  // const erpLink = import.meta.env.VITE_ERP_LINK;
  // const crmLink = import.meta.env.VITE_CRM_LINK;

  useRequestNotificationPermission();
  // const userId = useStoreCrm((state) => state.userIdCRM) ?? 0;
  // -----------------------------
  // 1. CRM STORE
  // -----------------------------
  const setNombre = useStoreCrm((state) => state.setNombre);
  const setCorreo = useStoreCrm((state) => state.setCorreo);
  const setActivo = useStoreCrm((state) => state.setActivo);
  const setRol = useStoreCrm((state) => state.setRol);
  const setUserId = useStoreCrm((state) => state.setUserIdCrm);
  const setEmpresaId = useStoreCrm((state) => state.setEmpresaId);

  // Estados de lectura
  // const nombre = useStoreCrm((state) => state.nombre);
  // const correo = useStoreCrm((state) => state.correo);
  // const empresaId = useStoreCrm((state) => state.empresaId);

  // Opcional: Si tienes avatar en Zustand, extráelo aquí
  // const avatarUrl = useStoreCrm((state) => state.avatarUrl);

  const invalidateQk = useInvalidateQk();

  // -----------------------------
  // 2. NOTIFICACIONES
  // -----------------------------
  const [openDeleteAllNoti, setOpenDeleteAllNoti] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [openNotiDetails, setOpenNotiDetails] = useState<boolean>(false);
  const [notiSelected, setNotiSelected] = useState<any | null>(null);
  let array1: UiNotificacion[] = [];
  let array2: UiNotificacion[] = [];

  let initialData = {
    botsNotifications: array1,
    notifications: array2,
  };
  // const { data: notifications } = useGetNotification();
  const notifications = initialData;
  const secureNotifications = notifications?.notifications || [];
  const secureNotificationsBot = notifications?.botsNotifications || [];

  const isLoadingNotis = false;

  const deleteNoti = async (_id: number) => {
    toast.info("El módulo de notificaciones aún no está listo en el servidor.");
  };

  const deleteAllNotis = async () => {
    setIsDeletingAll(true);
    try {
      toast.info(
        "El módulo de notificaciones aún no está listo en el servidor.",
      );
    } finally {
      setIsDeletingAll(false);
      setOpenDeleteAllNoti(false);
    }
  };

  useSocketEvent(
    "notifications:system",
    () => {
      // invalidateQk("notificationsSystemQkeys.all"), // Ajusta tu query key
    },
    [invalidateQk],
  );

  const selectNoti = (noti: any) => {
    setNotiSelected(noti);
    setOpenNotiDetails(true);
  };

  // -----------------------------
  // 3. DECODE TOKENS CRM
  // -----------------------------
  useEffect(() => {
    const storedTokenCRM = localStorage.getItem("tokenAuthCRM");
    if (!storedTokenCRM) return;

    try {
      const decodedCrm = jwtDecode<any>(storedTokenCRM); // Ajusta tipo a UserCrmToken
      setNombre(decodedCrm.nombre);
      setCorreo(decodedCrm.correo);
      setActivo(decodedCrm.activo);
      setRol(decodedCrm.rol);
      setUserId(decodedCrm.id);
      setEmpresaId(decodedCrm.empresaId);
    } catch (error) {
      console.error("Error decodificando tokenAuthCRM:", error);
    }
  }, [setNombre, setCorreo, setActivo, setRol, setUserId, setEmpresaId]);

  // -----------------------------
  // 4. QUERIES (INFO EMPRESA)
  // -----------------------------
  // const { data: empresaInfo } = useCrmQuery<any>( // Ajusta a tipo Sucursal/Empresa
  //   ["empresa-info", empresaId],
  //   `empresa/${empresaId}/details`,
  //   undefined,
  //   {
  //     enabled: !!empresaId, // Se ejecuta solo cuando el ID está listo
  //   },
  // );

  // Si esperas un objeto:
  // const { data: userData = {} as UserExtendedProfile } =
  //   useGetMyUserProfile(userId);
  // const userData = {} as UserExtendedProfile;

  // Si en otro caso esperaras un array (para poder hacer .map):
  // const { data: users = [] } = useGetProfiles();
  // -----------------------------
  // 5. HELPERS
  // -----------------------------
  // function getInitials(name?: string | null) {
  //   if (!name) return "??";
  //   const words = name.trim().split(/\s+/).filter(Boolean);
  //   if (words.length === 0) return "??";
  //   const a = words[0]?.[0] ?? "";
  //   const b = words[1]?.[0] ?? words[0]?.[1] ?? "";
  //   return (a + b).toUpperCase() || "??";
  // }

  // const handleLogout = () => {
  //   localStorage.removeItem("tokenAuthCRM");
  //   toast.info("Sesión cerrada correctamente");
  //   window.location.reload();
  // };

  // -----------------------------
  // 6. RENDER DE INTERFAZ
  // -----------------------------
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex flex-col flex-1 w-full">
          {/* HEADER */}
          <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex px-3 py-2 items-center justify-between">
              {/* LADO IZQUIERDO: Logo + Nombre Empresa */}
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-8 w-8 -ml-1 text-muted-foreground" />
                <Link to="/crm">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                  />
                </Link>
                {/* <p className="text-sm font-medium text-foreground truncate max-w-[160px] sm:max-w-xs">
                  {empresaInfo?.nombre || "Cargando..."}
                </p> */}
              </div>

              {/* LADO DERECHO: Tema + Notificaciones + Menú de Usuario */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                {/* <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex items-center gap-2 transition-colors"
                >
                  <a href={isCrmLocation ? erpLink : crmLink}>
                    {isCrmLocation ? (
                      <>
                        <Monitor className="h-4 w-4" />
                        <span>ERP</span>
                      </>
                    ) : (
                      <>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>CRM</span>
                      </>
                    )}
                  </a>
                </Button> */}

                <ModeToggle />

                {/* Notificaciones Bot */}
                <NotificationsSheet
                  selectNoti={selectNoti}
                  tooltipText="Notificaciones Bot"
                  icon={<Robot size={20} />} // Ajusté el size a 20 para match
                  notifications={secureNotificationsBot}
                  isLoading={isLoadingNotis}
                  onDelete={deleteNoti}
                  countBadge={secureNotificationsBot.length}
                  deleteAllNotis={deleteAllNotis}
                  openDeleteAllNoti={openDeleteAllNoti}
                  setOpenDeleteAllNoti={setOpenDeleteAllNoti}
                />

                {/* Notificaciones Sistema */}
                <NotificationsSheet
                  tooltipText="Notificaciones Sistema"
                  icon={<Bell size={20} />}
                  notifications={secureNotifications}
                  isLoading={isLoadingNotis}
                  onDelete={deleteNoti}
                  countBadge={secureNotifications.length}
                  deleteAllNotis={deleteAllNotis}
                  openDeleteAllNoti={openDeleteAllNoti}
                  setOpenDeleteAllNoti={setOpenDeleteAllNoti}
                  selectNoti={selectNoti}
                />

                {/* Menú de Perfil (Dropdown) */}
              </div>
            </div>
          </header>

          {/* MAIN (Contenido inyectado por el Router) */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full h-full">
              {children || <Outlet />}
            </div>
          </main>

          {/* FOOTER */}
          <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <p className="text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Nova Sistemas CRM. Todos los
                derechos reservados.
              </p>
            </div>
          </footer>
        </div>
      </SidebarProvider>

      {/* DIALOGOS Y MODALES GLOBALES */}
      <AdvancedDialogCRM
        open={openDeleteAllNoti}
        onOpenChange={setOpenDeleteAllNoti}
        title="Eliminar todas las notificaciones"
        description="¿Seguro que deseas eliminar todas tus notificaciones? Esta acción no se puede deshacer."
        confirmButton={{
          label: "Sí, eliminar todo",
          onClick: deleteAllNotis,
          loading: isDeletingAll,
          loadingText: "Eliminando...",
          variant: "destructive",
        }}
        cancelButton={{
          label: "Cancelar",
          disabled: isDeletingAll,
          onClick: () => setOpenDeleteAllNoti(false),
        }}
      />

      <NotificationDetailModal
        notification={notiSelected}
        open={openNotiDetails}
        onOpenChange={setOpenNotiDetails}
      />
    </div>
  );
}

//  <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="rounded-full h-8 w-8 ml-1 ring-2 ring-transparent transition-all hover:ring-slate-200 focus-visible:ring-slate-300"
//               aria-label="Menú de usuario"
//             >
//               <Avatar className="h-8 w-8 border border-border">
//                 <AvatarImage
//                   src={userData?.perfil?.avatar?.url}
//                   className="object-cover"
//                 />
//                 <AvatarFallback className="bg-emerald-600 text-white font-semibold uppercase text-xs">
//                   {getInitials(userData?.nombre || nombre)}
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-60">
//             <DropdownMenuLabel className="font-normal">
//               <div className="flex flex-col space-y-1.5">
//                 <p className="text-sm font-semibold leading-none text-foreground truncate">
//                   {userData?.nombre || nombre || "Usuario"}
//                 </p>
//                 <p className="text-xs leading-none text-muted-foreground truncate">
//                   {userData?.correo || correo || "correo@ejemplo.com"}
//                 </p>
//                 {(userData?.rol || userData.rol) && (
//                   <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mt-1">
//                     {(userData?.rol || userData.rol).replace("_", " ")}
//                   </p>
//                 )}
//               </div>
//             </DropdownMenuLabel>

//             <DropdownMenuSeparator />

//             <DropdownMenuGroup>
//               <DropdownMenuItem asChild className="cursor-pointer">
//                 <Link
//                   to="/crm/perfil"
//                   className="flex items-center w-full"
//                 >
//                   <UserCog className="mr-2 h-4 w-4 text-muted-foreground" />
//                   <span>Configuración de Perfil</span>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>

//             <DropdownMenuSeparator />

//             <DropdownMenuItem
//               onClick={handleLogout}
//               className="text-destructive focus:bg-destructive/10 cursor-pointer"
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               <span>Cerrar Sesión</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
