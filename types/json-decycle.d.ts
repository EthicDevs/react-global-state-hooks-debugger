declare module "json-decycle" {
  export = {
    decycle(): (this: any, key: string, value: any) => void {},
    retrocycle(json: Record<string, unknown>): Record<string, unknown> {},
  };
}
