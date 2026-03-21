import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.isDev = import.meta.env.DEV;
  }

  getToken() {
    const envTokenKey = import.meta.env.VITE_TOKEN_KEY || "authToken";
    return (
      localStorage.getItem(envTokenKey) ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("token")
    );
  }

  resolveUrl(url) {
    const configuredApi = import.meta.env.VITE_API_ADMIN_URL || import.meta.env.VITE_API_URL || "";
    const configuredSocket = import.meta.env.VITE_SOCKET_URL || "";
    if (url) return url;
    if (configuredSocket) return configuredSocket;
    return configuredApi ? configuredApi.replace(/\/api\/?$/, "") : window.location.origin;
  }

  connect(url) {
    const token = this.getToken();
    const resolvedUrl = this.resolveUrl(url);

    if (this.socket) {
      if (!this.socket.connected) {
        this.socket.connect();
      }
      return this.socket;
    }

    this.socket = io(resolvedUrl, {
      auth: token ? { token } : undefined,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000
    });

    this.socket.on("connect", () => {
      if (this.isDev) {
        console.log("Landing socket connected:", this.socket.id);
      }
    });

    this.socket.on("disconnect", (reason) => {
      if (this.isDev) {
        console.log("Landing socket disconnected:", reason);
      }
    });

    this.socket.on("connect_error", (error) => {
      if (this.isDev) {
        console.error("Landing socket error:", error.message);
      }
    });

    return this.socket;
  }

  on(event, callback) {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  off(event, callback) {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }
}

const socketService = new SocketService();

export default socketService;
