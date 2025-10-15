import * as teo from "tencentcloud-sdk-nodejs-teo";
import {RequestBody} from "../param";

const TeoClient: any = teo.teo.v20220901.Client;

export class TencentCloud {
    public parms: RequestBody;

    constructor(parms: RequestBody) {
        this.parms = parms;
    }

    async parma() {
        return {
            "ZoneId": this.parms.domain_uuid,
            "DomainName": this.parms.domain_name,
            "OriginInfo": {
                "OriginType": "IP_DOMAIN",
                "Origin": this.parms.public_host,
                "HostHeader": this.parms.header_back,
                "BackupOrigin": this.parms.origin_back
            },
            "OriginProtocol":
                this.parms.enable_ssls == undefined ? null : (
                    this.parms.enable_ssls ? "HTTPS" : "HTTP"),
            "HttpOriginPort": parseInt(this.parms.public_port || ""),
            "IPv6Status": this.parms.enable_ipv6
        };
    }

    async configs() {
        const config = {
            credential: {
                secretId: this.parms.secret_uuid,
                secretKey: this.parms.secret_keys,
            },
            region: "",
            profile: {
                httpProfile: {
                    endpoint: "teo.tencentcloudapi.com",
                },
            },
        };
        return new TeoClient(config);
    }

    async created(): Promise<Record<string, any>> {
        const client: any = await this.configs();
        const params: any = await this.parma();
        return client.CreateAccelerationDomain(params).then(
            (data: any): any => {
                return {done: "操作成功", uuid: data, flag: true};
            },
            (err: any): any => {
                return {
                    done: "操作失败", uuid: err,
                    text: (err as Error).message, flag: false
                };
            }
        );
    }

    async updated(): Promise<Record<string, any>> {
        const client: any = await this.configs();
        const params: any = await this.parma();
        // console.log(params);
        return client.ModifyAccelerationDomain(params).then(
            (data: any): any => {
                // console.log(data);
                return {done: "操作成功", uuid: data, flag: true};
            },
            (err: any): any => {
                // console.error("error", err);
                return {
                    done: "操作失败", uuid: err,
                    text: (err as Error).message, flag: false
                };
            }
        );
    }

    async deleted(): Promise<Record<string, any>> {
        const client: any = await this.configs();
        const params = {
            "ZoneId": this.parms.domain_uuid,
            "DomainNames": [this.parms.domain_name]
        };
        return client.DeleteAccelerationDomains(params).then(
            (data: any): any => {
                return {done: "操作成功", uuid: data, flag: true};
            },
            (err: any): any => {
                return {
                    done: "操作失败", uuid: err,
                    text: (err as Error).message, flag: false
                };
            }
        );
    }

    async sourced(): Promise<Record<string, any>> {
        const client: any = await this.configs();
        const params = {
            "ZoneId": this.parms.domain_uuid,
        };
        return client.DescribeAccelerationDomains(params).then(
            (data: any): any => {
                return {done: "操作成功", uuid: data, flag: true};
            },
            (err: any): any => {
                return {
                    done: "操作失败", uuid: err,
                    text: (err as Error).message, flag: false
                };
            }
        );
    }
}
