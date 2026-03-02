import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./Pages/Auth/Login";
import RegisterView from "./Pages/Auth/Register";
import NotFoundPage from "./Pages/NotFount/NotFoundPage";
import Layout2 from "./components/Layout/Layout";
import { ProtectRouteAdmin } from "./components/Auth/ProtectRouteAdmin";
import TicketDashboard from "./Crm/CrmTickets/CrmTicketDashboard";
import { useAuthStore } from "./components/Auth/AuthState";
import { useEffect } from "react";
import CreateCustomers from "./Crm/CrmCreateCustomers/CreateCustomers";
import EmpresaForm from "./Crm/CrmEmpresa/EmpresaForm";
import { ProtectRouteCrmUser } from "./Crm/CrmAuthRoutes/ProtectRouteCrmUser";
import { useAuthStoreCRM } from "./Crm/CrmAuthRoutes/AuthStateCRM";
import CrmRegist from "./Crm/CrmAuth/CrmRegist";
import CrmLogin from "./Crm/CrmAuth/CrmLogin";
import CrmServiceManage from "./Crm/CrmServices/CrmServiceManage";
import ServicioInternetManage from "./Crm/CrmServices/CrmServiciosWifi/CrmServicesWifi";
import FacturacionZonaManage from "./Crm/CrmFacturacion/FacturacionZonaManage";
import Samples1 from "./Samples/Samples1";
import EtiquetaTicketManage from "./Crm/CrmTickets/CrmUtilidadesSoporte/UtilidadesSoporteMain";
import CrmPaymentFactura from "./Crm/CrmBilling/CrmFacturacion/CrmPaymentFactura";
import CrmRuta from "./Crm/CrmRutas/CrmRuta";
import CrmPdfPago from "./Crm/CrmPdfPago/CrmPdfPago";
import RutaCobro from "./Crm/CrmRutas/CrmRutasCobro/RutaCobro";
import EditCustomers from "./Crm/CrmCustomerEdition/CrmCustomerEdition";
import SectorsManagement from "./Crm/CrmSector/SectorsManagement";
import PlantillasMensajes from "./Crm/CrmMensajes/PlantillasMensajes";
import BoletaTicket from "./Crm/CrmTickets/CrmTicketsBoleta/BoletaTicket";
import PlantillaContratoManage from "./Crm/CrmPlantillaContrato/CrmPlantillaContratoManage";
import ContratoServicioPDF from "./Crm/CrmPlantillaContrato/CrmContratoPdf";
import { RutasCobroEdit } from "./Crm/CrmRutas/RutasCobroEdit";
import FacturaEdit from "./Crm/CrmFacturacion/FacturaEdicion/FacturaEdit";
import CrmProfileConfig from "./Crm/CrmProfile/CrmProfileConfig";
import CrmUsers from "./Crm/CrmProfile/CrmUsers";
import MetasTecnicosPage from "./Crm/CrmTicketsMeta/MetasTecnicosPage";
import DeletedInvoicesView from "./Crm/CrmFacturasEliminadas/DeletedFacturas";
import CustomerProfile from "./Crm/CrmCustomer/newCustomerPage/customer-profile";
import RutasAsignadasMain from "./Crm/CrmRutas/_rutas_asignadas/rutas_asignadas_main";
import ReportsMainPage from "./Crm/reports/page/ReportsMainPage";
import ClientesTable from "./Crm/CrmCustomers/CrmCustomerTable";
import RouterMainPage from "./Crm/routers/page";
import OltMainPage from "./Crm/Olt/page";
import BotMainPage from "./Crm/CrmBot/page";
import { MainDashboardPage } from "./Crm/CrmNewDashboard/page";
import TecDashboard from "./Crm/CrmNewDashboard/tec-dashboard";
import TicketAsignadoDetails from "./Crm/CrmNewDashboard/_components/tec-ticket/ticket-details";
import WhatsappChats from "./Crm/CrmWhatsapp/page";
import ChatPage from "./Crm/CrmWhatsapp/_components/chat/page";
import CrmCreditoMainPage from "./Crm/CrmCredito/create/page";
import { CreditosMainPage } from "@/Crm/CrmCredito/main/page";
import CreditoDetails from "./Crm/CrmCredito/credito/page";
import ContratoBuilder from "./Crm/CrmCredito/contrato/page";
import PrinteablePlantilla from "./Crm/CrmCredito/contrato/printeable";
// import { RedirectToDashboard } from "./components/Auth/RedirectToDashboard";

