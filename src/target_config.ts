const DJANGO_IP = "172.25.192.1:8000";

const target_tauri = true;

export const api_proxy_addr = `http://${DJANGO_IP}`;
export const img_proxy_addr = `http://${DJANGO_IP}`;

export const dest_api = (target_tauri) ? api_proxy_addr : "/api";

export const dest_img = (target_tauri) ? img_proxy_addr : "/images";

export const dest_root = (target_tauri) ? "" : "/IRC_frontend"; 