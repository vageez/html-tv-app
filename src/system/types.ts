export type Platform =
  | "samsung_tizen"
  | "lg_webos"
  | "hisense_vidaa"
  | "xbox"
  | "ps5"
  | "browser"
  | "unknown";

export interface SystemApi {
  platform: Platform;
  signals: string[];

  // navigation / lifecycle
  back(): void;
  exitApp(): void;

  // device + environment
  getDeviceInfo(): Promise<Record<string, any>>;
  getAppInfo(): Promise<Record<string, any>>;

  // storage wrapper (lets you patch quirks per platform later)
  storage: {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
  };

  // logging
  log(message: string, data?: any): void;
}
