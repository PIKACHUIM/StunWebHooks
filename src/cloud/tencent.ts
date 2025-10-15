import * as teo from "tencentcloud-sdk-nodejs-teo";
import {RequestBody} from "../param";

const TeoClient: any = teo.teo.v20220901.Client;

export class TencentCloud {
    public params: RequestBody;

    constructor(parms: RequestBody) {
        this.params = parms;
    }

    async initial(): Promise<any> {
        return {
            "ZoneId": this.params.domain_uuid,
            "DomainName": this.params.domain_name,
            "OriginInfo": {
                "OriginType": "IP_DOMAIN",
                "Origin": this.params.public_host,
                "HostHeader": this.params.header_back,
                "BackupOrigin": this.params.origin_back
            },
            "OriginProtocol":
                this.params.enable_ssls == undefined ? null : (
                    this.params.enable_ssls ? "HTTPS" : "HTTP"),
            "HttpOriginPort": parseInt(this.params.public_port || ""),
            "IPv6Status": this.params.enable_ipv6
        };
    }

    async configs(): Promise<any> {
        const config = {
            credential: {
                secretId: this.params.secret_uuid,
                secretKey: this.params.secret_keys,
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
        const params: any = await this.initial();
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
        const params: any = await this.initial();
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
            "ZoneId": this.params.domain_uuid,
            "DomainNames": [this.params.domain_name]
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
            "ZoneId": this.params.domain_uuid,
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
