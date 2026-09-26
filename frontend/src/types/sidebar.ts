import type { LucideIcon } from "lucide-react";

export interface Sidemenu {
    path: string;
    icon: LucideIcon; 
    label: string;
}

export interface NavButton {
    path?: string;
    icon: LucideIcon; 
    label: string;
    danger?: boolean; 
    onClick?: () => void
}