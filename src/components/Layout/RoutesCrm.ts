import { LucideIcon, Route, Bot, BotMessageSquare } from "lucide-react";

export interface Route {
  icon: LucideIcon;
  label: string;
  href?: string;
  submenu?: Route[];
}

export const routesCrm_SuperAdmin = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const routesCrm_Admin = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const routesCrm_Cobrador = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const routesCrm_Oficina = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const routesCrm_Tecnico = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const routesCrm_Otro = [
  {
    icon: BotMessageSquare,
    label: "Bot y Mensajería",
    submenu: [
      { icon: Bot, label: "Bot", href: "/crm/bot" },
      {
        icon: BotMessageSquare,
        label: "Mensajería Whatsapp",
        href: "/crm/bot/whatsapp?page=1",
      },
    ],
  },
];

export const CRM_ROUTES: Record<string, Route[]> = {
  ADMIN: routesCrm_Admin,
  COBRADOR: routesCrm_Cobrador,
  TECNICO: routesCrm_Tecnico,
  OFICINA: routesCrm_Oficina,
  SUPER_ADMIN: routesCrm_SuperAdmin,
  DEFAULT: routesCrm_Otro,
};