function App() {
  const { checkAuth } = useAuthStore();
  const { checkAuthCRM } = useAuthStoreCRM();

  useEffect(() => {
    checkAuth(); // Carga el estado de autenticación al iniciar
    checkAuthCRM();
  }, []);

  return (
    <>
      <Router>
        {/* Notificaciones */}
        <Toaster
          richColors
          expand={true}
          closeButton={true}
          position="top-right"
          duration={3000}
        />

        <Routes>
          {/* Redirecciona a dashboard */}
          <Route
            path="/"
            element={
              <ProtectRouteAdmin>
                <Navigate to="/dashboard" />
              </ProtectRouteAdmin>
            }
          />

          {/* <Route path="/" element={<RedirectToDashboard />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/crm/regist" element={<CrmRegist />} />
          <Route path="/crm/login" element={<CrmLogin />} />

          <Route path="*" element={<NotFoundPage />} />

          {/* Rutas protegidas con Layout */}
          <Route element={<Layout2 />}>
            {/* RUTAS PARA EL CRM */}
            <Route
              path="/crm"
              element={
                <ProtectRouteCrmUser>
                  <MainDashboardPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-clientes"
              element={
                <ProtectRouteCrmUser>
                  <ClientesTable />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/cliente/:id"
              element={
                <ProtectRouteCrmUser>
                  <CustomerProfile />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/cliente-edicion/:customerId"
              element={
                <ProtectRouteCrmUser>
                  <EditCustomers />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/tickets"
              element={
                <ProtectRouteCrmUser>
                  <TicketDashboard />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/crear-cliente-crm"
              element={
                <ProtectRouteCrmUser>
                  <CreateCustomers />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/empresa"
              element={
                <ProtectRouteCrmUser>
                  <EmpresaForm />
                </ProtectRouteCrmUser>
              }
            />

            {/* seccion para servicios */}
            <Route
              path="/crm-servicios"
              element={
                <ProtectRouteCrmUser>
                  <CrmServiceManage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-servicios-internet"
              element={
                <ProtectRouteCrmUser>
                  <ServicioInternetManage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-facturacion-zona"
              element={
                <ProtectRouteCrmUser>
                  <FacturacionZonaManage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/tags"
              element={
                <ProtectRouteCrmUser>
                  <EtiquetaTicketManage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-samples"
              element={
                <ProtectRouteCrmUser>
                  <Samples1 />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/facturacion/pago-factura/:facturaId"
              element={
                <ProtectRouteCrmUser>
                  <CrmPaymentFactura />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/editar"
              element={
                <ProtectRouteCrmUser>
                  <FacturaEdit />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/ruta"
              element={
                <ProtectRouteCrmUser>
                  <CrmRuta />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/rutas-cobro/edit/:id"
              element={
                <ProtectRouteCrmUser>
                  <RutasCobroEdit />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/rutas-asignadas"
              element={
                <ProtectRouteCrmUser>
                  <RutasAsignadasMain />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/factura-pago/pago-servicio-pdf/:factudaId"
              element={
                <ProtectRouteCrmUser>
                  <CrmPdfPago />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/cobros-en-ruta/:rutaId"
              element={
                <ProtectRouteCrmUser>
                  <RutaCobro />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-sectores"
              element={
                <ProtectRouteCrmUser>
                  <SectorsManagement />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-mensajes-automaticos"
              element={
                <ProtectRouteCrmUser>
                  <PlantillasMensajes />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-boleta-ticket-soporte/:ticketId"
              element={
                <ProtectRouteCrmUser>
                  <BoletaTicket />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm-contrato-plantilla"
              element={
                // <ProtectRouteCrmUser>
                <PlantillaContratoManage />
                // </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/contrato/:id/vista"
              element={
                <ProtectRouteCrmUser>
                  <ContratoServicioPDF />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/perfil"
              element={
                <ProtectRouteCrmUser>
                  <CrmProfileConfig />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/usuarios"
              element={
                <ProtectRouteCrmUser>
                  <CrmUsers />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/metas-soporte"
              element={
                <ProtectRouteCrmUser>
                  <MetasTecnicosPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/bot"
              element={
                <ProtectRouteCrmUser>
                  <BotMainPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/facturas-eliminadas"
              element={
                <ProtectRouteCrmUser>
                  <DeletedInvoicesView />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/olt"
              element={
                <ProtectRouteAdmin>
                  <OltMainPage />
                </ProtectRouteAdmin>
              }
            />

            <Route
              path="/crm/routers"
              element={
                <ProtectRouteAdmin>
                  <RouterMainPage />
                </ProtectRouteAdmin>
              }
            />

            <Route
              path="/crm/reports"
              element={
                <ProtectRouteCrmUser>
                  <ReportsMainPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/tec-dashboard"
              element={
                <ProtectRouteCrmUser>
                  <TecDashboard />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/ticket-detalles/:id"
              element={
                <ProtectRouteCrmUser>
                  <TicketAsignadoDetails />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/bot/whatsapp"
              element={
                <ProtectRouteCrmUser>
                  <WhatsappChats />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/bot/cliente-whatsapp/:id"
              element={
                <ProtectRouteCrmUser>
                  <ChatPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/credito"
              element={
                <ProtectRouteCrmUser>
                  <CrmCreditoMainPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/credito-registros"
              element={
                <ProtectRouteCrmUser>
                  <CreditosMainPage />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/credito/:creditoId"
              element={
                <ProtectRouteCrmUser>
                  <CreditoDetails />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/contrato/:creditoId/:plantillaId"
              element={
                <ProtectRouteCrmUser>
                  <PrinteablePlantilla />
                </ProtectRouteCrmUser>
              }
            />

            <Route
              path="/crm/contrato"
              element={
                <ProtectRouteCrmUser>
                  <ContratoBuilder />
                </ProtectRouteCrmUser>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
