import ESAClient, * as $ESA20240910 from "@alicloud/esa20240910";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util, * as $Util from "@alicloud/tea-util";
import { RequestBody } from "../param";

export class AliyunCloud {
  public parms: RequestBody;

  constructor(parms: RequestBody) {
    this.parms = parms;
  }

  async created(): Promise<Record<string, any>> {
    const config = new $OpenApi.Config({
      accessKeyId: this.parms.secret_uuid,
      accessKeySecret: this.parms.secret_keys,
    });
    config.endpoint = "esa.cn-hangzhou.aliyuncs.com";

    const client = new ESAClient(config);
    const runtime = new $Util.RuntimeOptions({});

    const req: any = {
      zoneId: this.parms.domain_uuid,
      domain: this.parms.domain_name,
      origin: this.parms.public_host,
      originPort: parseInt(this.parms.public_port || ""),
      hostHeader: this.parms.header_back ?? undefined,
      backupOrigin: this.parms.origin_back ?? undefined,
      originProtocol: this.parms.enable_ssls == undefined ? null : (this.parms.enable_ssls ? "HTTPS" : "HTTP"),
      ipv6Status: this.parms.enable_ipv6,
    };

    try {
      const res = await (client as any).createDomainWithOptions(req, runtime);
      return { done: "操作成功", uuid: res, flag: true };
    } catch (err: any) {
      return { done: "操作失败", uuid: err, text: (err as Error).message, flag: false };
    }
  }

  async updated(): Promise<Record<string, any>> {
    const config = new $OpenApi.Config({
      accessKeyId: this.parms.secret_uuid,
      accessKeySecret: this.parms.secret_keys,
    });
    config.endpoint = "esa.cn-hangzhou.aliyuncs.com";

    const client = new ESAClient(config);
    const runtime = new $Util.RuntimeOptions({});

    const req: any = {
      zoneId: this.parms.domain_uuid,
      domain: this.parms.domain_name,
      origin: this.parms.public_host,
      originPort: parseInt(this.parms.public_port || ""),
      hostHeader: this.parms.header_back ?? undefined,
      backupOrigin: this.parms.origin_back ?? undefined,
      originProtocol: this.parms.enable_ssls == undefined ? null : (this.parms.enable_ssls ? "HTTPS" : "HTTP"),
      ipv6Status: this.parms.enable_ipv6,
    };

    try {
      const res = await (client as any).updateDomainWithOptions(req, runtime);
      return { done: "操作成功", uuid: res, flag: true };
    } catch (err: any) {
      return { done: "操作失败", uuid: err, text: (err as Error).message, flag: false };
    }
  }

  async deleted(): Promise<Record<string, any>> {
    const config = new $OpenApi.Config({
      accessKeyId: this.parms.secret_uuid,
      accessKeySecret: this.parms.secret_keys,
    });
    config.endpoint = "esa.cn-hangzhou.aliyuncs.com";

    const client = new ESAClient(config);
    const runtime = new $Util.RuntimeOptions({});

    const req: any = {
      zoneId: this.parms.domain_uuid,
      domain: this.parms.domain_name,
    };

    try {
      const res = await (client as any).deleteDomainWithOptions(req, runtime);
      return { done: "操作成功", uuid: res, flag: true };
    } catch (err: any) {
      return { done: "操作失败", uuid: err, text: (err as Error).message, flag: false };
    }
  }

  async sourced(): Promise<Record<string, any>> {
    const config = new $OpenApi.Config({
      accessKeyId: this.parms.secret_uuid,
      accessKeySecret: this.parms.secret_keys,
    });
    config.endpoint = "esa.cn-hangzhou.aliyuncs.com";

    const client = new ESAClient(config);
    const runtime = new $Util.RuntimeOptions({});

    const req: any = {
      zoneId: this.parms.domain_uuid,
      limit: (this.parms as any).limit ?? 20,
      offset: (this.parms as any).offset ?? 0,
    };

    try {
      const res = await (client as any).listDomainsWithOptions(req, runtime);
      return { done: "操作成功", uuid: res, flag: true };
    } catch (err: any) {
      return { done: "操作失败", uuid: err, text: (err as Error).message, flag: false };
    }
  }
}